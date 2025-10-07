// app/(about)/page.tsx  (ya jahan bhi tumhara About page hai)

// ❌ No "use client" (keep it server component)
import AboutFirst from "./aboutPage/AboutFirst";
import Stratagies from "./aboutPage/Stratagies";
import AboutAward from "./aboutPage/AboutAward";
import Swiper1 from "./aboutPage/Swiper1";
import Swiper2 from "./aboutPage/Swiper2";
import Experts from "./aboutPage/Experts";
import Work from "./Homepage/Work";
import Experience from "./Homepage/Experience";
import Footer from "@/components/footer/Footer";

export const dynamic = "force-static"; // ✅ ensures static rendering at build time

export default function About() {
  return (
    <>
      <AboutFirst />
      <Stratagies />
      <AboutAward />
      <Swiper1 />
      <Swiper2 />
      <Experts />
      <Work />
      <Experience />
      <Footer />
    </>
  );
}
