import React from "react";
import SubHero from "../layout/SubHero";
import Section2 from "@/allPages/new-about/Section2";
import Section3 from "@/allPages/new-about/Section3";
import Section4 from "@/allPages/new-about/Section4";
import Section5 from "@/allPages/new-about/Section5";
import S51 from "../new-home/sections/S51";
import Section7 from "@/allPages/new-about/Section7";
import Section8 from "@/allPages/new-about/Section8";
import NewBlogSection from "../new-home/sections/NewBlogSection";
import ASI from "../new-home/components/ASI";
import FacebookIcon from "../new-home/components/FacebookIcon";
import InstagramIcon from "../new-home/components/InstagramIcon";
import YouTubeIcon from "../new-home/components/YouTubeIcon";
import LinkedInIcon from "../new-home/components/LinkedInIcon";
import XIcon from "../new-home/components/XIcon";

function page() {
  return (
    <div>
      <SubHero></SubHero>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Section5></Section5>
      {/* <GSAPService /> */}
      <S51></S51>
      {/* <NewMasterMinds></NewMasterMinds> */}
      <Section7></Section7>
      <Section8></Section8>
      <NewBlogSection></NewBlogSection>
      <ASI
        icn={<FacebookIcon />}
        py="top-[245px]"
        px="right-[0px]"
        bgType="facebook"
      ></ASI>
      <ASI
        icn={<InstagramIcon />}
        py="top-[295px]"
        px="right-[0px]"
        bgType="instagram"
      ></ASI>
      <ASI
        icn={<YouTubeIcon />}
        py="top-[345px]"
        px="right-[0px]"
        bgType="youtube"
      ></ASI>
      <ASI
        icn={<LinkedInIcon />}
        py="top-[395px]"
        px="right-[0px]"
        bgType="linkedin"
      ></ASI>
      <ASI icn={<XIcon />} py="top-[444px]" px="right-[0px]" bgType="x"></ASI>
    </div>
  );
}

export default page;
