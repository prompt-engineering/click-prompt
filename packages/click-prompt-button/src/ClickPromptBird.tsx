import clickPromptLogoUrl from "@/assets/clickprompt-light.svg";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

type ClickPromptBirdProps = { width?: number; height?: number };

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;

export const ClickPromptBird = ({ width = 38, height = 32 }: ClickPromptBirdProps) => (
  <StyledBird src={clickPromptLogoUrl} alt="ClickPrompt Logo" width={width} height={height} />
);
