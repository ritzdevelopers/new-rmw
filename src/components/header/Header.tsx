"use client";

import Link from "next/link";
// import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import useStickyElements from "@/hooks/useStickyElements";
import styles from "./Header.module.css"; // Import CSS module
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

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

  // Fetch all blogs slug and store it in an array and then highlight the link is pathname == any slug from array
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

  return (
    <header>
      <div
        id="header-sticky"
        className={`tp-header-top-area tp-header__style-1 tp-header__transparent tp-header__border ${styles.headerBackground}`}
        style={{
          background: "white",
          borderBottom: "white",
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div
                className="tp-main__logo"
                style={{
                  width: "100px",
                  padding: "16px 0",
                  display: " flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link className="main-logo" href="/">
                  <img
                    src="/logo-brown.png"
                    alt=""
                    className="sm-size"
                    style={{ height: "50px" }}
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
                          color: pathname === "/" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/about/"
                        className="nav-links"
                        style={{
                          color: pathname === "/about" ? "#8a5a0d" : "inherit",
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
                          color:
                            pathname === "/services" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Services
                      </Link>

                      <div
                        className="tp-submenu submenu has-homemenu"
                        style={{
                          padding: "0 25px",
                          width: "90vw",
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
                                  <ul className="d-flex justify-content-evenly align-items-center w-100 list-unstyled m-0 p-0">
                                    {menuData.map((item, index) => (
                                      <li
                                        key={index}
                                        className="position-relative flex-fill text-center text-nowrap"
                                        style={{
                                          padding: "0 10px",
                                          cursor: "pointer",
                                          color: "#0c0c0c",
                                        }}
                                      >
                                        {/* Main Menu Item */}
                                        <Link
                                          href={item.link}
                                          className="nav-link"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {item.name}
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
                        href="/our-work/"
                        className="nav-links"
                        style={{
                          color:
                            pathname === "/our-work" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Our Work
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/blog"
                        className="nav-links"
                        style={{
                          color:
                            pathname === "/blog" || isBlog === true
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/contact/"
                        className="nav-links"
                        style={{
                          color:
                            pathname === "/contact" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Contact us
                      </Link>
                    </li>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                top: "20px",
              }}
              className={styles.MobileSidebarLogo}
            >
              <img
                style={{ height: "50px" }}
                src="/logo-brown.png"
                alt="RMW Logo"
              />
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
                  <Link href="/about/">About</Link>
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
                      <Link href="/services/best-digital-marketing-agency">
                        Digital Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/leading-creative-agency-india">
                        Creative Services
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/best-print-advertising-agency">
                        Print Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/top-radio-ad-agency">
                        Radio Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/leading-content-marketing-agency">
                        Content Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/best-website-designing-company">
                        Web Development
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/celebrity-endorsement-agency-india">
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
                  <Link href="/our-work">Our Work</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
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
                  style={{ height: "60px" }}
                  src="/logo-brown.png"
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
                Web designing in a powerful way of just not an only professions.
                We have tendency to believe the idea that smart looking.
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
                <div
                  className={styles.case_imgs}
                  style={{
                    display: "grid",
                    gap: "2px",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <Link href="/revving-up-success-advertising-and-car-care-a-surprising-comparison">
                    <img src="/blogs/2023/09/acr-768x404.jpg" alt="" />
                  </Link>
                  <Link href="/sticking-to-success-a-case-study-on-the-fevicol-marketing-campaign">
                    <img src="/blogs/2023/09/Slide1-768x432.jpg" alt="" />
                  </Link>
                  <Link href="/from-reality-to-virtuality-metaverse-technology">
                    <img
                      src="/blogs/db16fa7c-4f82-1f75-04f3-4270575794e8_1100_550.png"
                      alt=""
                    />
                  </Link>
                  <Link href="/how-did-cooking-shows-influence-indias-cooking-utensil-sales">
                    <img src="/blogs/cook-1024x539.jpg" alt="" />
                  </Link>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <h3>Contact</h3>
                <p>
                  Address: 402 – 404 , 4th floor Corporate Park, Tower A1 Sector
                  142 , Greater Noida
                </p>
                <p>
                  <Link href="/">info@ritzmediaworld.com</Link>
                </p>
                <p>
                  <Link href="/">09220516777</Link>
                </p>
                <p>
                  <Link href="/">09220516777</Link>
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
