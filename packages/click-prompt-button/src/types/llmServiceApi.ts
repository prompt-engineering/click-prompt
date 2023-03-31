export interface LlmServiceApi extends Required<Pick<SendMessages, "sendMsgWithStreamRes" | "sendMessage">> {
  login: (key: string) => Promise<Response>;
  logout: () => Promise<Response>;
  isLoggedIn: () => Promise<boolean>;
  changeConversationName: (conversationId: number, name: string) => Promise<void>;
  createConversation: (name?: string) => Promise<Conversation>;
  getChatsByConversationId: (conversationId: number) => Promise<Chat[]>;
  deleteConversation: (conversationId: number) => Promise<Conversation>;
  deleteAllConversations: () => Promise<Response>;
}

interface SendMessages {
  sendMsgWithStreamRes?: (
    conversationId: number,
    message: string,
    name?: string,
  ) => Promise<ReadableStream<Uint8Array> | null>;
  sendMessage?: (conversationId: number, message: string, name?: string) => Promise<Chat[]>;
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
