// app/(home)/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/core-css.css";
import "../styles/unit-css.css";
import "../styles/spacing.css";
import "../styles/magnific-popup-css.css";
import "../styles/elementor-css.css";
import "../styles/animation-css.css";

import { Toaster } from "react-hot-toast";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import Button from "@/components/sideButton/sideButton";
import Header from "@/components/header/Header";
import Script from "next/script";
import WhatsAppFloatingButton from "@/components/whats-app/WhatsAppFloatingButton";
import ChatBoat from "@/components/chat/ChatBoat";
// import ChatBoat from "../RitzBOT/ChatBoat";
// import ChatBoat from "@/components/chat/ChatBoat";
// import { TrackPageView } from "@/components/trackView/TrackPageView";
// import { BlogProvider } from "@/context/AllBlogContext";
// import { Providers } from "../provider/Provider";

// export const metadata = {
//   title: "Ritz Media World",
//   description: "Best digital agency in India",
// };

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0YHLN54GF7"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-0YHLN54GF7');
  `}
      </Script>
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Ritz Media World",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "402-404, 4th Floor, Advant Navis Business Park Tower-A1, Corporate Park, Sector 142",
                "addressLocality": "Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201305"
              },
              "image": "https://ritzmediaworld.com/webroot/front/images/nn_logo.jpg",
              "email": "info@ritzmediaworld.com",
              "telePhone": "+917290002168",
              "url": "https://ritzmediaworld.com",
              "paymentAccepted": ["cash", "check", "credit card", "invoice"],
              "openingHours": "Mo,Tu,We,Th,Fr 09:30-18:30",
              "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:30",
                "closes": "18:30"
              }],
              "priceRange": "$"
            }
          `}
      </Script>
      {/* Facebook Pixel Script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];
              t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1491326822260603');
            fbq('track', 'PageView');
          `}
      </Script>
      {/* NoScript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1491326822260603&ev=PageView&noscript=1"
          alt="fb-pixel"
        />
      </noscript>
      <Toaster position="top-right" reverseOrder={false} />
      <PageWrapper>
        {/* <TrackPageView /> */}
        <Header />
        <WhatsAppFloatingButton></WhatsAppFloatingButton>
        <ChatBoat></ChatBoat>
        {children}
        <Button />
      </PageWrapper>
    </>
  );
}
