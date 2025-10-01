import { BlogProvider } from "@/blogContext/BlogContext";
import SmoothScroller from "@/components/Lenis/SmoothScroller";
import VisitTracker from "@/components/visitorTracker/tracker";
// import { Providers } from "./provider/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <BlogProvider>
        <SmoothScroller></SmoothScroller>
        <VisitTracker />
        {children}
      </BlogProvider>
      </body>
    </html>
  );
}
