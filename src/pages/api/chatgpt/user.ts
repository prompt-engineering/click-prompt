import { NextApiHandler } from "next";
import { Configuration, OpenAIApi } from "openai";
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
};
export let users: User[] = [];

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
  if (req.method === "POST" && req.body) {
    const userId = req.cookies[COOKIE_FOR_USER_ID];
    const { key, action } = req.body;
    if (action) {
      if (action === "login") {
        if (!key) {
          res.status(400).json({ error: "No key provided" } as Response);
          return;
        }
        users.push({
          id: UUID(),
          openai: createNewOpenAIApi(key),
        });
        return res.status(200).json({ message: "Logged in" } as Response);
      } else if (action === "logout") {
        if (!userId) {
          res.status(400).json({ error: "You're not logged in yet!" } as Response);
          return;
        }

        users = users.filter((user) => user.id !== userId);
        return res.status(200).json({ message: "Logged out" } as Response);
      } else {
        res.status(400).json({ error: "Unknown action" } as Response);
      }
    } else {
      res.status(400).json({ error: "No query provided" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default handler;
