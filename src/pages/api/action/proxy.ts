import { NextApiHandler } from "next";
import fetch from "node-fetch";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST" || !req.body) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { url, method, headers, body } = req.body;

  const proxy_body: any = typeof body === "string" ? JSON.parse(body) : body;
  const response = await fetch(url, {
    method,
    // todo: convert headers
    body: JSON.stringify(proxy_body),
  });

  console.log("create proxy request", url, method);

  if (response.ok) {
    const { headers, body } = await response.json();
    return res.status(200).json({
      headers,
      body,
    });
  } else {
    return res.status(400).json({
      error: await response.text(),
    });
  }
};

export default handler;
