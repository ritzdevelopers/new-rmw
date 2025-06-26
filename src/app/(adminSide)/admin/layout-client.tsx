"use client";

import Sidebar from "@/components/sidenav/Sidenav";
import { useState } from "react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex w-full">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main
        className={`transition-all duration-300 p-4 w-full ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
