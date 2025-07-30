import { Providers } from "@/app/provider/Provider";

// export const metadata = {
//   title: "Blog - Ritz Media World",
//   description: "Best digital agency in India - Blog",
// };

export const metadata = {
  title: "Blogs",
  description: "Blogs",
  keywords: "Blogs",
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}