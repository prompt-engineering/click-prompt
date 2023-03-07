"use client";

import { Button, Input } from "@/components/ChakraUI";
import React from "react";
import { useRouter } from "next/router";

export const LoginPage = () => {
  const [openAiKey, setOpenAiKey] = React.useState("");
  const router = useRouter();

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
      router.reload();
    } else {
      alert("Error: " + JSON.stringify(data.error, null, 2));
    }
  }

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
};
