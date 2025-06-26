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
// import { TrackPageView } from "@/components/trackView/TrackPageView";

export const metadata = {
  title: "Ritz Media World",
  description: "Best digital agency in India",
  robots: "noindex, nofollow",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right"  reverseOrder={false} />
      <PageWrapper>
        {/* <TrackPageView /> */}
        <Header />
        {children}
        <Button />
      </PageWrapper>
    </>
  );
}
