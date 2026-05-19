"use client";

import styles from "@/components/home-v3/services/page.module.css";

export default function Banners() {
  return (
    <>
      <section
        className={`flex w-full min-h-[380px] items-end justify-center bg-[#0F1640] bg-cover bg-center bg-no-repeat px-4 pb-10 pt-16 sm:min-h-[420px] sm:px-6 sm:pb-12 md:h-[300px] md:min-h-[300px] md:justify-start md:px-8 md:pb-6 md:pt-20 lg:h-[500px] lg:min-h-[500px] lg:px-12 lg:pb-10 xl:min-h-[515px] xl:pb-14`}
      >
        <BannerInner />
      </section>

      <section
        className={`mx-auto text-center w-full py-10 sm:py-12 md:py-14 lg:py-16 ${styles.containerWidth}`}
      >
        <div className="flex w-full  flex-col text-center ">
          <p
            className={`text-lg font-[400] leading-snug text-black sm:text-xl sm:leading-normal md:text-[18px] md:leading-10 lg:text-[20px] xl:text-[30px] ${styles.fontmontserrat} ${styles.yofText}`}
          >
            Careers at <span className="text-[#C99237] font-[700]"> RITZ MEDIA WORLD</span>
          </p>
          <p
            className={`mt-8 text-[24px] font-[500] leading-7 text-black sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}
          >
            Join Our Creative Minds & Build Meaningful Digital Experiences
          </p>
          <p
            className={`mt-5 text-[14px] font-[400] leading-7 text-black sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}
          >
            We’re always looking for passionate thinkers, designers, developers, and strategists who love turning ideas into impactful experiences. If you enjoy creativity, collaboration, and innovation you’ll feel right at home here.
          </p>

        </div>
      </section>
    </>
  );
}

function BannerInner() {
  return (
    <div className="flex w-full max-w-[90%] flex-col text-center sm:max-w-[85%] md:max-w-[80%] md:gap-5 md:text-left lg:max-w-none lg:gap-6">

      <div className="pl-0 sm:pl-4 md:pl-8 lg:pl-16">
        <h1
          className={`mb-2 mt-1 text-[28px] font-[800] leading-[30px] text-white sm:mt-2 sm:text-[36px] md:mb-0 md:mt-3 md:text-[24px] md:leading-normal lg:text-[30px] xl:text-[55px] xl:leading-14 ${styles.fontmontserrat}`}
        >
          Career
        </h1>
        <h2
          className={`text-[14px] font-[500] leading-tight text-white sm:text-[16px] sm:leading-snug md:text-[16px] md:leading-normal lg:text-[19px] xl:text-[21px] ${styles.fontmontserrat}`}
        >
          Turn your creativity into meaningful work with our innovative team
        </h2>
      </div>
    </div>
  );
}
