"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default Editor;
