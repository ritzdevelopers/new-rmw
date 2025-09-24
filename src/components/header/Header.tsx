"use client";

import Link from "next/link";
// import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState, useEffect, useRef } from "react";
import useStickyElements from "@/hooks/useStickyElements";
import styles from "./page.module.css"; // Import CSS module
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import Image from "next/image";
// import FlagWave from "../15August/FlagWave";
import { gsap } from "gsap";
import AnalyticsTracker from "./Tracker/AnalyticsTracker";
// declare namespace JSX {
//   interface IntrinsicElements {
//     li: React.DetailedHTMLProps<
//       React.LiHTMLAttributes<HTMLLIElement>,
//       HTMLLIElement
//     >;
//   }
// }
type SubService = {
  name: string;
  link: string;
};

type ServiceMenuItem = {
  name: string;
  link: string;
  sub: SubService[];
};

const Header = () => {
  // const [isHovered, setIsHovered] = useState(false);
  const [menuData, setMenuData] = useState<ServiceMenuItem[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
    setIsServiceDropdownOpen(true); // Optionally reset dropdown too
  }, [pathname]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/header_data");
        setMenuData(response.data);
      } catch (error) {
        console.error("Failed to fetch menu", error);
      }
    };

    fetchMenu();
  }, []);

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(true);

  useStickyElements();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.${styles.dropdown}`)) {
        setIsServiceDropdownOpen(true); // Keep it open by default
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  interface Article {
    blog_image: string;
    slug: string;
    title: string;
    description: string;
    created_at: string;
  }
  const [blogs, setBlogs] = useState<Article[]>([]);
  const blog_slugs: string[] = [];
  useEffect(() => {
    const fetchBlogSlug = async () => {
      try {
        const response = await axios.get("/api/all_blogs");
        setBlogs(response.data);
      } catch (error) {
        console.log("Error in blogs slug only API", error);
      }
    };
    fetchBlogSlug();
  }, []);

  blogs.map((blog) => {
    blog_slugs.push(blog.slug);
  });

  let isBlog = false;
  const pathSlug = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (blog_slugs.includes(pathSlug.slice(1))) {
    isBlog = true;
  }
  const imgT = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgT.current) {
      gsap.from(imgT.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [imgT.current?.src]); // safe access here too

  // <------------------------------------------------------------------------------------------> console.log("User came from:",document.referrer);

  return (
    <header>
      <AnalyticsTracker></AnalyticsTracker>
      <div
        id="header-sticky"
        className={`tp-header-top-area tp-header__style-1 tp-header__transparent tp-header__border ${styles.headerBackground}`}
        style={{
          // background: "white",
          borderBottom: "white",
          position: "relative",
        }}
      >
        {/* <FlagWave /> */}
        <div
          className="container-fluid"
          style={{
            position: "relative",
          }}
        >
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div
                className="tp-main__logo"
                style={{
                  width: "128px",
                  padding: "16px 0",
                  display: " flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  className="main-logo"
                  href="/"
                  style={{ borderRadius: "0px !important", overflow: "hidden" }}
                >
                  <img
                    src="/rmw-final-logo.png"
                    alt=""
                    className={styles.lgImg}
                    style={{ height: "70px", zIndex: 50, opacity: 1 }}
                    ref={imgT}
                    // onMouseEnter={handleLogoChange}
                    // onMouseLeave={handleLogoChange}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <div className="tp-main__menu d-flex justify-content-center">
                <nav>
                  <ul id="menu-main-menu" className="menu-main-menu">
                    <li className="nav-item">
                      <Link
                        href="/"
                        className="nav-links"
                        style={{
                          textShadow:
                            pathname === "/"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          fontWeight: "bold",
                          color: pathname === "/" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/about.html"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/about.html"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/about.html" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/services"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/services"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/services" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Services
                      </Link>

                      <div
                        className="tp-submenu submenu has-homemenu"
                        style={{
                          fontWeight: "bold",
                          // padding: "0 25px",
                          width: "100vw",
                          left: "-70%",
                          transform: "translate(-40%, 0)",
                        }}
                      >
                        <div
                          data-elementor-type="container"
                          data-elementor-id="103"
                          className="elementor elementor-103"
                        >
                          <div className="elementor-element elementor-element-039dca9 e-con-full d-flex justify-content-center align-items-center e-con e-parent">
                            <div className="elementor-element elementor-element-f21576b e-con-full d-flex justify-content-center align-items-center e-con e-child">
                              <div className="elementor-element elementor-element-08a5267 elementor-widget elementor-widget-tp-menu-demo">
                                <div className="w-100">
                                  <ul className="d-flex justify-content-evenly align-items-center flex-wrap list-unstyled m-0 p-0">
                                    {menuData.map((item, index) => (
                                      <li
                                        key={index}
                                        className="position-relative flex-fill text-center px-2"
                                        style={{
                                          width: "190px",
                                          height: "50px",
                                          // backgroundColor:'yellow',
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* Main Menu Item */}
                                        <Link
                                          href={`${item.link}`}
                                          className="nav-link"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {item.name}{" "}
                                          {index !== menuData.length - 2 && (
                                            <span> | </span>
                                          )}
                                        </Link>
                                        {/* Submenu */}
                                        <ul
                                          className="dropdown-menu position-absolute shadow"
                                          style={{
                                            borderTop: "2px solid #fddf82",
                                            top: "100%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            minWidth: "200px",
                                            display: "none",
                                            background: "#f2f2f2eb",
                                            color: "#0c0c0c",
                                          }}
                                        >
                                          {item.sub.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                              <Link
                                                className={styles.subDropLink}
                                                href={subItem.link}
                                                style={{
                                                  padding: "2px 0",
                                                  fontSize: "15px",
                                                  display: "block",
                                                  color: "#0c0c0c",
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {subItem.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>

                                  {/* ✅ CSS to Show Dropdown on Hover */}
                                  <style jsx>{`
                                    li.position-relative:hover .dropdown-menu {
                                      display: block !important;
                                    }
                                  `}</style>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/work.html"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/our-work"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/our-work" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Our Work
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/blogs"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/blogs"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/blogs" || isBlog === true
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/contact.html/"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/contact.html"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/contact.html"
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Contact us
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        href="/rdx-digital-marketing-Course/"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/rdx-digital-marketing-Course"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/rdx-digital-marketing-Course"
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Academy
                      </Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div className="tp-header__right d-flex justify-content-end">
                <div className="tp-header__action">
                  <ul>
                    <li>
                      <button
                        className="tp-header__burs-btn tp-offcanvas-open-btn"
                        onClick={() => {
                          if (isMobile) {
                            setIsMenuOpen(!isMenuOpen);
                          } else {
                            setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
                          }
                        }}
                      >
                        <span>
                          <svg
                            width="28"
                            height="26"
                            viewBox="0 0 28 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="2.39023"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="#8A5A0D"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.441"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="12.6339"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                            />
                            <ellipse
                              cx="25.441"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9996"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.609"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="#8A5A0D"
                            />
                          </svg>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={`${styles.mobileMenuOverlay} ${
            isMenuOpen ? styles.open : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileSidebarLogo}>
              <div className={styles.logoImageWrapper}>
                <Image
                  src="/rmw-final-logo.png"
                  alt="RMW Logo"
                  fill
                  className={styles.logoImage}
                  sizes="100%"
                  priority
                />
              </div>

              <button
                className={styles.closeMenu}
                onClick={() => setIsMenuOpen(false)}
              >
                ✖
              </button>
            </div>

            <nav>
              <ul className={`${styles.navItem}`}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about.html">About</Link>
                </li>

                {/* Service Dropdown (Smooth) */}
                <li className={styles.dropdown}>
                  <div
                    className={styles.dropdownToggle}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsServiceDropdownOpen((prev) => !prev);
                    }}
                  >
                    <span>Service</span>
                    <button className={styles.dropdownArrow}>
                      {isServiceDropdownOpen ? "▲" : "▼"}
                    </button>
                  </div>
                  <ul
                    className={`${styles.submenu} ${
                      isServiceDropdownOpen ? styles.show : ""
                    }`}
                  >
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/digital-marketing">
                        Digital Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/creative-services">
                        Creative Services
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/print-advertising">
                        Print Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/radio-advertising">
                        Radio Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/contents-marketing">
                        Content Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/web-designing-and-development">
                        Web Development
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/celebrity-endorsements">
                        Celebrity Endorsements
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/influencer-marketing-agency-in-india">
                        Influencer Marketing
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/work.html">Our Work</Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
                <li>
                  <Link href="/contact.html">Contact us</Link>
                </li>
              </ul>
            </nav>
            <div className="tp-hero__social-content">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-evenly",
                  fontSize: "20px",
                  color: "#8A5A0D",
                }}
              >
                <li>
                  <Link href="https://www.facebook.com/ritzmediaworld/">
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld">
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia">
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/ritzmediaworld/">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in">
                    <FaLinkedinIn />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (≥ 992px) */}
      {!isMobile && (
        <>
          {/* Dark Overlay */}
          {isDesktopSidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsDesktopSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`${styles.desktopSidebar} ${styles.mobileMenuOverlay} ${
              isDesktopSidebarOpen ? styles.open : ""
            }`}
            onClick={() => setIsDesktopSidebarOpen(false)}
          >
            <div
              className={styles.desktopSidebarContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.MobileSidebarLogo}>
                <img
                  // style={{ height: "60px" }}
                  src="/rmw-final-logo.png"
                  alt="RMW Logo"
                />
                <button
                  className={styles.closeMenu}
                  onClick={() => setIsDesktopSidebarOpen(false)}
                >
                  ✖
                </button>
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                  color: "#000",
                }}
              >
                We build stories not just worth telling, but worth sharing.
                That’s what sets us apart.
              </div>

              <div>
                <p
                  style={{
                    color: "#000",
                    fontSize: "26px",
                    marginTop: "20px",
                  }}
                >
                  Case Studies
                </p>
                <div className={styles.caseImgs}>
                  <Link href="/revving-up-success-advertising-and-car-care-a-surprising-comparison">
                    {/* <img src="/blogs/2023/09/acr-768x404.jpg" alt="" /> */}
                    <Image
                      src="/blogs/2023/09/acr-768x404.jpg"
                      alt="hI1"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link href="/sticking-to-success-a-case-study-on-the-fevicol-marketing-campaign">
                    {/* <img src="/blogs/2023/09/Slide1-768x432.jpg" alt="" /> */}
                    <img
                      src="/blogs/2023/09/Slide1-768x432.jpg"
                      alt="hI2"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link href="/from-reality-to-virtuality-metaverse-technology">
                    {/* <img
                      src="/blogs/db16fa7c-4f82-1f75-04f3-4270575794e8_1100_550.png"
                      alt=""
                    /> */}
                    <Image
                      src="/blogs/db16fa7c-4f82-1f75-04f3-4270575794e8_1100_550.png"
                      alt="hI3"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link href="/how-did-cooking-shows-influence-indias-cooking-utensil-sales">
                    {/* <img src="/blogs/cook-1024x539.jpg" alt="" /> */}
                    <img
                      src="/blogs/cook-1024x539.jpg"
                      alt="hI4"
                      width={200}
                      height={100}
                    />
                  </Link>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <h3>Contact</h3>
                <p>
                  Address: 402 – 404 , 4th floor Corporate Park, Tower A1 Sector
                  142, Noida
                </p>
                <p>
                  <Link href="/">info@ritzmediaworld.com</Link>
                </p>
                <p>
                  <Link href="/">09220516777</Link>
                </p>
                <p>
                  <Link href="/">07290002168</Link>
                </p>
              </div>

              <div
                style={{
                  bottom: "20px",
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="tp-hero__social-content"
              >
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "30px",
                    fontSize: "20px",
                    color: "#334258",
                  }}
                >
                  <li>
                    <Link href="https://www.facebook.com/ritzmediaworld/">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld">
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia">
                      <FaYoutube />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/ritzmediaworld/">
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in">
                      <FaLinkedinIn />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
