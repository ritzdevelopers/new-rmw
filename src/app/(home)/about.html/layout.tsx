// export const metadata = {
//   title: "About - Ritz Media World",
//   description: "Best digital agency in India - About",

// };
export const metadata = {
  title: "About Ritz Media World – Award-Winning Delhi NCR Advertising Agency",
  description:
    "Learn how Ritz Media World crafts data-driven brand stories and digital campaigns. Over 17 years of experience turning brands into household names in Delhi NCR.",
  keywords:
    "Ritz Media World, advertising agency Delhi NCR, creative agency Delhi, full service ad agency Noida, digital marketing agency Delhi NCR, brand storytelling agency India, print radio advertising Delhi NCR, award winning ad agency Delhi, client-centric marketing agency India, advertising & media services Delhi India",
};
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full flex relative">{children}</main>;
}
