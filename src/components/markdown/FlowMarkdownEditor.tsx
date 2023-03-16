"use client";

import React, { useCallback } from "react";
import { MarkdownEditor } from "@remirror/react-editors/markdown";
import { useDocChanged, useHelpers, useKeymap, useRemirror } from "@remirror/react";
import { KeyBindingProps } from "@remirror/core-types/dist-types/core-types";

const hooks = [
  () => {
    const { getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({ state }: KeyBindingProps) => {
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true;
      },
      [getJSON],
    );

    // "Mod" means platform-agnostic modifier key - i.e. Ctrl on Windows, or Cmd on macOS
    useKeymap("Mod-s", handleSaveShortcut);
  },
];

export const OnTextChange = ({ onChange }: { onChange: (html: string) => void }): null => {
  const { getMarkdown } = useHelpers();

  useDocChanged(
    useCallback(
      ({ state }) => {
        const string = getMarkdown(state);
        onChange(string);
      },
      [onChange, getMarkdown],
    ),
  );

  return null;
};

const FlowMarkdownEditor = ({ text, onChange }: { text: string; onChange: (text: string) => void }) => {
  const valueChange = (value: string) => {
    onChange(value || "");
  };

  return (
    <div style={{ padding: 16 }}>
      <MarkdownEditor initialContent={text} hooks={hooks}>
        <OnTextChange onChange={valueChange} />
      </MarkdownEditor>
    </div>
  );
};

export default FlowMarkdownEditor;
