import { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Monaco } from "@monaco-editor/react";

interface EditorProps {
  value?: string;
  default?: string;
  onChange?: (value?: string | undefined) => void;
}

const EditorComponent = (props: EditorProps) => {
  // Custom theme =>
  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme("docskitTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: { "editor.background": "#121212" },
    });
  }

  return (
    <Editor
      height="100vh"
      theme="docskitTheme"
      defaultLanguage="markdown"
      beforeMount={handleEditorWillMount}
      defaultValue={props.default}
      value={props.value}
      onChange={props.onChange}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 16,
        fontFamily:
          "'Cascadia', 'Menlo', 'Monaco', 'Courier New', 'monospace'",
        fontLigatures: "on",
        wordWrap: "on",
      }}
    />
  );
};

export default EditorComponent;
