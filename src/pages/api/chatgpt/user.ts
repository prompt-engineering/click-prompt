import { NextApiHandler } from "next";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { v4 as UUID } from "uuid";

function createNewOpenAIApi(apiKey: string) {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  return openai;
}

export type User = {
  id: string;
  openai: OpenAIApi;
  conversations: Map<string, ChatCompletionRequestMessage[]>;
};
let users: User[] = [];

export function getUserByUserId(userId: string) {
  const user = users.find((user) => user.id === userId);
  return user ? user : null;
}

type Request = {
  action: "login" | "logout";
  key?: string;
};

type Response = {
  message?: string;
  error?: string;
};

const COOKIE_FOR_USER_ID = "PROMPT_GENERATOR_USER";
const handler: NextApiHandler = async (req, res) => {
  if (!(req.method === "POST" && req.body)) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  let userId = req.cookies[COOKIE_FOR_USER_ID];
  const { key, action } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (!action) {
    res.status(400).json({ error: "No query provided" });
    return;
  }

  switch (action) {
    case "login":
      if (!key) {
        res.status(400).json({ error: "No key provided" } as Response);
        return;
      }
      userId = UUID();
      users.push({
        id: userId,
        openai: createNewOpenAIApi(key),
        conversations: new Map(),
      });

      console.log(`User ${userId} logged in`);
      res.setHeader("Set-Cookie", `${COOKIE_FOR_USER_ID}=${userId}; Max-Age=3600;`);
      return res.status(200).json({ message: "Logged in" } as Response);
    case "logout":
      if (!userId) {
        res.status(200).json({ error: "You're not logged in yet!" } as Response);
        return;
      }

      users = users.filter((user) => user.id !== userId);
      return res.status(200).json({ message: "Logged out" } as Response);
    default:
      res.status(400).json({ error: "Unknown action" } as Response);
      break;
  }
};
export default handler;
