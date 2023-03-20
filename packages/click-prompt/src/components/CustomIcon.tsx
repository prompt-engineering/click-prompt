import React from "react";
import Image from "next/image";

import chatgptLogo from "@/assets/images/chatgpt-logo.svg?url";
import clickPromptLogo from "@/assets/clickprompt-light.svg?url";
import clickPromptSmall from "@/assets/clickprompt-small.svg?url";
import clickPromptHome from "@/assets/clickprompt-home.svg?url";

export function ChatGptIcon({ width = 32, height = 32 }) {
  return <Image src={chatgptLogo} alt='ChatGPT Logo' width={width} height={height} />;
}

export function ClickPromptIcon({ width = 32, height = 32 }) {
  return <Image className='inline-block' src={clickPromptLogo} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptSmall({ width = 32, height = 32 }) {
  return <Image className='inline-block' src={clickPromptSmall} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptHome({ width = 32, height = 32 }) {
  return <Image className='inline-block' src={clickPromptHome} alt='ClickPrompt Logo' width={width} height={height} />;
}
