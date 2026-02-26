"use client"

import styles from "../page.module.css";

type S5CardProps = { isActive?: boolean; isOpen: boolean };

function S5Card({ isOpen }: S5CardProps) {
    return (
        <div
            className={`${styles.bookCardContainer} ${isOpen ? styles.bookCardContainerOpen : ""} h-[464px] flex flex-shrink-0`}
        >
            {/* Left Side Card Cover  */}
            <div className="w-[378px] h-full relative bg-[#F2F2F2] flex flex-col gap-4 p-8 flex-shrink-0">
                {/* Top Heading Row  */}
                <div className="w-full">
                    <h3 className="font-[500] text-[24px]">Advertising Concept Development</h3>
                </div>

                {/* Bottom Image Row  */}
                <div className="w-full flex justify-end">
                    <img src="/radio-advertising-page/s5/s5i1.png" alt="" className="w-[264px] h-auto object-cover" />
                </div>

                {/* Absolute Positioned Div  */}
                <div className="absolute top-4 right-4">
                    <p className="font-[500] text-[16px]">01</p>
                </div>
            </div>

            {/* Right Side Card Page Content – book flip */}
            <div
                className={`${styles.bookRightPage} ${isOpen ? styles.bookOpenRight : styles.bookCloseright} h-full flex flex-col items-start gap-6 p-10 bg-white border-[0.94px] border-[#F2F2F2]`}
            >
                <p className="font-[400] text-[16px]">As a leading radio advertising agency, we craft compelling, audio-centric campaign ideas, specifically designed to resonate with FM radio audiences. <br /><br />
                    Our approach is designed to guarantee that your radio advertisement breaks through, delivers brand awareness, and generates measurable results in the target market.
                </p>

                <button type="button" className="flex justify-center items-center gap-2">
                    <p className="font-[500] text-[18px]">Learn more</p>
                    <div className="w-[40px] h-[40px] bg-[#C99237] rounded-[50px] flex justify-center items-center">

                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                            <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                        </svg>

                    </div>
                </button>
            </div>
        </div>
    )
}


export default S5Card;