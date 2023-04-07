import { isLoggedIn, login, logout } from "@/api/user";
import {
  changeConversationName,
  createConversation,
  deleteAllConversations,
  deleteConversation,
} from "@/api/conversation";
import { getChatsByConversationId, sendMessage, sendMsgWithStreamRes } from "@/api/chat";
import { LlmServiceApi } from "@click-prompt/click-prompt-button";

export const llmServiceApiWithStream: LlmServiceApi = {
  login,
  logout,
  isLoggedIn,
  changeConversationName,
  createConversation,
  getChatsByConversationId,
  deleteConversation,
  deleteAllConversations,
  sendMsgWithStreamRes,
};

export const llmServiceApi: LlmServiceApi = {
  login,
  logout,
  isLoggedIn,
  changeConversationName,
  createConversation,
  getChatsByConversationId,
  deleteConversation,
  deleteAllConversations,
  sendMessage,
};
