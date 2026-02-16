

import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

function Section3() {

    return (
        <section
            className="w-full flex justify-center items-center py-[70px] px-20 relative"
            style={{
                background: "linear-gradient(to bottom, #FFD58E, #FFD48C, #FFD591)"
            }}
        >
            {/* Centered Align Container   */}
            <div className="w-full flex justify-center gap-10 z-20">

                {/* Left Side Container   */}
                <div className="relative flex justify-between items-center flex-col gap-10">

                    {/* Card 1  */}
                    <div className="px-10 h-[313px] rounded-[20px] bg-white
                     shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] flex flex-col justify-center items-center gap-4">

                        {/* Row 1  */}
                        <div className="w-full text-center">
                            <p className="font-[600] text-[16px]">Customer Research</p>
                        </div>


                        {/* Row 2  */}
                        <div className="w-[134px]">
                            <img src="/service-v3/layer1/charts/histogram.png" alt="" className="w-full h-auto object-cover" />
                        </div>


                        {/* Row 3  */}
                        <div>
                            <ul className="flex w-full justify-between gap-4 ">

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
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <p className="font-[500] text-[11px] text-[#5E5D5D] uppercase">user</p>
                                        <p className="font-[600] text-[18px]">38%</p>
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
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <p className="font-[500] text-[11px] text-[#5E5D5D] uppercase">user</p>
                                        <p className="font-[600] text-[18px]">38%</p>
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
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <p className="font-[500] text-[11px] text-[#5E5D5D] uppercase">user</p>
                                        <p className="font-[600] text-[18px]">38%</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2  */}
                    <div className="bg-white px-10 py-10 rounded-[20px]
                     flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center">
                            <p className="font-[600] text-[16px]">Team of Experts</p>
                        </div>
                        <div className="flex justify-center items-center-gap-2">
                            <div className="w-[44px] h-[44px] rounded-full">
                                <img src="/service-v3/layer1/team/vinay.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[44px] h-[44px] rounded-full">
                                <img src="/service-v3/layer1/team/shahvez.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[44px] h-[44px] rounded-full">
                                <img src="/service-v3/layer1/team/aakansha.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[44px] h-[44px] rounded-full">
                                <img src="/service-v3/layer1/team/aunty.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3  */}
                    <div className="px-10 py-10 rounded-[20px] bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] flex flex-col justify-center items-center gap-2">

                        {/* Row 1  */}
                        <div className="w-full text-center">
                            <p className="font-[600] text-[16px]">Generated Traffic <br />
                                & Leads</p>
                        </div>

                        {/* Row 2  */}
                        <div className="w-[168px]">
                            <img src="/service-v3/layer1/charts/bar-chart.png" alt="" className="w-full h-auto object-cover" />
                        </div>

                        {/* Row 3  */}
                        <div className="flex flex-col justify-center items-center text-center">
                            <p className="font-[700] text-[24px]">90%</p>
                            <p className="font-[500] text-[12px] text-[#827F7F]">Average annual grow rate</p>
                        </div>
                    </div>
                </div>


                {/* Centered Align Container  */}
                <div className="flex flex-col justify-between items-center text-center gap-8">
                    {/* Top Mobile Frame Video  */}
                    <div className="relative w-[325px] h-[642px] overflow-hidden rounded-[50px]">
                        <Image src="/service-v3/layer1/charts/mobile-frame-img.png" alt="" fill className="w-full h-full object-cover z-10" />

                        <video src="/test-images/test-video.mp4" className="absolute z- top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata"></video>
                    </div>

                    {/* Bottom Button  */}
                    <div className="w-full flex justify-center items-center">
                        <button className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer">
                            <p className="font-[500] text-[18px] text-black">
                                Get Free Consulting
                            </p>
                            <div className="bg-[#ffffff] h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-[#C99237]">
                                <BsArrowUpRight className="text-[#C99237] text-[16px] sm:text-[17px] lg:text-[18px]" />
                            </div>
                        </button>
                    </div>

                </div>

                {/* Right Side Container   */}
                <div className="flex flex-col justify-between gap-6 relative">
                    {/* Row 1 Card  */}
                    <div className="flex   flex-col justify-between gap-6 items-center text-center py-10 px-8 rounded-[20px] bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)]">
                        <div className="w-full text-center">
                            <p className="font-[600] text-[16px]">Facebook Marketing <br />
                                Campaign</p>
                        </div>

                        <div className="relative w-[132px]">
                            <img src="/service-v3/layer1/charts/circle-chart2.png" alt="" className="w-full h-auto object-cover" />
                            <div className="flex justify-center items-center gap-2 flex-col text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <p className="font-[700] text-[24px]">690</p>
                                <p className="font-[500] text-[12px] text-[#827F7F]">Goal : 1000</p>
                            </div>
                        </div>


                        {/* Row 3  */}
                        <div>
                            <ul className="flex w-full justify-between gap-4 ">

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
                                    <div className="flex justify-center items-center gap-2">
                                        <p className="font-[500] text-[12px] text-[#5E5D5D] uppercase">user</p>
                                        <p className="font-[600] text-[12px]">38%</p>
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
                                    <div className="flex justify-center items-center gap-2">
                                        <p className="font-[500] text-[12px] text-[#5E5D5D] uppercase">user</p>
                                        <p className="font-[600] text-[12px]">38%</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Row 2 Card   */}
                    <div className="flex flex-col bg-white shadow-[0_0_18px_0_rgba(255, 194, 93, 0.8)] py-10 px-8 rounded-[20px] gap-[17px] justify-center items-center">
                        <div className="w-full text-center">
                            <p className="font-[600] text-[16px] text-black">Content Score</p>
                        </div>

                        <div className="w-[144px]"><img
                            src="/service-v3/layer1/charts/half-circle-graph.png" alt="" className="w-full h-auto object-cover" /></div>

                        <div className="flex justify-center items-center gap-2 text-center">
                            <p className="font-[600] text-[16px] text-black">
                                93
                                <span className="font-[500] text-[#827F7F]"> /100</span>
                            </p>
                        </div>
                    </div>

                    {/* Row 3 Card   */}
                    <div className="w-[218px] relative">
                        <img src="/service-v3/layer1/charts/s3-g-review.png" alt="" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>


            {/* Centered Absolute Positioned Align Container  */}
            <div className="absolute top-50% left-50% transform -translate-x-50% z-10 -translate-y-50%">
                <div className="w-[709px]">
                    <img src="/service-v3/layer1/s2/service1-center-bg.png" alt="" className="w-full h-auto object-cover" />
                </div>
            </div>
        </section>
    )
}


export default Section3;