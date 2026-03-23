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
        <section className="w-full py-[70px] flex justify-center items-center">
            <div className={`w-full flex justify-between items-center gap-6 ${styles.containerWidth}`}>

                {/* Left Side Container  */}
                <div className="w-[621px] h-[621px] bg-[#0F1640] rounded-full flex flex-col gap-12 pt-20 relative">

                    {/* Row 1  */}
                    <div className="w-full text-center">
                        <h3 className={`font-[700] text-[30px] text-white ${styles.fontmontserrat}`}>Let’s Connect & Bring <br /> Your Vision to Life.</h3>
                    </div>

                    {/* Row 2  */}
                    <div className="flex flex-col w-full gap-6 px-20">
                        {/* Top Div  */}
                        <div className="w-full flex justify-between items-center gap-4">
                            {/* Left Side Container  */}
                            <div className="flex flex-col gap-4">
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}>Address</p>
                                <p className={`font-[600] text-[16px] text-white ${styles.fontmontserrat}`}> <span onClick={() => window.open("https://maps.app.goo.gl/tjeEjr4GgaLjGLCA7", "_blank")}>402 – 404, 4th Floor, <br /> Corporate Park, Tower A1, <br /> Sector 142, Noida</span></p>
                            </div>

                            {/* Right Side Container  */}
                            <div>
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}>Phone Number</p>
                                <p className={`font-[600] text-[18px] text-white ${styles.fontmontserrat}`}>      <span onClick={() => window.open("tel:09220516777", "_blank")}>09220516777</span> 
                                    <br />
                                <span onClick={() => window.open("tel:07290002168", "_blank")}>07290002168</span>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Div  */}
                        <div className="w-full flex justify-between items-center">
                            <div className="flex flex-col ">
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}>Email Address</p>
                                <p className={`font-[600] text-[20px] text-white ${styles.fontmontserrat}`}> <span onClick={() => window.open("mailto:info@ritzmediaworld.com", "_blank")}>info@ritzmediaworld.com</span></p>
                            </div>
                        </div>
                    </div>


                    {/* Absolute Position Div  */}
                    <div className="absolute bottom-[-40px] right-[30px] w-[265px] h-[265px] bg-white rounded-full border-[1px] border-[#0F1640] flex flex-col gap-4 justify-center items-center text-center">
                        <p className={`font-[600] text-[18px] ${styles.fontmontserrat}`}>Follow Us</p>
                        <div className="flex justify-center items-center gap-4">
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
                <div className="w-full max-w-[538px] flex flex-col justify-between gap-4">
                    {/* Row 1  */}
                    <div>
                        <h5 className={`font-[600] text-[40px] ${styles.fontmontserrat}`}>Your Big Idea Starts Here</h5>
                        <p className={`font-[400] text-[15px] ${styles.fontpoppins}`}>Got a project you're thinking about? Fill out the form below, & our team will reach out to you soon to make your ideas happen!</p>
                    </div>
                    {/* Row 2  */}
                    <div>
                        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
                            <input type="textarea" className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[400] ${styles.fontmontserrat}`} placeholder="Write Message"></input>

                            {/* H Captcha  */}
                            <div className="w-full flex justify-start">
                                <HCaptcha
                                    sitekey={HCAPTCHA_SITEKEY}
                                    onVerify={handleCaptchaVerify}
                                    ref={captchaRef}
                                />
                            </div>
                            <div>
                                <button className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                                    <p className={`font-[500] text-[18px] ${styles.fontmontserrat}`}>Submit</p>
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