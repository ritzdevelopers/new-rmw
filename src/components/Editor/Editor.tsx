"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);

  // Clean up pasted content
  const cleanPastedHTML = useCallback((html: string): string => {
    // Create a temporary div to parse HTML
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // Remove problematic attributes and styles
    const allElements = div.querySelectorAll('*');
    
    allElements.forEach(element => {
      // Remove style attributes (inline styles)
      element.removeAttribute('style');
      
      // Remove class attributes (external classes)
      element.removeAttribute('class');
      
      // Remove other problematic attributes
      element.removeAttribute('id');
      element.removeAttribute('width');
      element.removeAttribute('height');
      element.removeAttribute('border');
      
      // Convert b to strong, i to em for better semantic HTML
      if (element.tagName === 'B') {
        const strong = document.createElement('strong');
        strong.innerHTML = element.innerHTML;
        element.parentNode?.replaceChild(strong, element);
      } else if (element.tagName === 'I') {
        const em = document.createElement('em');
        em.innerHTML = element.innerHTML;
        element.parentNode?.replaceChild(em, element);
      }
    });
    
    // Clean up empty tags
    const emptyElements = div.querySelectorAll('p:empty, div:empty, span:empty');
    emptyElements.forEach(el => el.remove());
    
    return div.innerHTML;
  }, []);

interface Editor {
  selection: {
    insertHTML: (html: string) => void;
  };
}

const handlePaste = useCallback(
  (event: ClipboardEvent, editor: Editor): void => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const pastedHTML = clipboardData.getData("text/html");

    if (!pastedHTML) {
      const pastedText = clipboardData.getData("text/plain");
      editor.selection.insertHTML(pastedText);
      event.preventDefault();
      return;
    }

    const cleanedHTML = cleanPastedHTML(pastedHTML);
    editor.selection.insertHTML(cleanedHTML);
    event.preventDefault();
  },
  [cleanPastedHTML]
);


  // Properly typed config for Jodit
  const config = {
    readonly: false,
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_only_text" as const, // Correct type
    buttons: "bold,italic,underline,ul,ol,font,fontsize,lineHeight,image,link",
    height: 500,
    theme: "default" as const,
    events: {
      afterPaste: handlePaste,
      beforePaste: handlePaste
    }
  };

  return (
    <div className="editor-container">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
};

export default Editor;