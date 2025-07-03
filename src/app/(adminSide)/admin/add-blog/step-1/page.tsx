"use client";

import { Home, ImagePlus, Monitor } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBlogContext } from "@/blogContext/BlogContext"; 
import { useParams, useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "add-blog-step-1";

const Page = () => {
  const router = useRouter();

  const {
    setBlogTitle,
    setMetaTitle,
    setBlogBanner,
    blogBanner,
    blogTitle,
    metaKeywords,
  } = useBlogContext();

  const [localTitle, setLocalTitle] = useState<string>(blogTitle || "");
  const [localMeta, setLocalMeta] = useState<string>(metaKeywords || "");
  const [localBanner, setLocalBanner] = useState<string>(blogBanner || "");
  const [localCategory, setLocalCategory] = useState<string>("All Category");

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setLocalTitle(parsed.blogTitle || "");
      setLocalMeta(parsed.metaKeywords || "");
      setLocalBanner(parsed.blogBanner || "");
      setLocalCategory(parsed.blogCategory || "All Category");
      setBlogTitle(parsed.blogTitle || "");
      setMetaTitle(parsed.metaKeywords || "");
      setBlogBanner(parsed.blogBanner || "");
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLocalBanner(base64String);
        setBlogBanner(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDataToLocalStorage = () => {
    const data = {
      blogTitle: localTitle,
      metaKeywords: localMeta,
      blogBanner: localBanner,
      blogCategory: localCategory,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const params = useParams();
  const count = parseInt(params.count as string, 10) || 0;

  const handleNavigation = (path: string) => {
    if (path.includes("/admin/add-blog/step-2/page")) {
      if (!localTitle || !localMeta || !localBanner || !localCategory) {
        alert(
          "Sorry we can't open new page because your all input fields are blank."
        );
        return;
      }
      saveDataToLocalStorage();
      router.push(`/admin/add-blog/step-2/page/${count + 1}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /> Add Blog
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm text-sm">
        <Link href="/" className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" /> Add Blog
        </span>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383] flex items-center gap-2">
          Step 1
        </span>{" "}
      </div>
      <div className="addBloContainer bg-white p-5 rounded-md shadow-md flex flex-col lg:flex-row gap-6">
        <div
          style={{ padding: localBanner ? "20px" : "0px" }}
          className="flex-1 flex flex-col justify-center items-center gap-4 border rounded-md border-[#797979a5] relative overflow-hidden w-full max-w-md transition-all duration-300 bg-white shadow-sm"
        >
          <input
            type="file"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 z-20"
            accept="image/*"
            onChange={handleImageChange}
          />

          {localBanner ? (
            <img
              src={localBanner}
              alt="Selected Banner"
              className="w-full h-52 object-cover rounded-md border"
            />
          ) : (
            <div className="p-4">
              <label className="text-sm font-semibold text-[#444]">
                Upload Blog Banner:
              </label>

              <div className="w-40 h-40 flex items-center justify-center border border-dashed border-[#aaa] rounded-md bg-[#f9f9f9] relative z-10 hover:bg-[#f1f1f1] transition">
                <ImagePlus className="w-10 h-10 text-[#666]" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Blog Title
            </label>

            <input
              type="text"
              value={localTitle}
              onChange={(e) => {
                setLocalTitle(e.target.value);
                setBlogTitle(e.target.value);
              }}
              placeholder="Enter blog title here..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Meta Keywords
            </label>

            <input
              type="text"
              value={localMeta}
              onChange={(e) => {
                setLocalMeta(e.target.value);
                setMetaTitle(e.target.value);
              }}
              placeholder="Enter meta keywords..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Blog Category
            </label>

            <select
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="All Category">All Category</option>
              <option value="Case Study">Case Study</option>
              <option value="Performance Marketing Agency">
                Performance Marketing Agency
              </option>
              <option value="Print Advertising Agency">
                Print Advertising Agency
              </option>
              <option value="Creating Advertising Agency">
                Creating Advertising Agency
              </option>
              <option value="Celebrity Endorsements Agency">
                Celebrity Endorsements Agency
              </option>
              <option value="Artist Management Agency">
                Artist Management Agency
              </option>
              <option value="FM Radio Advertising">FM Radio Advertising</option>
              <option value="Web Design And Development">
                Web Design And Development
              </option>
              <option value="Graphic Design Services">
                Graphic Design Services
              </option>
              <option value="Digital Marketing Agency">
                Digital Marketing Agency
              </option>
              <option value="Best Ad Agency">Best Ad Agency</option>{" "}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <button
          onClick={() => handleNavigation("/admin/add-blog")}
          className="bg-[#d1d5db] hover:bg-[#cbd5e1] cursor-pointer text-black px-5 py-2 rounded-md"
        >
          Back to Main
        </button>

        <button
          onClick={() => handleNavigation("/admin/add-blog/step-2/page")}
          className="bg-[#2955B3] hover:bg-[#1e3f8a] cursor-pointer text-white px-5 py-2 rounded-md"
        >
          Continue to Step 2
        </button>
      </div>
      <footer className="admin-footer text-center text-sm text-[#666] pt-10">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>{" "}
    </div>
  );
};

export default Page;
