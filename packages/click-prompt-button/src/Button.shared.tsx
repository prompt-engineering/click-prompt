import Image from "next/image";
import React from "react";
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
