"use client";

import Image from "next/image";
import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";

export type ButtonSize = "sm" | "md" | "lg";

export const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;

export const StyledPromptButton = styled.div`
  position: relative;
  width: min-content;
`;

export type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text: string;
  children?: React.ReactNode;
  [key: string]: any;
};
