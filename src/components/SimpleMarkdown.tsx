import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "@emotion/styled";

function SimpleMarkdown({ content }: any) {
  function getHighlighter(match: RegExpExecArray, props: any, children: any) {
    return (
      <SyntaxHighlighter language={match[1]} PreTag='div' {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  return (
    <StyledMarkdown
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
    </StyledMarkdown>
  );
}

// @ts-ignore
const StyledMarkdown = styled(ReactMarkdown)`
  p {
    margin: 0;
    line-height: 1.5;
    padding: 0 4px;
  }

  .empty-language {
    float: left;
    width: 100%;
    padding: 0.5rem;
  }
`;

export default SimpleMarkdown;
