import { createCipheriv, createDecipheriv, randomBytes, createHash } from "node:crypto";
const hasher = createHash("sha256");

import { NextApiHandler } from "next";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { createUser, isValidUser } from "@/storage/planetscale";
import * as console from "console";

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

function genIV() {
  return new Buffer(randomBytes(16));
}

function encrypt(data: string, secret: string, iv: Buffer) {
  const cipher = createCipheriv("aes-256-cbc", secret, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encrypted: string, secret: string, iv: string) {
  const ivBuffer = new Buffer(iv, "hex");
  const decipher = createDecipheriv("aes-256-cbc", secret, ivBuffer);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const secret = process.env["ENC_KEY"];

const handler: NextApiHandler = async (req, res) => {
  console.log("process.version", process.version);
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

  const userIdInCookie = req.cookies[SITE_USER_COOKIE];
  const { key, action } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (!action) {
    res.status(400).json({ error: "No query provided" });
    return;
  }

  switch (action) {
    case "login":
      if (key) {
        const key_hashed = hasher.copy().update(key).digest().toString("hex");

        if (!(await isValidUser(key_hashed))) {
          const iv = genIV();
          const key_encrypted = encrypt(key, secret, iv);

          await createUser({
            iv: iv.toString("hex"),
            key_hashed,
            key_encrypted,
          });
        }

        res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=${key_hashed}; Max-Age=3600; HttpOnly; Path=/;`);
        return res.status(200).json({ message: "Logged in" } as Response);
      } else {
        return res.status(400).json({ error: "No key provided" } as Response);
      }
    case "logout":
      if (!userIdInCookie) {
        return res.status(200).json({ error: "You're not logged in yet!" } as Response);
      }

      res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
      return res.status(200).json({ message: "Logged out" } as Response);
    default:
      return res.status(400).json({ error: "Unknown action" } as Response);
  }
};
export default handler;
