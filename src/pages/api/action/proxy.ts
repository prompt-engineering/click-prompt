import { NextApiHandler } from "next";
import fetch from "node-fetch";

export type ApiAction = {
  url: string;
  method: string;
  headers: {
    name: string;
    value: string;
  }[];
  body: string;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST" || !req.body) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { url, method, headers, body } = req.body as ApiAction;

  const proxy_body: any = typeof body === "string" ? JSON.parse(body) : body;
  const [response] = await Promise.all([
    fetch(url, {
      method,
      // todo: convert headers
      headers: headers.reduce((acc, { name, value }) => {
        (acc as any)[name] = value;
        return acc;
      }),
      body: JSON.stringify(proxy_body),
    }),
  ]);

  console.log("create proxy request: ", method, url, headers, body);
  console.log("proxy response: ", response.status, response.statusText, await response.text());

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
