export const metadata = {
  title: "Blog - Ritz Media World",
  description: "Best digital agency in India - Blog",
  robots: "noindex, nofollow",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
      {children}
    </>
  );
}
