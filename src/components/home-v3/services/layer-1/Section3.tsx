

import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import styles from './page.module.css';
import Link from "next/link";
function Section3() {

    return (
        <section
            className="w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px] px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden"
            style={{
                background: "linear-gradient(to bottom, #FFD58E, #FFD48C, #FFD591)"
            }}
        >
            {/* Centered Align Container   */}
            <div className={`w-full  flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-10 z-20 `}>

                {/* Left Side Container   */}
                <div className="relative flex flex-col lg:flex-col justify-between lg:justify-between items-stretch lg:items-center gap-4 lg:gap-10 w-full lg:w-auto order-1 lg:order-none h-full">

                    {/* Card 1  */}
                    <div className="px-4 sm:px-3 lg:px-10 flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-[313px] w-full lg:w-[281px] rounded-[15px] sm:rounded-[20px] bg-white
                     shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-2 lg:py-0">

                        {/* Row 1  */}
                        <div className="w-full text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] ${styles.fontmontserrat}`}>Customer Research</p>
                        </div>


                        {/* Row 2  */}
                        <div className="w-[100px] sm:w-[120px] lg:w-[134px]">
                            <img src="/service-v3/layer1/charts/histogram.png" alt="" className="w-full h-auto object-cover" />
                        </div>


                        {/* Row 3  */}
                        <div>
                            <ul className="flex w-full justify-between gap-4 sm:gap-6 lg:gap-10">

                                <li className="flex">
                                    <span
                                        className="inline-block"
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            backgroundColor: "#C99237",
                                            display: "inline-block",
                                            borderRadius: "2px",
                                        }}
                                    ></span>
                                    <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                                        <p className={`font-[500] text-[10px] sm:text-[11px] text-[#5E5D5D] uppercase ${styles.fontmontserrat}`}>user</p>
                                        <p className={`font-[600] text-[16px] sm:text-[17px] lg:text-[18px] ${styles.fontmontserrat}`}>38%</p>
                                    </div>
                                </li>

                                <li className="flex">
                                    <span
                                        className="inline-block"
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            backgroundColor: "#C99237",
                                            display: "inline-block",
                                            borderRadius: "2px",
                                        }}
                                    ></span>
                                    <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                                        <p className={`font-[500] text-[10px] sm:text-[11px] text-[#5E5D5D] uppercase ${styles.fontmontserrat}`}>user</p>
                                        <p className={`font-[600] text-[16px] sm:text-[17px] lg:text-[18px] ${styles.fontmontserrat}`}>38%</p>
                                    </div>
                                </li>


                                <li className="flex">
                                    <span
                                        className="inline-block"
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            backgroundColor: "#C99237",
                                            display: "inline-block",
                                            borderRadius: "2px",
                                        }}
                                    ></span>
                                    <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                                        <p className={`font-[500] text-[10px] sm:text-[11px] text-[#5E5D5D] uppercase ${styles.fontmontserrat}`}>user</p>
                                        <p className={`font-[600] text-[16px] sm:text-[17px] lg:text-[18px] ${styles.fontmontserrat}`}>38%</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2  */}
                    <div className="bg-white xl:-ml-[15rem] px-6 sm:px-3 lg:px-8  py-3 sm:py-8 lg:py-4 rounded-[15px] sm:rounded-[20px]
                     flex flex-col justify-center items-center gap-2 sm:gap-3 w-full lg:w-auto flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-auto">
                        <div className="w-full text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] ${styles.fontmontserrat}`}>Team of Experts</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px] rounded-full overflow-hidden ">
                                <img src="/service-v3/layer1/team/vinay.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px] rounded-full overflow-hidden  -ml-[10px]">
                                <img src="/service-v3/layer1/team/shahvez.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px] rounded-full overflow-hidden  -ml-[10px]">
                                <img src="/service-v3/layer1/team/aakansha.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px] rounded-full overflow-hidden  -ml-[10px]">
                                <img src="/service-v3/layer1/team/aunty.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3  */}
                    <div className="px-6 sm:px-3 md:px-8 py-4 sm:py-6 lg:py-4 rounded-[15px] sm:rounded-[20px] bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10 lg:ml-8 w-full lg:w-auto flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-auto">

                        {/* Row 1  */}
                        <div className="w-full text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] ${styles.fontmontserrat}`}>Generated Traffic <br />
                                & Leads</p>
                        </div>

                        {/* Row 2  */}
                        <div className="w-[130px] sm:w-[150px] lg:w-[168px]">
                            <img src="/service-v3/layer1/charts/bar-chart.png" alt="" className="w-full h-auto object-cover" />
                        </div>

                        {/* Row 3  */}
                        <div className="flex flex-col justify-center items-center text-center">
                            <p className={`font-[700] text-[20px] sm:text-[22px] lg:text-[24px] ${styles.fontmontserrat}`}>90%</p>
                            <p className={`font-[500] text-[11px] sm:text-[12px] text-[#827F7F] ${styles.fontmontserrat}`}>Average annual grow rate</p>
                        </div>
                    </div>
                </div>


                {/* Centered Align Container  */}
                <div className="flex flex-col justify-between items-center text-center gap-6 sm:gap-8 col-span-2 lg:col-span-1 w-full lg:w-auto order-2 lg:order-none">
                    {/* Top Mobile Frame Video  */}
                    <div className="relative w-[280px] h-[550px] sm:w-[320px] sm:h-[630px] md:w-[250px] md:h-[496px] lg:w-[381px] lg:h-[750px] overflow-hidden rounded-[50px] sm:rounded-[43px] lg:rounded-[70px] mx-auto">
                        <Image src="/service-v3/layer1/charts/mobile-frame-img.png" alt="" fill className="w-full h-full object-cover z-10" />

                        <video src="/test-images/test-video.mp4" className="absolute z-1 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[97%] object-cover" autoPlay loop muted playsInline preload="metadata"></video>
                    </div>

                    {/* Bottom Button  */}
                    <div className="w-full flex justify-center items-center">
                        <button className="flex justify-between items-center gap-3 sm:gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                            <p className={`font-[500] text-[15px] sm:text-[16px] lg:text-[18px] text-black ${styles.fontmontserrat}`}>
                                Get Free Consulting
                            </p>
                            <Link href="/contact.html">
                                <div className="bg-[#ffffff] h-[34px] w-[34px] sm:h-[36px] sm:w-[36px] md:h-[38px] md:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-[#C99237] cursor-pointer">

                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.4276 2.92431L17.1346 9.08101L12.9493 4.01684L19.4276 2.92431Z" fill="#C99237" />
                                        <rect x="2.19678" y="16.7173" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7173)" fill="#C99237" />
                                    </svg>

                                </div>
                            </Link>
                        </button>
                    </div>

                </div>

                {/* Right Side Container   */}
                <div className="flex flex-col lg:flex-col items-stretch xl:items-start justify-between gap-6 relative w-full lg:w-auto order-3 lg:order-none h-full">
                    {/* Row 1 Card  */}
                    <div className="flex flex-col justify-between gap-4 sm:gap-6 items-center text-center py-5 sm:py-6 px-6 sm:px-3 xl:px-6 rounded-[15px] sm:rounded-[20px] bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] w-full lg:w-auto flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-auto">
                        <div className="w-full text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] ${styles.fontmontserrat}`}>Facebook Marketing <br />
                                Campaign</p>
                        </div>

                        <div className="relative w-[110px] sm:w-[120px] lg:w-[132px]">
                            <img src="/service-v3/layer1/charts/circle-chart2.png" alt="" className="w-full h-auto object-cover" />
                            <div className="flex justify-center items-center gap-1 sm:gap-2 flex-col text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <p className={`font-[700] text-[20px] sm:text-[22px] lg:text-[24px] ${styles.fontmontserrat}`}>690</p>
                                <p className={`font-[500] text-[11px] sm:text-[12px] text-[#827F7F] ${styles.fontmontserrat}`}>Goal : 1000</p>
                            </div>
                        </div>


                        {/* Row 3  */}
                        <div>
                            <ul className="flex w-full justify-between gap-4 sm:gap-6">

                                <li className="flex gap-2 items-center text-center">
                                    <span
                                        className="inline-block"
                                        style={{
                                            width: "7px",
                                            height: "7px",
                                            backgroundColor: "#C99237",
                                            display: "inline-block",
                                            borderRadius: "50%",
                                        }}
                                    ></span>
                                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                                        <p className={`font-[500] text-[11px] sm:text-[12px] text-[#5E5D5D] uppercase ${styles.fontmontserrat}`}>user</p>
                                        <p className={`font-[600] text-[11px] sm:text-[12px] ${styles.fontmontserrat}`}>38%</p>
                                    </div>
                                </li>

                                <li className="flex gap-2 items-center text-center">
                                    <span
                                        className="inline-block"
                                        style={{
                                            width: "7px",
                                            height: "7px",
                                            backgroundColor: "#D9D9D9",
                                            display: "inline-block",
                                            borderRadius: "50%",
                                        }}
                                    ></span>
                                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                                        <p className={`font-[500] text-[11px] sm:text-[12px] text-[#5E5D5D] uppercase ${styles.fontmontserrat}`}>user</p>
                                        <p className={`font-[600] text-[11px] sm:text-[12px] ${styles.fontmontserrat}`}>38%</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Row 2 Card   */}
                    <div className="flex xl:ml-[5rem] flex-col bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] py-3 px-6 sm:px-3 md:px-8 rounded-[15px] sm:rounded-[20px] gap-4 sm:gap-[17px] justify-center items-center w-full lg:w-auto flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-auto">
                        <div className="w-full text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black ${styles.fontmontserrat}`}>Content Score</p>
                        </div>

                        <div className="w-[120px] sm:w-[135px] lg:w-[144px]"><img
                            src="/service-v3/layer1/charts/half-circle-graph.png" alt="" className="w-full h-auto object-cover" /></div>

                        <div className="flex justify-center items-center gap-2 text-center">
                            <p className={`font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black ${styles.fontmontserrat}`}>
                                93
                                <span className={`font-[500] text-[#827F7F] ${styles.fontmontserrat}`}> /100</span>
                            </p>
                        </div>
                    </div>

                    {/* Row 3 Card   */}
                    <div className="w-full lg:w-[218px] lg:mr-[5rem] relative mx-auto lg:mx-0 flex-1 lg:flex-none h-auto sm:h-[280px] lg:h-auto flex items-center justify-center">
                        <img src="/service-v3/layer1/charts/s3-g-review.png" alt="" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>


            {/* Centered Absolute Positioned Align Container  */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <div className="w-[400px] md:w-[550px] lg:w-[650px] xl:w-[709px]">
                    <img src="/service-v3/layer1/s2/service1-center-bg.png" alt="" className="w-full h-auto object-cover" />
                </div>
            </div>
        </section>
    )
}


export default Section3;