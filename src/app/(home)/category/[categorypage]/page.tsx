"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Categorycards from "@/allPages/Category/catergory";
import CategoryBanner from '@/components/pagesBanner/CategoryBanner';
import Footer from '@/components/footer/Footer';
import PagesBanner from "../../../../components/pagesBanner/PagesBanner"
const Page = () => {
  const params = useParams();
  const categorySlug = params?.categorypage as string;

  // Convert "web-design" → "Web Design"
  const formatCategoryTitle = (slug: string) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.toUpperCase())
      .join(' ');
  };

  const formattedCategory = formatCategoryTitle(categorySlug);

  return (
    <section style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      {/* <CategoryBanner categoryTitle={`${formattedCategory}`} /> */}
         <PagesBanner
              headingTitle={formattedCategory}
              videoURL={"/videos/bg_pattern.mp4"}
              mtP={"120px"}
              mtS={"100px"}
              sH={"20vh"}
            />
      <Categorycards />
      <Footer />
    </section>
  );
};

export default Page;
