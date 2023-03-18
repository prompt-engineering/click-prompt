import { NextApiHandler } from "next";
import fetch from "node-fetch";

export type ApiAction = {
  url: string;
  method: string;
  headers: {
    key: string;
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

  const browserHeaders: Record<string, string> = headers.reduce(
    (acc, { key, value }) => ({
      ...acc,
      [key]: value,
    }),
    {},
  );

  // ignore body when method is GET
  if (method === "GET") {
    delete browserHeaders["body"];
  }

  const response = await fetch(url, {
    method,
    headers: browserHeaders,
    body: JSON.stringify(proxy_body),
  });

  console.log("create proxy request: ", method, url, browserHeaders);
  console.log("proxy response: ", response.status, response.statusText);

  if (response.ok) {
    const body = await response.json();
    return res.status(response.status).json(body);
  } else {
    return res.status(response.status).json({
      error: await response.json(),
    });
  }
};

export default handler;
