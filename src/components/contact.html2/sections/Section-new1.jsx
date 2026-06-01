import React from "react";
import Image from "next/image";
import Link from "next/link";
import pageStyles from "./page.module.css";

const SERVICE_LINKS = [
    {
        label: "Digital Marketing",
        href: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
        label: "Creative Services",
        href: "https://ritzmediaworld.com/services/creative-services",
    },
    {
        label: "Print Advertising",
        href: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
        label: "Radio Advertising",
        href: "https://ritzmediaworld.com/services/radio-advertising",
    },
    {
        label: "Content Marketing",
        href: "https://ritzmediaworld.com/services/contents-marketing",
    },
    {
        label: "Web Development",
        href: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    {
        label: "Celebrity Endorsements",
        href: "https://ritzmediaworld.com/services/celebrity-endorsements",
    },
    {
        label: "Influencer Marketing",
        href: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    },
];

const HASHTAG_BLOCKS = [
    {
        tag: "#BRANDSFIRST",
        text: "Every decision starts with building stronger brand authority.",
    },
    {
        tag: "#VISIONTOREALITY",
        text: "Strategic thinking turned into real-world brand growth.",
    },
    {
        tag: "#RESULTSOVERNOISE",
        text: "Focus on what moves the brand forward, not what just looks good.",
    },
    {
        tag: "#GROWCONNECTED",
        text: "Reach audiences seamlessly across digital ecosystems and real-world touchpoints.",
    },
];

function SectionNew1() {
    return (
        <section className="w-full overflow-x-hidden  pt-[35px] md:pt-[70px]">
            <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
                {/* Left — heading, copy, service pills */}
                <div className="flex w-full flex-col items-center justify-center px-5 py-8 text-center sm:px-8 lg:w-1/2 lg:items-start lg:py-10 lg:text-left xl:pl-10 xl:pr-0">
                    <h2
                        className={`${pageStyles.fontMontserrat} text-[40px] font-semibold leading-[46px] tracking-normal`}
                    >
                        <span className="lg:hidden">
                            <span className="text-[#111111]">Together</span>{" "}
                            <span className="text-[#C99237]">Toward</span>
                            <br />
                            <span className="text-[#111111]">One Goal</span>
                        </span>
                        <span className="hidden lg:block">
                            <span className="text-[#111111]">Together</span>
                            <br />
                            <span className="text-[#C99237]">Toward</span>
                            <br />
                            <span className="text-[#111111]">One Goal</span>
                        </span>
                    </h2>

                    <p
                        className={`${pageStyles.fontopensans} mt-5 max-w-[600px] text-[16px] font-normal leading-[28px] tracking-normal text-[#111111] mx-auto lg:mx-0`}
                    >
                        We at Ritz Media World help brands grow at every stage!
                        With integrated expertise in PR, digital marketing,
                        performance, influencer marketing, and reputation
                        management, we build visibility locally and credibility
                        globally across India.
                    </p>

                    <ul className="mt-8 flex flex-wrap justify-center gap-3 list-none p-0 m-0 lg:justify-start">
                        {SERVICE_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    title={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${pageStyles.fontMontserrat} inline-flex items-center rounded-full border border-[#C99237] bg-white px-3 py-2 text-xs font-semibold text-[#C99237] no-underline transition-colors hover:bg-[#C99237] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99237]`}
                                >
                                    <h3 className="m-0 text-inherit text-xs font-semibold">
                                        {label}
                                    </h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right — navy + image; group shifted 50px left, image stays flush to screen right */}
                <div className="flex w-full flex-col  sm:flex-row lg:min-h-[520px] xl:-translate-x-[-105px] lg:translate-x-[-55px]">
                    {/* Navy panel — 50% of right column */}
                    <div className="flex w-full shrink-0 flex-col items-center justify-center gap-8 bg-[#060B4F] px-6 py-10 text-center sm:w-[500px] sm:items-start sm:gap-9 sm:px-7 sm:py-12 sm:text-left lg:pl-8 lg:pr-6 lg:py-14">
                        {HASHTAG_BLOCKS.map(({ tag, text }) => (
                            <div key={tag} className="w-full max-w-[320px] sm:max-w-none">
                                <h4
                                    className={`${pageStyles.fontMontserrat} text-[20px] font-semibold leading-[50px] text-white m-0`}
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    {tag}
                                </h4>
                                <p
                                    className={`${pageStyles.fontopensans} mx-auto max-w-[300px] text-[14px] font-normal leading-6 text-white sm:mx-0`}
                                    style={{
                                        fontFamily: "Open Sans, sans-serif",
                                        fontWeight: 400,
                                        letterSpacing: "0%",
                                    }}
                                >
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Image — flush to viewport right (compensates parent -50px shift) */}
                    <div className="relative min-h-[360px] w-full shrink-0 overflow-hidden sm:min-h-0 sm:w-[390px] sm:self-stretch lg:translate-x-[0px] lg:mr-[calc(50%-50vw)]">
                        <Image
                            src="/varunimage/contect-newsection-left-immage.jpg"
                            alt="Hand reaching toward a glowing digital sphere, Ritz Media World"
                            title="Hand reaching toward a glowing digital sphere, Ritz Media World"
                            fill
                            className="object-cover object-center"
                            sizes="390px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionNew1;
