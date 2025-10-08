// app/(home)/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
// import "../styles/core-css.css";
// import "../styles/unit-css.css";
// import "../styles/spacing.css";
// import "../styles/magnific-popup-css.css";
// import "../styles/elementor-css.css";
// import "../styles/animation-css.css";

import { Toaster } from "react-hot-toast";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import Header from "@/components/header/Header";
import Script from "next/script";
import ClientOnlyComponents from "@/components/ClientOnlyComponents";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0YHLN54GF7"
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0YHLN54GF7');
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="lazyOnload">
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

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1491326822260603&ev=PageView&noscript=1"
          alt="fb-pixel"
        />
      </noscript>

      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Main Layout */}
      {/* <PageWrapper> */}
        <Header />
        {/* ✅ Client-only components wrapper */}
        <ClientOnlyComponents />
        {children}
      {/* </PageWrapper> */}
    </>
  );
}
