import "./styles/tailwind.css";
import "./styles/global.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ContactBtns from "./new-home/components/ContactBtns";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritzmediaworld.com"),
  title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
  description: "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
  keywords: [
    "Best advertising agency in Delhi NCR",
    "Top Advertising Agency",
    "Advertising Agency in Delhi",
    "Best Advertising Agency in Delhi NCR",
    "Ads Agency in Delhi NCR",
    "Best ad agency in Delhi",
    "Best ad agency in Noida",
    "ad agency in Noida",
    "ad agency in Delhi",
    "ad agency in Delhi NCR",
    "Digital marketing agency",
    "Creative Agency",
    "Branding agency In Delhi",
    "Branding agency In Noida",
    "Branding agency In Delhi NCR",
    "Creative Advertising Agency",
    "Social Media Marketing Agency",
    "Content Marketing Agency",
    "Best Creative Advertising Agency",
    "Best marketing agency in India",
    "Creative service",
    "SEO company in noida",
    "Radio advertising agency",
    "Best ad agency",
    "Digital Marketing company",
    "Digital Marketing company in noida",
    "Digital Marketing company in Delhi",
    "digital marketing and creative agency",
    "Best digital marketing agency in Delhi",
    "Newspaper ad agency",
    "Top Marketing Agency in India",
    "creative digital marketing agency",
    "best seo services in noida",
    "best seo agency in greater noida",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritzmediaworld.com",
    siteName: "Ritz Media World",
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description: "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [
      {
        url: "https://ritzmediaworld.com/RMW_log_alt_2.png",
        width: 1200,
        height: 630,
        alt: "Ritz Media World - Top Advertising Agency in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description: "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: ["https://ritzmediaworld.com/RMW_log_alt_2.png"],
  },
};

export default function NewRMWW({ children }: { children: React.ReactNode }) {
  return (
    <>
     
      <Navbar></Navbar>
      {children}
      <ContactBtns />
      <Footer></Footer>
    </>
  );
}