import React from "react";
import S1 from "./sections/S1";
import S2 from "./sections/S2";
import S3 from "./sections/S3";
import S4 from "./sections/S4";
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
import S4C from "./sections/S4C";
import S51 from "./sections/S51";
import CustomCursor from "./components/CustomCursor";
import LenisSmoothScroll from "./components/LenisSmoothScroll";

function page() {
  return (
    <main className="overflow-x-hidden">
      <LenisSmoothScroll />
      <CustomCursor />
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
      <S9></S9>
      {/* <S10></S10> */}
      <NewBlogSection></NewBlogSection>
      <S11></S11>
      <ASI icn={<FacebookIcon />} py="top-[250px]" px="right-[0px]" bgType="facebook"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[310px]" px="right-[0px]" bgType="instagram"></ASI>
      <ASI icn={<YouTubeIcon />} py="top-[370px]" px="right-[0px]" bgType="youtube"></ASI>
      <ASI icn={<LinkedInIcon />} py="top-[430px]" px="right-[0px]" bgType="linkedin"></ASI>
      <ASI icn={<XIcon />} py="top-[490px]" px="right-[0px]" bgType="x"></ASI>
    </main>
  );
}

export default page;
