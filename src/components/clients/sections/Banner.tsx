"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Banner() {
    return (
        <section
            className={`relative w-full overflow-hidden bg-[#0F1640] flex items-end justify-center md:justify-start
                min-h-[300px] sm:min-h-[340px] md:min-h-[363px] lg:min-h-[490px] xl:min-h-[516px]
                ${styles.bannerHeight}
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                pb-8 sm:pb-10 md:pb-10 lg:pb-12`}
        >
            {/* Decorative ellipse – left, partially off-screen */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2
                    w-[min(85vw,420px)] sm:w-[min(70vw,480px)] md:w-[min(55vw,520px)] lg:w-[min(48vw,580px)] xl:w-[620px]
                    -translate-x-[38%] sm:-translate-x-[32%] md:-translate-x-[28%] lg:-translate-x-[22%]"
            >
                <Image
                    src="/clients-page/Ellipse.png"
                    alt=""
                    width={620}
                    height={620}
                    className="h-auto w-full object-contain"
                    priority
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 620px"
                />
            </div>

            <div className="relative z-10 flex w-full max-w-[1280px] flex-col text-center md:text-left">
                <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                    <h1
                        className={`font-[800] text-white ${styles.fontmontserrat} ${styles.clientsBannerTitle}`}
                    >
                        Clients
                    </h1>
                    <p
                        className={`font-[500] text-white mx-auto md:mx-0 ${styles.fontmontserrat} ${styles.clientsBannerSubtitle}`}
                    >
                        Leading Brands Trust Our Expertise For Reliable Innovative
                        Business Solutions
                    </p>
                </div>
            </div>
        </section>
    );
}
