"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function SimpleMarkdown({ content }: any) {
  function getHighlighter(match: RegExpExecArray, props: any, children: any) {
    return (
      <SyntaxHighlighter language={match[1]} PreTag='div' wrapLines={true} wrapLongLines={true} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            getHighlighter(match, props, children)
          ) : (
            <code className={className + " " + "empty-language"} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default SimpleMarkdown;
