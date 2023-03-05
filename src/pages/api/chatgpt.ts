import { NextApiHandler } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST" && req.body) {
    const { user, prompt } = req.body;
    if (user && prompt) {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        max_tokens: 1024,
        user,
        stop: ["\n", "User:", "AI:"],
      });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "No query provided" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default handler;
