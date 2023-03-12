import { NextApiHandler, NextApiResponse } from "next";

import type { ChatCompletionRequestMessage, CreateChatCompletionResponse } from "openai";
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
  action: "send";
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
      case "send": {
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
      max_tokens: 200,
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
