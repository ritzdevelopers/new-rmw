"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Editor from "@/components/Editor/Editor";
import { Monitor, Home, ImagePlus } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const blogID = params.blogID as string;
  const count = parseInt(params.count as string, 10) || 1;

  const LOCAL_KEY = (page: number) => `add-blog-step-2-${blogID}-page-${page}`;
  const [blogBody, setBlogBody] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [localTitle, setLocalTitle] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>("");
  const [localImage, setLocalImage] = useState<string>("");

  const fetchBlogBody = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/ritz_blogs/get-single-blog/${blogID}`
      );
      const blog = res.data.blog;
      if (blog?.blogBody) {
        setBlogBody(blog.blogBody);
        setTotalPages(blog.blogBody.length);

        const local = localStorage.getItem(LOCAL_KEY(count));
        if (local) {
          const parsed = JSON.parse(local);
          setLocalTitle(parsed.metaTitle || "");
          setLocalMeta(parsed.metaDescription || "");
          setLocalImage(parsed.innerImg || "");
        } else if (blog.blogBody[count - 1]) {
          setLocalTitle(blog.blogBody[count - 1].metaTitle || "");
          setLocalMeta(blog.blogBody[count - 1].metaDescription || "");
          setLocalImage(blog.blogBody[count - 1].innerImg || "");
        }
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
      alert("Failed to load blog.");
    }
  };

  useEffect(() => {
    fetchBlogBody();
  }, [blogID]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY(count));
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalTitle(parsed.metaTitle || "");
      setLocalMeta(parsed.metaDescription || "");
      setLocalImage(parsed.innerImg || "");
    } else if (blogBody[count - 1]) {
      setLocalTitle(blogBody[count - 1].metaTitle || "");
      setLocalMeta(blogBody[count - 1].metaDescription || "");
      setLocalImage(blogBody[count - 1].innerImg || "");
    }
    //  if(localImage) {
    //    alert(localImage);
    //  }
  }, [count, blogBody]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_KEY(count),
      JSON.stringify({
        metaTitle: localTitle,
        metaDescription: localMeta,
        innerImg: localImage,
      })
    );
  };

  const handleNavigation = (toPage: number) => {
    saveDataToLocalStorage();
    router.push(`/admin/update/step-2/page/${blogID}/${toPage}`);
  };

  function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleSubmit = async () => {
    saveDataToLocalStorage();
    try {
      const step1Key = `update-blog-step-1-${blogID}`;
      const step1Data = JSON.parse(localStorage.getItem(step1Key) || "{}");
      console.log('====================================');
      console.log("This is step-1 data ", step1Data);
      console.log('====================================');
      if (
        !step1Data.blogTitle ||
        !step1Data.blogCategory ||
        !step1Data.metaKeywords
      ) {
        alert("Step 1 data missing! Please go back and fill it.");
        return;
      } 

      const finalBody = [];
      const innerImageMap: Record<number, File> = {};

      for (let i = 1; i <= totalPages; i++) {
        const saved = localStorage.getItem(LOCAL_KEY(i));
        const parsed = saved ? JSON.parse(saved) : blogBody[i - 1]; 

        // if (parsed?.innerImg?.startsWith("data:image/")) {
          const file = base64ToFile(parsed.innerImg, `innerImg-${i}.png`);
          innerImageMap[i - 1] = file;
        // }

        finalBody.push({
          metaTitle: parsed.metaTitle || "",
          metaDescription: parsed.metaDescription || "",
          innerImg: `innerImg-${i - 1}`, 
        });
      }

      const formData = new FormData();
      formData.append("blogId", blogID);
      formData.append("blogTitle", step1Data.blogTitle);
      formData.append("metaKeywords", step1Data.metaKeywords);
      formData.append("blogCategory", step1Data.blogCategory);
      formData.append("blogStatus", step1Data.blogStatus || true);
      formData.append("blogBody", JSON.stringify(finalBody)); 

      if (step1Data.blogBanner?.startsWith("data:image/")) {
        const bannerFile = base64ToFile(step1Data.blogBanner, "blogBanner.png");
        formData.append("blogBanner", bannerFile);
      } 

      Object.entries(innerImageMap).forEach(([index, file]) => {
        formData.append(`innerImg-${index}`, file);
      }); 

      const res = await axios.put(
        `http://localhost:3000/api/ritz_blogs/update-prev-blog/${blogID}`,
        formData
      );

      if (res.status === 200) {
        alert("Blog Updated Successfully!");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Blog update failed.");
    }
  };

  return (
    <div className="p-4 bg-[#f7f7f7] min-h-screen space-y-6">
      <div className="flex items-center gap-2">
        <Monitor className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-700">
          Update Blog - Step 2
        </h1>
      </div>

      <div className="flex items-center text-sm gap-2 text-gray-500">
        <Link href="/" className="text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span>/</span> <span>Step 2</span> <span>/</span>{" "}
        <span>Page {count}</span>
      </div>

      <div className="bg-white rounded-md p-4 shadow space-y-4">
        {/* Meta Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Meta Title
          </label>

          <input
            className="w-full border px-4 py-2 rounded"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            placeholder="Enter meta title"
          />
        </div>
        {/* Meta Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Meta Description
          </label>

          <Editor value={localMeta} onChange={(val) => setLocalMeta(val)} />
        </div>
        {/* Inner Image Section */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Inner Image
          </label>

          {localImage && (
            <img
              src={localImage}
              alt="Inner"
              className="w-full max-w-xs h-auto mb-3 rounded border"
            />
          )}

          <div className="relative inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border border-dashed border-gray-400 px-4 py-6 rounded-md bg-gray-50 flex flex-col items-center justify-center text-gray-600">
              <ImagePlus className="w-6 h-6 mb-1" />
              <span>Upload New Image</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handleNavigation(i + 1)}
              className={`px-4 py-2 cursor-pointer rounded-md text-sm ${
                i + 1 === count
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Page {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default Page;
