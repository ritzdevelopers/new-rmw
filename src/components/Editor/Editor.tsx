"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);

const config = useMemo(
  () => ({
    readonly: false,
    toolbarAdaptive: false,
    toolbarSticky: true,
    saveSelectionOnBlur: true,
    buttons: [
      "source", "|",
      "bold", "italic", "underline", "strikethrough", "eraser", "|",
      "superscript", "subscript", "|",
      "ul", "ol", "outdent", "indent", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "align", "undo", "redo", "|",
      "link", "image", "video", "table", "hr", "copyformat", "|",
      "selectall", "print", "preview", "fullsize"
    ],
    cleanHTML: {
      fillEmptyParagraph: false,
      replaceNBSP: false,
      removeEmptyElements: false,
    },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    pasteHTMLAction: "insert_as_html" as const,     
    defaultActionOnPaste: "insert_as_html" as const, 
  }),
  []
);



  return (
    <div className="editor-container">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        // ✅ Use onChange; avoid onBlur to prevent rerender during toolbar clicks
        onChange={(newContent: string) => onChange(newContent)}
      />
    </div>
  );
};

export default Editor;
