import "./styles/tailwind.css";
import "./styles/global.css";
import { Metadata } from "next";
import NewNavbar from "./layout/NewNavbar";
import NewFooter from "./layout/NewFooter";
import RubyProvider from "@/ruby-context/ruby.context";
import ClientWidgets from "./layout/ClientWidgets";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritzmediaworld.com"),
  alternates: {
    canonical: "https://ritzmediaworld.com",
  },
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  title:
    "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
  description:
    "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
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
    title:
      "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [
      {
        url: "https://ritzmediaworld.com/rmw-logo-sm-size.png",
        width: 1200,
        height: 630,
        alt: "Ritz Media World - Top Advertising Agency in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: ["https://ritzmediaworld.com/rmw-logo-sm-size.png"],
    creator: "@ritzmediaworld",
    site: "@ritzmediaworld",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Ritz Media World",
  url: "https://ritzmediaworld.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ritzmediaworld.com/services{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ritz Media World",
  url: "https://ritzmediaworld.com/",
  logo: "https://ritzmediaworld.com/assets/images/logo.png",
  image: "https://ritzmediaworld.com/assets/images/logo.png",
  description:
    "Ritz Media World is a full-service advertising and digital marketing agency based in Noida, India, offering digital marketing, branding, web development, influencer marketing, radio advertising, print advertising, and creative services.",
  foundingDate: "2008",
  founders: [
    { "@type": "Person", name: "Ritesh Malik" },
    { "@type": "Person", name: "Satvinder Kaur" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "402-404, 4th Floor, Corporate Park, Tower A1, Sector 142",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201305",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9220516777",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/ritzmediaworld",
    "https://www.instagram.com/ritzmediaworld.rmw/",
    "https://www.facebook.com/ritzmediaworld.rmw",
    "https://twitter.com/ritzmediaworld",
    "https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia",
  ],
  email: "info@ritzmediaworld.com",
  telephone: "+91-9220516777",
  keywords: [
    "Advertising Agency",
    "Digital Marketing Agency",
    "SEO Services",
    "Branding",
    "Web Development",
    "Influencer Marketing",
    "Creative Agency",
    "Radio Advertising",
    "Print Advertising",
  ],
  areaServed: { "@type": "Country", name: "India" },
  serviceType: [
    "Digital Marketing",
    "SEO",
    "PPC Advertising",
    "Social Media Marketing",
    "Web Development",
    "Branding",
    "Content Marketing",
    "Influencer Marketing",
    "Creative Services",
    "Radio Advertising",
    "Print Advertising",
  ],
};

const advertisingAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "AdvertisingAgency",
  "@id": "https://ritzmediaworld.com/#localbusiness",
  name: "Ritz Media World",
  url: "https://ritzmediaworld.com/",
  image: "https://ritzmediaworld.com/assets/images/logo.png",
  logo: "https://ritzmediaworld.com/assets/images/logo.png",
  description:
    "Ritz Media World is a full-service advertising and digital marketing agency in Noida offering branding, SEO, social media marketing, web development, influencer marketing, print advertising, and radio advertising services.",
  telephone: "+91-9220516777",
  email: "info@ritzmediaworld.com",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "402-404, 4th Floor, Corporate Park, Tower A1, Sector 142",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201305",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.5046",
    longitude: "77.4145",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "9:30",
      closes: "18:30",
    },
  ],
  sameAs: [
    "https://www.facebook.com/ritzmediaworld.rmw",
    "https://www.instagram.com/ritzmediaworld.rmw/",
    "https://www.linkedin.com/company/ritzmediaworld",
    "https://twitter.com/ritzmediaworld",
    "https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia",
  ],
  areaServed: { "@type": "Country", name: "India" },
  hasMap: "https://maps.google.com/?q=Ritz+Media+World+Noida",
  serviceArea: { "@type": "Place", name: "India" },
};

export default function NewRMWW({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(advertisingAgencyJsonLd),
        }}
      />
      {/* <Navbar></Navbar> */}
      <NewNavbar></NewNavbar>
      <RubyProvider>
        {children}
        <ClientWidgets />
        {/* <EnquiryForm /> */}
      </RubyProvider>
      {/* <Footer></Footer> */}
      <NewFooter></NewFooter>
    </>
  );
}
