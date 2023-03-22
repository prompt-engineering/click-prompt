export interface SharedApi {
  isLoggedInApi: () => Promise<any>;
  changeConversationNameApi: (conversation_id: number, name: string) => Promise<any>;
  createConversationApi: (name?: string) => Promise<any>;
  getChatsByConversationIdApi: (conversationId: number) => Promise<any>;
  deleteConversationApi: (conversationId: number) => Promise<any>;
  deleteAllConversationsApi: () => Promise<any>;
  sendMsgWithStreamResApi: (conversageId: number, message: string, name?: string) => Promise<any>;
  logoutApi: () => Promise<any>;
}
