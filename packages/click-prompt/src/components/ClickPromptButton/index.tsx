"use client";

import dynamic from "next/dynamic";
import type { Chat, ClickPromptButtonProps, LlmServiceApi } from "@click-prompt/click-prompt-button";

// TODO: investigate why this is needed - it should be possible to import the components directly(before monorepo it can)
export const ClickPromptButton = (props: ClickPromptButtonProps) => {
  const CPB = dynamic(() => import("@click-prompt/click-prompt-button").then((module) => module.ClickPromptButton), {
    ssr: false,
  });

  return <CPB {...props} />;
};

export const ChatGPTApp = (props: ClickPromptButtonProps) => {
  const GPT = dynamic(() => import("@click-prompt/click-prompt-button").then((module) => module.ChatGPTApp), {
    ssr: false,
  });

  return <GPT {...props} />;
};

export const ExecutePromptButton = (props: ClickPromptButtonProps) => {
  const EPB = dynamic(() => import("@click-prompt/click-prompt-button").then((module) => module.ExecutePromptButton), {
    ssr: false,
  });

  return <EPB {...props} />;
};

export type { Chat, LlmServiceApi, ClickPromptButtonProps };
