import { Providers } from "@/app/provider/Provider";
import type { Metadata } from "next";

export const metadata = {
  title: "Insights & Marketing Trends | Ritz Media World Blog Delhi NCR",
  description:
    "Explore expert articles on digital advertising, SEO, social media & brand storytelling from Ritz Media World, your Delhi NCR full-service marketing agency.",
  keywords:
    "digital marketing blog Delhi NCR, advertising insights India, social media management blog, SEO trends India 2025, brand storytelling articles Delhi,print & radio advertising blog, full-service advertising agency blog, marketing strategy blog India, influencer marketing insights India, content marketing blog Delhi NCR",
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
