import { RequestGetChats, RequestSend, ResponseGetChats, ResponseSend } from "@/pages/api/chatgpt/chat";

export async function getChatsByConversationId(conversationId: number) {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    body: JSON.stringify({
      action: "get_chats",
      conversation_id: conversationId,
    } as RequestGetChats),
  });
  const data = (await response.json()) as ResponseGetChats;
  if (!response.ok) {
    alert("Error: " + JSON.stringify((data as any).error));
    return;
  }

  if (!data) {
    alert("Error(getChatsByConversationId): sOmeTHiNg wEnT wRoNg");
    return;
  }

  return data;
}

export async function sendMessage(conversageId: number, message: string, name?: string) {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    body: JSON.stringify({
      action: "send",
      conversation_id: conversageId,
      messages: [
        {
          role: "user",
          content: message,
          name:  name ?? undefined,
        },
      ],
    } as RequestSend),
  });
  const data = (await response.json()) as ResponseSend;
  if (!response.ok) {
    alert("Error: " + JSON.stringify((data as any).error));
    return;
  }
  if (data == null) {
    alert("Error: sOmeTHiNg wEnT wRoNg");
    return;
  }

  return data;
}
