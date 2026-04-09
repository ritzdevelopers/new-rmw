"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineChevronRight, HiOutlineMenuAlt1 } from "react-icons/hi";
import HCaptcha from "@hcaptcha/react-hcaptcha";
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
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items = [
    {
      name: "Digital Marketing",
      link: "https://ritzmediaworld.com/services/digital-marketing",
      sub: [
        {
          name: "SEO (Search Engine Optimization)",
          link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo"
        },
        {
          name: "PPC (Google Ads) Services",
          link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency"
        },
        {
          name: "Social Media Management",
          link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management"
        },
        {
          name: "ORM (Online Reputation Management)",
          link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing"
        },
        {
          name: "Lead Generation",
          link: "https://ritzmediaworld.com/services/digital-marketing/lead-generation"
        },
        {
          name: "Brand Awareness",
          link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness"
        }
      ]
    },
    {
      name: "Creative Services",
      link: "https://ritzmediaworld.com/services/creative-services",
      sub: [
        {
          name: "Branding & Identity Development",
          link: "https://ritzmediaworld.com/services/creative-services/branding-and-identity-development"
        },
        {
          name: "Graphic Design",
          link: "https://ritzmediaworld.com/services/creative-services/graphic-designing"
        },
        {
          name: "Logo Design",
          link: "https://ritzmediaworld.com/services/creative-services/logo-design"
        },
        {
          name: "Print Advertising Design",
          link: "https://ritzmediaworld.com/services/creative-services/print-advertisement-design"
        },
        {
          name: "Packaging Design",
          link: "https://ritzmediaworld.com/services/creative-services/packaging-design"
        }
      ]
    },
    {
      name: "Print Advertising",
      link: "https://ritzmediaworld.com/services/print-advertising",
      sub: [
        {
          name: "Advertisement Design",
          link: "https://ritzmediaworld.com/services/print-advertising/advertisement-designing"
        },
        {
          name: "Ad Placement",
          link: "https://ritzmediaworld.com/services/print-advertising/ad-placements"
        },
        {
          name: "Copywriting",
          link: "https://ritzmediaworld.com/services/print-advertising/copywriting"
        },
        {
          name: "Cost Negotiation",
          link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates"
        },
        {
          name: "Ad Size Optimization",
          link: "https://ritzmediaworld.com/services/print-advertising/ad-size-optimization"
        },
        {
          name: "Ad Scheduling",
          link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling"
        }
      ]
    },
    {
      name: "Radio Advertising",
      link: "https://ritzmediaworld.com/services/radio-advertising",
      sub: [
        {
          name: "Advertising Concept Development",
          link: "https://ritzmediaworld.com/services/radio-advertising/advertisement-concept-development"
        },
        {
          name: "Scriptwriting",
          link: "https://ritzmediaworld.com/services/radio-advertising/scriptwriting"
        },
        {
          name: "Voiceover Casting",
          link: "https://ritzmediaworld.com/services/radio-advertising/voiceover-casting"
        },
        {
          name: "Recording & Production",
          link: "https://ritzmediaworld.com/services/radio-advertising/recording-and-production"
        },
        {
          name: "Media Planning And Buying",
          link: "https://ritzmediaworld.com/services/radio-advertising/media-planning-and-buying"
        },
        {
          name: "Cost Negotiations",
          link: "https://ritzmediaworld.com/services/radio-advertising/radio-cost-negotiation-india"
        }
      ]
    },
    {
      name: "Content Marketing",
      link: "https://ritzmediaworld.com/services/contents-marketing",
      sub: [
        {
          name: "Customized Content Strategy",
          link: "https://ritzmediaworld.com/services/contents-marketing/content-marketing"
        },
        {
          name: "Email and Newsletters Marketing",
          link: "https://ritzmediaworld.com/services/contents-marketing/email-and-newsletters-marketing"
        },
        {
          name: "Asset Creation and Infographics",
          link: "https://ritzmediaworld.com/services/contents-marketing/asset-creation-and-infographics"
        },
        {
          name: "Content Promotion and Optimization",
          link: "https://ritzmediaworld.com/services/contents-marketing/content-promotion-and-optimization"
        }
      ]
    },
    {
      name: "Web Development",
      link: "https://ritzmediaworld.com/services/web-designing-and-development",
      sub: [
        {
          name: "UI/UX Design",
          link: "https://ritzmediaworld.com/services/web-designing-and-development/ui-ux-design"
        },
        {
          name: "Custom Design & Development",
          link: "https://ritzmediaworld.com/services/web-designing-and-development/custom-design-development"
        },
        {
          name: "E-Commerce Website Development",
          link: "https://ritzmediaworld.com/services/web-designing-and-development/e-commerce-web-designing"
        },
        {
          name: "Landing Page Development",
          link: "https://ritzmediaworld.com/services/web-designing-and-development/landing-page-development-services"
        },
        {
          name: "WordPress Web Design",
          link: "https://ritzmediaworld.com/services/web-designing-and-development/wordpress-web-designing"
        }
      ]
    },
    {
      name: "Celebrity Endorsements",
      link: "https://ritzmediaworld.com/services/celebrity-endorsements",
      sub: [
        {
          name: "Celebrity Identification",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/celebrity-identification-services"
        },
        {
          name: "Contract Negotiations",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/negotiating-contracts"
        },
        {
          name: "Creative Collaboration",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/creative-collaboration"
        },
        {
          name: "Campaign Integration",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/campaign-integration"
        },
        {
          name: "Public Relations",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/public-relations"
        },
        {
          name: "Legal Compliance",
          link: "https://ritzmediaworld.com/services/celebrity-endorsements/legal-compliance"
        }
      ]
    },
    {
      name: "Influencer Marketing",
      link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
      sub: [
        {
          name: "Influencer Identification",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency"
        },
        {
          name: "Cost-Benefit Analysis",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/cost-benefit-analysis"
        },
        {
          name: "Terms Negotiations",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/terms-negotiations"
        },
        {
          name: "Creative Collaboration",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/creative-collaboration"
        },
        {
          name: "Campaign Integration",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/campaign-integration"
        },
        {
          name: "Messaging Optimization",
          link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/messaging-optimization"
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
    { label: 'Blogs', ariaLabel: 'View our services', link: 'https://ritzmediaworld.com/blogs' },

    { label: 'Career', ariaLabel: 'Learn about our company', link: 'https://ritzmediaworld.com/career' },
    { label: 'Gallery', ariaLabel: 'Visit our gallery', link: 'https://ritzmediaworld.com/gallery' },
    { label: 'Web Stories', ariaLabel: 'Visit our web stories', link: 'https://ritzmediaworld.com/web-stories' }
  ];

  const socialItems = [
    { label: 'X (Twitter)', link: 'https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in' },
    { label: 'Facebook', link: 'https://www.facebook.com/ritzmediaworld/' },
    { label: 'YouTube', link: 'https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia' },
    { label: 'Instagram', link: 'https://www.instagram.com/ritzmediaworld/' }
  ];


  // Mobile-specific states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  const mobileMenuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mobileServicesTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const consultCaptchaRef = useRef<HCaptcha>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isConsultModalClosing, setIsConsultModalClosing] = useState(false);
  const [isSubmittingConsult, setIsSubmittingConsult] = useState(false);
  const [consultModalScale, setConsultModalScale] = useState(1);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [consultForm, setConsultForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [consultErrors, setConsultErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    captcha: "",
    form: "",
  });

  // GSAP Animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        // Open animation
        if (mobileMenuTimelineRef.current) {
          mobileMenuTimelineRef.current.kill();
        }
        // Remove hidden class to allow GSAP to animate
        mobileMenuRef.current?.classList.remove('hidden');
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        const tl = gsap.timeline();

        // Get actual height
        gsap.set(mobileMenuRef.current, { height: 'auto' });
        const height = mobileMenuRef.current.scrollHeight;
        gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });

        gsap.set(menuItems, { opacity: 0, y: -20 });

        tl.to(mobileMenuRef.current, {
          height: '90vh',
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
            ease: "power3.in",
            onComplete: () => {
              // Add hidden class after animation completes
              if (mobileMenuRef.current && !isMobileMenuOpen) {
                mobileMenuRef.current.classList.add('hidden');
              }
            }
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
        // Remove hidden class to allow GSAP to animate
        mobileServicesRef.current?.classList.remove('hidden');

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
            ease: "power3.in",
            onComplete: () => {
              // Add hidden class after animation completes
              if (mobileServicesRef.current && !isMobileServicesOpen) {
                mobileServicesRef.current.classList.add('hidden');
              }
            }
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

  const openConsultModal = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setConsultErrors({
      name: "",
      phone: "",
      email: "",
      message: "",
      captcha: "",
      form: "",
    });
    setConsultForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setCaptchaToken(null);
    setIsConsultModalClosing(false);
    setIsConsultModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeConsultModal = () => {
    setIsConsultModalClosing(true);
    setCaptchaToken(null);
    consultCaptchaRef.current?.resetCaptcha();
    closeTimerRef.current = setTimeout(() => {
      setIsConsultModalOpen(false);
      setIsConsultModalClosing(false);
      document.body.style.overflow = "";
    }, 180);
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isConsultModalOpen) {
        closeConsultModal();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isConsultModalOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const h = window.innerHeight;
      if (h <= 620) setConsultModalScale(0.72);
      else if (h <= 700) setConsultModalScale(0.78);
      else if (h <= 780) setConsultModalScale(0.86);
      else if (h <= 860) setConsultModalScale(0.93);
      else setConsultModalScale(1);
    };

    if (isConsultModalOpen) {
      updateScale();
      window.addEventListener("resize", updateScale);
    }

    return () => window.removeEventListener("resize", updateScale);
  }, [isConsultModalOpen]);

  const validateConsultForm = () => {
    const next = {
      name: "",
      phone: "",
      email: "",
      message: "",
      captcha: "",
      form: "",
    };

    if (!consultForm.name.trim()) {
      next.name = "Please enter your name.";
    }

    const phoneDigits = consultForm.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      next.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      next.phone = "Please enter a valid Indian mobile number.";
    }

    if (!consultForm.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultForm.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!consultForm.message.trim()) {
      next.message = "Please write your message.";
    } else if (consultForm.message.trim().length < 8) {
      next.message = "Message should be at least 8 characters.";
    }

    if (!captchaToken) {
      next.captcha = "Please complete captcha.";
    }

    setConsultErrors(next);
    return Object.values(next).every((v) => !v);
  };

  const handleConsultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateConsultForm()) return;

    setIsSubmittingConsult(true);
    try {
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etype: "NavbarConsulting",
          name: consultForm.name.trim(),
          phone: consultForm.phone.replace(/\D/g, ""),
          email: consultForm.email.trim(),
          message: consultForm.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        closeConsultModal();
      } else {
        setConsultErrors((prev) => ({
          ...prev,
          form: result?.message || result?.error || "Submission failed. Try again.",
        }));
      }
    } catch (error) {
      setConsultErrors((prev) => ({
        ...prev,
        form: "Server error. Please try again later.",
      }));
    } finally {
      setIsSubmittingConsult(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar - Only visible on lg and above */}
      <nav
        className={`hidden lg:flex w-full justify-center items-center py-2 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
      >
        {/* Centered Align Div  */}
        <div className="w-[92%]  flex justify-between items-center">
          {/* Left Side Container  */}
          <div>

            <img src="/rmw-logo-sm-size.png" alt="Ritz Media World" title="Ritz Media World" onClick={() => window.open("https://ritzmediaworld.com/", "_blank")} className={`cursor-pointer w-auto object-contain transition-all duration-300 ease-in-out ${isScrolled ? "h-[48px]" : "h-[80px]"}`} />
          </div>
          {/* Right Side Container  */}
          <div
            className={`flex justify-end items-center gap-4 transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"
              }`}
          >
            <ul className="flex justify-end items-center gap-6 xl:gap-12">
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
                  href="https://ritzmediaworld.com/services"
                  target="_blank"
                  className={`font-[700] text-[16px] transition-colors duration-300 ${isScrolled
                      ? "text-black hover:text-[#C99237]"
                      : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/work.html"
                  target="_blank"
                  className={`font-[700] text-[16px] transition-colors duration-300 ${isScrolled
                      ? "text-black hover:text-[#C99237]"
                      : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/about.html"
                  target="_blank"
                  className={`font-[700] text-[16px] transition-colors duration-300 ${isScrolled
                      ? "text-black hover:text-[#C99237]"
                      : "text-white hover:text-[#C99237]"
                    }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/contact.html"
                  target="_blank"
                  className={`font-[700] text-[16px] transition-colors duration-300 ${isScrolled
                      ? "text-black hover:text-[#C99237]"
                      : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <div className="flex gap-4 justify-center items-center">
                  <button onClick={openConsultModal} className="w-[168px] h-[44px] font-[700] text-[15px] rounded-[5px] bg-[#C99237] cursor-pointer text-white hover:bg-[#B8822F] transition-colors duration-300 s1-btn-gold">
                    <p className="text-white">Free Consulting</p>
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`${isScrolled ? "text-black" : "text-white"
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
            className="w-[95%] xl:max-w-[1195px] fixed top-20 left-1/2 py-2 px-2 bg-white rounded-lg shadow-2xl transform -translate-x-1/2 z-[100]"
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
            <div className="flex flex-wrap justify-center items-start gap-[18px]">
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
                    className="xl:w-[280px] w-[230px] h-[260px] rounded-[8px] flex flex-col  p-5 shadow-lg"
                  >

                    
                    {/* Main Service Name  */}
                    <div>
                      <Link
                        href={item.link}
                        target="_blank"
                        className="font-[700] text-[18px] transition-colors duration-300 text-white hover:text-[#C99237] cursor-pointer block mb-3"
                      >
                        {item.name}
                      </Link>
                    </div>

                    {/* Sub Services  */}
                    <div className="flex flex-col gap-1">
                      {item.sub.map((subItem, subIndex) => {
                        return (
                          <div key={subIndex} className="flex items-center gap-2">
                            <HiOutlineChevronRight className="w-[16px] h-[16px] text-white flex-shrink-0" />
                            <Link
                              href={subItem.link}
                              target="_blank"
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
          <>
            <div className="fixed inset-0 z-[9999] responsive-staggered-menu" style={{ height: '100vh', background: 'transparent' }}>
              <div className="relative w-full h-full">
                <StaggeredMenu
                  position="right"
                  items={menuItems}
                  socialItems={socialItems}
                  displaySocials={true}
                  displayItemNumbering={false}
                  menuButtonColor={isScrolled ? "#000" : "#fff"}
                  openMenuButtonColor="#000"
                  changeMenuColorOnOpen={true}
                  colors={['#1a1a1a', '#2a2a2a']}
                  logoUrl="/rmw-logo-sm-size.png"
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
            <style dangerouslySetInnerHTML={{
              __html: `
            /* Responsive font sizing for StaggeredMenu - default for mobile */
            .responsive-staggered-menu .sm-panel-item {
              font-size: 3rem !important;
            }
            
            /* For >=lg screens - default size */
            @media (min-width: 1024px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 3.5rem !important;
              }
            }
            
            /* For >=xl screens - full size */
            @media (min-width: 1280px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 3rem !important;
              }
            }
            
            /* For <xl screens (lg to xl) with small height - reduce font size progressively */
            /* Largest height range first, then smaller ones override */
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 800px) and (min-height: 701px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 2.5rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1.5rem !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 700px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 2rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1rem !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 600px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 1.75rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1rem !important;
              }
            }
          `}} />
          </>
        )}
      </nav>

      {/* Mobile Navbar - Only visible below lg */}
      <nav
        className={`lg:hidden w-full flex justify-center items-center py-3.5 sm:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5" : "bg-transparent"
          }`}
      >
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/rmw-logo-sm-size.png"
              alt="Ritz Media World"
              title="Ritz Media World"
              className={`w-auto object-contain transition-all duration-300 hover:scale-105 ${isScrolled ? "h-[36px] sm:h-[40px]" : "h-[52px] sm:h-[56px]"}`}
            />
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? "text-black" : "text-white"
              } h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center relative z-10 rounded-full hover:bg-black/5 active:bg-black/10`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HiOutlineMenuAlt1 className={`h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden min-h-[calc(100vh-64px)] overflow-y-auto border-t border-gray-100 ${!isMobileMenuOpen && !isMenuClosing ? 'hidden' : 'flex flex-col'}`}
          style={{ zIndex: 50 }}
        >
          <div className="w-[95%] max-w-[1200px] mx-auto py-6 sm:py-8 space-y-2">
            {/* Services Link with Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="mobile-menu-item w-full text-left font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 flex items-center justify-between group relative z-40"
              >
                <span onClick={()=>window.open("/services", "_blank")} className="relative z-50">
                  Services
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg
                   onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-5 h-5 text-gray-600 transition-all duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#C99237]" : "group-hover:text-[#C99237]"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Dropdown */}
              <div
                ref={mobileServicesRef}
                className={`overflow-hidden mt-3 overflow-y-auto ${isMobileServicesOpen ? 'block' : 'hidden'}`}
              >
                <div className="px-2 pb-4 space-y-3">
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
                      className="rounded-xl p-5 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 hover:scale-[1.02] border border-white/10"
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        className="font-[700] text-[17px] sm:text-[18px] text-white block mb-3 hover:text-[#C99237] transition-colors duration-300"
                        onClick={() => {
                          setIsMobileServicesOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-col gap-2.5">
                        {item.sub.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            target="_blank"
                            className="font-[400] text-[14px] sm:text-[15px] text-white/90 hover:text-[#C99237] flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <HiOutlineChevronRight className="w-[16px] h-[16px] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                            <span className="flex-1">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Menu Items */}
            <div className="space-y-1 pt-2">
              <Link
                href="https://ritzmediaworld.com/blogs"
                target="_blank"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  Blogs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
           
              <Link
                href="https://ritzmediaworld.com/work.html"
                target="_blank"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  Our Work
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link
                href="https://ritzmediaworld.com/about.html"
                target="_blank"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link
                href="https://ritzmediaworld.com/contact.html"
                target="_blank"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                className="mobile-menu-item w-full font-[700] text-[16px] sm:text-[17px] py-4 px-6 rounded-xl bg-gradient-to-r from-[#C99237] to-[#B8822F] text-white hover:from-[#B8822F] hover:to-[#A67227] active:from-[#A67227] active:to-[#956217] transition-all duration-300 shadow-lg shadow-[#C99237]/20 hover:shadow-xl hover:shadow-[#C99237]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openConsultModal();
                }}
              >
                <span>Free Consulting</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-sm transition-opacity duration-300"
            style={{ top: '64px', zIndex: 40 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
      {isConsultModalOpen && (
        <div
          className={`fixed inset-0 z-[10000] flex items-start sm:items-center justify-center bg-black/50 px-3 sm:px-4 py-3 sm:py-4 transition-opacity duration-200 ${isConsultModalClosing ? "opacity-0" : "opacity-100"
            }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConsultModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-modal-title"
        >
          <div
            className={`w-full max-w-[600px] rounded-2xl bg-white p-4 sm:p-5 shadow-2xl transition-all duration-200 ${isConsultModalClosing
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
              }`}
            style={{
              transform: `scale(${isConsultModalClosing ? consultModalScale * 0.95 : consultModalScale})`,
              transformOrigin: "center center",
            }}
          >
            <div className="mb-3 sm:mb-4 flex items-start justify-between border-b border-[#d4d4d4] pb-3">
              <div>
                <h2
                  id="consult-modal-title"
                  className="text-[22px] sm:text-[26px] font-[700] text-[#0F1640]"
                >
                  Free Consulting
                </h2>
                <p className="mt-1 text-[13px] text-[#636B7F]">
                  Fill the form and our team will contact you.
                </p>
              </div>
              <button
                type="button"
                onClick={closeConsultModal}
                className="h-9 w-9 rounded-full border cursor-pointer border-[#E3E7EF] text-[#3E465C] hover:bg-[#F6F8FC]"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConsultSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Your Name</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={`h-[44px] w-full border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.name ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                  {consultErrors.name && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.name}</p>}
                </label>

                <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Phone Number</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile number"
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className={`h-[44px] w-full border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.phone ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                  {consultErrors.phone && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.phone}</p>}
                </label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={consultForm.email}
                    onChange={(e) => setConsultForm((prev) => ({ ...prev, email: e.target.value }))}
                    className={`h-[44px] w-full border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.email ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                  {consultErrors.email && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.email}</p>}
                </label>

              </div>

              <label className="block">
                <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Write Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals..."
                  value={consultForm.message}
                  onChange={(e) => setConsultForm((prev) => ({ ...prev, message: e.target.value }))}
                  className={`w-full min-h-[84px] sm:min-h-[92px] border-b bg-transparent px-0 py-1 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.message ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                    }`}
                />
                {consultErrors.message && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.message}</p>}
              </label>
              <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Captcha</span>
                  <div className={`border-b pb-2 overflow-x-auto ${consultErrors.captcha ? "border-[#EF4444]" : "border-[#DADDE5]"}`}>
                    <HCaptcha
                      sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                      onVerify={(token) => {
                        setCaptchaToken(token);
                        setConsultErrors((prev) => ({ ...prev, captcha: "" }));
                      }}
                      onExpire={() => setCaptchaToken(null)}
                      onError={() => setCaptchaToken(null)}
                      ref={consultCaptchaRef}
                    />
                  </div>
                  {consultErrors.captcha && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.captcha}</p>}
                </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                {consultErrors.form ? (
                  <p className="text-[13px] text-[#EF4444]">{consultErrors.form}</p>
                ) : (
                  <p className="text-[12px] text-[#6A7286]">We respect your privacy. No spam.</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingConsult}
                  className="h-[48px] w-full sm:w-auto min-w-[180px] rounded-xl bg-[#C99237] px-6 text-white font-[700] hover:bg-[#B8822F] disabled:opacity-60"
                >
                  {isSubmittingConsult ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewNavbar;