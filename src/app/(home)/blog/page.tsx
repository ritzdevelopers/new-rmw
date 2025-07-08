import Articles from "@/allPages/blogPage/Articles";
import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";
import React from "react";

const page = () => {
  

  return (
    <div>

      <div className="body-overlay"></div>
        <PagesBanner
              headingTitle={"Blogs"}
              videoURL={"/videos/bg_pattern.mp4"}
              mtP={"80px"}
              mtS={"50px"}
            />

      <Articles />

      <Footer />   
    </div>
  );
};

export default page;
