"use client";

import { Home, ImagePlus, Monitor } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBlogContext } from "@/blogContext/BlogContext";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/Editor/Editor";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const count = parseInt(params.count as string, 10) || 1;

  const LOCAL_STORAGE_KEY = `add-blog-step-2-page-${count}`;

  const {
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
    setMetaKeywords,
  } = useBlogContext();

  const [localTitle, setLocalTitle] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>("");
  const [localBanner, setLocalBanner] = useState<string>("");
  const [localCategory, setLocalCategory] = useState<string>("All Category");
  const [pageNum, setPageNum] = useState(count);
  const [blogBody, setBlogBody] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const { blogTitle, metaKeywords, blogBanner, blogCategory } = parsed;

      setLocalTitle(blogTitle || "");
      setMetaTitle(blogTitle || "");

      setLocalMeta(metaKeywords || "");
      setMetaDescription(metaKeywords || "");

      setLocalBanner(blogBanner || "");
      setInnerImg(blogBanner || "");

      setLocalCategory(blogCategory || "All Category");
    }
  }, [count]);

  useEffect(() => {
    setPageNum(count);
  }, [count]);

  const saveDataToLocalStorage = () => {
    const data = {
      blogTitle: localTitle,
      metaKeywords: localMeta,
      blogBanner: localBanner,
      blogCategory: localCategory,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const handleNext = () => {
    if (!localTitle || !localMeta) {
      alert(
        "Sorry we can't open new page because your all input fields are blank."
      );
      return;
    }
    saveDataToLocalStorage();
    router.push(`/admin/add-blog/step-2/page/${count + 1}`);
  };

  const handlePrev = () => {
    if (count > 1) {
      saveDataToLocalStorage();
      router.push(`/admin/add-blog/step-2/page/${count - 1}`);
    } else {
      router.push(`/admin/add-blog/step-1`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalBanner(base64);
        setInnerImg(file);
      };
      reader.readAsDataURL(file);
    }
  };

  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleUploadBlog = async () => {
    try {
      const savedData1 = localStorage.getItem("add-blog-step-1");

      let blogTitle = "";
      let blogBanner = null;
      let metaKeywords = "";
      let blogCategory = "All Category";

      if (savedData1) {
        const parsed = JSON.parse(savedData1);
        blogTitle = parsed.blogTitle || "";
        metaKeywords = parsed.metaKeywords || "";
        blogCategory = parsed.blogCategory || "All Category";

        if (parsed.blogBanner?.startsWith("data:image")) {
          blogBanner = dataURLtoFile(parsed.blogBanner, "cover.jpg");
        }
      }

      const combinedBlogBody = [];
      const imageFiles = [];

      for (let i = 1; i <= count; i++) {
        const step2Data = localStorage.getItem(`add-blog-step-2-page-${i}`);
        if (step2Data) {
          const parsed = JSON.parse(step2Data);

          combinedBlogBody.push({
            metaTitle: parsed.blogTitle || "",
            metaDescription: parsed.metaKeywords || "",
          });

          if (parsed.blogBanner?.startsWith("data:image")) {
            const file = dataURLtoFile(parsed.blogBanner, `inner-img-${i}.jpg`);
            imageFiles.push(file);
          } else {
            imageFiles.push(null);
          }
        }
      }

      const formData = new FormData();
      formData.append("blogTitle", blogTitle);
      formData.append("metaKeywords", metaKeywords);
      formData.append("blogCategory", blogCategory);
      formData.append("blogBody", JSON.stringify(combinedBlogBody));

      if (blogBanner instanceof File) {
        formData.append("blogBanner", blogBanner);
      }

      imageFiles.forEach((img, index) => {
        if (img instanceof File) {
          formData.append(`innerImg-${index}`, img);
        }
      });

      const blogRes = await axios.post(
        "http://localhost:3000/api/ritz_blogs/add-new-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (blogRes.status === 201) {
        localStorage.removeItem("add-blog-step-1");
        for (let i = 1; i <= count; i++) {
          localStorage.removeItem(`add-blog-step-2-page-${i}`);
        }
        alert("Blog Has Been Posted Successfully.");
      }
      console.log("Uploaded Blog:", blogRes.data);
    } catch (error) {
      alert("Internal Server Errors.");
      console.error("Error in handleUploadBlog:", error);
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen p-4 md:p-8 flex flex-col gap-6 sm:gap-8 md:gap-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] text-2xl sm:text-3xl md:text-4xl font-light uppercase flex items-center gap-2">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Add Blog
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-wrap bg-white p-3 rounded-md shadow-sm text-sm">
        <Link href="/" className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" /> Add Blog
        </span>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383]">Step 2</span>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383]">Page {pageNum}</span>
      </div>

      <div className="bg-white p-5 rounded-md shadow-md flex flex-col lg:flex-row gap-6">
        <div
          style={{ padding: localBanner ? "20px" : "0px" }}
          className="flex-1 flex flex-col justify-center items-center gap-4 border rounded-md border-[#797979a5] relative overflow-hidden w-full max-w-md max-h-72 transition-all duration-300 bg-white shadow-sm"
        >
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 h-full w-full opacity-0 z-20 cursor-pointer"
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
                Upload Inner Image:
              </label>

              <div className="w-40 h-40 flex items-center justify-center border border-dashed border-[#aaa] rounded-md bg-[#f9f9f9] relative z-10 hover:bg-[#f1f1f1] transition">
                <ImagePlus className="w-10 h-10 text-[#666]" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#444]">
              Blog Meta Title
            </label>

            <input
              type="text"
              value={localTitle}
              onChange={(e) => {
                setLocalTitle(e.target.value);
                setMetaTitle(e.target.value);
              }}
              placeholder="Enter blog meta title here..."
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#444]">
              Meta Description
            </label>

            <Editor
              value={localMeta}
              onChange={(val: string) => {
                setLocalMeta(val);
                setMetaDescription(val);
              }}
            />
          </div>

          {/* <div>
            <label className="text-sm font-semibold text-[#444]">
              Blog Category
            </label>

            <input
              type="text"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              placeholder="Blog Category (e.g. Case Study)"
              className="w-full border rounded px-4 py-2"
            />
          </div> */}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center w-full gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={handlePrev}
            className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-black px-5 py-2 rounded-md"
          >
            Back to Prev
          </button>

          <button
            onClick={handleNext}
            className="bg-[#2955B3] cursor-pointer hover:bg-[#1e3f8a] text-white font-semibold px-5 py-2 rounded-md"
          >
            Add More
          </button>
        </div>

        <button
          onClick={handleUploadBlog}
          className="bg-green-700 cursor-pointer hover:bg-green-800 text-white px-5 py-2 rounded-md"
        >
          Submit
        </button>
      </div>

      <footer className="admin-footer text-center text-sm text-[#666] pt-10">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;