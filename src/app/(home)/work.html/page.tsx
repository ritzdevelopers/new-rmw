"use client";

import dynamic from "next/dynamic";
import PagesBanner from "@/components/pagesBanner/PagesBanner";
import ProjectCards from "@/allPages/projectsPage/ProjectCards";

const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

const Page = () => {
  return (
    <section className="flex flex-col items-center">
      <PagesBanner
        headingTitle="Our Work"
        videoURL="/videos/bg_pattern.mp4"
        mtP="120px"
        mtS="100px"
        sH="10vh"
      />
      <ProjectCards />
      <Footer />
    </section>
  );
};

export default Page;
