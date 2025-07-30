import Articles from "@/allPages/blogPage/Articles";
import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";
import React from "react";

const page = () => {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="body-overlay"></div>
      <PagesBanner
        headingTitle={"Blogs"}
        videoURL={"/videos/bg_pattern.mp4"}
        mtP={"120px"}
        mtS={"100px"}
        sH={"10vh"}
      />

      <Articles />

      <Footer />
    </section>
  );
};

export default page;