import VisitTracker from "@/components/visitorTracker/tracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
