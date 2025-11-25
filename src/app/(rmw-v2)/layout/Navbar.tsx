"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceSubItem {
  name: string;
  link: string;
}

interface ServiceItem {
  name: string;
  link: string;
  sub: ServiceSubItem[];
}

function Navbar() {
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch services data from API
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetch("/api/header_data");
        if (response.ok) {
          const data = await response.json();
          setServicesData(data);
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  // Fix Lenis scrolling issue - prevent Lenis from intercepting wheel events on dropdown
  useEffect(() => {
    const dropdown = servicesDropdownRef.current;
    const mobileMenu = mobileMenuRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      // Stop propagation to prevent Lenis from handling this event
      e.stopPropagation();
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Stop propagation for touch events as well
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Stop propagation for touch move events
      e.stopPropagation();
    };

    if (dropdown && servicesOpen) {
      dropdown.addEventListener("wheel", handleWheel, { passive: false });
      dropdown.addEventListener("touchstart", handleTouchStart, { passive: false });
      dropdown.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    if (mobileMenu && mobileMenuOpen) {
      mobileMenu.addEventListener("wheel", handleWheel, { passive: false });
      mobileMenu.addEventListener("touchstart", handleTouchStart, { passive: false });
      mobileMenu.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener("wheel", handleWheel);
        dropdown.removeEventListener("touchstart", handleTouchStart);
        dropdown.removeEventListener("touchmove", handleTouchMove);
      }
      if (mobileMenu) {
        mobileMenu.removeEventListener("wheel", handleWheel);
        mobileMenu.removeEventListener("touchstart", handleTouchStart);
        mobileMenu.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [servicesOpen, mobileMenuOpen]);


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
                <button onClick={() => router.push("/contact.html")} className="px-4 xl:px-6 2xl:px-8 h-9 xl:h-10 2xl:h-[42px] cursor-pointer rounded-lg text-white bg-[#D4A574] font-[500] text-sm xl:text-base 2xl:text-lg hover:bg-[#C59564] transition-colors whitespace-nowrap">
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
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">
                  {/* Dynamically render services in columns - matching original layout order */}
                  {servicesData.length > 0 && (() => {
                    // Find services by name to maintain original layout order
                    const findService = (name: string) => servicesData.find(s => s.name === name);
                    
                    const digitalMarketing = findService("Digital Marketing");
                    const radioAdvertising = findService("Radio Advertising");
                    const webDevelopment = findService("Web Development");
                    const creativeServices = findService("Creative Services");
                    const printAdvertising = findService("Print Advertising");
                    const contentMarketing = findService("Content Marketing");
                    const celebrityEndorsements = findService("Celebrity Endorsements");
                    const influencerMarketing = findService("Influencer Marketing");

                    const column1 = [digitalMarketing, radioAdvertising, webDevelopment].filter(Boolean);
                    const column2 = [creativeServices, printAdvertising, contentMarketing].filter(Boolean);
                    const column3 = [celebrityEndorsements, influencerMarketing].filter(Boolean);

                    return (
                      <>
                        {/* Column 1 - Digital Marketing, Radio Advertising, Web Development */}
                        <div className="space-y-8">
                          {column1.map((service, idx) => (
                            service && (
                              <div key={idx}>
                                <h2 className="font-[500] text-lg text-black mb-4">
                                  {service.name}
                                </h2>
                                <ul className="font-[400] text-base text-[#00000099] space-y-2">
                                  {service.sub.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subItem.link}
                                        className="hover:text-[#D4A574] transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          ))}
                        </div>

                        {/* Column 2 - Creative Services, Print Advertising, Content Marketing */}
                        <div className="space-y-8">
                          {column2.map((service, idx) => (
                            service && (
                              <div key={idx}>
                                <h2 className="font-[500] text-lg text-black mb-4">
                                  {service.name}
                                </h2>
                                <ul className="font-[400] text-base text-[#00000099] space-y-2">
                                  {service.sub.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subItem.link}
                                        className="hover:text-[#D4A574] transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          ))}
                        </div>

                        {/* Column 3 - Celebrity Endorsements, Influencer Marketing */}
                        <div className="space-y-8">
                          {column3.map((service, idx) => (
                            service && (
                              <div key={idx}>
                                <h2 className="font-[500] text-lg text-black mb-4">
                                  {service.name}
                                </h2>
                                <ul className="font-[400] text-base text-[#00000099] space-y-2">
                                  {service.sub.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subItem.link}
                                        className="hover:text-[#D4A574] transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          ))}
                        </div>
                      </>
                    );
                  })()}

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
                        <button onClick={() => router.push("/rdx-digital-marketing-course")} className="w-[191px] h-[48px] bg-[#E3AE59] text-white rounded-full cursor-pointer font-[500] text-[20px] hover:opacity-90 transition-opacity shadow-lg">
                          GET NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                    {servicesData.map((service, idx) => (
                      <div key={idx}>
                        <h3 className="font-[500] text-sm text-gray-700 mb-2">
                          {service.name}
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {service.sub.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.link}
                                onClick={toggleMobileMenu}
                                className="hover:text-[#D4A574] transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
            <button onClick={() => router.push("/contact.html")} className="w-full h-12 bg-[#D4A574] text-white rounded-full font-[500] text-base hover:bg-[#C59564] transition-colors">
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
                <button onClick={() => router.push("/rdx-digital-marketing-course")} className="w-[160px] h-10 bg-[#D4A574] text-white rounded-full cursor-pointer font-[500] text-base hover:bg-[#D39E49] transition-colors">
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
