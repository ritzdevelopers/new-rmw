"use client";
import Image from "next/image";

export default function WhoShouldJoin() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    const cards = [
        { icon: "/discussion-forum/briefcase.png", text: "Business owners & entrepreneurs" },
        { icon: "/discussion-forum/professional.png", text: "Marketing professionals" },
        { icon: "/discussion-forum/rocket.png", text: "Startups & founders" },
        { icon: "/discussion-forum/realState.png", text: "Real estate developers" },
        { icon: "/discussion-forum/School.png", text: "Schools & educational institutions" },
    ];

    return (
        <section className="w-full py-5 px-4 md:px-12">
            <div className="max-w-[1320px] mx-auto">

                {/* MAIN GRID */}
                <div className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-1 
                    lg:grid-cols-[1fr_280px] 
                    xl:grid-cols-[1fr_320px] 
                    gap-6
                ">
                    {/* LEFT SIDE */}
                    <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        gap-4
                    ">

                        {/* TITLE */}
                        <div className="flex items-start sm:col-span-2 lg:col-span-1">
                            <h2 className="
                                text-[26px] leading-[32px]
                                sm:text-[32px] sm:leading-[38px]
                                md:text-[36px] md:leading-[42px]
                                lg:text-[32px] lg:leading-[32px]
                                 xl:text-[42px] xl:leading-[48px]
                                font-[700] text-black
                            ">
                                Who Should Join?
                            </h2>
                        </div>

                        {/* CARDS */}
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="
                                    bg-[#F7F7F7] 
                                    min-h-[90px] sm:min-h-[80px] lg:h-[110px]
                                    px-4 sm:px-[18px] 
                                    flex items-center gap-3 sm:gap-[14px]
                                "
                            >
                                <Image
                                    src={card.icon}
                                    alt="icon"
                                    width={45}
                                    height={45}
                                    className="sm:w-[50px] sm:h-[50px] md:w-[50px] md:h-[50px] lg:w-[40px] lg:h-[40px] xl:w-[60px] xl:h-[60px]"
                                />

                                <p className="
                                    text-[13px] leading-[18px]
                                    sm:text-[14px]
                                    lg:text-[15px] lg:leading-[20px]
                                    font-[500] text-black
                                ">
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT CTA */}
                    <div className="
                        bg-white border border-[#E6E6E6] 
                        p-4 sm:p-5 lg:p-[22px] 
                        h-auto lg:h-[236px]
                        flex flex-col justify-between gap-4
                    ">
                        <p className="
                            text-[13px] leading-[20px]
                            sm:text-[14px]
                            lg:text-[15px] lg:leading-[22px]
                            text-black
                        ">
                            Anyone searching for a{" "}
                            <span className="font-[600]">
                                digital marketing company in Noida
                            </span>{" "}
                            or{" "}
                            <span className="font-[600]">
                                top ad agency in Delhi NCR
                            </span>
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-[500]">
                                Let’s Connect
                            </span>

                            <div className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] lg:w-[36px] lg:h-[36px] bg-[#C99237] rounded-full flex items-center justify-center">
                                <img
                                    src={EXPLORE_ARROW_IMAGE}
                                    alt="Explore Arrow"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}