// ChatMessage format: {"messages":[{"role":"user","content":""},{"role":"assistant","content":"\n\nOK"}]}
import { RequestSend } from "@/pages/api/chatgpt/chat";

export type ChatMessage = {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export async function sentMessageReq(message: string, conversation_id?: number): Promise<any | ChatMessage> {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    body: JSON.stringify({
      action: "send",
      conversation_id,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    } as RequestSend),
  });

  return await response.json();
}
