"use client";

import Image from "next/image";
import pageStyles from "./page.module.css";

const ADDRESS_LINES = [
    "402 - 404, 4th Floor,",
    "Corporate Park, Tower A1,",
    "Sector 142, Noida",
];

function Section4() {
    return (

        <>  
        
        <div className="border-b border-[#E8E8E8]"></div>

        <section
            className={`w-full min-h-0 pt-[35px] lg:pt-[70px] bg-no-repeat bg-center ${pageStyles.section4NoBg}`}
            // style={{
            //     backgroundImage: "url('/varunimage/contactbg.png')",
            //     backgroundSize: "55% 95%",
            //     backgroundPosition: "60% calc(160% + 40px)",
            //     backgroundAttachment: "scroll",
            // }}
        >
            <div
                className={`w-full mx-auto overflow-hidden ${pageStyles.containerWidth}`}
            >
                <div className="relative">
                    <div className="relative flex flex-col lg:flex-row lg:flex-wrap gap-5 lg:gap-0">
                        <div className="lg:w-[54%] lg:flex-shrink-0">
                            <h2
                                className={`${pageStyles.fontMontserrat} text-center lg:text-left md:whitespace-nowrap lg:whitespace-normal`}
                            >
                                <span
                                    className="block md:inline lg:block text-[25px] md:text-[28px] lg:text-[35px] xl:text-[45px] leading-[1.15] text-[#000000]"
                                    style={{ fontFamily: "Montserrat" }}
                                >
                                    <span style={{ fontWeight: 800 }}>
                                        Let&apos;s Connect
                                    </span>
                                    <span style={{ fontWeight: 400 }}> & Bring </span>
                                </span>{" "}
                                <span
                                    className="block md:inline lg:block text-[25px] md:text-[28px] lg:text-[35px] xl:text-[45px] "
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        fontWeight: 400,
                                        fontStyle: "normal",
                                        // fontSize: "45px",
                                        lineHeight: 1.15,
                                        letterSpacing: "0%",
                                        color: "#000000",
                                    }}
                                >
                                    Your Vision to Life.
                                </span>{" "}
                                <span
                                    className="block md:inline lg:block font-semibold text-[25px] md:text-[28px] lg:text-[45px] leading-[1.15] text-[#000000]"
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 400,
                                    }}
                                >
                                    
                                </span>
                            </h2>
                              <div className="lg:w-[%] lg:flex-shrink-0 mt-3 xl:mt-9 lg:mt-[38px] md:mt-4">
                            <div className="flex w-full flex-col overflow-hidden border border-[#E5E5E5] sm:flex-row sm:flex-nowrap sm:items-stretch sm:border-0">
                                <div className="relative w-full h-[391px] sm:w-[26%] sm:flex-shrink-0 md:h-full md:min-h-[220px] md:aspect-auto">
                                    <Image
                                        src="/varunimage/R.jpg"
                                        alt="Ritz team forming the letter R"
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 639px) 100vw, 22vw"
                                    />
                                </div>
                                <a
                                    href="mailto:info@ritzmediaworld.com"
                                    className="flex min-h-[140px] w-full flex-col justify-center gap-1 bg-[#C99337] px-5 py-6 text-center sm:min-h-0 sm:w-[48%] sm:flex-shrink-0 sm:px-6 sm:text-left sm:py-5"
                                >
                                    <p
                                        className={pageStyles.fontopensans}
                                        style={{
                                            fontFamily: "Open Sans, sans-serif",
                                            fontWeight: 400,
                                            fontSize: "15px",
                                            lineHeight: "24px",
                                            color: "#fff",
                                        }}
                                    >
                                        Email Address
                                    </p>
                                    <p
                                        className={`${pageStyles.fontMontserrat} break-all text-[15px] sm:text-[16px] md:text-[18px] lg:text-[16px] xl:text-[20px]`}
                                        style={{
                                            fontFamily:
                                                "Montserrat, sans-serif",
                                            fontWeight: 600,
                                            lineHeight: "1.35",
                                            color: "#fff",
                                        }}
                                    >
                                        info@ritzmediaworld.com
                                    </p>
                                </a>
                                <div className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 bg-[#FFF3E0] px-5 py-6 text-center sm:min-h-0 sm:w-[26%] sm:flex-shrink-0 sm:items-start sm:px-4 sm:py-5 sm:text-left lg:px-3 xl:px-5">
                                    <p
                                        className={`${pageStyles.fontopensans} text-[15px] sm:text-[16px]`}
                                        style={{
                                            fontFamily: "Open Sans, sans-serif",
                                            fontWeight: 400,
                                            color: "#000000",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        Phone Number
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <a
                                            href="tel:09220516777"
                                            className={`${pageStyles.fontMontserrat} text-[16px] sm:text-[17px] xl:text-[18px]`}
                                            style={{
                                                fontFamily:
                                                    "Montserrat, sans-serif",
                                                fontWeight: 600,
                                                lineHeight: "1.35",
                                                color: "#000000",
                                            }}
                                        >
                                            09220516777
                                        </a>
                                        <a
                                            href="tel:07290002168"
                                            className={`${pageStyles.fontMontserrat} text-[16px] sm:text-[17px] xl:text-[18px]`}
                                            style={{
                                                fontFamily:
                                                    "Montserrat, sans-serif",
                                                fontWeight: 600,
                                                lineHeight: "1.35",
                                                color: "#000000",
                                            }}
                                        >
                                            07290002168
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className="lg:w-[46%] w-full lg:flex-shrink-0">
                            <div className=" overflow-hidden  flex flex-col sm:flex-row min-h-[315px]">
                                {/* Left: Building image */}
                                <div
                                    className={`${pageStyles.section4BuildingImgWrap} ${pageStyles.section4BuildingImgWrapFull}`}
                                >
                                    <img
                                        src="/varunimage/contact-office-image.jpg"
                                        alt="Corporate Park Tower A1"
                                        className={`w-full md:h-[320px] h-[370px] lg:h-[338px] xl:h-[360px] ${pageStyles.section4BuildingImg} ${pageStyles.section4BuildingImgFull}`}
                                    />
                                </div>
                                {/* Right: Dark blue block - same background */}
                                <div
                                    className={`relative flex flex-col gap-[0px] sm:w-[55%] md:w-full lg:w-[60%] ${pageStyles.section4AddressBlockFull} border border-[#E8E8E8] px-5 py-3 text-white sm:pl-8 sm:pr-6 sm:py-6`}
                                >
                                    <div className="relative mx-auto mb-2 h-[180px] w-auto flex-shrink-0 md:mb-0 md:ml-auto md:mr-0 md:h-[130px] lg:h-[130px] xl:h-[180px]">
                                        <img
                                            src="/varunimage/RMW-logo-contact.png"
                                            alt="Ritz Media World Logo"
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                    <div className=" xl:mt-1 lg:mt-8 md:mt-4">
                                        <p
                                            className={`mb-2 text-center md:text-left ${pageStyles.fontopensans}`}
                                            style={{
                                                fontFamily:
                                                    "Open Sans, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "16px",
                                                lineHeight: "28px",
                                                letterSpacing: "0%",
                                                color: "#111111",
                                            }}
                                        >
                                            Address
                                        </p>
                                        {ADDRESS_LINES.map((line) => (
                                           <p
                                           key={line}
                                           className={`${pageStyles.fontMontserrat} text-[16px] xl:text-[18px] leading-[28px] lg:text-[15px] lg:leading-[22px] xl:leading-[30px] text-center md:text-left`}
                                           style={{
                                               fontFamily: "Montserrat, sans-serif",
                                               fontWeight: 600,
                                               fontStyle: "normal",
                                               letterSpacing: "0%",
                                               color: "#111111",
                                           }}
                                       >
                                           {line}
                                       </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Section4;
