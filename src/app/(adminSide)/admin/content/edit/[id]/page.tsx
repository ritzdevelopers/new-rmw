"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface PAGECARD {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

function Page() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageURL, setImgURl] = useState<string | null>(null);
  const [pageCard, setPageCard] = useState<PAGECARD>();
  const [previewImg, setPreviewImg] = useState<File>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetchSinglePageCard();
  }, []);

  const fetchSinglePageCard = async () => {
    try {
      const { data } = await axios.get(`/api/sql-single-page-card/${id}`);
      console.log(data.card[0][0]);
      setPageCard(data.card[0][0]);
      setImgURl(data.card[0][0].image_url);
    } catch (error) {
      console.log("Error in fetchSinglePageCard:", error);
    }
  };

  const handleFileChange = (e: HTMLInputElement) => {
    const file = e.files?.[0];
    if (file) {
      setPreviewImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgURl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click();
      fileInput.current.onchange = (e) => {
        const ele = e.target as HTMLInputElement;
        handleFileChange(ele);
      };
    }
  };

  const updatePageCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (title) {
        formData.append("title", title);
      }
      if (desc) {
        formData.append("description", desc);
      }
      if (previewImg) {
        formData.append("image_url", previewImg);
      }
      const { data } = await axios.patch(
        `/api/sql-single-page-card/update/${id}`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(
        "There are some errors in updatePageCard plz fix the bug first ",
        error
      );
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-10 flex items-center justify-center">
      {!pageCard ? (
        <p>Loading</p>
      ) : (
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Image Preview & Upload */}
          <div
            onClick={handleFileInput}
            className="w-full md:w-1/2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center cursor-pointer transition h-64"
          >
            {imageURL ? (
              <Image
                src={
                  previewImg
                    ? imageURL
                    : `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/${imageURL}`
                }
                alt="Preview"
                width={400}
                height={300}
                className="object-cover h-full w-auto rounded-lg"
                unoptimized
              />
            ) : (
              <div className="text-gray-500 text-center">
                <i className="text-2xl">+ Add Image</i>
                <p className="text-sm mt-2">Click to upload image</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2">
            <form
              action=""
              encType="multipart/formData"
              className="flex flex-col gap-5"
              onSubmit={updatePageCard}
            >
              <input
                type="text"
                placeholder="Title"
                defaultValue={pageCard?.title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
              />
              <textarea
                placeholder="Description"
                defaultValue={pageCard?.description}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-2 border rounded-md border-gray-300  min-h-32 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
              />
              <input type="file" ref={fileInput} className="hidden" />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 rounded-md font-medium shadow-lg"
              >
                Update Card
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Page;
