export interface LlmServiceApi {
  login: (key: string) => Promise<Response>;
  logout: () => Promise<Response>;
  isLoggedIn: () => Promise<boolean>;
  changeConversationName: (conversationId: number, name: string) => Promise<Conversation | undefined>;
  createConversation: (name?: string) => Promise<Conversation | undefined>;
  getChatsByConversationId: (conversationId: number) => Promise<Chat[] | null>;
  deleteConversation: (conversationId: number) => Promise<Conversation | undefined>;
  deleteAllConversations: () => Promise<Response | undefined>;
  sendMsgWithStreamRes?: (
    conversationId: number,
    message: string,
    name?: string,
  ) => Promise<ReadableStream<Uint8Array> | undefined>;
  sendMessage?: (conversationId: number, message: string, name?: string) => Promise<Chat[] | undefined>;
}

export interface Conversation {
  id: number | undefined;
  name: string;
  user_id: number;
  deleted: NumBool | undefined;
  created_at: string | undefined;
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
