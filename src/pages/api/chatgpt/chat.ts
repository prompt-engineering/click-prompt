import { NextApiHandler } from "next";
import { getClientByUserId } from "./user";

const handler: NextApiHandler = async (req, res) => {
  const userId = req.cookies["PROMPT_GENERATOR_USER"];
  if (!userId) {
    res.status(400).json({ error: "You're not logged in yet!" });
    return;
  }
  const client = getClientByUserId(userId);
  if (!client) {
    res.setHeader("Set-Cookie", "PROMPT_GENERATOR_USER=; Max-Age=0");
    res.status(400).json({ error: "Your login session has been expired!" });
    return;
  }

  if (req.method === "POST" && req.body) {
    const { prompt } = req.body;
    if (prompt) {
      try {
        const response = await client.createCompletion({
          model: "gpt-3.5-turbo",
          prompt,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          max_tokens: 1024,
          user: userId,
          stop: ["\n", "User:", "AI:"],
        });
        if (response.status !== 200) {
          res.status(response.status).json({ error: response.statusText });
          return;
        }
        return res.status(200).json(response.data);
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    } else {
      res.status(400).json({ error: "No query provided" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default handler;
