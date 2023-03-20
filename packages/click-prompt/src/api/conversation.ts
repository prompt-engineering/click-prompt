import fetch from "node-fetch";
import {
  RequestChangeConversationName,
  RequestCreateConversation,
  RequestDeleteAllConversation,
  RequestDeleteConversation,
  ResponseCreateConversation,
  ResponseDeleteAllConversation,
} from "@/pages/api/chatgpt/conversation";

export async function createConversation(name?: string) {
  const response = await fetch("/api/chatgpt/conversation", {
    method: "POST",
    body: JSON.stringify({
      action: "create_conversation",
      name: name ?? "Default name",
    } as RequestCreateConversation),
  });
  const data = (await response.json()) as ResponseCreateConversation;
  if (!response.ok) {
    alert("Error(createConversation): " + JSON.stringify((data as any).error));
    return;
  }

  if (data == null) {
    alert("Error(createConversation): sOmeTHiNg wEnT wRoNg");
    return;
  }

  return data;
}

export async function changeConversationName(conversationId: number, name: string) {
  const response = await fetch("/api/chatgpt/conversation", {
    method: "POST",
    body: JSON.stringify({
      action: "change_conversation_name",
      conversation_id: conversationId,
      name: name ?? "Default name",
    } as RequestChangeConversationName),
  });
  const data = (await response.json()) as ResponseCreateConversation;
  if (!response.ok) {
    alert("Error: " + JSON.stringify((data as any).error));
    return;
  }

  if (!data) {
    alert("Error(changeConversationName): sOmeTHiNg wEnT wRoNg");
    return;
  }

  return data;
}

export async function deleteConversation(conversationId: number) {
  const response = await fetch("/api/chatgpt/conversation", {
    method: "POST",
    body: JSON.stringify({
      action: "delete_conversation",
      conversation_id: conversationId,
    } as RequestDeleteConversation),
  });
  const data = (await response.json()) as ResponseCreateConversation;
  if (!response.ok) {
    alert("Error: " + JSON.stringify((data as any).error));
    return;
  }

  if (!data) {
    alert("Error(deleteConversation): sOmeTHiNg wEnT wRoNg");
    return;
  }

  return data;
}

export async function deleteAllConversations() {
  const response = await fetch("/api/chatgpt/conversation", {
    method: "POST",
    body: JSON.stringify({
      action: "delete_all_conversations",
    } as RequestDeleteAllConversation),
  });
  const data = (await response.json()) as ResponseDeleteAllConversation;
  if (!response.ok) {
    alert("Error: " + JSON.stringify((data as any).error));
    return;
  }

  if (data.error) {
    alert("Error(deleteAllConversation): sOmeTHiNg wEnT wRoNg: " + data.error);
    return;
  }

  return data;
}
