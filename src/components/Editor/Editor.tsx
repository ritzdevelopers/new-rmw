"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      onChange={(newContent) => onChange(newContent)}
    />
  );
};

export default Editor;
