"use client";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";

function RMWTxtEditor() {
  return (
    <div className="w-[100%] relative overflow-x-hidden">
      {" "}
      <div
        contentEditable={true}
        className="w-[100%] p-1 min-h-[30px] border-2 mb-2 border-[#007CBA] rounded-[2px] relative"
      >
        you can edit this
      </div>
      <div className="absolute right-0 top-1 w-[25px] h-[25px] cursor-pointer">
        <FaPlusSquare className="h-full w-full" />
      </div>
    </div>
  );
}

export default RMWTxtEditor;
