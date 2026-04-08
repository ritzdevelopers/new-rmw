"use client";
import Image from "next/image";

export default function WhoShouldJoin() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";
    const cards = [
        {
            icon: "/discussion-forum/briefcase.png",
            text: "Business owners & entrepreneurs",
        },
        {
            icon: "/discussion-forum/professional.png",
            text: "Marketing professionals",
        },
        {
            icon: "/discussion-forum/rocket.png",
            text: "Startups & founders",
        },
        {
            icon: "/discussion-forum/realState.png",
            text: "Real estate developers",
        },
        {
            icon: "/discussion-forum/School.png",
            text: "Schools & educational institutions",
        },
    ];

    return (
        <section className="w-full  py-5 px-8">
            <div className="max-w-[1320px] mx-auto px-[20px]">

                {/* MAIN GRID */}
                <div className="grid grid-cols-[1fr_320px] gap-[24px]">

                    {/* CENTER AREA */}
                    <div className="grid grid-cols-3 gap-[16px]">

                        {/* TITLE INSIDE GRID */}
                        <div className="flex items-start">
                            <h2 className="text-[42px] leading-[48px] font-[700] text-black">
                                Who Should <br /> Join?
                            </h2>
                        </div>

                        {/* CARDS */}
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="bg-[#F7F7F7] h-[110px] px-[18px] flex items-center gap-[14px]"
                            >
                                <Image
                                    src={card.icon}
                                    alt="icon"
                                    width={55}
                                    height={55}
                                />
                                <p className="text-[15px] leading-[20px] font-[500] text-black">
                                    {card.text}
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* RIGHT CTA */}
                    <div className="bg-white border border-[#E6E6E6] p-[22px] h-[236px] flex flex-col justify-between">

                        <p className="text-[15px] leading-[22px] text-black">
                            Anyone searching for a{" "}
                            <span className="font-[600]">
                                digital marketing company in Noida
                            </span>{" "}
                            or{" "}
                            <span className="font-[600]">
                                top ad agency in Delhi NCR
                            </span>
                        </p>

                        <div className="flex items-center gap-[10px]">
                            <span className="text-[16px] font-[500]">
                                Let’s Connect
                            </span>

                            <div className="w-[36px] h-[36px] bg-[#C99237] rounded-full flex items-center justify-center">
                                <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}