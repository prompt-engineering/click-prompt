import React from "react";
import Image from "next/image";

import chatgptLogo from "@/assets/chatgpt-logo.svg";

function ChatGptIcon({ width = 32, height = 32 }) {
  return <Image src={chatgptLogo} alt='ChatGPT Logo' width={width} height={height} />;
}

export default ChatGptIcon;
