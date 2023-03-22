import React from "react";
import Image from "next/image";
import clickPromptSmallUrl from "@/assets/clickprompt-small.svg";

export function ClickPromptSmall({ width = 32, height = 32 }) {
  return <Image className="inline-block" src={clickPromptSmallUrl} alt="ClickPrompt Logo" width={width} height={height} />;
}
