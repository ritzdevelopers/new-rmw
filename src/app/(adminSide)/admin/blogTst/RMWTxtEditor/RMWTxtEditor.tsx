"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaPlusSquare,
  FaVideo,
  FaMusic,
  FaImage,
  FaFileAlt,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaTable,
  FaSmile,
  FaCode,
  FaUndo,
  FaRedo,
  FaParagraph,
  FaHeading,
  FaIndent,
  FaOutdent,
} from "react-icons/fa";

interface RMWTxtEditorProps {}

function RMWTxtEditor({}: RMWTxtEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [leftAlign, setLeftAlign] = useState(false);
  const [rightAlign, setRightAlign] = useState(false);
  const [centerAlign, setCenterAlign] = useState(false);
  const handleFormat = (format: string) => {
    document.execCommand(format, false);
    if (editorRef.current) {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
    }
  };

  const handleInsert = (type: string) => {
    // Placeholder for insert functionality
    console.log(`Insert ${type}`);
    setIsOpen(false);
  };

  const handleTxtAlign = (align: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !align) return;

    const range = selection.getRangeAt(0);
    const parent = range.startContainer.parentElement;
    if (parent?.classList.contains("text-center")) {
      parent?.classList.remove("text-center");
    }
    if (parent?.classList.contains("text-left")) {
      parent?.classList.remove("text-left");
    }
    if (parent?.classList.contains("text-right")) {
      parent?.classList.remove("text-right");
    }
    if (parent && align.includes("center")) {
      setLeftAlign(false);
      setRightAlign(false);
      setCenterAlign(true);
      parent.classList.add("text-center");
      parent.classList.add("block");
    } else if (parent && align.includes("right")) {
      setLeftAlign(false);
      setRightAlign(true);
      setCenterAlign(false);
      parent.classList.add("text-right");
      parent.classList.add("block");
    } else if (parent && align.includes("left")) {
      setLeftAlign(true);
      setRightAlign(false);
      setCenterAlign(false);
      parent.classList.add("text-left");
      parent.classList.add("block");
    }
    console.log(parent);
  };
  const [fontSize, setFontSize] = useState<number>(16);
  const [activeHeading, setActiveHeading] = useState<string>(""); // Track active heading

  const handleFontAlign = (fontEm: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !fontEm) return;

    const range = selection.getRangeAt(0);
    let parent = range.startContainer.parentElement;

    if (!parent) return;

    const headingClasses = new Set([
      "text-[2em]", // h1
      "text-[1.5em]", // h2
      "text-[1.17em]", // h3
      "text-[1em]", // h4
      "text-[0.83em]", // h5
      "text-[0.67em]", // h6
    ]);
    const fontSizeClassRegex = /^text-\[\d+px\]$/;
    let tag;
    if (fontEm === "text-[2em]") {
      tag = document.createElement("h1");
    } else if (fontEm === "text-[1.5em]") {
      tag = document.createElement("h2");
    } else if (fontEm === "text-[1.5em]") {
      tag = document.createElement("h3");
    } else if (fontEm === "text-[1.5em]") {
      tag = document.createElement("h4");
    } else if (fontEm === "text-[1.5em]") {
      tag = document.createElement("h5");
    } else if (fontEm === "text-[1.5em]") {
      tag = document.createElement("h6");
    }

    while (
      parent &&
      parent.nodeType === 1 &&
      parent.tagName.toLowerCase() === "span"
    ) {
      parent = parent.parentElement;
    }

    if (!parent) return;

    // remove only heading-related classes
    parent.classList.forEach((cls) => {
      if (cls.includes("em]")) parent.classList.remove(cls);
    });

    parent.classList.forEach((cls) => {
      if (fontSizeClassRegex.test(cls)) {
        parent.classList.remove(cls);
      }
    });

    // ✅ Toggle: If same heading is clicked again → remove it
    if (activeHeading === fontEm) {
      setActiveHeading("");
      return; // stop here, nothing applied
    }

    // Otherwise apply the new heading
    // alert(fontEm)
    if (fontEm === "normal") {
      parent.classList.forEach((cls) => {
        if (headingClasses.has(cls)) parent.classList.remove(cls);
      });
    } else {
      tag?.appendChild(parent);
      tag?.classList.add(fontEm);
      setActiveHeading(fontEm);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      {/* Editor Container */}
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
          {/* Text Style */}
          <div className="flex items-center gap-1 mr-2">
            <select
              value={activeHeading || ""} // ✅ reflect active heading in UI
              onChange={(e) => handleFontAlign(e.target.value)}
              className="text-xs py-1.5 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normal">Normal</option>
              {[
                { value: "text-[2em]", tag: 1 }, // h1
                { value: "text-[1.5em]", tag: 2 }, // h2
                { value: "text-[1.17em]", tag: 3 }, // h3
                { value: "text-[1em]", tag: 4 }, // h4
                { value: "text-[0.83em]", tag: 5 }, // h5
                { value: "text-[0.67em]", tag: 6 }, // h6
              ].map((vl) => (
                <option className="font-bold" key={vl.tag} value={vl.value}>
                  Heading {vl.tag}
                </option>
              ))}
            </select>
          </div>

          {/* Font Options */}
          <div className="flex items-center gap-1 mr-2">
            <select className="text-xs py-1.5 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="arial">Arial</option>
              <option value="times">Times New Roman</option>
              <option value="courier">Courier New</option>
              <option value="georgia">Georgia</option>
            </select>

            <div className="flex items-center gap-1">
              <select
                className="text-xs py-1.5 px-2 w-[80px] rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  const size = Number(e.target.value);
                  handleFontAlign(`text-[${size}px]`);
                }}
              >
                {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Basic Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => handleFormat("bold")}
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                isBold ? "bg-gray-200 text-blue-600" : ""
              }`}
              title="Bold"
            >
              <FaBold className="text-sm" />
            </button>
            <button
              onClick={() => handleFormat("italic")}
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                isItalic ? "bg-gray-200 text-blue-600" : ""
              }`}
              title="Italic"
            >
              <FaItalic className="text-sm" />
            </button>
            <button
              onClick={() => handleFormat("underline")}
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                isUnderline ? "bg-gray-200 text-blue-600" : ""
              }`}
              title="Underline"
            >
              <FaUnderline className="text-sm" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                leftAlign === true && "text-blue-600 bg-gray-200"
              }`}
              title="Align Left"
              onClick={() => handleTxtAlign("left")}
            >
              <FaAlignLeft className="text-sm" />
            </button>
            <button
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                centerAlign === true && "text-blue-600 bg-gray-200"
              }`}
              title="Align Center"
              onClick={() => handleTxtAlign("center")}
            >
              <FaAlignCenter className="text-sm" />
            </button>
            <button
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                rightAlign === true && "text-blue-600 bg-gray-200"
              }`}
              title="Align Right"
              onClick={() => handleTxtAlign("right")}
            >
              <FaAlignRight className="text-sm" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => handleFormat("insertUnorderedList")}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Bullet List"
            >
              <FaListUl className="text-sm" />
            </button>
            <button
              onClick={() => handleFormat("insertOrderedList")}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Numbered List"
            >
              <FaListOl className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Indent"
            >
              <FaIndent className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Outdent"
            >
              <FaOutdent className="text-sm" />
            </button>
          </div>

          {/* Additional Options */}
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Insert Link"
            >
              <FaLink className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Insert Table"
            >
              <FaTable className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Insert Emoji"
            >
              <FaSmile className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Code Block"
            >
              <FaCode className="text-sm" />
            </button>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1 ml-auto border-l border-gray-300 pl-2">
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Undo"
            >
              <FaUndo className="text-sm" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Redo"
            >
              <FaRedo className="text-sm" />
            </button>
          </div>
        </div>

        {/* Editable Text Area */}
        <div
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="w-full p-5 min-h-[250px] text-gray-700 focus:outline-none resize-none prose prose-lg max-w-none border-none focus:ring-0 prose-p:my-2 prose-headings:my-3 prose-headings:font-bold prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-ol:pl-6 prose-ul:pl-6 prose-li:my-1 prose-hr:my-4 prose-hr:border-gray-300"
          style={{ lineHeight: "1.6" }}
        >
          Start typing here...
        </div>

        {/* Bottom Toolbar with Plus Icon */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="text-xs text-gray-500">Word count: 0</div>

          <div className="w-9 h-9 cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-200 hover:scale-110 bg-white rounded-full shadow-sm flex items-center justify-center">
            <FaPlusSquare
              className="h-5 w-5"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        {/* Modal / Dropdown */}
        {isOpen && (
          <div className="absolute right-10 bottom-2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-72 p-4 z-[999] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
              Insert Media
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Video Option */}
              <div
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
                onClick={() => handleInsert("video")}
              >
                <div className="p-3 bg-red-100 rounded-full mb-2 group-hover:bg-red-200 transition-colors">
                  <FaVideo className="text-red-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-700">Video</span>
                <span className="text-xs text-gray-500 mt-1">
                  MP4, MOV, AVI
                </span>
              </div>

              {/* Audio Option */}
              <div
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
                onClick={() => handleInsert("audio")}
              >
                <div className="p-3 bg-green-100 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
                  <FaMusic className="text-green-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-700">Audio</span>
                <span className="text-xs text-gray-500 mt-1">
                  MP3, WAV, OGG
                </span>
              </div>

              {/* Image Option */}
              <div
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
                onClick={() => handleInsert("image")}
              >
                <div className="p-3 bg-blue-100 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
                  <FaImage className="text-blue-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-700">Image</span>
                <span className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF
                </span>
              </div>

              {/* File Option */}
              <div
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
                onClick={() => handleInsert("file")}
              >
                <div className="p-3 bg-amber-100 rounded-full mb-2 group-hover:bg-amber-200 transition-colors">
                  <FaFileAlt className="text-amber-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-700">File</span>
                <span className="text-xs text-gray-500 mt-1">
                  PDF, DOC, ZIP
                </span>
              </div>
            </div>

            {/* Close button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        Use the toolbar to format your content or click the + icon to insert
        media
      </p>
    </div>
  );
}

export default RMWTxtEditor;
