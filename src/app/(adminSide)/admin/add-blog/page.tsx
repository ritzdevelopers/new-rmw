"use client";

import { Home, Monitor } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-[#EEEEEE] min-h-screen p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 md:gap-12">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Add Blog
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm text-sm sm:text-base">
        <h1 className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" />
          <Link href="/" className="hover:underline">Home</Link>
        </h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Add Blog
        </h1>
      </div>

      {/* Blog Intro Section */}
      <div className="bg-white p-6 sm:p-8 rounded-md shadow-md flex flex-col gap-4 md:gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#222222]">Start Writing Your Blog</h2>
        <p className="text-[#555555] leading-relaxed">
          Welcome to the blog creation panel. Here, you can share your thoughts, stories, tutorials, or anything that inspires you.
          Start by adding a title, writing content, and customizing your blog to match your voice.
        </p>
        <p className="text-[#777777] text-sm">
          Note: Once published, your blog will be live on the platform and accessible to readers worldwide.
        </p>

        <Link
          href="/admin/add-blog/step-1"
          className="w-fit bg-[#2955B3] hover:bg-[#1e3f8a] text-white px-5 py-3 rounded-md text-sm sm:text-base transition-all duration-200"
        >
          Start Writing Blog
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-[#666] pt-10">
        Designed and Developed by <strong className="text-[#2955B3]">Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;