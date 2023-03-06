import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Icon, useMediaQuery } from "@chakra-ui/react";

import { ChatCompletionRequestMessage } from "openai";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import Send from "@/assets/icons/send.svg";
import NewChat from "@/assets/icons/new-chat.svg";
import TrashcanIcon from "@/assets/icons/trashcan.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
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
// copy from https://chat.openai.com/chat
function ChatGPTDesc({ onClick }: any) {
  return (
    <div className='text-gray-800 w-full md:flex md:flex-col px-6 dark:text-gray-100'>
      <h1 className='text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center'>
        ChatGPT
      </h1>
      <div className='md:flex items-start text-center gap-3.5'>
        <div className='flex flex-col mb-8 md:mb-auto gap-3.5 flex-1'>
          <h2 className='flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2'>
            <svg
              stroke='currentColor'
              fill='none'
              stroke-width='1.5'
              viewBox='0 0 24 24'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='h-6 w-6'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='12' r='5'></circle>
              <line x1='12' y1='1' x2='12' y2='3'></line>
              <line x1='12' y1='21' x2='12' y2='23'></line>
              <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
              <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
              <line x1='1' y1='12' x2='3' y2='12'></line>
              <line x1='21' y1='12' x2='23' y2='12'></line>
              <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
              <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
            </svg>
            Examples
          </h2>
          <ul className='flex flex-col gap-3.5 w-full sm:max-w-md m-auto'>
            <button
              className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'
              onClick={() => onClick("Explain quantum computing in simple terms")}
            >
              &quot;Explain quantum computing in simple terms&quot; →
            </button>
            <button
              className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'
              onClick={() => onClick("Got any creative ideas for a 10 year old’s birthday?")}
            >
              &quot;Got any creative ideas for a 10 year old’s birthday?&quot; →
            </button>
            <button
              className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900'
              onClick={() => onClick("How do I make an HTTP request in Javascript?")}
            >
              &quot;How do I make an HTTP request in Javascript?&quot; →
            </button>
          </ul>
        </div>
        <div className='flex flex-col mb-8 md:mb-auto gap-3.5 flex-1'>
          <h2 className='flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='h-6 w-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
              ></path>
            </svg>
            Capabilities
          </h2>
          <ul className='flex flex-col gap-3.5 w-full sm:max-w-md m-auto'>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              Remembers what user said earlier in the conversation
            </li>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              Allows user to provide follow-up corrections
            </li>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              Trained to decline inappropriate requests
            </li>
          </ul>
        </div>
        <div className='flex flex-col mb-8 md:mb-auto gap-3.5 flex-1'>
          <h2 className='flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2'>
            <svg
              stroke='currentColor'
              fill='none'
              stroke-width='1.5'
              viewBox='0 0 24 24'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='h-6 w-6'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'></path>
              <line x1='12' y1='9' x2='12' y2='13'></line>
              <line x1='12' y1='17' x2='12.01' y2='17'></line>
            </svg>
            Limitations
          </h2>
          <ul className='flex flex-col gap-3.5 w-full sm:max-w-md m-auto'>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              May occasionally generate incorrect information
            </li>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              May occasionally produce harmful instructions or biased content
            </li>
            <li className='w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md'>
              Limited knowledge of world and events after 2021
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

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
        {chatHistory.length === 0 && <ChatGPTDesc onClick={(text: string) => setMessage(text)} />}

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
