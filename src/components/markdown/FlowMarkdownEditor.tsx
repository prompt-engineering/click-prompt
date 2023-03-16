"use client";

import React, { useCallback } from "react";
import { MarkdownEditor } from "@remirror/react-editors/markdown";
import { OnChangeJSON, useHelpers, useKeymap } from "@remirror/react";
import { RemirrorJSON } from "@remirror/core";
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

const FlowMarkdownEditor = ({ text, onChange }: { text: string; onChange: (text: string) => void }) => {
  const valueChange = (value: RemirrorJSON) => {
    onChange(value.text || "");
  };

  return (
    <div style={{ padding: 16 }}>
      <MarkdownEditor initialContent={text} hooks={hooks}>
        <OnChangeJSON onChange={valueChange} />
      </MarkdownEditor>
    </div>
  );
};

export default FlowMarkdownEditor;
