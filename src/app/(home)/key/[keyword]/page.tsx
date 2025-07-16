import React from "react";
import SearchUsingKey from "./SearchUsingKey";

import PagesBanner from "@/components/pagesBanner/PagesBanner";
interface Props {
  params: {
    keyword: string;
  };
}

const Page = async ({ params }: Props) => {
  const key = await params.keyword
  // console.log('this is key ', key);
  
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
    <SearchUsingKey keyword={key} />
    </section>
 
);
};

export default Page;
