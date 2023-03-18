"use client";

import NewChat from "@/assets/icons/new-chat.svg";
import TrashcanIcon from "@/assets/icons/trashcan.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import Image from "next/image";
import content from "@/assets/images/content.png";
import send from "@/assets/icons/send.svg?url";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { RequestGetConversations, ResponseGetConversations } from "@/pages/api/chatgpt/conversation";
import { ResponseGetChats, ResponseSend } from "@/pages/api/chatgpt/chat";
import { BeatLoader } from "react-spinners";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@chakra-ui/react";
import * as ChatAPI from "@/api/chat";
import * as ConversationAPI from "@/api/conversation";
import * as UserAPI from "@/api/user";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";

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
  background-image: url(${send});
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const ChatRoom = ({
  setIsLoggedIn,
  initMessage,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  initMessage?: string;
}) => {
  const chatsWrapper = React.useRef<HTMLDivElement>(null);
  const [disable, setDisable] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState<ResponseGetChats>([]);
  const [message, setMessage] = React.useState(initMessage ?? "");

  const [conversations, setConversations] = useState<ResponseGetConversations>([]);
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
          } as RequestGetConversations),
        });
        const data = (await response.json()) as ResponseGetConversations;
        if (!response.ok) {
          alert("Error: " + JSON.stringify((data as any).error));
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
    const data = await ConversationAPI.createConversation();
    if (!data) {
      return;
    }

    setConversations([data, ...conversations]);
    return data;
  }

  async function changeConversationName(conversationId: number, name: string) {
    await ConversationAPI.changeConversationName(conversationId, name);

    setConversations((c) =>
      c.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            name,
          };
        }
        return conversation;
      }),
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
        const data = await ChatAPI.getChatsByConversationId(conversationId);
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
    200,
  );

  async function deleteConversation(conversationId: number) {
    const data = await ConversationAPI.deleteConversation(conversationId);
    if (!data) {
      return;
    }
    setConversations(conversations.filter((conversation) => conversation.id !== conversationId));
  }

  async function deleteAllConversations() {
    const data = await ConversationAPI.deleteAllConversations();
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
      ] as ResponseSend;

      setChatHistory([...updatedHistory]);

      const data = await ChatAPI.sendMsgWithStreamRes(currentConversation as number, message);
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
    await UserAPI.logout();
    setIsLoggedIn(false);
  }

  return (
    <div className='flex w-full h-full'>
      {/* left */}
      <div className='hidden max-w-[300px] bg-gray-900 text-white p-2 md:grid grid-rows-[45px_1fr_100px] select-none'>
        <div
          className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'
          onClick={createConversation}
        >
          <NewChat color='white' />
          New chat
        </div>
        <div className='overflow-y-auto overflow-container'>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${
                currentConversation === conversation.id ? "bg-emerald-700 hover:bg-emerald-900" : "hover:bg-gray-500/10"
              } flex py-3 px-3 items-center justify-between gap-3 rounded-md transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20`}
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
                  <div className='text-sm font-medium overflow-ellipsis truncate max-w-[215px]'>
                    {conversation.name}
                  </div>
                  {/* delete button */}
                  <div
                    className='flex items-center justify-center w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Are you sure to delete this conversation?")) {
                        deleteConversation(conversation.id!);
                      }
                    }}
                  >
                    <TrashcanIcon color='white' />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <div
            className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure to delete ALL conversations?")) {
                deleteAllConversations();
              }
            }}
          >
            <TrashcanIcon color='white' />
            Clear conversations
          </div>
          <div
            className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'
            onClick={logout}
          >
            <LogoutIcon color='white' />
            Log out
          </div>
        </div>
      </div>

      {/* right */}
      <div className='relative flex flex-col items-center justify-start gap-16 h-full py-4 flex-1'>
        {chatHistory.length === 0 && <Image className='mt-8' src={content} alt='background image'></Image>}

        {/* chats */}
        <ChatsWrapper
          ref={chatsWrapper}
          className='flex flex-col gap-4 w-full px-4 max-h-[80%] overflow-y-auto mt-11 scroll-smooth'
        >
          {chatHistory.map((chat, index) => {
            return (
              <div key={index} className='flex flex-col gap-14 '>
                {chat.role === "user" ? (
                  <div className='self-end flex'>
                    {/* chat bubble badge */}
                    <div className='rounded-md bg-green-400 text-white text-xl px-4 py-2 max-w-xl'>
                      <SimpleMarkdown content={chat.content}></SimpleMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className='self-start flex'>
                    <div className='rounded-md bg-orange-400 text-white text-xl px-4 py-2 max-w-xl'>
                      <SimpleMarkdown content={`${chat.content}${codeMark}`}></SimpleMarkdown>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ChatsWrapper>

        <ChatInputWrapper className='w-full md:w-9/12 mb-5'>
          <ChatInput
            disabled={disable}
            placeholder='Type your message here...'
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            onKeyDown={onEnterForSendMessage}
            className='w-full pr-10 md:w-11/12 border-0 md:pr-0 focus:ring-0'
          />
          {disable ? (
            <BeatLoader className={"absolute top-1/2 -translate-y-[50%] right-[8px]"} size={8} color='black' />
          ) : (
            <ChatSendButton className='w-10 h-full' disabled={disable} onClick={sendMessage} />
          )}
        </ChatInputWrapper>
      </div>
    </div>
  );
};
