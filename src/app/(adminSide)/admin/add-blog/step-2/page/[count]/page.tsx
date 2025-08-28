"use client";

import { Home, ImagePlus, Monitor } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
    // blogBanner,
    // blogTitle,
    // metaDescription,
    // metaKeywords,
    // innerImg,
    // metaTitle,
    // setBlogBanner,
    // setBlogTitle,
    setMetaTitle,
    setInnerImg,
    setMetaDescription,
    // setMetaKeywords,
  } = useBlogContext();

  const [localTitle, setLocalTitle] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>("");
  const [localBanner, setLocalBanner] = useState<string>("");
  const [localCategory, setLocalCategory] = useState<string>("All Category");
  const [pageNum, setPageNum] = useState(count);
  // const [blogBody, setBlogBody] = useState<any[]>([]);

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
  const removeInnImg = () => {
    setLocalBanner(" ");
  };
  const handlePrev = () => {
    if (count > 1) {
      saveDataToLocalStorage();
      router.push(`/admin/add-blog/step-2/page/${count - 1}`);
    } else {
      saveDataToLocalStorage();
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

  function dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(",");
    const match = arr[0].match(/:(.*?);/);

    if (!match) {
      throw new Error("MIME type could not be extracted from the data URL.");
    }

    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleUploadBlog = async () => {
    saveDataToLocalStorage();
    try {
      const savedData1 = localStorage.getItem("add-blog-step-1");

      let blogTitle = "";
      let blogBanner = null;
      let metaKeywords = "";
      let blogCategory = "All Category";
      let mtDesc = "";

      if (savedData1) {
        const parsed = JSON.parse(savedData1);
        blogTitle = parsed.blogTitle || "";
        metaKeywords = parsed.metaKeywords || "";
        blogCategory = parsed.blogCategory || "All Category";
        mtDesc = parsed.mtDesc;

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
      formData.append("mtDesc", mtDesc);
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
        "/api/ritz_blogs/add-new-blog",
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
        router.push("/admin/add-blog");
      }
      // console.log("Uploaded Blog:", blogRes.data);
    } catch (error) {
      alert("Internal Server Errors.");
      console.error("Error in handleUploadBlog:", error);
    }
  };
  interface IMGFORPREVIEW {
    url: string;
    id: string;
  }
  interface GETLINKS {
    imgPath: string;
    _id: string;
  }
  // From Here The Image URL Generator Logic Is Starting
  const [uploadImgModal, setUploadImgModal] = useState(false);
  const [imgToSend, setImgToSend] = useState<File[]>([]);
  const [imgToShow, setImgToShow] = useState<IMGFORPREVIEW[]>([]);
  const [linkToShow, setLinkToShow] = useState<GETLINKS[]>([]);
  // const [copiedImgLink, setCopiedImgLink] = useState("");
  // const [allPrevUplodedImgs, setAllPrevSelectedImgs] = useState([]);
  const imgUploaderModal = () => {
    setUploadImgModal((pr) => !pr);
  };
  const handleSelectNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;
    const allfiles = e.target.files;
    if (allfiles && allfiles?.length > 0) {
      [...allfiles].forEach((file) => {
        setImgToSend((pr) => [file, ...pr]);
        const url = URL.createObjectURL(file);
        setImgToShow((pr) => [...pr, { id: file.name, url: url }]);
      });
    }
  };
  const removeExtraImgs = (key: string) => {
    setImgToSend((pr) => pr.filter((img) => img.name !== key));
    setImgToShow((pr) => pr.filter((img) => img.id !== key));
  };

  const handleUploadSelectedImg = async () => {
    if (imgToSend.length === 0) return;
    const eImg = new FormData();
    try {
      for (let i = 0; i < imgToSend.length; i++) {
        eImg.append(`eImage-${i}`, imgToSend[i]);
      }
      const res = await axios.post("/api/eImgs", eImg);
      console.log(res.data);

      if (res.status === 201) {
        setImgToShow([]);
        setImgToSend([]);
        alert("Url Generated Successfully!");
        setLinkToShow(res.data.files);
      } else {
        alert("Some Errors In Uploading Images!");
      }
    } catch (error) {
      console.log("Internal Server Errors!", error);
      alert("Internal Server Errors In Uploding IMG!");
    }
  };

  useEffect(() => {
    const fetchSavedImage = async () => {
      try {
        const data = await axios.get("/api/eImgs");
        if (data.status === 200) {
          setLinkToShow(data.data.allImages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedImage();
  }, []);
  console.log(linkToShow);

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

      {uploadImgModal && (
        <div className="fixed inset-0 z-[900] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={imgUploaderModal}
          />
          {/* Modal */}
          <div className="relative mx-auto w-[min(92vw,640px)] h-[80vh]">
            <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-black/5 overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Upload Image
                </h2>
                <button
                  onClick={imgUploaderModal}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1">
                {/* Upload Section */}
                <div className="space-y-5">
                  {/* Dropzone */}
                  <label
                    htmlFor="file"
                    className="block cursor-pointer rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <svg viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                          d="M12 16V7m0 0l-3 3m3-3l3 3M5 17a4 4 0 01.88-7.9 5 5 0 019.9-1.1A4.5 4.5 0 1119 17H5z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200">
                      <span className="font-medium underline decoration-dotted">
                        Click to choose
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      PNG, JPG, WebP (max 10MB)
                    </p>
                  </label>
                  <input
                    id="file"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleSelectNewImg}
                  />

                  {/* Preview */}
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
                    {imgToShow.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {imgToShow.map((url, i) => (
                          <div
                            key={url.id}
                            className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                          >
                            <img
                              src={url.url}
                              alt={`preview-${i}`}
                              className="w-full h-28 object-cover"
                            />
                            {/* Cross button */}
                            <button
                              onClick={() => removeExtraImgs(url.id)}
                              type="button"
                              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-lg">
                        <span className="text-xs text-zinc-500">
                          Preview will appear here
                        </span>
                      </div>
                    )}
                  </div>

                  {/* URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Image URL
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          readOnly
                          value="https://yourdomain.com/uploads/your-image.jpg"
                          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-3 pr-16 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        />
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                          type="button"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Uploads */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Previously Uploaded
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {linkToShow &&
                      linkToShow.map((img) => (
                        <div
                          key={img._id}
                          className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_SERVER_EIMG_PATH
                            }/api/eImgs/${img.imgPath.replace(
                              "/eImages/",
                              ""
                            )}`}
                            alt="uploaded"
                            className="w-full h-28 object-cover"
                          />
                          <button className="absolute bottom-2 right-2 rounded-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur px-2 py-1 text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800">
                            Copy
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={imgUploaderModal}
                  className="h-10 rounded-lg px-4 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSelectedImg}
                  className="h-10 rounded-lg px-4 text-sm bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 opacity-60"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

          <button
            onClick={imgUploaderModal}
            className="px-6 py-2 bg-green-700 text-white font-bold hover:bg-green-800 z-50"
          >
            Create Image URL
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#444]">
              Page Title
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
              Page Description
            </label>

            <Editor
              value={localMeta}
              onChange={(val: string) => {
                setLocalMeta(val);
                setMetaDescription(val);
              }}
            />
          </div>
          <div className="mt-10">
            <button
              onClick={removeInnImg}
              className="px-6 py-2 bg-red-500 text-white font-bold hover:bg-red-600"
            >
              Remove Image
            </button>
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