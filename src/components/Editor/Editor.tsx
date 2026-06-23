"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import "jodit/es2021/jodit.min.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const DEFAULT_TOOLBAR_OFFSET = 72;

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  stickyToolbar?: boolean;
  toolbarOffset?: number;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  stickyToolbar = true,
  toolbarOffset = DEFAULT_TOOLBAR_OFFSET,
}) => {
  const editor = useRef(null);

const config = useMemo(
  () => ({
    readonly: false,
    toolbarAdaptive: false,
    toolbarSticky: stickyToolbar,
    toolbarStickyOffset: toolbarOffset,
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
    minHeight: 320,
  }),
  [stickyToolbar, toolbarOffset]
);

  return (
    <div
      className="editor-container"
      style={{ ["--jodit-toolbar-offset" as string]: `${toolbarOffset}px` }}
    >
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
