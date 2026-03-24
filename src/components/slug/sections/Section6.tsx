"use client";

import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { BsYoutube } from "react-icons/bs";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import styles from "./page.module.css";
const HCAPTCHA_SITEKEY = "e4a44c7a-13c4-4534-b210-d41242d2d262";

function Section6() {
    const captchaRef = useRef<HCaptcha>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Please complete the captcha");
            return;
        }
    };

    return (
        <section className="flex w-full justify-center overflow-visible py-8 pb-28 sm:py-10 sm:pb-32 lg:py-12 lg:pb-16 xl:items-center xl:py-[70px]">
            <div
                className={`flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-6  ${styles.containerWidth}`}
            >
                {/* Left Side Container — circle: scaled lg…xl, exact 621px at xl+ */}
                <div className="relative mx-auto mb-0 flex aspect-square w-[88%] shrink-0 flex-col rounded-full bg-[#0F1640] sm:w-[82%] md:w-[76%] lg:mx-0 lg:mb-0 lg:w-[52%] lg:max-w-[min(100%,520px)] xl:aspect-auto xl:h-[621px] xl:w-[621px] xl:max-w-none gap-6 pt-12 sm:gap-8 sm:pt-14 lg:gap-10 lg:pt-16 xl:gap-12 xl:pt-20">

                    {/* Row 1  */}
                    <div className="w-full text-center px-2">
                        <h3
                            className={`font-[700] text-[17px] leading-snug text-white sm:text-[20px] lg:text-[24px] xl:text-[30px] ${styles.fontmontserrat}`}
                        >
                            Let’s Connect & Bring <br /> Your Vision to Life.
                        </h3>
                    </div>

                    {/* Row 2  */}
                    <div className="flex w-full flex-col gap-4 px-6 sm:gap-5 sm:px-10 md:px-12 lg:gap-6 lg:px-14 xl:gap-8 xl:px-20">
                        {/* Top Div  */}
                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            {/* Left Side Container  */}
                            <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2 xl:gap-4">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Address
                                </p>
                                <p
                                    className={`font-[600] text-[11px] leading-snug text-white sm:text-[13px] lg:text-[14px] xl:text-[16px] ${styles.fontmontserrat}`}
                                >
                                    <span
                                    className="leading-[28px]"
                                        onClick={() =>
                                            window.open("https://maps.app.goo.gl/tjeEjr4GgaLjGLCA7", "_blank")
                                        }
                                    >
                                        402 – 404, 4th Floor, <br /> Corporate Park, Tower A1, <br /> Sector 142,
                                        Noida
                                    </span>
                                </p>
                            </div>

                            {/* Right Side Container  */}
                            <div className="flex min-w-0 flex-col gap-3 sm:shrink-0">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Phone Number
                                </p>
                                <p
                                    className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[18px] ${styles.fontmontserrat}`}
                                >
                                    <span onClick={() => window.open("tel:09220516777", "_blank")}>09220516777</span>
                                    
                                </p>
                                <p
                                    className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[18px] ${styles.fontmontserrat}`}
                                >
                                   
                                    <span onClick={() => window.open("tel:07290002168", "_blank")}>07290002168</span>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Div  */}
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-2">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Email Address
                                </p>
                                <p className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[20px] ${styles.fontmontserrat}`}>
                                    <span
                                        className="break-all"
                                        onClick={() => window.open("mailto:info@ritzmediaworld.com", "_blank")}
                                    >
                                        info@ritzmediaworld.com
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Absolute Position Div  */}
                    <div className="absolute bottom-[-28px] right-[10px] flex h-[160px] w-[160px] flex-col items-center justify-center gap-2 rounded-full border-[1px] border-[#0F1640] bg-white text-center sm:bottom-[-32px] sm:right-[16px] sm:h-[200px] sm:w-[200px] sm:gap-3
                     lg:bottom-[-44px] lg:right-[-15px] 
                     lg:h-[230px] lg:w-[230px] xl:bottom-[-40px] xl:right-[30px] xl:h-[265px] xl:w-[265px] xl:gap-4">
                        <p className={`font-[600] text-[14px] xl:text-[18px] ${styles.fontmontserrat}`}>Follow Us</p>
                        <div className="flex justify-center items-center gap-2 sm:gap-3 xl:gap-4">
                            <a href="#" className="w-[22px] h-[22px] flex justify-center items-center">
                                <MdFacebook className="w-full h-full text-[#1877F2]" />
                            </a>
                            <a href="#" className="w-[22px] h-[22px] flex justify-center items-center">
                                <BsTwitterX className="w-full h-full text-[#000000]" />
                            </a>
                            <a href="#" className="w-[22px] h-[22px] flex justify-center items-center">
                                <FaInstagram className="w-full h-full text-[#C13584]" />
                            </a>

                            <a href="#" className="w-[22px] h-[22px] rounded-full bg-[#007AB9] flex justify-center items-center">
                                <TiSocialLinkedin className="w-full h-full text-white" />
                            </a>
                            <a href="#" className="w-[22px] h-[22px]  flex justify-center items-center">
                                <BsYoutube className="w-full h-full text-[#FF0000]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side Container  */}
                <div className="flex w-full   flex-col gap-4 lg:flex-1 lg:max-w-[min(100%,384px)] xl:max-w-[538px] xl:flex-none justify-between">
                    {/* Row 1  */}
                    <div>
                        <h5
                            className={`font-[600] text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px] ${styles.fontmontserrat}`}
                        >
                            Your Big Idea Starts Here
                        </h5>
                        <p className={`mt-2 font-[400] text-[14px] leading-relaxed sm:text-[15px] ${styles.fontpoppins}`}>
                            Got a project you&apos;re thinking about? Fill out the form below, & our team will reach out
                            to you soon to make your ideas happen!
                        </p>
                    </div>
                    {/* Row 2  */}
                    <div>
                        <form className="flex flex-col gap-6 xl:gap-8" onSubmit={handleSubmit}>
                            <input type="text" className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400] ${styles.fontmontserrat}`} placeholder="Your Name" />
                            <input type="tel" className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400]  ${styles.fontmontserrat}`} placeholder="Phone Number" />
                            <input type="email" className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400] ${styles.fontmontserrat}`} placeholder="Email Address" />
                            <select className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400] ${styles.fontmontserrat}`}>
                                <option value="1" className="text-[#5C5C5C]">Select Service</option>
                                <option value="2" className="text-[#5C5C5C]">Digital Marketing</option>
                                <option value="3" className="text-[#5C5C5C]">Creative Services</option>
                                <option value="4" className="text-[#5C5C5C]">Print Advertising</option>
                                <option value="5" className="text-[#5C5C5C]">Radio Advertising</option>
                                <option value="6" className="text-[#5C5C5C]">Content Marketing</option>
                                <option value="7" className="text-[#5C5C5C]">Web Development</option>
                                <option value="8" className="text-[#5C5C5C]">Celebrity Endorsements</option>
                                <option value="9" className="text-[#5C5C5C]">Influencer Marketing</option>
                            </select>
                            <textarea
                                rows={3}
                                className={`w-full resize-y border-b border-[#0F1640] bg-transparent pb-4 outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400] ${styles.fontmontserrat}`}
                                placeholder="Write Message"
                            />

                            {/* H Captcha  */}
                            <div className="flex w-full justify-start overflow-x-auto">
                                <HCaptcha
                                    sitekey={HCAPTCHA_SITEKEY}
                                    onVerify={handleCaptchaVerify}
                                    ref={captchaRef}
                                />
                            </div>
                            <div>
                                <button className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                                    <p className={`font-[500] text-[16px] xl:text-[18px] ${styles.fontmontserrat}`}>Submit</p>
                                    <div className="w-[40px] h-[40px] bg-[#C99237] rounded-full flex justify-center items-center">

                                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                            <rect x="2.19672" y="16.7173" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7173)" fill="white" />
                                        </svg>

                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Section6;