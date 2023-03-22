export interface SharedApi {
  isLoggedInApi: () => Promise<boolean>;
  changeConversationNameApi: (conversationId: number, name: string) => Promise<void>;
  createConversationApi: (name?: string) => Promise<Conversation>;
  getChatsByConversationIdApi: (conversationId: number) => Promise<Chat[]>;
  deleteConversationApi: (conversationId: number) => Promise<Conversation>;
  deleteAllConversationsApi: () => Promise<Response>;
  sendMsgWithStreamResApi: (
    conversationId: number,
    message: string,
    name?: string
  ) => Promise<ReadableStream<Uint8Array> | null>;
  logoutApi: () => Promise<Response>;
}

export interface Conversation {
  id: number;
  user_id: number;
  name: string;
  deleted?: NumBool;
  created_at?: string;
}

enum NumBool {
  True = 1,
  False = 0,
}

export interface Chat {
  id?: number;
  conversation_id: number;
  role: string; // line 14
  content: string;
  name?: string;
  created_at?: string;
}

export type Response = {
  message?: string;
  error?: string;
};
