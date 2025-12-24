"use client";

import React from "react";
import { FaFacebookF, FaPhoneAlt, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

function NewFooter() {
  return (
    <footer className="w-full bg-[#0F1640] flex flex-col-reverse lg:flex-row lg:items-stretch">
      {/* Left Side Container  */}
      <div className="w-full lg:w-[321px] bg-[#0C123A] flex lg:justify-center lg:items-center py-8 sm:py-12 lg:py-[72px] px-6 sm:px-8 lg:px-12 lg:self-stretch">
        {/* Centered Align Container  */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[321px]">
          {/* Row 1  */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Logo Container  */}
            <div className="mb-1 sm:mb-2">
              <img src="/home-v3/rmw-f-logo.png" alt="ritz media world logo" className="w-auto h-auto max-w-[200px] sm:max-w-none" />
            </div>
            {/* Address Container  */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <p className="text-white text-[14px] sm:text-[16px] font-[700] mb-0.5 sm:mb-1">Address</p>
              <ul className="text-white text-[13px] sm:text-[15px] font-[400] flex flex-col gap-1 sm:gap-1.5">
                <li>402 - 404,</li>
                <li>4th floor Corporate Park,</li>
                <li>Tower A1 Sector 142, Noida</li>
              </ul>
            </div>
          </div>

          {/* Row 2  */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="font-[700] text-[14px] sm:text-[16px] text-white">Email Us</p>
            <p className="text-white text-[13px] sm:text-[15px] font-[400] break-words">
              info@ritzmediaworld.com
            </p>
          </div>

          {/* Row 3  */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="font-[700] text-[14px] sm:text-[16px] text-white">Call Us</p>
            <div className="flex gap-2 sm:gap-3">
              {/* Left Side Call Icon  */}
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] border-[1px] border-[#17205E] flex justify-center items-center flex-shrink-0">
                <FaPhoneAlt className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
              </div>
              {/* Right Side Call Number  */}
              <div className="flex flex-col gap-1 sm:gap-1.5">
                 <p className="text-white text-[13px] sm:text-[15px] font-[400]">+91 9220516777</p>
                <p className="text-white text-[13px] sm:text-[15px] font-[400]">+91 7290002168</p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side Container  */}
      <div className="w-full lg:w-[calc(100%-321px)] bg-[#0F1640] flex justify-center items-center py-8 sm:py-12 lg:py-[72px] px-4 sm:px-6 lg:px-8 xl:px-12 lg:self-stretch flex-1">
        {/* Centered Align Container  */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[1200px]">
            {/* Row 1  */}
            <div className="pr-0 sm:pr-4">
                <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-white leading-relaxed">
                Accelerate your journey to success with result-oriented solutions for Digital Advertising, Social Media Management, SEO, and Compelling Content backed by more than 17 years of advertising wisdom with a wide array of clients across all industries across the Indian subcontinent.
                </p>
            </div>

            {/* Row 2  */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-24">
                {/* Col 1  */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <p className="font-[700] text-[14px] sm:text-[16px] text-white mb-0.5 sm:mb-1">Quick Links</p>
                    <ul className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] flex flex-col gap-2.5 sm:gap-3 lg:gap-4 list-disc">
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/", "_blank")}>Home</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/about.html", "_blank")}>About</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/work.html", "_blank")}>Our Work</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/blogs", "_blank")}>Blogs</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/web-stories", "_blank")}>Web Stories</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/contact.html", "_blank")}>Contact</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/career", "_blank")}>Career</li>
                    </ul>
                </div>
                {/* Col 2  */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <p className="font-[700] text-[14px] sm:text-[16px] text-white mb-0.5 sm:mb-1">Services</p>
                    <ul className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] flex flex-col gap-2.5 sm:gap-3 lg:gap-4 list-disc">
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/digital-marketing", "_blank")}>Digital Marketing</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/print-advertising", "_blank")}>Print Advertising</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/radio-advertising", "_blank")}>Radio Advertising</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/creative-services", "_blank")}>Creative Services</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/content-marketing", "_blank")}>Content Marketing</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/web-development", "_blank")}>Web Development</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/celebrity-endorsements", "_blank")}>Celebrity Endorsements</li>
                        <li className="ml-4" onClick={()=>window.open("https://ritzmediaworld.com/services/influencer-marketing", "_blank")}>Influencer Marketing</li>
                    </ul>
                </div>

                {/* Col 3  */}
                <div className="flex flex-col gap-4 sm:gap-6">
                   {/* Google Review Image  */}
                   <div className="mb-1 sm:mb-2">
                    <img src="/home-v3/google-review.png" alt="google review" className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-none" />
                   </div>

                   {/* Social Media Links  */}
                   <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <div onClick={()=>window.open("https://www.facebook.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[5px] flex justify-center items-center text-white bg-[#17205E] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                        <FaFacebookF className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                    </div>
                    <div onClick={()=>window.open("https://www.instagram.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[5px] flex justify-center items-center text-white bg-[#17205E] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                        <FaInstagram className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                    </div>
                    <div onClick={()=>window.open("https://www.linkedin.com/company/ritzmediaworld/", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[5px] flex justify-center items-center text-white bg-[#17205E] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                        <FaLinkedinIn className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                    </div>
                    <div onClick={()=>window.open("https://x.com/ritzmediaworld", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[5px] flex justify-center items-center text-white bg-[#17205E] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer">
                        <FaTwitter className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                    </div>
                    <div onClick={()=>window.open("https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia", "_blank")} className="flex w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[5px] flex justify-center items-center text-white bg-[#17205E] hover:bg-[#C99237] active:bg-[#C99237] transition-colors duration-300 cursor-pointer"> 
                        <FaYoutube className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] text-white" />
                    </div>
                   </div>
                </div>
            </div>

            {/* Row 3  */}
            <div className="flex flex-col gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-[#17205E]">
                 {/* Parteners And Collaborators Image  */}
                 <div className="mb-1 sm:mb-2">
                    <img src="/home-v3/colab-img.png" alt="parteners and collaborators" className="" onClick={()=>window.open("https://ritzmediaworld.com/work.html", "_blank")} />
                 </div>

                 {/* Copy Right Text  */}
                 <div>
                    <p className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-[400] text-center sm:text-left">Copyright © 2025 Ritz Media World. All rights reserved.</p>
                 </div>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
