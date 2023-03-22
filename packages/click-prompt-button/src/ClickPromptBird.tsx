import { StyledBird } from "@/SharedButton";
import clickPromptLogo from "*.svg?url";
import React from "react";

type ClickPromptBirdProps = { width?: number; height?: number };

export const ClickPromptBird = ({ width = 38, height = 32 }: ClickPromptBirdProps) => (
  <StyledBird src={clickPromptLogo} alt="ClickPrompt Logo" width={width} height={height} />
);
