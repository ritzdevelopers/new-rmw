import Image from "next/image";
import React from "react";

export default function Section1() {
  return (
    <section
      className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[615px] bg-cover bg-no-repeat bg-center flex items-end pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-26 px-4 sm:px-6 md:px-8 lg:px-0"
      style={{
        backgroundImage:
          'url("/services-v3-slug/banner/RMW%20Creative%20Services%20page.jpg")',
      }}
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none">
        <div className="w-[120px] sm:w-[140px] md:w-[155px] lg:w-[179px] h-[28px] sm:h-[32px] md:h-[35px] lg:h-[37px] relative">
          <Image
            src="/home-v3/service-imgs/s1/yellow-reactangle.png"
            alt="RMW"
            fill
            className="object-contain"
            sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
            priority
          />
          <p className="font-[700] uppercase text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] text-white absolute top-[50%] -translate-y-1/2 right-4 sm:right-5 md:right-6 lg:right-8" style={{ fontFamily: "MontserratBold" }}>
            CREATIVE SERVICES
          </p>
        </div>
        <div className="pl-0 sm:pl-4 md:pl-8 lg:pl-16">
          <p className="font-[500] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] text-white leading-[1.45] sm:leading-snug md:leading-normal" style={{ fontFamily: "MontserratMedium" }}>
            We blend design, content, and strategy to drive growth.
          </p>
          <h1 className="font-[800] text-[24px] sm:text-[32px] md:text-[44px] lg:text-[55px] text-white leading-[1.15] sm:leading-[1.15] md:leading-[1.2] lg:leading-16 mt-1 sm:mt-2 md:mt-3" style={{ fontFamily: "MontserratBold" }}>
            Creative Solutions for <br className="hidden sm:block" /> Modern Brands
          </h1>
        </div>
      </div>
    </section>
  );
}
