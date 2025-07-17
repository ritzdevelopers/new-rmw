// app/providers.tsx
"use client";

import { BlogProvider } from "@/context/AllBlogContext";


export function Providers({ children }: { children: React.ReactNode }) {
     return <BlogProvider>{children}</BlogProvider>;
}
