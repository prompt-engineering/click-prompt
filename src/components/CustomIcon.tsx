import React from "react";
import Image from "next/image";

import chatgptLogo from "@/assets/images/chatgpt-logo.svg";
import clickPromptLogo from "@/assets/clickprompt-logo.svg";
import styled from "@emotion/styled";

export function ChatGptIcon({ width = 32, height = 32 }) {
  return <Image src={chatgptLogo} alt='ChatGPT Logo' width={width} height={height} />;
}

export function ClickPromptIcon({ width = 32, height = 32 }) {
  return <StyledImage src={clickPromptLogo} alt='ClickPrompt Logo' width={width} height={height} />;
}

const StyledImage = styled(Image)`
  display: inline-block;
`;
