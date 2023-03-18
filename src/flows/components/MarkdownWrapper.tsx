import dynamic from "next/dynamic";
import React from "react";

export function MarkdownWrapper({ text, onChange }: { text: string; onChange: (text: string) => void }) {
  const FlowMarkdownEditor = dynamic(() => import("./FlowMarkdownEditor"), { ssr: false });
  return <FlowMarkdownEditor text={text} onChange={onChange} />;
}
