import React, { useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";

import content from "@/assets/icons/content.png";
import send from "@/assets/icons/send.png";

import styled from "@emotion/styled";

// chatgpt input box
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
  position: relative;
  width: 768px;
  height: 48px;
`;

const ChatSendButton = styled("button")`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 4px;
  width: 48px;
  height: 48px;
  background-image: url(${send.src});
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: none;
  outline: none;
`;

export function ChatGPTApp() {
  const [isLoggedin, setIsLoggedin] = React.useState<boolean | null>(null);
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

  const [openAiKey, setOpenAiKey] = React.useState("");
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

  const [message, setMessage] = React.useState("");
  async function sendMessage() {
    if (message.length === 0) {
      alert("Please enter your message first.");
      return;
    }

    const response = await fetch("/api/chatgpt/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt: message,
      }),
    });
    const data = await response.json();
    if (!data.error) {
      console.log("resp: ", data);
    } else {
      console.log("error: ", data);
    }
  }

  if (isLoggedin === null) {
    return <></>;
  }

  if (!isLoggedin) {
    return (
      <div className='flex flex-col items-center justify-center h-[85vh]'>
        <h1 className='text-white text-[34px] font-bold'>ChatGPT</h1>
        <p className='text-white text-xl'>You need to login first.</p>

        <div className='my-4 flex w-3/4 gap-2 items-center'>
          <p className='text-white text-xl w-[14rem]'>OpenAI API Key:</p>
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
    <div className='relative flex flex-col items-center justify-center gap-16 h-[85vh]'>
      <Image src={content} alt='background image'></Image>

      <ChatInputWrapper>
        <ChatInput
          placeholder='Type your message here...'
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
        />
        <ChatSendButton onClick={sendMessage} />
      </ChatInputWrapper>
      <Button className='!absolute bottom-4 right-4' onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default function ChatGPTPage() {
  return (
    <div className='bg-[#1E1E1E]'>
      <ChatGPTApp />
    </div>
  );
}
