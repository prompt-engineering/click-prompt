import React, { Dispatch, SetStateAction } from "react";
import { Button, Input } from "@chakra-ui/react";
import { LlmServiceApi } from "@/types/llmServiceApi";

export const LoginPage = ({
  setIsLoggedIn,
  login: loginApi,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  login: LlmServiceApi["login"];
}) => {
  const [openAiKey, setOpenAiKey] = React.useState("");

  async function login(key: string) {
    if (key.length === 0) {
      alert("Please enter your OpenAI API key first.");
      return;
    }

    const data = await loginApi(key);
    if (data) {
      setIsLoggedIn(true);
    } else {
      alert("Login failed. Please check your API key.");
      setIsLoggedIn(false);
    }
  }

  return (
    <div className='button-flex button-flex-col button-justify-center button-h-[85vh] md:button-w-1/2 button-p-4'>
      <h1 className='button-text-white button-text-[34px] button-font-bold'>ChatGPT</h1>
      <p className='button-text-white button-text-xl'>You need to login first use your own key.</p>
      <div className='button-text-white button-mt-5'>
        <div>
          1. Sign up for the &nbsp;
          <a href='https://platform.openai.com/signup' target='_blank' className='underline'>
            OpenAI Platform.
          </a>
        </div>
        <div>
          2. Create a new secret key in &nbsp;
          <a href='https://platform.openai.com/account/api-keys' target='_blank' className='underline'>
            Settings → API keys.
          </a>
        </div>
        <div>3. Copy and paste your API key here:</div>
      </div>
      <div className='button-my-4 button-flex button-gap-2 button-items-center button-flex-col md:button-flex-row'>
        <Input
          className='button-bg-white button-text-white'
          value={openAiKey}
          onChange={(ev) => setOpenAiKey(ev.target.value)}
        ></Input>
        <Button
          className='button-bg-white button-w-full md:button-w-auto'
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
