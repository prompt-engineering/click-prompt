import React from "react";
import Image from "next/image";
import clickPromptSmall from "@/assets/clickprompt-small.svg?url";

export function ClickPromptSmall({ width = 32, height = 32 }) {
  return <Image className="inline-block" src={clickPromptSmall} alt="ClickPrompt Logo" width={width} height={height} />;
}
