"use client";

import dynamic from "next/dynamic";
import { BlogProvider } from "@/blogContext/BlogContext";

// 🌀 Lazy load client-only components
const SmoothScroller = dynamic(
  () => import("@/components/Lenis/SmoothScroller"),
  { ssr: false }
);

const VisitTracker = dynamic(
  () => import("@/components/visitorTracker/tracker"),
  { ssr: false }
);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogProvider>
      <SmoothScroller />
      <VisitTracker />
      {children}
    </BlogProvider>
  );
}
