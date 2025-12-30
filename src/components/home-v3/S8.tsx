"use client";
import Image from "next/image";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { Download } from "lucide-react";
import Link from "next/link";


interface BLOGSTRUCTURE {
  blogTitle:string,
  blogBanner:string,
  blogSlug:string,
  createdAt:Date,
 
}


function S8({ blogs, blogsLoading }: { blogs: BLOGSTRUCTURE[], blogsLoading: boolean }) {
  return (
    <section className="w-full min-h-screen bg-[#ffffff] flex justify-center items-center py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-0">
      {/* Centered Align Container  */}
      <div className="w-full sm:w-[95%] lg:w-[92%] flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {/* Row 1  */}
        <div className="w-full flex flex-col gap-8 sm:gap-9 lg:gap-10">
          {/* Header  */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
            {/* Left Side Container  */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <p
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237] uppercase"
                style={{
                  fontFamily: "OpenSansSemiBold",
                }}
              >
                Latest Insights
              </p>
              <h2
                className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-black"
                style={{
                  fontFamily: "MontserratBold",
                }}
              >
                Here's what we've been up to
              </h2>
              <p
                className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-black max-w-5xl"
                style={{
                  fontFamily: "OpenSansRegular",
                }}
              >
               Insights, launches, partnerships, and stories from across our ecosystem.
              </p>
            </div>

            {/* Right Side Container  */}
            <button
              onClick={()=>window.open("https://ritzmediaworld.com/blogs", "_blank")}
              className="font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] w-full sm:w-[179px] h-[48px] sm:h-[50px] lg:h-[54px] border-1 border-[#C99237] rounded-[5px] cursor-pointer hover:bg-[#C99237] hover:text-white transition-colors flex-shrink-0"
              style={{
                fontFamily: "OpenSansSemiBold",
              }}
            >
              Read more blogs
            </button>
          </div>

          {/* Main Container  */}
          <div className="w-full flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 ">
            {
            blogs.length > 0 ? 
            blogs.map((ob, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full sm:w-[calc(33.333%-10px)] lg:w-[405px] h-auto lg:h-[311px] flex flex-col gap-2"
                >
                  {/* Image Container  */}
                  <div className="w-full relative h-[250px] lg:h-[212px]">
                    <Image
                      src={ob.blogBanner}
                      alt="RMW"
                      fill
                      className="object-cover"
                    ></Image>
                  </div>
                  <p className="font-[400] text-[13px] sm:text-[14px] lg:text-[15px] text-[#575757] flex gap-2 items-center">
                    <CiCalendar className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px]" />{" "}
                   {ob.createdAt.toLocaleDateString()}
                  </p>
                  <h3
                    className="font-[600] text-[16px] sm:text-[17px] lg:text-[18px] text-black"
                    style={{
                      fontFamily: "OpenSansSemiBold",
                    }}
                  >
                    {ob.blogTitle}
                  </h3>
                </div>
              );
            })
          :
          [1,2,3].map((idx)=>{
            return (
              <div
                key={idx}
                className="w-full sm:w-[calc(33.333%-10px)] lg:w-[405px] h-auto lg:h-[311px] flex flex-col gap-2"
              >
                {/* Image Skeleton */}
                <div className="w-full relative h-[250px] lg:h-[212px] bg-gray-200 rounded animate-pulse"></div>
                {/* Date Skeleton */}
                <div className="flex gap-2 items-center">
                  <div className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-[100px] h-[15px] sm:h-[16px] lg:h-[17px] bg-gray-200 rounded animate-pulse"></div>
                </div>
                {/* Title Skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="w-full h-[18px] sm:h-[19px] lg:h-[20px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-[80%] h-[18px] sm:h-[19px] lg:h-[20px] bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            )
          })
          
          }
          </div>
        </div>

        {/* Row 2  */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-6 lg:gap-6 xl:gap-10">
          {/* Left Side Container  */}
          <div className="w-full lg:w-[48%] xl:w-[603px] min-h-[500px] lg:h-[526px] bg-[#F7F7F7] flex flex-col justify-around px-6 sm:px-7 lg:px-8 py-6 sm:py-7 lg:py-8">
            <div>
              <p
                className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237]"
                style={{
                  fontFamily: "OpenSansSemiBold",
                }}
              >
                Free Resource
              </p>
              <h2
                className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px]"
                style={{
                  fontFamily: "MontserratBold",
                }}
              >
                2025 Brand Impact Report
              </h2>
            </div>
            <p className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]">
              Download Our
            </p>

            <p
              className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              Download our latest report exploring how brands can build trust, relevance, and growth in an increasingly digital-first landscape.
            </p>

            <ul
              className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              <li>Industry benchmarks for real estate marketing ROI</li>
              <li>Proven strategies for UHNI audience targeting</li>
              <li> 2025 digital and print advertising trends</li>
              <li>Case studies with measurable results</li>
            </ul>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-3">
                <input
                  type="text"
                  placeholder="Enter your phone (e.g., +91 9220516777)"
                  className="w-full sm:w-[319px] h-[48px] sm:h-[50px] border-1 rounded-[4px] border-[#DAD4D4] bg-white px-4 placeholder:text-[#000000] placeholder:font-[400] placeholder:text-[13px] sm:placeholder:text-[14px]"
                />

                <button
                  className="w-full sm:w-[209px] h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors"
                  style={{
                    fontFamily: "PoppinsRegular",
                  }}
                >
                  <p> Free Download</p>
                  <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
                </button>
              </div>
              <p
                className="font-[400] text-[13px] sm:text-[14px] text-[#6E6E6E]"
                style={{
                  fontFamily: "PoppinsRegular",
                }}
              >
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>

          {/* Right Side Container  */}
          <div className="w-full lg:w-[48%] xl:w-[603px] min-h-[400px] lg:h-[526px] border-1 border-[#D4D4D4] lg:bg-[url('/home-v3/s8/s8img.png')] bg-cover bg-center px-6 sm:px-7 lg:px-8 py-6 sm:py-7 lg:py-8 flex flex-col gap-3 sm:gap-4">
            <h2
              className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px]"
              style={{
                fontFamily: "MontserratBold",
              }}
            >
              Or Get a Free <span className="text-[#C99237]">Brand Audit</span>{" "}
            </h2>

            <p
              className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              Let our experts analyze your current brand positioning and provide
              actionable recommendations.
            </p>

            <ul
              className="list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[14px] sm:text-[15px] lg:text-[16px]"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              <li>Comprehensive brand analysis</li>
              <li>Competitor positioning review</li>
              <li>Growth opportunity identification</li>
              <li>Customized strategy roadmap</li>
            </ul>

            <div className="flex border-b-1 border-b-black items-center justify-between cursor-pointer pb-2 w-full sm:w-[224px] lg:mt-5">
              <Link
                href={"https://ritzmediaworld.com/contact.html"}
                target="_blank"
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black"
                style={{
                  fontFamily: "MontserratSemiBold",
                }}
              >
                Request A Free Audit
              </Link>
              <img
                src="/home-v3/s3/rhgt.png"
                alt="RMW"
                className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
              />
            </div>
          </div>
        </div>

        {/* Row 3  */}
        <div className="w-full flex justify-center items-center">
          {/* Center Align Container  */}
          <div className="flex flex-col gap-2 sm:gap-3 justify-center text-center items-center bg-[#F5F5F5] min-h-[200px] sm:min-h-[240px] lg:min-h-[279px] w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-10 lg:py-0">
            <h2
              className="font-[800] text-[24px] sm:text-[28px] lg:text-[36px]"
              style={{
                fontFamily: "MontserratExtraBold",
              }}
            >
              Ready to Elevate Your Brand?
            </h2>
            <p
              className="font-[400] text-[18px] sm:text-[24px] lg:text-[30px]"
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Let's discuss your next brand-elevating campaign
            </p>
            <button
              onClick={()=>window.open("https://ritzmediaworld.com/contact.html", "_blank")}
              className="w-full sm:w-[260px] lg:w-[282px] h-[48px] sm:h-[50px] lg:h-[54px] mt-4 bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] rounded-[5px] hover:bg-[#B8822F] transition-colors"
              style={{
                fontFamily: "OpenSansBold",
              }}
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S8;
