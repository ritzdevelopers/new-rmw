"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Categorycards from "@/allPages/Category/catergory";
import CategoryBanner from '@/components/pagesBanner/CategoryBanner';
import Footer from '@/components/footer/Footer';

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
    <>
      <CategoryBanner categoryTitle={`${formattedCategory}`} />
      <Categorycards />
      <Footer />
    </>
  );
};

export default Page;
