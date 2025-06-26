import Articles from "@/allPages/blogPage/Articles";
import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";
import React from "react";

const page = () => {
  

  return (
    <div>

      <div className="body-overlay"></div>
      <PagesBanner headingTitle={"Blog"}/>

      <Articles />

      <Footer />









      
    </div>
  );
};

export default page;
