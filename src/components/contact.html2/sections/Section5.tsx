"use client";

import pageStyles from "./page.module.css";

const STATS = [
    {
        number: "350+",
        title: "Satisfied Clients",
        desc: "Brands we've helped grow and succeed",
        variant: "gold-fill",
    },
    {
        number: "35+",
        title: "Awards",
        desc: "Passion, Obsession, and Persistence always pay off",
        variant: "gold-outline",
    },
    {
        number: "4.9",
        title: "Google reviews",
        sub: "★★★★★",
        isGoogle: true,
        variant: "white",
    },
    {
        number: "40+",
        title: "Service Categories",
        desc: "Designed to suit your growth needs at every stage",
        variant: "navy-fill",
    },
    {
        number: "17+",
        title: "Glorious Years",
        desc: "grueling hours that have led to remarkable branding success",
        variant: "navy-outline",
    },
];

function Section5() {
    return (
        <section className="w-full bg-white py-[35px]  lg:py-[70px]">
            <div
                className={`w-[92%] sm:w-[90%] ${pageStyles.containerWidth} max-w-[1300px] mx-auto`}
            >
                <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 lg:gap-7 xl:flex-nowrap xl:justify-center xl:gap-0">
                    {STATS.map((item, idx) => (
                        <div
                            key={item.title}
                            className={`
                w-[260px] h-[260px] min-w-[260px] min-h-[260px] max-w-[260px] max-h-[260px]
                mx-auto sm:mx-0
                rounded-full flex flex-col items-center justify-center
                text-center px-5 py-6
                border-2 shrink-0
                ${idx === 0 ? "xl:ml-0" : "xl:-ml-8"}
                ${idx === 0 || idx === 2 ? "xl:z-30" : idx === 3 ? "xl:z-20" : "xl:z-10"}
                ${
                    item.variant === "gold-fill"
                        ? "bg-[#C99237] border-[#C99237] text-white"
                        : item.variant === "gold-outline"
                          ? "bg-white border-[#C99237] text-black"
                          : item.variant === "navy-fill"
                            ? "bg-[#0F1640] border-[#0F1640] text-white"
                            : item.variant === "navy-outline"
                              ? "bg-white border-[#0F1640] text-black"
                              : "bg-white border-gray-200 text-black"
                }
              `}
                        >
                            {item.isGoogle ? (
                                <>
                                    <img
                                        src="/varunimage/googlereview.png"
                                        alt="Google review"
                                        className="w-[200px] h-auto object-contain"
                                    />
                                </>
                            ) : (
                                <>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[50px] leading-[100%] font-semibold text-current"
                                                : "text-4xl font-bold"
                                        } mb-3 text-center ${pageStyles.fontMontserrat}`}
                                    >
                                        {idx === 0 ||
                                        idx === 1 ||
                                        idx === 3 ||
                                        idx === 4 ? (
                                            <>
                                                {item.number.replace("+", "")}
                                                <span
                                                    className={`relative -top-[10px] inline-block text-[40px] leading-[100%] font-medium text-current ${pageStyles.fontMontserrat}`}
                                                >
                                                    +
                                                </span>
                                            </>
                                        ) : (
                                            item.number
                                        )}
                                    </p>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[18px] leading-[26px] font-semibold text-current"
                                                : "text-base font-semibold"
                                        } mb-1 text-center max-w-[180px] ${pageStyles.fontMontserrat}`}
                                    >
                                        {item.title}
                                    </p>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[15px] leading-[24px] font-normal text-current max-w-[175px]"
                                                : `text-xs leading-snug ${
                                                      item.variant ===
                                                          "gold-fill" ||
                                                      item.variant ===
                                                          "navy-fill"
                                                          ? "text-white/90"
                                                          : "text-gray-600"
                                                  }`
                                        } text-center ${pageStyles.fontopensans}`}
                                    >
                                        {item.desc}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section5;
