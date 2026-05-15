import Image from "next/image";
import React from "react";
import styles from "./page.module.css";

export default function Section1() {
    return (
        <section className={`w-full h-[460px] md:h-[302px] lg:min-h-[515px] 
        md:bg-[url("/varunimage/About-Us-banner-new.png")] 
        bg-[url("/new-about-imgs/s1/About-Us-page-mob.png")]
        bg-cover bg-no-repeat bg-center flex items-center md:items-end pb-8 sm:pb-4 lg:pb-14 px-0`}>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-0 lg:gap-3 xl:gap-6 w-full max-w-[100%] md:max-w-[80%] lg:max-w-none">
                <div className="md:w-[120px] lg:w-[150px] xl:w-[150px]  h-[28px] sm:h-[32px] md:h-[30px] lg:h-[37px] relative hidden md:block">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="RMW"
                        fill
                        // className="object-contain" 
                        sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
                        priority
                    />
                    <p className={`font-[700] text-center md:text-left text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white absolute top-[50%] uppercase -translate-y-1/2 right-4 sm:right-5 md:right-7 lg:right-10 xl:right-10 ${styles.fontmontserrat}`}>
                    About
                    </p>
                </div>
                <div className="pl-0 flex flex-col gap-2 md:pl-9 lg:pl-10 xl:pl-12 pb-[176px] md:pb-[15px] lg:pb-0">

                    <h1 className={`font-[700]  text-center md:text-left text-[26px] sm:text-[36px] md:text-[31px] lg:text-[55px] text-white leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-14 mt-1 sm:mt-2 lg:mt-0 ${styles.fontmontserrat}`}>
                    About Us
                    </h1>
                    <h2 className={`font-[400] text-center md:text-left text-[14px] sm:text-[16px] not-last-of-type: lg:text-[19px] xl:text-[30px] text-white ${styles.fontmontserrat}`}>
                    Driving Success with Every Brand <br className="hidden md:block" /> Strategy 
                    <br className="block md:hidden" />
                    We Create and Deliver.

                    </h2>
                </div>
            </div>
        </section>
    );
}
