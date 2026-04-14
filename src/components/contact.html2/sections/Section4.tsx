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
        <section
            className={`w-full min-h-0 pt-[35px] lg:pb-[70px] bg-no-repeat bg-center ${pageStyles.section4NoBg}`}
            style={{
                backgroundImage: "url('/varunimage/contactbg.png')",
                backgroundSize: "55% 95%",
                backgroundPosition: "60% calc(160% + 40px)",
                backgroundAttachment: "scroll",
            }}
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
                                    className="block md:inline lg:block text-[25px] md:text-[28px] lg:text-[45px] leading-[1.15] text-[#000000]"
                                    style={{ fontFamily: "Montserrat" }}
                                >
                                    <span style={{ fontWeight: 800 }}>
                                        Let&apos;s Connect
                                    </span>
                                    <span style={{ fontWeight: 400 }}> &</span>
                                </span>{" "}
                                <span
                                    className="block md:inline lg:block text-[25px] md:text-[28px] lg:text-[45px] "
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
                                    Bring Your Vision
                                </span>{" "}
                                <span
                                    className="block md:inline lg:block font-semibold text-[25px] md:text-[28px] lg:text-[45px] leading-[1.15] text-[#000000]"
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 400,
                                    }}
                                >
                                    to Life.
                                </span>
                            </h2>
                        </div>

                        <div className="lg:w-[46%] w-full lg:flex-shrink-0">
                            <div className=" overflow-hidden shadow-md flex flex-col sm:flex-row min-h-[315px]">
                                {/* Left: Building image */}
                                <div
                                    className={`${pageStyles.section4BuildingImgWrap} ${pageStyles.section4BuildingImgWrapFull}`}
                                >
                                    <img
                                        src="/varunimage/contact-office-image.jpg"
                                        alt="Corporate Park Tower A1"
                                        className={`w-full md:h-[320px] h-[312px] lg:h-[338px] xl:h-[360px] ${pageStyles.section4BuildingImg} ${pageStyles.section4BuildingImgFull}`}
                                    />
                                </div>
                                {/* Right: Dark blue block - same background */}
                                <div
                                    className={`relative flex flex-col gap-[0px] sm:w-[55%] md:w-full lg:w-[60%] ${pageStyles.section4AddressBlockFull} bg-[#151F3D] px-5 py-3 text-white sm:pl-8 sm:pr-6 sm:py-6`}
                                >
                                    <div className="relative mx-auto mb-2 h-[180px] w-auto flex-shrink-0 md:mb-0 md:ml-auto md:mr-0 md:h-[150px] lg:h-[130px] xl:h-[180px]">
                                        <img
                                            src="/varunimage/RMW-logo-contact.png"
                                            alt="Ritz Media World Logo"
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                    <div className=" xl:mt-1 lg:mt-2">
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
                                                color: "#ffffff",
                                            }}
                                        >
                                            Address
                                        </p>
                                        {ADDRESS_LINES.map((line) => (
                                            <p
                                                key={line}
                                                className={`${pageStyles.fontMontserrat} leading-[28px] lg:leading-[23px] xl:leading-[30px] text-center md:text-left `}
                                                style={{
                                                    fontFamily:
                                                        "Montserrat, sans-serif",
                                                    fontWeight: 600,
                                                    fontStyle: "normal",
                                                    fontSize: "16px",
                                                    letterSpacing: "0%",
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-[54%] lg:flex-shrink-0 mt-1 lg:mt-0">
                            <div className="flex flex-col sm:flex-row flex-wrap">
                                <div className="sm:w-1/4 relative w-full sm:flex-shrink-0">
                                    <Image
                                        src="/varunimage/R.jpg"
                                        alt="Ritz team"
                                        width={400}
                                        height={300}
                                        className="w-full h-auto object-cover object-center block"
                                        style={{ height: "auto" }}
                                        sizes="(max-width: 639px) 100vw, 18vw"
                                    />
                                </div>
                                <a
                                    href="mailto:info@ritzmediaworld.com"
                                    className="sm:w-1/2 bg-[#C99337] px-6 py-5 flex flex-col text-center sm:text-left justify-center sm:flex-shrink-0"
                                >
                                    <p
                                        className={pageStyles.fontopensans}
                                        style={{
                                            fontFamily: "Open Sans, sans-serif",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            color: "#fff",
                                        }}
                                    >
                                        Email Address
                                    </p>
                                    <p
                                        className={`${pageStyles.fontMontserrat} text-[16px] md:text-[20px] lg:text-[16px] xl:text-[22px]`}
                                        style={{
                                            fontFamily:
                                                "Montserrat, sans-serif",
                                            fontWeight: 600,
                                            lineHeight: "36px",
                                            color: "#fff",
                                        }}
                                    >
                                        info@ritzmediaworld.com
                                    </p>
                                </a>
                                <div className="flex w-full flex-col items-center justify-center bg-[#FFF3E0] px-5 py-5 sm:w-1/4 lg:px-2 xl:px-5 xl:py-5">
                                    <p
                                        className={`${pageStyles.fontopensans} text-[16px] lg:text-[13px] xl:text-[16px]`}
                                        style={{
                                            fontFamily: "Open Sans, sans-serif",
                                            fontWeight: 400,
                                            color: "#000000",
                                            lineHeight: "35px",
                                        }}
                                    >
                                        Phone Number
                                    </p>

                                    <a
                                        href="tel:09220516777"
                                        className={`${pageStyles.fontMontserrat} text-[18px] lg:text-[15px] mt-2 lg:mt-0 xl:mt-2 xl:text-[18px]`}
                                        style={{
                                            fontFamily:
                                                "Montserrat, sans-serif",
                                            fontWeight: 600,
                                            lineHeight: "35px",
                                            color: "#000000",
                                        }}
                                    >
                                        09220516777
                                    </a>

                                    <a
                                        href="tel:07290002168"
                                        className={`block ${pageStyles.fontMontserrat} text-[18px] lg:text-[15px] xl:text-[18px]`}
                                        style={{
                                            fontFamily:
                                                "Montserrat, sans-serif",
                                            fontWeight: 600,
                                            lineHeight: "35px",
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
            </div>
        </section>
    );
}

export default Section4;
