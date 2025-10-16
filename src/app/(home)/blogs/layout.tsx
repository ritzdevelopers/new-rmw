import { Providers } from "@/app/provider/Provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs",
  keywords: ["Blogs"],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
