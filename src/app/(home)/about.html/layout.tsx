// export const metadata = {
//   title: "About - Ritz Media World",
//   description: "Best digital agency in India - About",


// };
export const metadata = {
  title: "Fastest Growing Advertising Agency in Delhi NCR | RMW",
  description: "Fastest Growing Advertising Agency in Delhi NCR | RMW",
  keywords: "Fastest Growing Advertising Agency in Delhi NCR | RMW",
};
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex relative">
      {children}
    </main>
  );
}
