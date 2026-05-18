import React from "react";
import Image from "next/image";
import pageStyles from "./page.module.css";

const SERVICE_TAGS = [
    "Digital Marketing",
    "Creative Services",
    "Print Advertising",
    "Radio Advertising",
    "Content Marketing",
    "Web Development",
    "Celebrity Endorsements",
    "Influencer Marketing",
];

const HASHTAG_BLOCKS = [
    {
        tag: "#BRANDSFIRST",
        text: "Every decision starts with building stronger brand authority.",
    },
    {
        tag: "#VISIONTOREALITY",
        text: "We turn strategy into tangible outcomes your audience can feel.",
    },
    {
        tag: "#RESULTSOVERNOISE",
        text: "Clarity and impact matter more than volume alone.",
    },
    {
        tag: "#GROWCONNECTED",
        text: "Growth happens when brands and communities move together.",
    },
];

function SectionNew1() {
    return (
        <section className="w-full bg-white py-[35px] lg:py-[70px]">
            <div
                className={`w-full mx-auto overflow-x-visible overflow-y-visible `}
            >
                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-0">
                    {/* Left — copy + service tags */}
                    <div className="w-full shrink-0 px-5 py-8 sm:px-8 lg:w-[34%] lg:border-r-0 lg:border-[#E8E8E8] lg:py-10 xl:pl-10">
                        <h2
                            className={`${pageStyles.fontMontserrat} text-[28px] leading-[34px] sm:text-[36px] sm:leading-[42px] lg:text-[40px] lg:leading-[46px]`}
                            style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 600,
                                color: "#111111",
                                letterSpacing: "0%",
                            }}
                        >
                            Together{" "} <br />
                            <span style={{ color: "#C99237" }}>Toward</span>{" "}   <br/>
                            One Goal
                        </h2>
                        <p
                            className={`${pageStyles.fontopensans} mt-5 max-w-xl`}
                            style={{
                                fontFamily: "Open Sans, sans-serif",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "28px",
                                letterSpacing: "0%",
                                color: "#111111",
                            }}
                        >
                            We at Ritz Media World help brands grow at every
                            stage! With integrated expertise in PR, digital
                            marketing, performance, influencer marketing, and
                            reputation management, we build visibility locally
                            and credibility globally across India.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {SERVICE_TAGS.map((label) => (
                                <span
                                    key={label}
                                    className={`${pageStyles.fontMontserrat} inline-flex items-center rounded-md border border-[#C99237] px-3 py-2`}
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        lineHeight: "16px",
                                        letterSpacing: "0%",
                                        color: "#C99237",
                                    }}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Middle — navy + hashtags */}
                    <div
                        className="mx-[25px] flex w-[calc(100%-50px)] max-w-full flex-col justify-center gap-8 self-center px-6 py-10 sm:px-8 lg:mx-0 lg:w-[calc(33.333%-50px)] lg:max-w-none lg:flex-shrink-0 lg:self-stretch lg:gap-10 lg:px-8 xl:px-10"
                        style={{ backgroundColor: "#151F3D" }}
                    >
                        {HASHTAG_BLOCKS.map(({ tag, text }) => (
                            <div key={tag} className="text-left">
                                <p
                                    className={pageStyles.fontMontserrat}
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "50px",
                                        letterSpacing: "0%",
                                        color: "#ffffff",
                                    }}
                                >
                                    {tag}
                                </p>
                                <p
                                    className={`${pageStyles.fontopensans} mt-1 max-w-md text-white/90`}
                                    style={{
                                        fontFamily: "Open Sans, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                    }}
                                >
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right — hero image (min-height required for next/image fill) */}
                    <div className="relative isolate mx-[25px] w-[calc(100%-50px)] max-w-full shrink-0 self-center min-h-[380px] sm:min-h-[440px] lg:mx-0 lg:w-[calc(33.333%-50px)] lg:max-w-none lg:min-h-[520px] lg:h-full lg:self-stretch lg:flex-shrink-0">
                        <Image
                            src="/varunimage/contect-newsection-left-immage.jpg"
                            alt="Hand reaching toward a glowing digital sphere, Ritz Media World"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1023px) 100vw, 34vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionNew1;
