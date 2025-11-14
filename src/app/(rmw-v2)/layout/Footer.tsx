"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";

function Footer() {
  const handleConsultation = () => {
    // Handle consultation button click
    console.log("Schedule consultation clicked");
    // You can add navigation or modal opening logic here
  };

  return (
    <footer className="w-full overflow-x-hidden flex justify-center items-center pt-12 bg-[#101828]">
      {/* Centered Align Div  */}
      <div className="w-full max-w-[95%] flex flex-col">
        {/* Row 1 - CTA Banner */}
        <div className="w-full min-h-[120px] sm:min-h-[130px] md:min-h-[146px] bg-[#D4A574] text-white flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
            <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[1.2] text-white">
              Ready to Elevate Your Brand?
            </h2>
            <p className="font-[400] text-[14px]  text-white/90">
              Let&apos;s discuss your next brand-elevating campaign
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleConsultation}
              className="font-[500] rounded-[8px] bg-white cursor-pointer text-[13px] sm:text-[14px] w-full sm:w-[200px] md:w-[232px] h-[40px]  text-[#D4A574] hover:bg-[#F0F0F0] transition-colors duration-300 whitespace-nowrap"
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>

        {/* Row 2 - Main Footer Content */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between items-start px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-16 gap-8 sm:gap-10 md:gap-12 lg:gap-6 xl:gap-8">
          {/* Box 1 - Logo & About */}
          <div className="flex flex-col w-full min-h-[206px] justify-between gap-6 sm:gap-8">
            {/* Logo Container */}
            <div className="w-[140px] sm:w-[160px] md:w-[180px] h-auto">
              <Link href="/" className="block">
                <Image
                  src="/new-page/new-design-logo.png"
                  alt="RITZ Media World Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            {/* Paragraph */}
            <div>
              <p className="font-[400] text-[14px]  leading-[1.6] text-[#D1D5DC]">
                Transforming brands into household names through creative
                strategy and digital innovation since 2008.
              </p>
            </div>
            {/* Social Media Icons */}
            <div className="flex w-full justify-start items-center gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/company/ritzmediaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#D4A574] transition-colors duration-300 cursor-pointer group"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.facebook.com/ritzmediaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#D4A574] transition-colors duration-300 cursor-pointer group"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/ritzmediaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#D4A574] transition-colors duration-300 cursor-pointer group"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.twitter.com/ritzmediaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#D4A574] transition-colors duration-300 cursor-pointer group"
                aria-label="Twitter"
              >
                <LuTwitter className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Box 2 - Services */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5">
            <h2 className="font-[600] text-[16px] text-white mb-2">
              Services
            </h2>
            <Link
              href="/services/lead-gen-digital"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Lead-Gen Digital
            </Link>
            <Link
              href="/services/creative-print-ooh"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Creative Print & OOH
            </Link>
            <Link
              href="/services/branding-identity"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Branding & Identity
            </Link>
            <Link
              href="/services/web-experience"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Web & Experience
            </Link>
            <Link
              href="/services/content-strategy"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Content Strategy
            </Link>
          </div>

          {/* Box 3 - Industries */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5">
            <h2 className="font-[600] text-[16px] sm:text-[17px] md:text-[16px] text-white mb-2">
              Industries
            </h2>
            <Link
              href="/industries/real-estate"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Real Estate
            </Link>
            <Link
              href="/industries/construction"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Construction
            </Link>
            <Link
              href="/industries/lifestyle-brands"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Lifestyle Brands
            </Link>
            <Link
              href="/industries/uhni-segment"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              UHNI Segment
            </Link>
            <Link
              href="/industries/consumer-goods"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
            >
              Consumer Goods
            </Link>
          </div>

          {/* Box 4 - Contact Us */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5">
            <h2 className="font-[600] text-[16px] sm:text-[17px] md:text-[16px] text-white mb-2">
              Contact Us
            </h2>
            <div className="flex gap-3 sm:gap-4 items-start">
              <GrLocation className="w-[20px] h-[20px] text-[#D4A574] flex-shrink-0 mt-1" />
              <p className="font-[400] text-[14px]  leading-[1.6] text-[#D1D5DC]">
                Delhi NCR, India <br /> Serving Pan-India
              </p>
            </div>
            <a
              href="tel:+911234567890"
              className="flex gap-3 sm:gap-4 items-center hover:text-[#D4A574] transition-colors duration-300 cursor-pointer group"
            >
              <MdOutlineLocalPhone className="w-[20px] h-[20px] text-[#D4A574] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  text-[#D1D5DC] group-hover:text-[#D4A574] transition-colors duration-300">
                +91 123 456 7890
              </p>
            </a>
            <a
              href="mailto:hello@ritzmediaworld.com"
              className="flex gap-3 sm:gap-4 items-center hover:text-[#D4A574] transition-colors duration-300 cursor-pointer group"
            >
              <MdOutlineMailOutline className="w-[20px] h-[20px] text-[#D4A574] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  text-[#D1D5DC] group-hover:text-[#D4A574] transition-colors duration-300 break-all">
                hello@ritzmediaworld.com
              </p>
            </a>
          </div>
        </div>

        {/* Row 3 - Footer Bottom */}
        <div className="w-full border-t-[0.8px] border-[#1E2939] flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 gap-4 sm:gap-6">
          <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] text-center sm:text-left">
            © 2025 RITZ Media World. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6">
            <li>
              <Link
                href="/privacy-policy"
                className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap"
                className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#D4A574] transition-colors duration-300 cursor-pointer"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
