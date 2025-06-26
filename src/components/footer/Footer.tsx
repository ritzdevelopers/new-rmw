"use client";

import Link from "next/link";
// import { useSplitText } from "@/hooks/useSplitText";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  // const textRefs = useSplitText();

  return (
    <footer>
      {/* <!-- tp footer area start  --> */}

      <section
        className="tp-footer-area fix tp-footer__1 tp-footer__plr black-bg-2 z-index-11 p-relative"
        data-background=""
        data-bg-color=""
      >
        <div className="tp-footer__wrap  ">
          <div className="tp-cta-area pt-75 pb-75"></div>
          {/* <!-- tp cta area end  --> */}
          <div className="container  ">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-12 col-md-6 col-lg-3">
                <div
                  id="custom_html-3"
                  className="widget_text tp-footer__widget footer-col-1-1 mb-40 widget_custom_html"
                >
                  <div className="widget_text tp-footer-widget-content">
                    <div
                      style={{ padding: "10px" }}
                      className="textwidget custom-html-widget"
                    >
                      <div className="tp-footer__logo">
                        <Link href="/">
                          <Image
                            width={100}
                            height={100}
                            layout="fixed"
                            src="/logo-brown.png"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <p style={{ color: "#FBD98C", fontSize: "14px" }}>
                        Accelerate your journey to success with result-oriented
                        solutions for Digital Advertising, Social Media
                        Management, SEO, and Compelling Content backed by more
                        than 17 years of advertising wisdom with a wide array of
                        clients across all industries across the Indian
                        subcontinent.
                      </p>
                      <div className="tp-contact__social-link">
                        <Link
                          href="https://www.facebook.com/ritzmediaworld/"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaFacebookF color="black" />
                          </i>
                        </Link>
                        <Link
                          href="https://www.instagram.com/ritzmediaworld/"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaInstagram color="black" />
                          </i>
                        </Link>
                        <Link
                          href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld"
                          target="http://1"
                          rel="http://1"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaXTwitter color="black" />
                          </i>
                        </Link>
                        <Link
                          href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaLinkedin color="black" />
                          </i>
                        </Link>
                        <Link
                          href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia"
                          className="footer-icon"
                          style={{ border: "none" }}
                          target="http://1"
                          rel="http://1"
                        >
                          <i aria-hidden="true">
                            <FaYoutube color="black" />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-3">
                <div
                  id="nav_menu-3"
                  className="tp-footer__widget footer-col-1-2 mb-40 widget_nav_menu"
                >
                  <div className="tp-footer-widget-content">
                    <h3
                      className="tp-footer__widget-title"
                      style={{ color: "#F7A31C", fontSize: "20px" }}
                    >
                      Quick Links
                    </h3>
                    <div className="menu-our-location-container">
                      <ul id="menu-our-location" className="menu">
                        <li
                          id="menu-item-140"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-140"
                        >
                          <Link href="/" style={{ color: "#FBD98C" }}>
                            Home
                          </Link>
                        </li>
                        <li
                          id="menu-item-141"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-141"
                        >
                          <Link href="/about" style={{ color: "#FBD98C" }}>
                            About
                          </Link>
                        </li>
                        <li
                          id="menu-item-142"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-142"
                        >
                          <Link href="/services" style={{ color: "#FBD98C" }}>
                            Services
                          </Link>
                        </li>
                        <li
                          id="menu-item-143"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-143"
                        >
                          <Link href="/our-work" style={{ color: "#FBD98C" }}>
                            Our Work
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/blog" style={{ color: "#FBD98C" }}>
                            Blogs
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/contact" style={{ color: "#FBD98C" }}>
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-3">
                <div
                  id="nav_menu-4"
                  className="tp-footer__widget footer-col-1-4 mb-40 widget_nav_menu"
                >
                  <div className="tp-footer-widget-content">
                    <h3
                      className="tp-footer__widget-title"
                      style={{ color: "#F7A31C", fontSize: "20px" }}
                    >
                      our services
                    </h3>
                    <div className="menu-footer-service-nav-container">
                      <ul id="menu-footer-service-nav" className="menu">
                        <li
                          id="menu-item-135"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-135"
                        >
                          <Link
                            href="/services/best-digital-marketing-agency"
                            style={{ color: "#FBD98C" }}
                          >
                            Digital Marketing
                          </Link>
                        </li>
                        <li
                          id="menu-item-136"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136"
                        >
                          <Link
                            href="/services/best-print-advertising-agency"
                            style={{ color: "#FBD98C" }}
                          >
                            Print Advertising
                          </Link>
                        </li>
                        <li
                          id="menu-item-137"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"
                        >
                          <Link
                            href="/services/top-radio-ad-agency"
                            style={{ color: "#FBD98C" }}
                          >
                            Radio Advertising
                          </Link>
                        </li>
                        <li
                          id="menu-item-138"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"
                        >
                          <Link
                            href="/service/leading-creative-agency-india"
                            style={{ color: "#FBD98C" }}
                          >
                            Creative Services
                          </Link>
                        </li>
                        <li
                          id="menu-item-138"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"
                        >
                          <Link
                            href="/service/leading-content-marketing-agency"
                            style={{ color: "#FBD98C" }}
                          >
                            Content Marketing
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            href="/services/best-website-designing-company"
                            style={{ color: "#FBD98C" }}
                          >
                            Web Development
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            href="/services/celebrity-endorsement-agency-india"
                            style={{ color: "#FBD98C" }}
                          >
                            Celebrity Endorsements
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            href="/services/influencer-marketing-agency-in-india"
                            style={{ color: "#FBD98C" }}
                          >
                            Influencer Marketing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div
                  id="custom_html-4"
                  className="widget_text tp-footer__widget footer-col-1-3 mb-40 widget_custom_html"
                >
                  <div className="widget_text tp-footer-widget-content">
                    <h3
                      className="tp-footer__widget-title"
                      style={{ color: "#F7A31C", fontSize: "20px" }}
                    >
                      Contact info
                    </h3>
                    <div className="textwidget custom-html-widget">
                      <div className="tp-footer__contact-info">
                        <div className="tp-footer__list">
                          <Link href="#" style={{ color: "#FBD98C" }}>
                            Address: 402 – 404, <br /> 4th floor Corporate Park,{" "}
                            <br />
                            Tower A1 Sector 142, <br /> Greater Noida
                          </Link>
                          <Link
                            href="tel:09220516777"
                            style={{ color: "#FBD98C" }}
                          >
                            09220516777
                          </Link>
                          <Link
                            href="tel:07290002168"
                            style={{ color: "#FBD98C" }}
                          >
                            07290002168
                          </Link>
                          <Link
                            href="mailto:
info@ritzmediaworld.com"
                            style={{ color: "#FBD98C" }}
                          >
                            info@ritzmediaworld.com
                          </Link>
                          <Link href="#" style={{ color: "#FBD98C" }}>
                            Office Hours: 9AM - 7PM
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- tp copyright area start --> */}
          <div className="tp-copyright-area pb-5">
            <div className="container">
              <div className="tp-copyright__wrap   pt-20">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-7 ">
                    <div className="tp-copyright__text">
                      <p style={{ color: "#FBD98C" }}>
                        © 2025{" "}
                        <span style={{ color: "#FBD98C" }}>
                          {" "}
                          RITZ MEDIA WORLD,
                        </span>{" "}
                        All Rights Reserved
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-5">
                    <div className="tp-copyright__social text-lg-end">
                      <Link href="#" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </Link>

                      <Link href="#" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </Link>

                      <Link href="#" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </Link>

                      <Link href="#" target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- tp copyright area end --> */}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
