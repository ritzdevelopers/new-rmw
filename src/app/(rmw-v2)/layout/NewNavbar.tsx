"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineChevronRight, HiOutlineMenuAlt1 } from "react-icons/hi";
import { gsap } from "gsap";
import CardNav from "./ServiceHCards";
import StaggeredMenu from "./StaggeredMenu";

function NewNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down from the top
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items = [
    {
      name: "Digital Marketing",
      link: "/services/digital-marketing",
      sub: [
        {
          name: "SEO (Search Engine Optimization)",
          link: "/services/digital-marketing/search-engine-optimization-seo"
        },
        {
          name: "PPC (Google Ads) Services",
          link: "/services/digital-marketing/ppc-google-ads-agency"
        },
        {
          name: "Social Media Management",
          link: "/services/digital-marketing/social-media-management"
        },
        {
          name: "ORM (Online Reputation Management)",
          link: "/services/digital-marketing/orm-in-digital-marketing"
        },
        {
          name: "Lead Generation",
          link: "/services/digital-marketing/lead-generation"
        },
        {
          name: "Brand Awareness",
          link: "/services/digital-marketing/brand-awareness"
        }
      ]
    },
    {
      name: "Creative Services",
      link: "/services/creative-services",
      sub: [
        {
          name: "Branding & Identity Development",
          link: "/services/creative-services/branding-and-identity-development"
        },
        {
          name: "Graphic Design",
          link: "/services/creative-services/graphic-designing"
        },
        {
          name: "Logo Design",
          link: "/services/creative-services/logo-design"
        },
        {
          name: "Print Advertising Design",
          link: "/services/creative-services/print-advertisement-design"
        },
        {
          name: "Packaging Design",
          link: "/services/creative-services/packaging-design"
        }
      ]
    },
    {
      name: "Print Advertising",
      link: "/services/print-advertising",
      sub: [
        {
          name: "Advertisement Design",
          link: "/services/print-advertising/advertisement-designing"
        },
        {
          name: "Ad Placement",
          link: "/services/print-advertising/ad-placements"
        },
        {
          name: "Copywriting",
          link: "/services/print-advertising/copywriting"
        },
        {
          name: "Cost Negotiation",
          link: "/services/print-advertising/negotiating-rates"
        },
        {
          name: "Ad Size Optimization",
          link: "/services/print-advertising/ad-size-optimization"
        },
        {
          name: "Ad Scheduling",
          link: "/services/print-advertising/advertisement-scheduling"
        }
      ]
    },
    {
      name: "Radio Advertising",
      link: "/services/radio-advertising",
      sub: [
        {
          name: "Advertising Concept Development",
          link: "/services/radio-advertising/advertisement-concept-development"
        },
        {
          name: "Scriptwriting",
          link: "/services/radio-advertising/scriptwriting"
        },
        {
          name: "Voiceover Casting",
          link: "/services/radio-advertising/voiceover-casting"
        },
        {
          name: "Recording & Production",
          link: "/services/radio-advertising/recording-and-production"
        },
        {
          name: "Media Planning And Buying",
          link: "/services/radio-advertising/media-planning-and-buying"
        },
        {
          name: "Cost Negotiations",
          link: "/services/radio-advertising/radio-cost-negotiation-india"
        }
      ]
    },
    {
      name: "Content Marketing",
      link: "/services/contents-marketing",
      sub: [
        {
          name: "Customized Content Strategy",
          link: "/services/contents-marketing/content-marketing"
        },
        {
          name: "Email and Newsletters Marketing",
          link: "/services/contents-marketing/email-and-newsletters-marketing"
        },
        {
          name: "Asset Creation and Infographics",
          link: "/services/contents-marketing/asset-creation-and-infographics"
        },
        {
          name: "Content Promotion and Optimization",
          link: "/services/contents-marketing/content-promotion-and-optimization"
        }
      ]
    },
    {
      name: "Web Development",
      link: "/services/web-designing-and-development",
      sub: [
        {
          name: "UI/UX Design",
          link: "/services/web-designing-and-development/ui-ux-design"
        },
        {
          name: "Custom Design & Development",
          link: "/services/web-designing-and-development/custom-design-development"
        },
        {
          name: "E-Commerce Website Development",
          link: "/services/web-designing-and-development/e-commerce-web-designing"
        },
        {
          name: "Landing Page Development",
          link: "/services/web-designing-and-development/landing-page-development-services"
        },
        {
          name: "WordPress Web Design",
          link: "/services/web-designing-and-development/wordpress-web-designing"
        }
      ]
    },
    {
      name: "Celebrity Endorsements",
      link: "/services/celebrity-endorsements",
      sub: [
        {
          name: "Celebrity Identification",
          link: "/services/celebrity-endorsements/celebrity-identification-services"
        },
        {
          name: "Contract Negotiations",
          link: "/services/celebrity-endorsements/negotiating-contracts"
        },
        {
          name: "Creative Collaboration",
          link: "/services/celebrity-endorsements/creative-collaboration"
        },
        {
          name: "Campaign Integration",
          link: "/services/celebrity-endorsements/campaign-integration"
        },
        {
          name: "Public Relations",
          link: "/services/celebrity-endorsements/public-relations"
        },
        {
          name: "Legal Compliance",
          link: "/services/celebrity-endorsements/legal-compliance"
        }
      ]
    },
    {
      name: "Influencer Marketing",
      link: "/services/influencer-marketing-agency-in-india",
      sub: [
        {
          name: "Influencer Identification",
          link: "/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency"
        },
        {
          name: "Cost-Benefit Analysis",
          link: "/services/influencer-marketing-agency-in-india/cost-benefit-analysis"
        },
        {
          name: "Terms Negotiations",
          link: "/services/influencer-marketing-agency-in-india/terms-negotiations"
        },
        {
          name: "Creative Collaboration",
          link: "/services/influencer-marketing-agency-in-india/creative-collaboration"
        },
        {
          name: "Campaign Integration",
          link: "/services/influencer-marketing-agency-in-india/campaign-integration"
        },
        {
          name: "Messaging Optimization",
          link: "/services/influencer-marketing-agency-in-india/messaging-optimization"
        }
      ]
    }
  ];

  // Background colors for each service card
  const bgColors = [
    "#0D0716", // Digital Marketing
    "#170D27", // Creative Services
    "#271E37", // Print Advertising
    "#1a0f2e", // Radio Advertising
    "#0f1a2e", // Content Marketing
    "#1e2a3e", // Web Development
    "#2a1e3e", // Celebrity Endorsements
    "#2a1e2e", // Influencer Marketing
  ];

  const [isHovered, setIsHovered] = useState(false);

  // GSAP Animation for container and items
  useEffect(() => {
    if (isHovered && containerRef.current) {
      // Kill existing timeline if any
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create new timeline
      const tl = gsap.timeline();

      // Animate container
      gsap.set(containerRef.current, { opacity: 0, y: -20 });
      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      });

      // Animate items with stagger
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, { opacity: 0, x: -30, scale: 0.9 });
          tl.to(
            item,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)"
            },
            index * 0.1 // Stagger delay
          );
        }
      });

      timelineRef.current = tl;
    } else if (!isHovered && timelineRef.current) {
      // Reverse animation when hiding
      timelineRef.current.reverse();
    }

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isHovered]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Auto-open menu when isMenuOpen becomes true
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay to ensure the menu is rendered, then find and click the toggle button
      setTimeout(() => {
        const toggleButton = document.querySelector('.sm-toggle') as HTMLButtonElement;
        if (toggleButton) {
          const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
          if (!isExpanded) {
            toggleButton.click();
          }
        }
      }, 200);
    }
  }, [isMenuOpen]);


  const menuItems = [
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Our Work', ariaLabel: 'View our work', link: '/' },
    { label: 'Company', ariaLabel: 'Learn about our company', link: '/' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/' }
  ];
  
  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Facebook', link: 'https://facebook.com' }
  ];
  

  // Mobile-specific states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  const mobileMenuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mobileServicesTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        // Open animation
        if (mobileMenuTimelineRef.current) {
          mobileMenuTimelineRef.current.kill();
        }
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        const tl = gsap.timeline();
        
        // Get actual height
        gsap.set(mobileMenuRef.current, { height: 'auto' });
        const height = mobileMenuRef.current.scrollHeight;
        gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });
        
        gsap.set(menuItems, { opacity: 0, y: -20 });
        
        tl.to(mobileMenuRef.current, {
          height: height,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out"
        });
        
        tl.to(menuItems, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out"
        }, "-=0.2");
        
        mobileMenuTimelineRef.current = tl;
      } else {
        // Close animation - also close services if open
        if (isMobileServicesOpen) {
          setIsMobileServicesOpen(false);
        }
        if (mobileMenuTimelineRef.current) {
          const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
          const tl = gsap.timeline();
          
          tl.to(menuItems, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in"
          });
          
          tl.to(mobileMenuRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in"
          }, "-=0.1");
          
          mobileMenuTimelineRef.current = tl;
        }
      }
    }
    
    return () => {
      if (mobileMenuTimelineRef.current) {
        mobileMenuTimelineRef.current.kill();
      }
    };
  }, [isMobileMenuOpen, isMobileServicesOpen]);

  // GSAP Animation for mobile services dropdown
  useEffect(() => {
    if (mobileServicesRef.current) {
      if (isMobileServicesOpen) {
        if (mobileServicesTimelineRef.current) {
          mobileServicesTimelineRef.current.kill();
        }
        
        // Get actual height
        gsap.set(mobileServicesRef.current, { height: 'auto' });
        const height = mobileServicesRef.current.scrollHeight;
        gsap.set(mobileServicesRef.current, { height: 0, opacity: 0 });
        
        const tl = gsap.timeline();
        gsap.set(mobileItemsRef.current.filter(Boolean), { opacity: 0, x: -30, scale: 0.9 });
        
        tl.to(mobileServicesRef.current, {
          height: height,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
        
        mobileItemsRef.current.forEach((item, index) => {
          if (item) {
            tl.to(
              item,
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.4)"
              },
              index * 0.08
            );
          }
        });
        
        mobileServicesTimelineRef.current = tl;
      } else if (!isMobileServicesOpen && mobileServicesRef.current) {
        // Close animation
        if (mobileServicesTimelineRef.current) {
          const tl = gsap.timeline();
          const items = mobileItemsRef.current.filter(Boolean);
          
          tl.to(items, {
            opacity: 0,
            x: -20,
            scale: 0.95,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in"
          });
          
          tl.to(mobileServicesRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in"
          }, "-=0.1");
          
          mobileServicesTimelineRef.current = tl;
        }
      }
    }
    
    return () => {
      if (mobileServicesTimelineRef.current) {
        mobileServicesTimelineRef.current.kill();
      }
    };
  }, [isMobileServicesOpen]);

  // Handle body scroll lock on mobile
  useEffect(() => {
    if (isMobileMenuOpen || isMobileServicesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMobileServicesOpen]);

  return (
    <>
      {/* Desktop Navbar - Only visible on lg and above */}
      <nav
        className={`hidden lg:flex w-full justify-center items-center py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
      {/* Centered Align Div  */}
      <div className="w-[90%] flex justify-between items-center">
        {/* Left Side Container  */}
        <div>
          <img src="/home-v3/logo.png" alt="RMW Logo" />
        </div>
        {/* Right Side Container  */}
        <div
          className={`flex justify-end items-center gap-4 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <ul className="flex justify-end items-center gap-12">
            <li>
              <Link
                onMouseEnter={() => {
                  // Clear any existing timeout
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                  }
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  // Set timeout to hide after 2 seconds, but only if mouse doesn't enter the container
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                  }
                  hoverTimeoutRef.current = setTimeout(() => {
                    setIsHovered(false);
                    hoverTimeoutRef.current = null;
                  }, 800);
                }}
                href="/"
                className={`font-[700] text-[16px] transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`font-[700] text-[16px] transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                }`}
              >
                Our Work
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`font-[700] text-[16px] transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                }`}
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`font-[700] text-[16px] transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <div className="flex gap-4 justify-center items-center">
                <button className="w-[168px] h-[44px] font-[700] text-[15px] rounded-[5px] bg-[#C99237] cursor-pointer text-white hover:bg-[#B8822F] transition-colors duration-300">
                  Free Consulting
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${
                    isScrolled ? "text-black" : "text-white"
                  } h-[34px] w-[34px] cursor-pointer transition-colors duration-300 hover:text-[#C99237] flex items-center justify-center`}
                  aria-label="Toggle menu"
                >
                  <HiOutlineMenuAlt1 className="h-full w-full" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Fixed Position Container  */}
      {isHovered && (
        <div
          ref={containerRef}
          className="w-[90%] max-w-[1400px] fixed top-20 left-1/2 py-6 px-6 bg-white rounded-lg shadow-2xl transform -translate-x-1/2 z-[100] overflow-y-auto max-h-[calc(100vh-100px)]"
          onMouseEnter={() => {
            // Clear timeout when mouse enters the container - keep it visible
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            // Hide immediately when mouse leaves the container
            setIsHovered(false);
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
          }}
        >
          <div className="flex flex-wrap justify-center items-start gap-4">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  style={{
                    backgroundColor: bgColors[index] || "#0D0716",
                    color: "#fff",
                  }}
                  className="w-[280px] min-h-[280px] rounded-[8px] flex flex-col justify-between p-5 shadow-lg"
                >
                  {/* Main Service Name  */}
                  <div>
                    <Link
                      href={item.link}
                      className="font-[700] text-[18px] transition-colors duration-300 text-white hover:text-[#C99237] cursor-pointer block mb-3"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Sub Services  */}
                  <div className="flex flex-col gap-2.5">
                    {item.sub.map((subItem, subIndex) => {
                      return (
                        <div key={subIndex} className="flex items-center gap-2">
                          <HiOutlineChevronRight className="w-[16px] h-[16px] text-white flex-shrink-0" />
                          <Link
                            href={subItem.link}
                            className="font-[400] text-[14px] transition-colors duration-300 text-white hover:text-[#C99237] cursor-pointer"
                          >
                            {subItem.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Staggered Menu */}
      {(isMenuOpen || isMenuClosing) && (
        <div className="fixed inset-0 z-[9999]" style={{ height: '100vh', background: '#1a1a1a' }}>
          <div className="relative w-full h-full">
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor={isScrolled ? "#000" : "#fff"}
              openMenuButtonColor="#000"
              changeMenuColorOnOpen={true}
              colors={['#1a1a1a', '#2a2a2a']}
              logoUrl="/home-v3/logo.png"
              accentColor="#C99237"
              isFixed={true}
              closeOnClickAway={true}
              onMenuOpen={() => {
                setIsMenuOpen(true);
              }}
              onMenuClose={() => {
                setIsMenuClosing(true);
                // Delay unmounting to allow close animation to complete
                setTimeout(() => {
                  setIsMenuOpen(false);
                  setIsMenuClosing(false);
                }, 800); // Match the close animation duration
              }}
            />
          </div>
        </div>
      )}
    </nav>

      {/* Mobile Navbar - Only visible below lg */}
      <nav
        className={`lg:hidden w-full flex justify-center items-center py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-[95%] flex justify-between items-center">
          {/* Logo */}
          <div>
            <img 
              src="/home-v3/logo.png" 
              alt="RMW Logo" 
              className="h-[32px] sm:h-[36px] w-auto object-contain"
            />
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              isScrolled ? "text-black" : "text-white"
            } h-[32px] w-[32px] cursor-pointer transition-colors duration-300 active:text-[#C99237] flex items-center justify-center relative z-10`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HiOutlineMenuAlt1 className="h-full w-full" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden max-h-[calc(100vh-60px)] overflow-y-auto"
          style={{ opacity: 0, zIndex: 50 }}
        >
          <div className="w-[95%] mx-auto py-4 space-y-1">
            {/* Services Link with Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`mobile-menu-item w-full text-left font-[700] text-[16px] py-3 px-4 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:bg-gray-100 active:bg-gray-100"
                    : "text-black hover:bg-gray-100 active:bg-gray-100"
                } flex items-center justify-between`}
              >
                <span>Services</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isMobileServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Dropdown */}
              <div
                ref={mobileServicesRef}
                className="overflow-hidden mt-2"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-4 pb-4 space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        mobileItemsRef.current[index] = el;
                      }}
                      style={{
                        backgroundColor: bgColors[index] || "#0D0716",
                        color: "#fff",
                      }}
                      className="rounded-lg p-4 shadow-md"
                    >
                      <Link
                        href={item.link}
                        className="font-[700] text-[16px] text-white block mb-2"
                        onClick={() => {
                          setIsMobileServicesOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-col gap-2">
                        {item.sub.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            className="font-[400] text-[13px] text-white/90 hover:text-[#C99237] flex items-center gap-2"
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <HiOutlineChevronRight className="w-[14px] h-[14px] flex-shrink-0" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Menu Items */}
            <Link
              href="/"
              className="mobile-menu-item block font-[700] text-[16px] py-3 px-4 rounded-lg transition-colors duration-300 text-black hover:bg-gray-100 active:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Work
            </Link>
            <Link
              href="/"
              className="mobile-menu-item block font-[700] text-[16px] py-3 px-4 rounded-lg transition-colors duration-300 text-black hover:bg-gray-100 active:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Company
            </Link>
            <Link
              href="/"
              className="mobile-menu-item block font-[700] text-[16px] py-3 px-4 rounded-lg transition-colors duration-300 text-black hover:bg-gray-100 active:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              className="mobile-menu-item w-full font-[700] text-[15px] py-3 px-4 rounded-lg bg-[#C99237] text-white hover:bg-[#B8822F] active:bg-[#B8822F] transition-colors duration-300 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Free Consulting
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ top: '60px', zIndex: 40 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </>
  );
}

export default NewNavbar;