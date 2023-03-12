import { NextApiHandler, NextApiResponse } from "next";

import type {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionResponse,
} from "openai";
import { Configuration, OpenAIApi, type ConfigurationParameters } from "openai";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { decrypt, secret } from "@/pages/api/chatgpt/user";
import {
  createChat,
  getAllChatsInsideConversation,
  getUserByKeyHashed,
  createConversation,
} from "@/storage/planetscale";

async function getConfig(apiKey: string) {
  const baseConf: ConfigurationParameters = {
    apiKey,
  };
  // FIXME now just for development
  if (process.env.NODE_ENV === "development" && process.env.PROXY_HOST && process.env.PROXY_PORT) {
    const { httpsOverHttp } = await import("tunnel");
    const tunnel = httpsOverHttp({
      proxy: {
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT as unknown as number,
      },
    });
    baseConf.baseOptions = {
      httpsAgent: tunnel,
      proxy: false,
    };
  }
  return baseConf;
}

async function createNewOpenAIApi(apiKey: string) {
  const conf = await getConfig(apiKey);
  const configuration = new Configuration(conf);

  return new OpenAIApi(configuration);
}

const chatClients = new Map<string, OpenAIApi>();

export type RequestSend = {
  action: "send" | "send_stream";
  conversation_id: number;
  messages: ChatCompletionRequestMessage[];
};
export type ResponseSend = Awaited<ReturnType<typeof getAllChatsInsideConversation>>;

export type RequestGetChats = {
  action: "get_chats";
  conversation_id: number;
};
export type ResponseGetChats = Awaited<ReturnType<typeof getAllChatsInsideConversation>>;

type RequestBody = RequestSend | RequestGetChats;

const handler: NextApiHandler = async (req, res) => {
  if (!secret) {
    res.status(500).json({
      error: "No secret key env in the server.",
    });
    return;
  }

  const keyHashed = req.cookies[SITE_USER_COOKIE];
  if (!keyHashed) {
    res.status(400).json({ error: "You're not logged in yet!" });
    return;
  }

  const user = await getUserByKeyHashed(keyHashed);
  if (!user) {
    res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
    res.status(400).json({ error: "Your login session has been expired!" });
    return;
  }

  const chatClient =
    chatClients.get(keyHashed) || (await createNewOpenAIApi(decrypt(user.key_encrypted, secret, user.iv)));
  chatClients.set(keyHashed, chatClient);

  if (req.method === "POST" && req.body) {
    const body: RequestBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    switch (body.action) {
      case "send":
      case "send_stream": {
        let conversation_id: number | undefined | null = body.conversation_id;
        // if no conversation.ts exists, create new one as default, elsewise `create Chat` will throw error
        if (!conversation_id) {
          const defaultConvesation = await createConversation({
            user_id: user.id as number,
            name: "Default Conversation name",
          });
          conversation_id = defaultConvesation?.id;
        }
        if (conversation_id == null) {
          res.status(400).json({ error: "No conversation_id found" });
          return;
        }

        const chats = await getAllChatsInsideConversation(conversation_id);
        if (body.action === "send_stream") {
          return sendMsgsUseStream({
            res,
            client: chatClient,
            conversation_id: conversation_id,
            msgs: chats.map(
              (it) => ({ role: it.role, content: it.content, name: it.name } as ChatCompletionRequestMessage),
            ),
            newMsgs: body.messages,
          });
        }
        await sendMsgs({
          res,
          client: chatClient,
          conversation_id: conversation_id,
          msgs: chats.map(
            (it) => ({ role: it.role, content: it.content, name: it.name } as ChatCompletionRequestMessage),
          ),
          newMsgs: body.messages,
        });
        return;
      }

      case "get_chats": {
        const chats = await getAllChatsInsideConversation(body.conversation_id);

        res.status(200).json(chats);
        return;
      }

      default:
        res.status(400).json(`Not supported action of ${(body as any)?.action}`);
        return;
    }
  } else {
    res.status(404).json({ error: "Not found" });
    return;
  }
};
export default handler;

async function sendMsgs({
  res,
  client,
  conversation_id,
  msgs,
  newMsgs,
}: {
  res: NextApiResponse;
  client: OpenAIApi;
  conversation_id: number;
  msgs: ChatCompletionRequestMessage[];
  newMsgs: ChatCompletionRequestMessage[];
}) {
  try {
    const messages = [...msgs, ...newMsgs].map((it) => ({ ...it, name: it.name ?? undefined }));
    const response = await client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.5,
      max_tokens: 512,
    });
    if (response.status !== 200) {
      res.status(response.status).json({ error: response.statusText });
      return;
    }

    const { choices } = response.data as CreateChatCompletionResponse;
    if (choices.length === 0 || !choices[0].message) {
      res.status(500).json({ error: "No response from OpenAI" });
      return;
    }

    // add response to newMsgs
    messages.push({ ...choices[0].message, name: undefined });

    const needToSave = newMsgs.concat(choices[0].message).map((it) => ({ ...it, conversation_id }));
    // save to database
    const result = await createChat(needToSave);
    if (!result) {
      res.status(500).json({ error: "Cannot save to database" });
      return;
    }

    return res.status(200).json([choices[0].message] as unknown as ResponseSend);
  } catch (e: any) {
    console.error(e);
    let msg = e.message;
    if (e.code === "ETIMEDOUT") {
      msg = "Request api was timeout, pls confirm your network worked";
    } else if (e.response && e.response.data) {
      msg = e.response.data.error;
    }
    res.status(500).json({ error: msg });
  }
}
// WIP: not real stream
// refs:
// https://github.com/vercel/next.js/issues/9965#issuecomment-614823642
// https://beta.nextjs.org/docs/routing/route-handlers#streaming
async function sendMsgsUseStream({
  res,
  client,
  conversation_id,
  msgs,
  newMsgs,
}: {
  res: NextApiResponse;
  client: OpenAIApi;
  conversation_id: number;
  msgs: ChatCompletionRequestMessage[];
  newMsgs: ChatCompletionRequestMessage[];
}) {
  try {
    const messages = [...msgs, ...newMsgs].map((it) => ({ ...it, name: it.name ?? undefined }));
    const response = await client.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.5,
        max_tokens: 200,
        stream: true,
      },
      { responseType: "stream" },
    );
    if (response.status !== 200) {
      res.status(response.status).json({ error: response.statusText });
      return;
    }

    let msg = "",
      role: ChatCompletionRequestMessageRoleEnum;
    // FIXME add typescript type for res
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.data.on("data", async (data: BufferSource | undefined) => {
      if (data) {
        res.write(data);
        // for save chat history
        const lines = data
          .toString()
          .split("\n")
          .filter((line) => line.trim() !== "");
        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
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
            return res.end(); // Stream finished
          } else {
            try {
              const parsed = JSON.parse(message).choices[0].delta;
              if (parsed.role) {
                role = parsed.role;
              }
              if (parsed.content) {
                msg += parsed.content;
              }
              parsed.role = role;
            } catch (error) {
              console.error("Could not JSON parse stream message", message, error);
            }
          }
        }
      }
    });
  } catch (e: any) {
    console.log("异常了", e);
    if (e.response?.status) {
      e.response.data.on("data", (data: BufferSource | undefined) => {
        return res.status(500).json({ error: data?.toString() });
      });
    } else {
      let msg = e.message;
      if (e.code === "ETIMEDOUT") {
        msg = "Request api was timeout, pls confirm your network worked";
      }
      return res.status(500).json({ error: msg });
    }
  }
}
