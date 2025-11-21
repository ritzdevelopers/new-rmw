import React from "react";
import { Metadata } from "next";
import S1 from "./sections/S1";
import S2 from "./sections/S2";
import S3 from "./sections/S3";
import S5 from "./sections/S5";
import S7 from "./sections/s7";
import S8 from "./sections/S8";
import S9 from "./sections/S9";
import S11 from "./sections/S11";
import ASI from "./components/ASI";
import InstagramIcon from "./components/InstagramIcon";
import FacebookIcon from "./components/FacebookIcon";
import YouTubeIcon from "./components/YouTubeIcon";
import LinkedInIcon from "./components/LinkedInIcon";
import XIcon from "./components/XIcon";
import S3C from "./sections/S3C";
import NewBlogSection from "./sections/NewBlogSection";
import NewS2 from "./sections/NewS2";
import NewS4 from "./sections/NewS4";
import S51 from "./sections/S51";
import CustomCursor from "./components/CustomCursor";
import LenisSmoothScroll from "./components/LenisSmoothScroll";
import OurAwards from "./sections/OurAwards";

export const metadata: Metadata = {
  title: "Ritz Media World | Best Advertising Agency in Delhi NCR & Creative Digital Marketing Agency",
  description: "Ritz Media World, the best advertising agency in Delhi NCR, is a full-service digital marketing agency and creative agency offering SEO, radio, and print ads in Greater Noida.",
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
};

function page() {
  return (
    <main className="overflow-x-hidden">
      <LenisSmoothScroll />
      {/* <CustomCursor /> */}
      <S1></S1>
      {/* <S2></S2> */}
      <NewS2></NewS2>
      <S3C></S3C>
      <S3></S3>
      {/* <S4></S4> */}
      <NewS4></NewS4>
      {/* <S4C></S4C> */}

      <S5></S5>
      <S51></S51>
      <S7></S7>
      <S8></S8>
      {/* <S9></S9> */}
     <OurAwards></OurAwards>
      {/* <S10></S10> */}
      <NewBlogSection></NewBlogSection>
      <S11></S11>
      <ASI icn={<FacebookIcon />} py="top-[245px]" px="right-[0px]" bgType="facebook"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[295px]" px="right-[0px]" bgType="instagram"></ASI>
      <ASI icn={<YouTubeIcon />} py="top-[345px]" px="right-[0px]" bgType="youtube"></ASI>
      <ASI icn={<LinkedInIcon />} py="top-[395px]" px="right-[0px]" bgType="linkedin"></ASI>
      <ASI icn={<XIcon />} py="top-[444px]" px="right-[0px]" bgType="x"></ASI>
    </main>
  );
}

export default page;
