"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuDownload, LuMail } from "react-icons/lu";
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { gsap } from "gsap";

function S11() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle download logic here
    console.log("Download requested for:", email);
  };

  const handleAuditRequest = () => {
    // Handle audit request logic here
    console.log("Audit requested");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, x: -50 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        rightRef.current,
        { autoAlpha: 0, x: 50 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      // Stagger animation for list items
      gsap.fromTo(
        ".list-item-animate",
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-b from-[#101828] via-[#1E2939] to-[#1E2939] overflow-x-hidden relative"
    >
      {/* Centered Align Div  */}
      <div className="w-[90%] max-w-[1400px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 relative z-20 ">
        {/* Left Side Container  */}
        <div
          ref={leftRef}
          className="w-full lg:w-[664px] xl:w-[700px] min-h-[552px] flex flex-col justify-between gap-6 sm:gap-8 md:gap-10"
        >
          {/* Top Section */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <button className="w-fit px-4 sm:px-5 py-2 sm:py-2.5 font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-white rounded-full bg-[#D4A574] cursor-pointer hover:bg-[#C8955F] transition-colors duration-300">
              Free Resource
            </button>
            <div className="flex flex-col gap-2">
              <h3 className="font-[500] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-[#D4A574]">
                2025 Brand Impact Report
              </h3>
              <h3 className="font-[500] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-white">
                Download Our
              </h3>
            </div>
            <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-[#D1D5DC] max-w-[600px]">
              Get exclusive insights into real estate and lifestyle brand
              marketing trends, strategies, and ROI benchmarks for 2025.
            </p>
          </div>

          {/* Middle Section - List */}
          <div>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[24px] h-[24px] rounded-full"></div>
                <span>Industry benchmarks for real estate marketing ROI</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[24px] h-[24px] rounded-full"></div>
                <span>Proven strategies for UHNI audience targeting</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[24px] h-[24px] rounded-full"></div>
                <span>2025 digital and print advertising trends</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[24px] h-[24px] rounded-full"></div>
                <span>Case studies with measurable results</span>
              </li>
            </ul>
          </div>

          {/* Bottom Section - Form */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <form
              onSubmit={handleDownload}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <div className="flex-1 relative">
                <LuMail className="absolute left-4 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#99A1AF]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[48px] sm:h-[56px] pl-11 sm:pl-12 md:pl-14 pr-4 sm:pr-5 md:pr-6 bg-white/10 border border-white/20 rounded-[8px] text-white placeholder:text-[#99A1AF] focus:outline-none focus:border-[#D4A574] focus:bg-white/15 transition-all duration-300 text-[14px] sm:text-[15px] md:text-[16px]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-[164px] h-[48px] sm:h-[56px] bg-[#D4A574] text-white flex justify-center items-center gap-2 rounded-[8px] font-[500] text-[14px] sm:text-[15px] md:text-[16px] hover:bg-[#C8955F] transition-colors duration-300 cursor-pointer"
              >
                <LuDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download Free</span>
              </button>
            </form>
            <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#99A1AF]">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Right Side Container  */}
        <div
          ref={rightRef}
          className="w-full lg:w-[624px] xl:w-[680px] rounded-[20px] sm:rounded-[22px] md:rounded-[24px] border-[0.8px] border-white/30 min-h-[450px] sm:min-h-[480px] md:min-h-[518px] gap-6 sm:gap-8 md:gap-[32px] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-white/5 backdrop-blur-sm"
        >
          {/* Top Section */}
          <div className="w-full max-w-[518px] flex flex-col justify-center items-center text-center gap-4 sm:gap-5 md:gap-6">
            <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] rounded-[14px] sm:rounded-[15px] md:rounded-[16px] bg-[#D4A574] flex justify-center items-center text-white hover:bg-[#D4A574]/30 transition-colors duration-300">
              <FaArrowRightLong className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffffff]" />
            </div>
            <h2 className="font-[600] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-white">
              Or Get a Free <span className="text-[#D4A574]">Brand Audit</span>
            </h2>
            <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-[#D1D5DC]">
              Let our experts analyze your current brand positioning and provide
              actionable recommendations.
            </p>
          </div>

          {/* Middle Section - List */}
          <div className="w-full max-w-[500px]">
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[6px] h-[6px] rounded-full mt-2"></div>
                <span>Comprehensive brand analysis</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[6px] h-[6px] rounded-full mt-2"></div>
                <span>Competitor positioning review</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[6px] h-[6px] rounded-full mt-2"></div>
                <span>Growth opportunity identification</span>
              </li>
              <li className="list-item-animate font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#D1D5DC] flex items-start gap-3">
                <div className="bg-[#D4A574] w-[6px] h-[6px] rounded-full mt-2"></div>
                <span>Customized strategy roadmap</span>
              </li>
            </ul>
          </div>

          {/* Bottom Section - Button */}
          <button
            onClick={handleAuditRequest}
            className="w-full px-6 sm:px-8 md:px-10 h-[40px] font-[500] text-[14px] sm:text-[15px] md:text-[16px] text-[#101828] rounded-[8px] bg-white hover:bg-[#F0F0F0] flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request A Free Audit</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Absolute Positioned Divs */}
      {/* div 1  */}
      <div className="w-[484px] h-[484px] opacity-[10%] absolute bottom-0  -right-5 z-0">
        <img src="/new-page/cont-1.png" className="w-full h-full object-contain" alt="" />
      </div>

       {/* div 2  */}
       <div className="w-[484px] h-[484px] opacity-[10%] absolute left-0  top-0 z-0">
        <img src="/new-page/cont-2.png" className="w-full h-full object-contain" alt="" />
      </div>
    </section>
  );
}

export default S11;
