import { BlogProvider } from "@/blogContext/BlogContext";
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
        <VisitTracker />
        {children}
      </BlogProvider>
      </body>
    </html>
  );
}
