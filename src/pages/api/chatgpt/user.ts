import { createCipheriv, createDecipheriv } from "node:crypto";

import { NextApiHandler } from "next";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { logoutUser, saveAndLoginUser } from "@/storage/planetscale";

export type User = {
  id: string;
  openai: OpenAIApi;
  conversations: Map<string, ChatCompletionRequestMessage[]>;
};

// type Request = {
//   action: "login" | "logout";
//   key?: string;
// };

type Response = {
  message?: string;
  error?: string;
};

function encrypt(data: string, secret: string) {
  const iv = Buffer.from("hgudlo8fbj$ng.fq");
  const cipher = createCipheriv("aes-256-cbc", secret, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encrypted: string, secret: string) {
  const [ivHex, encryptedHex] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", secret, iv);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const secret = process.env["ENC_KEY"];

const handler: NextApiHandler = async (req, res) => {
  if (!secret) {
    res.status(500).json({
      error: "No secret key env in the server.",
    });
    return;
  }

  if (!(req.method === "POST" && req.body)) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  let userId = req.cookies[SITE_USER_COOKIE];
  const { key, action } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (!action) {
    res.status(400).json({ error: "No query provided" });
    return;
  }

  switch (action) {
    case "login":
      if (key) {
        userId = encrypt(key, secret);
        await saveAndLoginUser(userId);
        // console.log(`User ${userId} logged in`);

        res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=${userId}; Max-Age=3600; HttpOnly; Path=/;`);

        return res.status(200).json({ message: "Logged in" } as Response);
      } else {
        res.status(400).json({ error: "No key provided" } as Response);

        return;
      }
    case "logout":
      if (!userId) {
        res.status(200).json({ error: "You're not logged in yet!" } as Response);

        return;
      }

      await logoutUser(userId);
      res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
      return res.status(200).json({ message: "Logged out" } as Response);
    default:
      res.status(400).json({ error: "Unknown action" } as Response);
      break;
  }
};
export default handler;
