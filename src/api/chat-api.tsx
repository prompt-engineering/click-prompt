// ChatMessage format: {"messages":[{"role":"user","content":""},{"role":"assistant","content":"\n\nOK"}]}
import { RequestSend } from "@/pages/api/chatgpt/chat";

export type ChatMessage = {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export async function sentMessageReq(message: string): Promise<any | ChatMessage> {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    body: JSON.stringify({
      action: "send",
      messages: [{
        role: "user",
        content: message,
      }]
    } as RequestSend),
  });

  return await response.json();
}
