"use client";

import React from "react";
import { FaFacebookF, FaPhoneAlt, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function NewFooter() {
  return (
    <footer className="w-full bg-[#0F1640] flex justify-center">
      <div className="w-full min-[1657px]:max-w-[1300px] min-[1657px]:mx-auto flex flex-col lg:flex-row lg:items-stretch min-[1657px]:px-10">
      {/* Left Side Container  */}
      <div className="w-full lg:w-[321px] min-[1657px]:min-w-[321px] bg-[#0C123A] flex justify-center lg:justify-start py-8 px-0 lg:py-[72px] xl:py-0 sm:px-8 lg:px-12 lg:self-stretch">
        {/* Centered Align Container  */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6 sm:gap-8 w-full max-w-auto lg:max-w-[321px] mt-0 lg:mt-[62px] px-4 items-center lg:items-start text-center lg:text-left">
          {/* Row 1  */}
          <div className="flex flex-row lg:flex-col gap-12 md:gap-16 lg:gap-4">
            {/* Logo Container  */}
            <div className="mb-1 sm:mb-2">
              <img src="/home-v3/rmw-f-logo.png" alt="ritz media world logo" className="max-w-[80px] h-auto md:max-w-[200px] mx-auto lg:mx-0" />
            </div>
            {/* Address Container  */}
            <div className="flex flex-col gap-2 sm:gap-3 text-left">
              <p className="text-white text-[14px] sm:text-[16px] font-[700] mb-0.5 sm:mb-1">Address</p>
              <ul className="text-white text-[13px] sm:text-[15px] font-[400] flex flex-col gap-1 sm:gap-1.5 cursor-pointer">
                <li>402 - 404,</li>
                <li>4th floor, Corporate Park,</li>
                <li>Tower A1, Sector 142, Noida</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-12 md:gap-4 lg:gap-4">
            {/* Row 2  */}
            <div className="flex flex-col gap-2 w-[100px] md:w-[200px] lg:w-auto text-left sm:gap-3 cursor-pointer" onClick={() => window.open("mailto:info@ritzmediaworld.com", "_blank")}>
              <p className="font-[700] text-[14px] sm:text-[16px] text-white ">Email Us</p>
              <p className="text-white text-[13px] sm:text-[15px] font-[400] break-words">
                info@ritzmediaworld.com
              </p>
            </div>

            {/* Row 3  */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <p className="font-[700] text-left  text-[14px] sm:text-[16px] text-white ">Call Us</p>
              <div className="flex lg:w-auto gap-2 sm:gap-3 justify-start lg:justify-center items-center">
                {/* Left Side Call Icon  */}
                <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] border-[1px] border-[#17205E] flex justify-center items-center flex-shrink-0">
                  <FaPhoneAlt className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
                {/* Right Side Call Number  */}
                <div className="flex flex-col gap-1 sm:gap-1.5 w-auto sm:w-[200px]">
                  <p className="text-white text-[13px] sm:text-[15px] font-[400] cursor-pointer" onClick={() => window.open("tel:+919220516777", "_blank")}>+91 9220516777</p>
                  <p className="text-white text-[13px] sm:text-[15px] font-[400] cursor-pointer" onClick={() => window.open("tel:+917290002168", "_blank")}>+91 7290002168</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side Container  */}
      <div className="w-full lg:w-[calc(100%-321px)] min-[1657px]:flex-1 bg-[#0F1640] flex justify-center items-center py-8 sm:py-12 lg:py-[72px] xl:py-[52px] px-4 sm:px-6 lg:px-8 xl:px-12 min-[1657px]:px-8 lg:self-stretch">
        {/* Centered Align Container  */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[1200px] min-[1657px]:max-w-none">
          {/* Row 1  */}
          <div className="pr-0 sm:pr-4 text-left">
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-white leading-relaxed text-center md:text-left">
              Accelerate your journey to success with result-oriented solutions for Digital Advertising, Social Media Management, SEO, and Compelling Content. Backed by more than 17 years of advertising expertise, we serve a wide range of clients across industries in the Indian subcontinent.
            </p>
          </div>

          {/* Row 2  */}
          <div className="flex flex-row items-start justify-between md:justify-start min-[1657px]:justify-between flex-wrap md:flex-nowrap gap-[27px] min-[1657px]:gap-12">
            {/* Col 1  */}
            <div className="flex flex-col gap-3 sm:gap-4 text-left">
              <p className="font-[700] text-[14px] sm:text-[16px] text-white mb-0.5 sm:mb-1">Quick Links</p>
              <ul className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] flex flex-col gap-2.5 sm:gap-3 lg:gap-4 list-disc cursor-pointer list-inside lg:list-outside lg:ml-4 md:w-[209px]">
                <li onClick={() => window.open("https://ritzmediaworld.com/", "_blank")}>Home</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/about.html", "_blank")}>About</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/work.html", "_blank")}>Our Work</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/blogs", "_blank")}>Blogs</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/web-stories", "_blank")}>Web Stories</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}>Contact</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/career", "_blank")}>Careers</li>
              </ul>
            </div>
            {/* Col 2  */}
            <div className="flex flex-col gap-3 sm:gap-4  text-left">
              <p className="font-[700] text-[14px] sm:text-[16px] text-white mb-0.5 sm:mb-1">Services</p>
              <ul className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] flex flex-col gap-2.5 sm:gap-3 lg:gap-4 list-disc cursor-pointer list-inside lg:list-outside lg:ml-4 md:w-[260px]">
                <li onClick={() => window.open("https://ritzmediaworld.com/services/digital-marketing", "_blank")}>Digital Marketing</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/print-advertising", "_blank")}>Print Advertising</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/radio-advertising", "_blank")}>Radio Advertising</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/creative-services", "_blank")}>Creative Services</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/contents-marketing", "_blank")}>Content Marketing</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/web-designing-and-development", "_blank")}>Web Development</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/celebrity-endorsements", "_blank")}>Celebrity Endorsements</li>
                <li onClick={() => window.open("https://ritzmediaworld.com/services/influencer-marketing-agency-in-india", "_blank")}>Influencer Marketing</li>
              </ul>
            </div>

            {/* Col 3  */}
            <div className="w-full flex flex-col gap-4 sm:gap-6 items-center min-[1657px]:items-end">
              {/* Google Review Image  */}
              <div className="mb-1 sm:mb-2">
                <img src="/home-v3/clients/reviews.png" alt="google review" className="w-full max-w-[200px] mx-auto lg:mx-0" />
              </div>

              {/* Social Media Links  */}
              <div className="flex gap-2 sm:gap-3 flex-wrap justify-start min-[1657px]:justify-end">
                <div onClick={() => window.open("https://www.facebook.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] justify-center items-center text-white bg-[#1E2939] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                  <FaFacebookF className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
                <div onClick={() => window.open("https://www.instagram.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] justify-center items-center text-white bg-[#1E2939] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                  <FaInstagram className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
                <div onClick={() => window.open("https://www.linkedin.com/company/ritzmediaworld/", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] justify-center items-center text-white bg-[#1E2939] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                  <FaLinkedinIn className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
                <div onClick={() => window.open("https://x.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] justify-center items-center text-white bg-[#1E2939] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                  <FaXTwitter className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
                <div onClick={() => window.open("https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] justify-center items-center text-white bg-[#1E2939] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                  <FaYoutube className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                </div>
              </div>
            </div>
            {/* <div className="w-full flex flex-col gap-4 sm:gap-6 items-end ju">

              <div
                onClick={() => window.open("https://www.facebook.com/ritzmediaworld", "_blank")}
                className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] 
    flex items-center justify-center bg-[#1877F2] cursor-pointer rounded-l-md">
                <FaFacebookF className="text-white text-[14px] sm:text-[16px] md:text-[18px]" />
              </div>

              
              <div
                onClick={() => window.open("https://www.instagram.com/ritzmediaworld", "_blank")}
                className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] 
    flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 
    cursor-pointer rounded-l-md">
                <FaInstagram className="text-white text-[14px] sm:text-[16px] md:text-[18px]" />
              </div>

              <div
                onClick={() => window.open("https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia", "_blank")}
                className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] 
    flex items-center justify-center bg-[#FF0000] cursor-pointer rounded-l-md">
                <FaYoutube className="text-white text-[14px] sm:text-[16px] md:text-[18px]" />
              </div>

             
              <div
                onClick={() => window.open("https://www.linkedin.com/company/ritzmediaworld/", "_blank")}
                className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] 
    flex items-center justify-center bg-[#0A66C2] cursor-pointer rounded-l-md">
                <FaLinkedinIn className="text-white text-[14px] sm:text-[16px] md:text-[18px]" />
              </div>

            
              <div
                onClick={() => window.open("https://x.com/ritzmediaworld", "_blank")}
                className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] 
    flex items-center justify-center bg-black cursor-pointer rounded-l-md">
                <FaXTwitter className="text-white text-[14px] sm:text-[16px] md:text-[18px]" />
              </div>

            </div> */}
          </div>

          {/* Row 3  */}
          <div className="flex flex-col lg:justify-start lg:items-start">
            {/* Parteners And Collaborators Image  */}
            <div className="mb-1 sm:mb-2 flex flex-wrap justify-center items-center gap-4 lg:justify-start lg:items-center sm:gap-6 lg:gap-10 h-auto lg:h-[79px] w-full overflow-x-auto lg:overflow-visible">


              <img src="/home-v3/clients/ins-partner.png" alt="parteners and collaborators" className="cursor-not-allowed h-[30px] lg:max-h-[60px] w-auto object-contain" />
              <img src="/home-v3/clients/meta-partner.png" alt="parteners and collaborators" className="cursor-not-allowed h-[30px] lg:max-h-[60px] w-auto object-contain" />
              <img src="/home-v3/clients/g-partner.png" alt="parteners and collaborators" className="cursor-not-allowed h-[30px] lg:max-h-[60px] w-auto object-contain" />
              <img src="/home-v3/clients/msme-parnnter.png" alt="parteners and collaborators" className="cursor-not-allowed h-[30px] lg:max-h-[60px] w-auto object-contain" />
            </div>

            {/* Copy Right Text  */}
            <div>
              <p className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] text-center">© 2026 <span className="font-[700]">
                Ritz Media World</span>. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default NewFooter;
