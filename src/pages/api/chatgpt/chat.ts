import { NextApiHandler, NextApiResponse } from "next";

import type { ChatCompletionRequestMessage, CreateChatCompletionResponse } from "openai";
import { Configuration, OpenAIApi } from "openai";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { decrypt, secret } from "@/pages/api/chatgpt/user";
import {
  createChat,
  getAllChatsInsideConversation,
  getAllConversionsByUserId,
  getUserByKeyHashed,
} from "@/storage/planetscale";
import * as console from "console";

function createNewOpenAIApi(apiKey: string) {
  const configuration = new Configuration({
    apiKey,
  });

  return new OpenAIApi(configuration);
}

const chatClients = new Map<string, OpenAIApi>();

export type RequestSend = {
  action: "send";
  conversation_id: number;
  messages: ChatCompletionRequestMessage[];
};
export type ResponseSend = Awaited<ReturnType<typeof sendMsgs>>;

export type RequestGetChats = {
  action: "get_chats";
  conversation_id: number;
};
export type ResponseGetChats = Awaited<ReturnType<typeof getAllChatsInsideConversation>>;

export type RequestGetConversations = {
  action: "get_conversations";
};
export type ResponseGetConversation = Awaited<ReturnType<typeof getAllConversionsByUserId>>;

type RequestBody = RequestSend | RequestGetChats | RequestGetConversations;

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

  const chatClient = chatClients.get(keyHashed) || createNewOpenAIApi(decrypt(user.key_encrypted, secret, user.iv));
  chatClients.set(keyHashed, chatClient);

  if (req.method === "POST" && req.body) {
    const body: RequestBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    switch (body.action) {
      case "send": {
        const chats = await getAllChatsInsideConversation(body.conversation_id);
        await sendMsgs({
          res,
          client: chatClient,
          conversation_id: body.conversation_id,
          msgs: chats.map(
            (it) => ({ role: it.role, content: it.content, name: it.name } as ChatCompletionRequestMessage),
          ),
          newMsgs: body.messages,
        });
        break;
      }

      case "get_conversations": {
        const conversations = await getAllConversionsByUserId(user.id as number);

        res.status(200).json(conversations);
        break;
      }

      case "get_chats": {
        const chats = await getAllChatsInsideConversation(body.conversation_id);

        res.status(200).json(chats);
        break;
      }

      default:
        res.status(400).json(`Not supported action of ${(body as any)?.action}`);
    }
  } else {
    res.status(404).json({ error: "Not found" });
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
  console.log("msgs", msgs)
  console.log("newMsgs", newMsgs)
  try {
    const response = await client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...msgs, ...newMsgs],
      temperature: 0.5,
      max_tokens: 4096,
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

    // save to database
    await Promise.all(newMsgs.map((it) => createChat({ conversation_id, ...it })));

    return res.status(200).json({ messages: newMsgs });
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
