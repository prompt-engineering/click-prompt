import { createCipheriv, createDecipheriv, randomBytes, createHash } from "node:crypto";

if (!process.env["ENC_KEY"]) {
  // for skip CI
  // throw Error("No secret key env in the server.");
  console.log("No secret key env in the server.");
}

const hasher = createHash("sha256");
const secret = process.env["ENC_KEY"] || "";
function genIV() {
  return Buffer.from(randomBytes(16));
}

function encrypt(data: string, secret: string, iv: Buffer) {
  const cipher = createCipheriv("aes-256-cbc", secret, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(encrypted: string, secret: string, iv: string) {
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = createDecipheriv("aes-256-cbc", secret, ivBuffer);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function hashedKey(key: string) {
  return hasher.copy().update(key).digest().toString("hex");
}

export function encryptedKey(key: string) {
  const iv = genIV();
  const key_encrypted = encrypt(key, secret, iv);
  return {
    iv,
    key_encrypted,
  };
}

export function decryptKey(encryptedKey: string, iv: string) {
  return decrypt(encryptedKey, secret, iv);
}
