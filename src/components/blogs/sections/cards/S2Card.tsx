import Image from "next/image";
import { LuShare2 } from "react-icons/lu";

function S2Card() {
    return (
        <div className="w-full max-w-[613px] mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6 mb-4">
            {/* Top Row  */}
            <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
                {/* Image Here  */}
                <div className="w-full relative h-[220px] sm:h-[200px] lg:h-[250px] xl:h-[345px] overflow-hidden">
                    <Image src="/blogs2/s2/s2-img.jpg" alt="Blog Image" fill className="" />
                </div>

                <h2 className="font-[700] text-[18px] sm:text-[17px] lg:text-[22px] leading-[1.3] text-[#0F1640] max-w-[500px]">
                    Top 10 Creative Agencies in India (2026 Rankings)
                </h2>

                <p className="font-[400] text-[14px] sm:text-[14px] lg:text-[16px] leading-[1.6] text-[#000000] max-w-[540px]">
                    Ritz Media World, CTM Creative Think Media, Ogilvy India, Dentsu Creative, Schbang, WATConsult, Leo Burnett India,...
                </p>
            </div>

            <div className="flex  items-center gap-2 lg:gap-6 pt-1">
                {/* Div 1  */}
                <div>
                    <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-[#000000]">29 May 2025</p>
                </div>

                {/* Div 2  */}
                <div className="pl-4 sm:pl-5 lg:pl-6 pr-4 sm:pr-5 lg:pr-6 border-l border-r border-[#B4B4B4]">
                    <button className="flex justify-center items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                        <p className="font-[500] text-[16px] sm:text-[14px] lg:text-[18px] text-[#0F1640]">Read more</p>
                        <div className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] lg:w-[40px] lg:h-[40px] bg-[#C99237] flex justify-center items-center rounded-full shrink-0">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] lg:w-[22px] lg:h-[20px]">
                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                <rect x="2.19675" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19675 16.7172)" fill="white" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Div 3  */}
                <div className="w-[30px] h-[30px]  lg:w-[40px] lg:h-[40px] bg-[#0F1640] rounded-full cursor-pointer flex justify-center items-center shrink-0 hover:opacity-90 transition-opacity">
                    <LuShare2 className="w-[15px] h-[15px] lg:w-[21px] lg:h-[21px] text-white" />
                </div>
            </div>
        </div>
    )
}

export default S2Card;