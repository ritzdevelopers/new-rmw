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
import S3C from "./sections/S3C";
import NewBlogSection from "./sections/NewBlogSection";

function page() {
  return (
    <main className="overflow-x-hidden">
      <S1></S1>
      <S2></S2>
      <S3C></S3C>
      <S3></S3>
      <S4></S4>
      <S5></S5>
      <S7></S7>
      <S8></S8>
      <S9></S9>
      {/* <S10></S10> */}
      <NewBlogSection></NewBlogSection>
      <S11></S11>
      <ASI icn={<InstagramIcon />} py="top-[250px]" px="right-[0px]"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[320px]" px="right-[0px]"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[390px]" px="right-[0px]"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[460px]" px="right-[0px]"></ASI>
    </main>
  );
}

export default page;
