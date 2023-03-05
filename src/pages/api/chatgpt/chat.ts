import { NextApiHandler } from "next";
import { users } from "./user";

const handler: NextApiHandler = async (req, res) => {
  const userId = req.cookies["PROMPT_GENERATOR_USER"];
  if (!userId) {
    res.status(400).json({ error: "You're not logged in yet!" });
    return;
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(400).json({ error: "You're not logged in yet!" });
    return;
  }
  const openai = user.openai;

  if (req.method === "POST" && req.body) {
    const { prompt } = req.body;
    if (prompt) {
      try {
        const response = await openai.createCompletion({
          model: "gpt-3.5-turbo",
          prompt,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          max_tokens: 1024,
          user: user.id,
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
