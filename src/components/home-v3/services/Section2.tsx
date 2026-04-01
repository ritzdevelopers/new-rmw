import React from 'react';
import { BsArrowUpRight } from "react-icons/bs";
import styles2 from "./page.module.css";

function Section2() {
    return (
        <section className='flex justify-center items-center  py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px] border-b-[1px] border-[#D9D9D9]'>

            {/* Center Align Container  */}
            <div className={`flex flex-col md:flex-row justify-between items-center lg:items-center gap-6 sm:gap-8 md:gap-4 xl:gap-0 w-full  ${styles2.containerWidth}`}>
                {/* Left Side Container  */}
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-[547px] text-center md:text-left">
                    <p className={`font-[600] text-[18px] lg:text-[20px] xl:text-[30px] text-[#0F1640] leading-tight sm:leading-snug md:leading-normal ${styles2.fontmontserrat}  ${styles2.yofText}`}>
                        At <span className='text-[#C99237]'>Ritz Media World</span>,  We Make Creativity Work For You.
                    </p>
                    <p className={`font-[400] text-[14px] sm:text-[15px] xl:text-[16px] text-[#0F1640] leading-relaxed ${styles2.fontopensans}`}>
                    At our core, we are a team of experts in transforming ideas into high-quality content with a unique touch that captures your audience’s attention. Our process is designed to deliver outstanding results, leaving a lasting impression while getting your competitors’ attention too. We are a strong and efficient tool for your brand, delivering expertise in digital marketing, creative services, and modern media. You may be searching for the best SEO services in Noida or a top creative advertising agency in Delhi; we develop strategies that make your brand stand out in a competitive world.


                    </p>
                    <a
                        href="https://ritzmediaworld.com/contact.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className='flex justify-center md:justify-start'>
                            <button
                                className="flex justify-between items-center gap-3 sm:gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <p className={`font-[500] text-[16px] xl:text-[18px] text-[#0F1640] ${styles2.fontopensans}`}>
                                    Contact us
                                </p>

                                <div className="bg-[#C99237] h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white">
                                    <BsArrowUpRight className='text-white text-[16px] sm:text-[17px] lg:text-[18px]' />
                                </div>
                            </button>
                        </div>
                    </a>
                </div>

                {/* Right Side Container  */}
                <div className="flex flex-col sm:flex-row gap-4  xl:gap-10 items-center justify-center lg:justify-start w-full lg:w-auto">
                    <div className='border-[1px] border-[#DEDEDE] flex flex-col justify-center items-center gap-2 sm:gap-3 p-3 sm:p-4'>
                        {/* Row 1  */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 lg:gap-6 w-full sm:w-[180px] md:w-[195px] lg:w-[205px]">
                            <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                                <img src="/home-v3/service-imgs/s2/17+.png" alt="" className='w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] h-auto' />
                            </div>

                            <p className={`font-[600] text-[13px] text-[#0F1640] sm:text-[14px] md:text-[15px] lg:text-[16px] text-center sm:text-left inline ${styles2.fontopensans}`}>Years working experience</p>
                        </div>

                        {/* Row 2  */}
                        <div className={`w-full lg:w-[205px] ${styles2.yofImage}`}>
                            <img src="/home-v3/service-imgs/s2/frame-img.png" alt="" className='w-full h-full object-contain' />
                        </div>
                    </div>
                    <div className={`relative w-[280px] xl:w-[403px] h-auto  overflow-hidden  ${styles2.hidenElips}`}>
                        <div className='spin-slow'>
                            <img src="/home-v3/service-imgs/s2/s2-elips2.png"
                                alt=""
                                className='w-full h-full object-contain ' />
                            <span className='
                                            absolute 
                                            -top-9 right-48
                                            text-white md:text-[#C99237] 
                                            text-[24px] md:text-[28px] lg:text-[46px]
                                            font-bold
                                            '>
                                .
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Section2;