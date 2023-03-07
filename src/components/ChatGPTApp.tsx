import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Icon, useMediaQuery } from "@chakra-ui/react";

import { ChatCompletionRequestMessage } from "openai";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Send from "@/assets/icons/send.svg";
import NewChat from "@/assets/icons/new-chat.svg";
import TrashcanIcon from "@/assets/icons/trashcan.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import content from "@/assets/images/content.png";
import styled from "@emotion/styled";

const ChatInput = styled("input")`
  background: #ffffff;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 2rem 0.5rem 1rem;
  width: 100%;
  height: 3rem;
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
  bottom: 0.75rem;
  width: calc(100% - 1rem);
  height: 3rem;
`;
const ChatSendButton = styled("button")`
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  right: 0.5rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  border: none;
  outline: none;
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
const SendIcon = () => {
  return (
    <Icon viewBox='0 0 24 24' color='currentColor'>
      <line x1='22' y1='2' x2='11' y2='13'></line>
      <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
    </Icon>
  );
};

type ChatGptAppProp = {
  message?: string;
};

export function ChatGPTApp(props: ChatGptAppProp) {
  const [isLoggedin, setIsLoggedin] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/chatgpt/verify");
        const data = await response.json();
        setIsLoggedin(data.loggedIn);
      } catch {
        setIsLoggedin(false);
      }
    })();
  }, []);

  const [openAiKey, setOpenAiKey] = useState("");
  async function login(key: string) {
    if (key.length === 0) {
      alert("Please enter your OpenAI API key first.");
      return;
    }
    const response = await fetch("/api/chatgpt/user", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        key: openAiKey,
      }),
    });
    const data = await response.json();
    if (!data.error) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }

  async function logout() {
    const response = await fetch("/api/chatgpt/user", {
      method: "POST",
      body: JSON.stringify({
        action: "logout",
      }),
    });
    const data = await response.json();
    console.log("logout: ", data);
    setIsLoggedin(false);
  }

  const chatsWrapper = useRef<HTMLDivElement>(null);
  const [disable, setDisable] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatCompletionRequestMessage[]>([]);
  const [message, setMessage] = useState(props?.message ? props?.message.toString() : "");

  async function sendMessage() {
    if (message.length === 0) {
      alert("Please enter your message first.");
      return;
    }

    try {
      setDisable(true);
      const response = await fetch("/api/chatgpt/chat", {
        method: "POST",
        body: JSON.stringify({
          conversation_name: "chatgpt",
          prompt: message,
        }),
      });
      const data = await response.json();

      if (!data.error) {
        if (data.messages) {
          setChatHistory([...data.messages]);
          setTimeout(() => {
            if (typeof chatsWrapper.current?.scrollTop !== "undefined") {
              // scroll to bottom
              chatsWrapper.current.scrollTop = chatsWrapper.current.scrollHeight;
            }
            setMessage("");
          }, 100);
        }
      } else {
        alert("Error: " + JSON.stringify(data.error));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDisable(false);
    }
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();

        sendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const [isLargerMd] = useMediaQuery(["(min-width: 980px)"]);
  const [fold, setFold] = useState(isLargerMd);
  useEffect(() => {
    if (isLargerMd !== fold) {
      setFold(isLargerMd);
    }
  }, [isLargerMd]);

  function SideBarBtn() {
    return (
      <div
        className='absolute inset-y-0 right-0 flex items-center justify-center z-50 cursor-pointer text-white'
        onClick={() => setFold(!fold)}
      >
        {fold ? <ArrowLeftIcon boxSize='0.875rem' /> : <ArrowRightIcon boxSize='0.875rem' />}{" "}
      </div>
    );
  }

  if (isLoggedin === null) {
    return <></>;
  }

  if (!isLoggedin) {
    return (
      <div className='flex flex-col items-center justify-center w-3/4 mx-auto'>
        <h1 className='text-white text-[34px] font-bold'>ChatGPT</h1>
        <p className='text-white text-xl'>You need to login first.</p>
        <div className='my-4 flex gap-2 items-center'>
          <p className='text-white w-[14rem]'>OpenAI API Key:</p>
          <Input
            className='bg-white text-white'
            value={openAiKey}
            onChange={(ev) => setOpenAiKey(ev.target.value)}
          ></Input>
          <Button
            onClick={async () => {
              await login(openAiKey);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-[${fold ? "200px" : "1rem"}_1fr]  w-full`}>
      {/* left */}
      <div className='flex relative'>
        <div className={`bg-gray-900 text-white p-2 grid grid-rows-[45px_1fr_100px] ${fold ? "block" : "hidden"}`}>
          <div className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
            <NewChat color='white' />
            New chat
          </div>
          <div className='overflow-y-auto overflow-container'></div>
          <div>
            <div className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
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
        <SideBarBtn />
      </div>

      {/* right */}
      <div className='relative flex flex-col items-center justify-start gap-16'>
        {chatHistory.length === 0 && <Image className='mt-8' src={content} alt='background image'></Image>}

        {/* chats */}
        <ChatsWrapper ref={chatsWrapper} className='flex flex-col gap-4 w-full px-4 max-h-[70vh] overflow-y-auto mt-11'>
          {chatHistory.map((chat, index) => {
            return (
              <div key={index} className='flex flex-col gap-14 '>
                {chat.role === "user" ? (
                  <div className='self-end flex'>
                    {/* chat bubble badge */}
                    <div className='rounded-md bg-green-400 text-white text-xl px-4 py-2 max-w-xl'>{chat.content}</div>
                  </div>
                ) : (
                  <div className='self-start flex'>
                    <p className='rounded-md bg-orange-400 text-white text-xl px-4 py-2 max-w-xl'>{chat.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </ChatsWrapper>

        <ChatInputWrapper>
          <ChatInput
            disabled={disable}
            placeholder='Type your message here...'
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
          />
          <ChatSendButton disabled={disable} onClick={sendMessage}>
            <Send />
          </ChatSendButton>
        </ChatInputWrapper>
      </div>
    </div>
  );
}
