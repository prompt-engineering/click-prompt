import { CHAT_COMPLETION_CONFIG } from "@/configs/constants";
import { createChat, createConversation, getAllChatsInsideConversation } from "@/storage/planetscale";
import { decryptKey } from "@/uitls/crypto.util";
import { getChatClient } from "@/uitls/openapi.util";
import { getUser, User } from "@/uitls/user.edge.util";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";

export async function POST(request: Request, response: Response) {
  // TODO mixin?
  const user = await getUser();
  if (!user || !(user as User)?.id) {
    return user;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id: user_id, key_hashed, key_encrypted, iv } = user as User;
  const body = await request.json();
  let conversation_id: number | undefined | null = body.conversation_id;
  // if no conversation.ts exists, create new one as default, elsewise `create Chat` will throw error
  if (!conversation_id) {
    const defaultConvesation = await createConversation({
      user_id,
      name: "Default Conversation name",
    });
    conversation_id = defaultConvesation?.id;
  }
  if (conversation_id == null) {
    return new Response(JSON.stringify({ error: "No conversation_id found" }), {
      status: 400,
    });
  }
  const chatClient = await getChatClient(key_hashed, decryptKey(key_encrypted, iv));
  const chats = await getAllChatsInsideConversation(conversation_id);
  const msgs = chats.map(
    (it) => ({ role: it.role, content: it.content, name: it.name } as ChatCompletionRequestMessage),
  );
  const newMsgs = body.messages;
  try {
    const messages = [...msgs, ...newMsgs].map((it) => ({ ...it, name: it.name ?? undefined }));
    const response = await chatClient.createChatCompletion(
      {
        ...CHAT_COMPLETION_CONFIG,
        messages,
        stream: true,
      },
      { responseType: "stream" },
    );
    if (response.status !== 200) {
      return new Response(JSON.stringify({ error: response.statusText }), {
        status: response.status,
      });
    }
    let controller: any;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(_) {
        controller = _;
      },
    });
    let msg = "",
      role: ChatCompletionRequestMessageRoleEnum;
    // FIXME add typescript type for res
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.data.on("data", async (data: BufferSource | undefined) => {
      if (data) {
        const dataStr = data.toString();
        controller.enqueue(encoder.encode(dataStr));
        // for save chat history
        const lines = dataStr.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            controller.close();
            // add response to newMsgs
            const _newMsg = { content: msg, role };
            messages.push({ ..._newMsg, name: undefined });
            const needToSave = newMsgs.concat(_newMsg).map((it: any) => ({ ...it, conversation_id }));
            try {
              // save to database
              const result = await createChat(needToSave);
              if (!result) {
                // TODO logging
              }
            } catch (error) {
              console.error("save to database error", error);
            }
          } else {
            try {
              const parsed = JSON.parse(message).choices[0].delta;
              if (parsed.role) {
                role = parsed.role;
              }
              if (parsed.content) {
                msg += parsed.content;
              }
            } catch (error) {
              console.error("Could not JSON parse stream message", message, error);
            }
          }
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream;",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e: any) {
    if (e.response?.status) {
      e.response.data.on("data", (data: BufferSource | undefined) => {
        return new Response(JSON.stringify({ error: data?.toString() }), {
          status: 500,
        });
      });
    } else {
      let msg = e.message;
      if (e.code === "ETIMEDOUT") {
        msg = "Request api was timeout, pls confirm your network worked";
      }
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
      });
    }
  }
}
