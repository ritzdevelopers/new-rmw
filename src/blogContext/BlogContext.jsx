"use client";

import React, { createContext, useState, useContext } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBanner, setBlogBanner] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [innerImg, setInnerImg] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  return (
    <BlogContext.Provider
      value={{
        blogBanner,
        blogTitle,
        metaDescription,
        metaKeywords,
        innerImg,
        metaTitle,
        setBlogBanner,
        setBlogTitle,
        setMetaTitle,
        setInnerImg,
        setMetaDescription,
        setMetaKeywords
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
