"use client";
import React from "react";
import Row1 from "./compo/Row1";
import Row2 from "./compo/Row2";
import Row3 from "./compo/Row3";

function page() {
  return (
    <section
      className="flex w-full flex-col gap-4 overflow-x-hidden" 
    >
      <Row1></Row1>
      <Row2></Row2>
      <Row3></Row3>
    </section>
  );
}

export default page;
