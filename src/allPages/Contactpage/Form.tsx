// export default Form;

"use client"; //changed

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useState } from "react";

import { useSplitText } from "@/hooks/useSplitText"; //changed

const Form = () => {
  const textRefs = useSplitText(); //changed
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      query: formData.get("query"),
    };

    try {
      const response = await fetch("/api/save-contact-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Query submitted successfully!");

        form.reset();
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      } else {
        toast.error(result.message || "Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="tp-contact__area pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6" style={{ padding: "2rem" }}>
              <div className="tp-contact__left">
                <div className="tp-contact__title-box mb-75">
                  <h3
                    ref={(el) => {
                      if (el) textRefs.current.push(el);
                    }}
                    className="tp-section-title tp-split__text tp-split__in-right mb-35 text-black"
                    style={{ perspective: "400px" }}
                  >
                    <div
                      ref={(el) => {
                        if (el) textRefs.current.push(el);
                      }}
                      className="tp-split__line"
                      style={{
                        display: "block",
                        textAlign: "start",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          A
                        </div>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          s
                        </div>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          k{" "}
                        </div>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          B
                        </div>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          o
                        </div>
                      </div>
                      <span>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            l
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            d
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            l
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            y,{" "}
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            A
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            n
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            d{" "}
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            R
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            e
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            c
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            e
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            i
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            v
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            e{" "}
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            B
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            r
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            i
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            l
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            l
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            i
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            a
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            n
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            t
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            l
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            y
                          </div>
                        </div>
                      </span>
                    </div>
                  </h3>
                  <p
                    className="wow tpfadeUp animated text-black"
                    data-wow-duration=".9s"
                    data-wow-delay=".3s"
                    style={{
                      visibility: "visible",
                      animationDuration: "0.9s",
                      animationDelay: "0.3s",
                    }}
                  >
                    You’ve got a Project, an Idea, or a marketing Emergency that
                    needs our genius intervention? Well, we’ve seen them all.
                    Let’s get in touch and fall in love. All you need to do is
                    fill out the details below and we’ll get in touch.
                  </p>
                </div>
                <div
                  className="tp-contact__content d-flex align-items-center wow tpfadeUp animated"
                  data-wow-duration=".9s"
                  data-wow-delay=".5s"
                  style={{
                    visibility: "visible",
                    animationDuration: "0.9s",
                    animationDelay: "0.5s",
                    justifyContent: "space-between", //changed
                  }}
                >
                  <div className="tp-contact__text ">
                    <h3 className="tp-contact__title text-black">Contact</h3>
                    <Link href="/" className="tp-contact__title-sm text-black">
                      09220516777 <br />
                      07290002168
                    </Link>
                  </div>
                  <div className="tp-contact__email">
                    <h3 className="tp-contact__title text-black">Email</h3>
                    <Link href="/" className="tp-contact__title-sm text-black">
                      info@ritzmediaworld.com
                    </Link>
                  </div>
                </div>
                <div
                  className="tp-contact__content d-flex align-items-center wow tpfadeUp animated"
                  data-wow-duration=".9s"
                  data-wow-delay=".7s"
                  style={{
                    visibility: "visible",
                    animationDuration: "0.9s",
                    animationDelay: "0.7s",
                    justifyContent: "space-between",
                  }}
                >
                  <div className=" tp-contact__adress">
                    <h3 className="tp-contact__title text-black">Address</h3>
                    <div className="tp-contact__title-sm text-black">
                      402 – 404 , 4th floor Corporate Park, <br /> Tower A1
                      Sector 142 , Greater Noida
                    </div>
                  </div>
                  <div className="tp-contact__social">
                    <h3 className="tp-contact__title text-black">Follow</h3>
                    <div className="tp-contact__social-link">
                      <Link href="https://www.facebook.com/ritzmediaworld/">
                        <i aria-hidden="true">
                          <FaFacebookF />
                        </i>
                      </Link>
                      <Link href="https://www.instagram.com/ritzmediaworld/">
                        <i aria-hidden="true">
                          <FaInstagram />
                        </i>
                      </Link>
                      <Link
                        href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld"
                        target="http://1"
                        rel="http://1"
                      >
                        <i aria-hidden="true">
                          <FaXTwitter />
                        </i>
                      </Link>
                      <Link href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in">
                        <i aria-hidden="true">
                          <FaLinkedin />
                        </i>
                      </Link>
                      <Link
                        href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia"
                        target="http://1"
                        rel="http://1"
                      >
                        <i aria-hidden="true">
                          <FaYoutube />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div
                className="tp-contact__inner wow tpfadeUp animated"
                data-wow-duration=".9s"
                data-wow-delay=".9s"
                style={{
                  visibility: "visible",
                  animationDuration: "0.9s",
                  animationDelay: "0.9s",
                  borderRadius: "20px",
                  background: "white",
                  border: "2px solid black",
                }}
              >
                <div id="contact-form">
                  <div
                    className="wpcf7 js"
                    id="wpcf7-f990-p70-o1"
                    lang="en-US"
                    dir="ltr"
                    data-wpcf7-id="990"
                  >
                    <div className="screen-reader-response">
                      <p
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                      ></p>
                      <ul></ul>
                    </div>
                    <form onSubmit={handleSubmit} className="wpcf7-form init">
                      <div className="postbox__comment-form">
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <div className="postbox__comment-input mb-35">
                              <input
                                className="inputText"
                                style={{ background: "white" }}
                                placeholder="Your Name"
                                type="text"
                                name="name"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <div className="postbox__comment-input mb-35">
                              <input
                                className="inputText"
                                style={{ background: "white" }}
                                placeholder="Phone Number"
                                type="text"
                                name="phone"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-xxl-12">
                            <div className="postbox__comment-input mb-35">
                              <input
                                className="inputText"
                                style={{ background: "white" }}
                                placeholder="Email Address"
                                type="email"
                                name="email"
                                required
                              />
                            </div>
                          </div>

                          {/* Dropdown added here */}
                          <div className="col-xxl-12">
                            <div className="postbox__comment-input mb-35">
                              <select
                                name="service"
                                required
                                className="inputText"
                                style={{
                                  background: "white",
                                  width: "100%",
                                  padding: "15px",
                                  borderRadius: "5px",
                                  border: "1px solid #ddd",
                                  color: "#666",
                                }}
                              >
                                <option value="">Select Service</option>
                                <option>Digital Marketing</option>
                                <option>Creative Services</option>
                                <option>Print Advertising</option>
                                <option>Radio Advertising</option>
                                <option>Content Marketing</option>
                                <option>Web Designing & Development</option>
                                <option>Celebrity Endorsements</option>
                                <option>Influencer Marketing</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-xxl-12">
                            <div className="postbox__comment-input mb-20">
                              <textarea
                                className="textareaText"
                                style={{ background: "white" }}
                                placeholder="Write Message"
                                name="query"
                                rows={3}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-xxl-12 mb-4 text-center">
                            <HCaptcha
                              sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                              onVerify={handleCaptchaVerify}
                              ref={captchaRef}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="tp-contact__action">
                        <button
                          type="submit"
                          className="tp-btn-secondary"
                          style={{
                            padding: "20px 30px",
                            background: "#10153f",
                            color: "white",
                          }}
                        >
                          Submit{" "}
                          <span>
                            <i className="far fa-angle-right"></i>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28052.52086266602!2d77.4128188!3d28.49264095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce530165cc6c1%3A0x9ea28df462e9945e!2sRitz%20Media%20World-Digital%20Marketing%20Agency%20in%20Noida%20%7C%20Social%20Media%20Agency%20in%20Noida%20%7C%20Newspaper%20%26%20Radio%20Ad%20Agency%20in%20Noida!5e0!3m2!1sen!2sin!4v1742542850888!5m2!1sen!2sin"
        width="800"
        height="600"
        style={{ border: 0, width: "100vw" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Form;
