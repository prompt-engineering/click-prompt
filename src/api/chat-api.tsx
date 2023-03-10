import { v4 as uuidv4 } from "uuid";

// ChatMessage format: {"messages":[{"role":"user","content":""},{"role":"assistant","content":"\n\nOK"}]}
export type ChatMessage = {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export async function sentMessageReq(message: string, chatId?: string): Promise<any | ChatMessage> {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    body: JSON.stringify({
      chat_id: chatId ?? uuidv4(),
      // TODO: this name could be changed by user later
      chat_name: "Click Prompt Chat",
      prompt: message,
    }),
  });

  return await response.json();
}
