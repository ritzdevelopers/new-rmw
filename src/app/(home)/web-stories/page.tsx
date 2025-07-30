import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";
import WebStories from "@/components/webStories/WebStories";
import React from "react";



const page = () => {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="body-overlay"></div>
      <PagesBanner
        headingTitle={"Web Stories"}
        videoURL={"/videos/bg_pattern.mp4"}
        mtP={"120px"}
        mtS={"100px"}
        sH={"10vh"}
      />
      <WebStories></WebStories>
      <Footer />
    </section>
  );
};

export default page;
