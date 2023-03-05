import React, { useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";

export default function ChatGPTPage() {
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
    if (!data.error) {
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }

  if (isLoggedin === null) {
    return <></>;
  }

  if (!isLoggedin) {
    return (
      <div className='flex flex-col items-center justify-center h-[85vh]'>
        <h1 className='text-4xl font-bold'>ChatGPT</h1>
        <p className='text-xl'>You need to login first.</p>

        <div className='my-4 flex w-3/4 gap-2 items-center'>
          <p className='text-xl w-[14rem]'>OpenAI API Key:</p>
          <Input value={openAiKey} onChange={(ev) => setOpenAiKey(ev.target.value)}></Input>
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
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>ChatGPT</h1>
      <p className='text-xl'>You are logged in.</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
