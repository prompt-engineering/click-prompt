"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function SimpleMarkdown({ content }: any) {
  const text = content.replaceAll("\n", "\n\n");
  function getHighlighter(match: RegExpExecArray, props: any, children: any) {
    return (
      <SyntaxHighlighter language={match[1]} PreTag='div' wrapLines={true} wrapLongLines={true} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  return (
    <ReactMarkdown
      unwrapDisallowed={true}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          // we had replace \n to \n\n for markdown to works, but it will cause a bug in syntax highlighter, so we need to return it back.
          const code = String(children)?.replaceAll("\n\n", "\n");

          return !inline && match ? (
            getHighlighter(match, props, code)
          ) : (
            <code className={className + " " + "empty-language"} {...props}>
              {code}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default SimpleMarkdown;
