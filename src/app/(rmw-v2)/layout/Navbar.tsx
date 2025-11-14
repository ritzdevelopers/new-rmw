"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add custom scrollbar styles
  useEffect(() => {
    const styleId = "services-dropdown-scrollbar-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .services-dropdown-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        .services-dropdown-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .services-dropdown-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .services-dropdown-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .services-dropdown-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (!ulRef.current) return;

      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);

      if (scrolled) {
        navRef.current.style.position = "fixed";
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "white";
        navRef.current.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        ulRef.current.style.color = "black";
      } else {
        navRef.current.style.position = "absolute";
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "rgba(0, 0, 0, 0)";
        navRef.current.style.removeProperty("box-shadow");
        ulRef.current.style.color = "white";
      }
    };

    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle services dropdown hover
  const handleMouseHover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-services-link]")
      ) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [servicesOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-mobile-menu-button]")
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Close menus on route change or when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      setServicesOpen(false);
    }
  }, [mobileMenuOpen]);

  // Close mobile menu services when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileServicesOpen(false);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
    <nav
      ref={navRef}
        className="w-full flex justify-center overflow-x-hidden items-center absolute top-0 left-0 z-50 transition-all duration-300"
    >
      {/* Centered Align Div  */}
        <div className="xl:w-[90%] w-full flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo div - Responsive */}
          <Link
            href="/new-home"
            className="relative h-[32px] w-[180px] sm:h-[38px] sm:w-[210px] md:h-[42px] md:w-[245px]"
          >
          <Image
            fill
            src={"/new-page/new-design-logo.png"}
            alt="Ritz Media World"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
          <ul
            ref={ulRef}
              className="flex justify-center items-center gap-4 xl:gap-6 2xl:gap-8 font-[500] text-white text-sm xl:text-base 2xl:text-lg transition-colors duration-300"
          >
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>Home</Link>
            </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>About</Link>
            </li>
              <li
                className="cursor-pointer hover:opacity-80 transition-opacity relative"
                onMouseEnter={handleMouseHover}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={"/new-home"} data-services-link>
                Services
              </Link>
            </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>Our Work</Link>
            </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>Blog</Link>
            </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>Academy</Link>
            </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
              <Link href={"/new-home"}>Contact Us</Link>
            </li>
              <li>
                <button className="px-4 xl:px-6 2xl:px-8 h-9 xl:h-10 2xl:h-[42px] cursor-pointer rounded-lg text-white bg-[#D4A574] font-[500] text-sm xl:text-base 2xl:text-lg hover:bg-[#C59564] transition-colors whitespace-nowrap">
                Free Consulting
              </button>
            </li>
          </ul>
        </div>

          {/* Mobile Navigation Button */}
          <button
            data-mobile-menu-button
            onClick={toggleMobileMenu}
            className={`block lg:hidden transition-colors p-2 ${
              isScrolled || mobileMenuOpen
                ? "text-black hover:text-gray-700"
                : "text-white hover:text-gray-200"
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
      </div>

        {/* Desktop Services Dropdown */}
        {servicesOpen && (
        <div
            ref={servicesDropdownRef}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
            className="hidden lg:block fixed top-[72px] left-0 w-full bg-white shadow-lg z-40 transition-opacity duration-200 opacity-100 lg:w-[95%] lg:left-[50%] lg:transform lg:-translate-x-1/2 services-dropdown-scroll"
            style={{
              maxHeight: "calc(100vh - 72px)",
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">
                {/* Column 1 - Digital Marketing, Radio Advertising, Web Development */}
                <div className="space-y-8">
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Digital Marketing
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          SEO (Search Engine Optimization)
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          PPC (Google Ads) Services
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Social Media Management
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          ORM (Online Reputation Management)
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Lead Generation
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Brand Awareness
                        </Link>
                  </li>
                </ul>
              </div>
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Radio Advertising
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Advertising Concept Development
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Scriptwriting
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Voiceover Casting
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Recording & Production
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Media Planning And Buying
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Cost Negotiations
                        </Link>
                  </li>
                </ul>
              </div>
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Web Development
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          UI/UX Design
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Custom Design & Development
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          E-Commerce Website Development
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Landing Page Development
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          WordPress Web Design
                        </Link>
                  </li>
                </ul>
              </div>
            </div>

                {/* Column 2 - Creative Services, Print Advertising, Content Marketing */}
                <div className="space-y-8">
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Creative Services
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Branding & Identity Development
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Graphic Design
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Logo Design
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Print Advertising Design
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Packaging Design
                        </Link>
                  </li>
                </ul>
              </div>
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Print Advertising
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Advertisement Design
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Ad Placement
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Copywriting
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Cost Negotiation
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Ad Size Optimization
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Ad Scheduling
                        </Link>
                  </li>
                </ul>
              </div>
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Content Marketing
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Customized Content Strategy
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Email and Newsletters Marketing
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Blog Writing & Management
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Asset Creation and Infographics
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Content Promotion and Optimization
                        </Link>
                  </li>
                </ul>
              </div>
            </div>

                {/* Column 3 - Celebrity Endorsements, Influencer Marketing */}
                <div className="space-y-8">
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Celebrity Endorsements
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Celebrity Identification
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Contract Negotiations
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Creative Collaboration
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Campaign Integration
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Public Relations
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Legal Compliance
                        </Link>
                  </li>
                </ul>
              </div>
              <div>
                    <h2 className="font-[500] text-lg text-black mb-4">
                  Influencer Marketing
                </h2>
                    <ul className="font-[400] text-base text-[#00000099] space-y-2">
                      <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Influencer Identification
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Cost-Benefit Analysis
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Terms Negotiations
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Creative Collaboration
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Campaign Integration
                        </Link>
                  </li>
                  <li>
                        <Link
                          href={"/"}
                          className="hover:text-[#D4A574] transition-colors"
                        >
                          Messaging Optimization
                        </Link>
                  </li>
                </ul>
                  </div>
                </div>

                {/* Column 4 - Special Offer Image (Desktop only) */}
                <div className="hidden xl:block relative h-[698px] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
                  <Image
                    src={"/new-page/dog.png"}
                    fill
                    alt="Special Offer"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center p-6 bg-gradient-to-b from-black/200 to-black/40">
                    {/* Top Section - Text */}
                    <div className="text-center pt-4">
                      <p className="uppercase font-[500] text-white text-[18px] sm:text-[20px] mb-2">
                        SPECIAL OFFER
                      </p>
                      <p className="uppercase font-[500] text-white text-[18px] sm:text-[20px] mb-3">
                        GET UPTO
                      </p>
                      <p className="text-[#E3AE59] font-bold text-[20px] sm:text-[25px] lg:text-[35px]">
                        10% OFF
                      </p>
                    </div>

                    {/* Bottom Section - Button and Small Text */}
                    <div className="flex flex-col items-center gap-3 pb-4">
                      <button className="w-[191px] h-[48px] bg-[#E3AE59] text-white rounded-full cursor-pointer font-[500] text-[20px] hover:opacity-90 transition-opacity shadow-lg">
                        GET NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[400px] bg-white shadow-2xl z-[70] lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto services-dropdown-scroll">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b-[0.8px] border-[#b8b8b8]">
            <div className="relative h-8 w-40">
              <Image
                fill
                src={"/new-page/new-design-logo.png"}
                alt="Ritz Media World"
                className="object-contain"
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} className="text-black" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Services
                  <span
                    className={`transform transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {/* Mobile Services Dropdown */}
                {mobileServicesOpen && (
                  <div className="pl-4 mt-2 space-y-4 border-l-2 border-gray-200">
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Digital Marketing
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            SEO
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            PPC Advertising
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Social Media
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Radio Advertising
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Scriptwriting
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Production
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Web Development
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            UI/UX Design
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            E-Commerce
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Creative Services
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Branding
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Graphic Design
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Print Advertising
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Ad Design
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Ad Placement
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Content Marketing
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Content Strategy
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Blog Writing
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Celebrity Endorsements
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Celebrity Identification
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Contract Negotiations
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-[500] text-sm text-gray-700 mb-2">
                        Influencer Marketing
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Influencer Identification
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={toggleMobileMenu}>
                            Campaign Integration
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/new-home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t-[0.8px] border-[#b8b8b8]">
            <button className="w-full h-12 bg-[#D4A574] text-white rounded-full font-[500] text-base hover:bg-[#C59564] transition-colors">
              Free Consulting
            </button>
            {/* Special Offer Section for Mobile */}
            <div className="mt-4 relative h-48 rounded-lg overflow-hidden">
              <Image
                src={"/new-page/dog.png"}
                fill
                alt="Special Offer"
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full flex flex-col justify-end gap-2 items-center p-4 bg-black/30">
                <div className="text-center">
                  <p className="uppercase font-[500] text-white text-sm">
                    Special Offer <br /> Get upto
                  </p>
                </div>
                <button className="w-[160px] h-10 bg-[#D4A574] text-white rounded-full cursor-pointer font-[500] text-base hover:bg-[#D39E49] transition-colors">
                    Get Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Navbar;
