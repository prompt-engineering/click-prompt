import { ReactComponent as NewChat } from "@/assets/icons/new-chat.svg";
import { ReactComponent as TrashcanIcon } from "@/assets/icons/trashcan.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/logout.svg";
import Image from "next/image";
import content from "@/assets/images/content.png";
import sendIconUrl from "@/assets/icons/send.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BeatLoader } from "react-spinners";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@chakra-ui/react";
import SimpleMarkdown from "@/markdown/SimpleMarkdown";
import type { Chat, Conversation, LlmServiceApi } from "@/types/llmServiceApi";

const ChatInput = styled("input")`
  background: #ffffff;
  border-radius: 8px;
  border: none;
  padding: 0.5rem 1rem;
  width: 768px;
  height: 48px;
  font-size: 1rem;
  font-weight: 500;
  color: #1e1e1e;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 0 2px #1e1e1e;
  }

  &:focus::placeholder {
    color: #1e1e1e;
  }
`;
const ChatInputWrapper = styled("div")`
  position: absolute;
  bottom: 8px;
  width: 768px;
  height: 48px;
  background-color: #fff;
  border-radius: 8px;
`;
const ChatsWrapper = styled("div")`
  // good looking scrollbar
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const ChatSendButton = styled("button")`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
  width: 48px;
  height: 48px;
  background-image: url(${sendIconUrl});
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: none;
  outline: none;
`;

interface ChatRoomProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  initMessage?: string;
  llmServiceApi: Omit<LlmServiceApi, "isLoggedIn">;
}

export const ChatRoom = ({ setIsLoggedIn, initMessage, llmServiceApi }: ChatRoomProps) => {
  const chatsWrapper = React.useRef<HTMLDivElement>(null);
  const [disable, setDisable] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState<Chat[]>([]);
  const [message, setMessage] = React.useState(initMessage ?? "");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<number | null>(null);
  // editing conversation name
  const [editing, setEditing] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  // get conversations
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/chatgpt/conversation", {
          method: "POST",
          body: JSON.stringify({
            action: "get_conversations",
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          alert("Error: " + JSON.stringify(data.error));
          return;
        }
        setConversations(data);
      } catch (error) {
        setConversations([]);
        alert("Error: " + JSON.stringify(error));
      }
    })();
  }, []);

  // scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      if (chatsWrapper.current) {
        chatsWrapper.current.scrollTop = chatsWrapper.current.scrollHeight;
      }
    });
  }, [chatHistory]);

  const onEnterForSendMessage: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();

      sendMessage();
    }
  };

  async function createConversation() {
    const data = await llmServiceApi.createConversation();
    if (!data) {
      return;
    }

    setConversations([data, ...conversations]);
    return data;
  }

  async function changeConversationName(conversationId: number, name: string) {
    await changeConversationName(conversationId, name);

    setConversations((c) =>
      c.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            name,
          };
        }
        return conversation;
      })
    );
  }

  const handleConversation = useDebouncedCallback(
    async (conversationId: number | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.detail > 1) {
        // double click
        if (conversationId == null) {
          return;
        }
        setEditingName(conversations.find((c) => c.id === conversationId)?.name ?? "");
        setEditing(conversationId);
        return;
      }

      if (conversationId == null) {
        setCurrentConversation(null);
        setChatHistory([]);
        return;
      }
      setDisable(true);

      try {
        setCurrentConversation(conversationId);
        const data = await llmServiceApi.getChatsByConversationId(conversationId);
        if (!data) {
          return;
        }
        setChatHistory(data);
      } catch (e) {
        console.log("changeConversation: ", e);
      } finally {
        setDisable(false);
      }
    },
    200
  );

  async function deleteConversation(conversationId: number) {
    const data = await llmServiceApi.deleteConversation(conversationId);
    if (!data) {
      return;
    }
    setConversations(conversations.filter((conversation) => conversation.id !== conversationId));
  }

  async function deleteAllConversations() {
    const data = await llmServiceApi.deleteAllConversations();
    if (!data) {
      return;
    }
    setConversations([]);
  }
  // FIXME anti-pattern, should use `useState`
  let codeMark = "";
  async function sendMessage() {
    if (message.length === 0) {
      alert("Please enter your message first.");
      return;
    }

    try {
      setDisable(true);
      if (currentConversation == null) {
        const created = await createConversation();
        setCurrentConversation(created?.id ?? null);
      }

      setMessage("");
      let updatedHistory = [
        ...chatHistory,
        {
          role: "user",
          content: message,
          // TODO(CGQAQ): custom name of user
          // name: "User",
        },
      ] as Chat[];

      setChatHistory([...updatedHistory]);

      const data = await llmServiceApi.sendMsgWithStreamRes(currentConversation as number, message);
      if (!data) {
        setDisable(false);
        setChatHistory([...updatedHistory.slice(0, updatedHistory.length - 1)]);
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let isDone = false;
      while (!isDone) {
        const { value, done } = await reader.read();
        isDone = done;
        const chunkValue = decoder.decode(value);
        const lines = chunkValue.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            setDisable(false);
          } else {
            const parsed = JSON.parse(message).choices[0].delta;
            if (parsed && Object.keys(parsed).length > 0) {
              if (!!parsed.role) {
                parsed.content = "";
                updatedHistory = [...updatedHistory, parsed];
              } else if (!!parsed.content) {
                if (parsed.content === "```") {
                  // code block start
                  if (!codeMark) {
                    codeMark = parsed.content;
                  } else {
                    // code block end remove it
                    codeMark = "";
                  }
                }
                updatedHistory[updatedHistory.length - 1].content += parsed.content;
              }
              setChatHistory([...updatedHistory]);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      setDisable(false);
    } finally {
      // setDisable(false);
    }
  }

  async function logout() {
    await logout();
    setIsLoggedIn(false);
  }

  return (
    <div className="button-flex button-w-full button-h-full">
      {/* left */}
      <div className="button-hidden button-max-w-[300px] button-bg-gray-900 button-text-white button-p-2 md:button-grid button-grid-rows-[45px_1fr_100px] button-select-none">
        <div
          className="button-flex button-py-3 button-px-3 button-items-center button-gap-3 button-rounded-md button-hover:bg-gray-500/10 button-transition-colors button-duration-200 button-text-white button-cursor-pointer button-text-sm button-mb-2 button-flex-shrink-0 button-border button-border-white/20"
          onClick={createConversation}
        >
          <NewChat color="white" />
          New chat
        </div>
        <div className="button-overflow-y-auto button-overflow-container">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${
                currentConversation === conversation.id
                  ? "button-bg-emerald-700 button-hover:bg-emerald-900"
                  : "button-hover:bg-gray-500/10"
              } button-flex button-py-3 button-px-3 button-items-center button-justify-between button-gap-3 button-rounded-md button-transition-colors button-duration-200 button-text-white button-cursor-pointer button-text-sm button-mb-2 button-flex-shrink-0 button-border button-border-white/20`}
              onClick={(event) => {
                handleConversation(conversation.id!, event);
              }}
            >
              {editing === conversation.id ? (
                <Input
                  autoFocus={true}
                  value={editingName}
                  onChange={(ev) => {
                    setEditingName(ev.currentTarget.value);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === "NumpadEnter") {
                      ev.preventDefault();
                      changeConversationName(conversation.id!, ev.currentTarget.value).finally(() => {
                        setEditing(null);
                      });
                    } else if (ev.key === "Escape") {
                      ev.preventDefault();
                      setEditing(null);
                    }
                  }}
                  onBlur={async (ev) => {
                    await changeConversationName(conversation.id!, ev.currentTarget.value);
                    setEditing(null);
                  }}
                />
              ) : (
                <>
                  <div className="button-text-sm button-font-medium button-overflow-ellipsis button-truncate button-max-w-[215px]">
                    {conversation.name}
                  </div>
                  {/* delete button */}
                  <div
                    className="button-flex button-items-center button-justify-center button-w-6 button-h-6 button-rounded-full button-bg-red-500 button-hover:bg-red-600 button-transition-colors button-duration-200 button-cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Are you sure to delete this conversation?")) {
                        deleteConversation(conversation.id!);
                      }
                    }}
                  >
                    <TrashcanIcon color="white" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <div
            className="button-flex button-py-3 button-px-3 button-items-center button-gap-3 button-rounded-md hover:button-bg-gray-500/10 button-transition-colors button-duration-200 button-text-white button-cursor-pointer button-text-sm button-mb-2 button-flex-shrink-0 button-border button-border-white/20"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure to delete ALL conversations?")) {
                deleteAllConversations();
              }
            }}
          >
            <TrashcanIcon color="white" />
            Clear conversations
          </div>
          <div
            className="button-flex button-py-3 button-px-3 button-items-center button-gap-3 button-rounded-md hover:button-bg-gray-500/10 button-transition-colors button-duration-200 button-text-white button-cursor-pointer button-text-sm button-mb-2 button-flex-shrink-0 button-border button-border-white/20"
            onClick={logout}
          >
            <LogoutIcon color="white" />
            Log out
          </div>
        </div>
      </div>

      {/* right */}
      <div className="button-relative button-flex button-flex-col button-items-center button-justify-start button-gap-16 button-h-full button-py-4 button-flex-1">
        {chatHistory.length === 0 && (
          <Image className="button-mt-8" src={content} alt="background image" width={718} height={416}></Image>
        )}

        {/* chats */}
        <ChatsWrapper
          ref={chatsWrapper}
          className="button-flex button-flex-col button-gap-4 button-w-full button-px-4 button-max-h-[80%] button-overflow-y-auto button-mt-11 button-scroll-smooth"
        >
          {chatHistory.map((chat, index) => {
            return (
              <div key={index} className="button-flex button-flex-col button-gap-14 ">
                {chat.role === "user" ? (
                  <div className="button-self-end button-flex">
                    {/* chat bubble badge */}
                    <div className="button-rounded-md button-bg-green-400 button-text-white button-text-xl button-px-4 button-py-2 button-max-w-xl">
                      <SimpleMarkdown content={chat.content}></SimpleMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="button-self-start button-flex">
                    <div className="button-rounded-md button-bg-orange-400 button-text-white button-text-xl button-px-4 button-py-2 button-max-w-xl">
                      <SimpleMarkdown content={`${chat.content}${codeMark}`}></SimpleMarkdown>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ChatsWrapper>

        <ChatInputWrapper className="button-w-full md:button-w-9/12 button-mb-5">
          <ChatInput
            disabled={disable}
            placeholder="Type your message here..."
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            onKeyDown={onEnterForSendMessage}
            className="button-w-full button-pr-10 md:button-w-11/12 button-border-0 md:button-pr-0 focus:button-ring-0"
          />
          {disable ? (
            // check this
            <BeatLoader
              className={"button-absolute button-top-1/2 button--translate-y-[50%] button-right-[8px]"}
              size={8}
              color="black"
            />
          ) : (
            <ChatSendButton className="button-w-10 button-h-full" disabled={disable} onClick={sendMessage} />
          )}
        </ChatInputWrapper>
      </div>
    </div>
  );
};
