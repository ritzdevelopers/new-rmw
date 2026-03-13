"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import pageStyles from "./page.module.css";

const HCAPTCHA_SITEKEY = "e4a44c7a-13c4-4534-b210-d41242d2d262";

const SERVICE_OPTIONS = [
    "Digital Marketing",
    "Creative Services",
    "Print Advertising",
    "Radio Advertising",
    "Content Marketing",
    "Web Designing & Development",
    "Celebrity Endorsements",
    "Influencer Marketing",
];

const SOCIAL_LINKS = [
    {
        src: "/varun.icon/facebook.svg",
        href: "#",
        label: "Facebook",
        color: "#1877f2",
    },
    { src: "/varun.icon/twitter.svg", href: "#", label: "X", color: "#000" },
    {
        src: "/varun.icon/instagram.svg",
        href: "#",
        label: "Instagram",
        color: "#e4405f",
    },
    {
        src: "/varun.icon/linkedin.svg",
        href: "#",
        label: "LinkedIn",
        color: "#0a66c2",
    },
    {
        src: "/varun.icon/youtube.svg",
        href: "#",
        label: "YouTube",
        color: "#ff0000",
    },
];

function Section2() {
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
        const phone = formData.get("phone") as string;

        if (phone) {
            const digitsOnly = phone.replace(/\D/g, "");
            if (digitsOnly.length >= 10) {
                const firstDigit = digitsOnly[0];
                if (digitsOnly.split("").every((d) => d === firstDigit)) {
                    toast.error("Please enter a valid phone number");
                    return;
                }
            }
        }

        const service = formData.get("service") as string;
        const query = formData.get("query") as string;
        const message = `Service: ${service}\n\nQuery: ${query}`;

        const data = {
            etype: "ContactUs",
            name: formData.get("name"),
            phone,
            email: formData.get("email"),
            message,
        };

        try {
            const response = await fetch(
                "/api/system-settings/contact-enquiry",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                },
            );
            const result = await response.json();

            if (response.ok) {
                toast.success(
                    result.message || "Query submitted successfully!",
                );
                form.reset();
                captchaRef.current?.resetCaptcha();
                setCaptchaToken(null);
            } else {
                toast.error(result.message || "Submission failed. Try again.");
            }
        } catch {
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <section className="w-full bg-white py-[35px] lg:py-[70px]">
            {/* Centered Align Container  */}
            <div
                className={`w-full ${pageStyles.containerWidth} flex flex-col md:w-full md:items-center lg:flex-row lg:items-stretch justify-center gap-8 lg:gap-6 xl:gap-15`}
            >
                {/* Left: circular image + Follow Us */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-[630px] max-h-[630px] aspect-square">
                        <div className="absolute inset-0 rounded-full overflow-hidden  bg-gray-100  min-[1024px]:max-[1211px]:h-[480px]">
                            <Image
                                src="/varunimage/contactemployee.jpg"
                                alt="Office team at work"
                                fill
                                unoptimized
                                sizes="(max-width: 1023px) 100vw, 480px"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute right-[30px] bottom-[-56px] lg:bottom-[-20px] xl:bottom-[-56px] w-[170px] h-[170px] sm:w-[42%] sm:min-w-[140px] sm:min-h-[140px] sm:aspect-square sm:h-auto bg-white rounded-full  flex flex-col items-center justify-center gap-3 p-4 border-[1px] border-[#0F1640]">
                            <h3
                                className={`font-semibold text-[18px] leading-[26px] text-center text-black m-0 ${pageStyles.fontMontserrat}`}
                            >
                                Follow Us
                            </h3>
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                                {SOCIAL_LINKS.map(({ src, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={src}
                                            alt={label}
                                            width={23}
                                            height={23}
                                            className="object-contain w-[23px] h-[23px]"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: contact form */}
                <div className="w-full max-w-[560px] md:max-w-full md:w-full lg:w-1/2 lg:max-w-none">
                    <h2
                        className={`font-semibold text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[40px] text-[#000000] mt-[20px] lg:mt-0 mb-2 lg:mb-0 xl:mb-2 leading-[50px] text-center lg:text-left ${pageStyles.fontMontserrat}`}
                    >
                        Your Big Idea Starts Here
                    </h2>
                    <p
                        className={`text-[15px]  lg:text-[15px] xl:text-[15px] text-[#000000] mb-7 lg:mb-0 xl:mb-7  w-full lg:max-w-[540px]  leading-[26px] text-center lg:text-left  ${pageStyles.fontopensans}`}
                    >
                        Got a project you&apos;re thinking about? Fill out the
                        form below, & our team will reach out to you soon to
                        make your ideas happen!
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8 lg:gap-[10px] xl:gap-8"
                    >
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640]  text-base  focus:outline-none focus:ring-0  text-[#5C5C5C]
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                            />
                        </div>
                        <div>
                            <select
                                name="service"
                                required
                                defaultValue=""
                                className={`w-full py-2 pr-8 bg-transparent border-0 border-b border-[#0F1640] text-[14px] font-medium text-[#5C5C5C] leading-[20px] focus:border-black focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_9px] bg-[position:right_0.25rem_center] ${pageStyles.fontMontserrat}`}
                                style={{
                                    backgroundImage:
                                        'url("/varun.icon/down-arrow.svg")',
                                }}
                            >
                                <option value="" disabled>
                                    Select Service
                                </option>

                                {SERVICE_OPTIONS.map((opt) => (
                                    <option
                                        key={opt}
                                        value={opt}
                                        className="text-black font-medium"
                                    >
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <textarea
                                name="query"
                                placeholder="Write Message"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-[14px] leading-[10px] focus:border-black focus:outline-none focus:ring-0
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[10px] mt-0 lg:mt-5
  ${pageStyles.fontMontserrat}`}
                            />
                        </div>
                    </form>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start mt-3">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                disabled
                                checked
                                readOnly
                                className="sr-only"
                                aria-hidden
                            />
                            {/* <span className={pageStyles.fontopensans}>
                                    I am human
                                </span> */}
                        </label>
                        <HCaptcha
                            sitekey={HCAPTCHA_SITEKEY}
                            onVerify={handleCaptchaVerify}
                            ref={captchaRef}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`flex w-fit mx-auto lg:mx-0 items-center gap-5  text-base font-semibold text-black bg-transparent border-0 cursor-pointer  hover:opacity-85 transition-opacity mt-3 ${pageStyles.fontMontserrat}`}
                    >
                        <span
                            className={`font-medium text-[18px] leading-[46px] text-black ${pageStyles.fontMontserrat}`}
                        >
                            Submit
                        </span>
                        <span className="w-[40px] h-[40px] rounded-full bg-[#C99237]  flex items-center justify-center text-white flex-shrink-0">
                            {/* <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg> */}
                            <Image
                                src="/varun.icon/submitbuttonarrow.svg"
                                alt="Submit arrow"
                                width={22.07}
                                height={7.59}
                            />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Section2;
