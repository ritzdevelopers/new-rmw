import Image from "next/image";
import React from "react";
import styles from "./page.module.css";

export default function Banner() {
    return (
        <section className={`w-full h-[460px] md:h-[326px] lg:h-[412px] xl:min-h-[515px] 
        bg-[url("/varun/influencer-marketing/contentmarketingmobilebanner2.jpg")] 
        md:bg-[url("/varun/influencer-marketing/contentmarketingdesktopbanner.jpg")]
        bg-cover bg-no-repeat bg-center flex items-end pb-8 sm:pb-4 lg:pb-22
         xl:pb-20 px-0 ${styles.bannerSize}`}>
            <div className="flex flex-col  self-end md:self-end gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full md:max-w-[80%] lg:max-w-none  mb-[20px] md:mb-[50px] lg:mb-0">
                <div className="w-[120px] sm:w-[140px] md:w-[155px] lg:w-[179px] h-[28px] sm:h-[32px] md:h-[35px] lg:h-[37px] relative hidden md:block">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="Ritz Media World"
                        title="Ritz Media World"
                        fill
                        className="object-contain"
                        sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
                        priority
                    />
                    <p className={`font-[700] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white absolute top-[50%] uppercase -translate-y-1/2 right-4 sm:right-5 md:right-6 lg:right-8 ${styles.fontmontserrat}`}>
                        Services
                    </p>
                </div>
                <div className="pl-0 md:pl-8 lg:pl-16 text-center md:text-left">
                  
                    <h1 className={`font-[800] text-[28px] sm:text-[36px] md:text-[31px] lg:text-[55px] text-white leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-18 mt-1 sm:mt-2 md:mt-3 ${styles.fontmontserrat}`}>
                        Content Marketing
                    </h1>
                      <h2 className={`font-[500] text-[14px] sm:text-[16px] not-last-of-type: lg:text-[19px] xl:text-[21px] text-white leading-tight sm:leading-snug md:leading-normal ${styles.fontopensans}`}>
                      Turning ideas into content that drives engagement and conversions.
                    </h2>
                </div>
            </div>
        </section>
    );
}
