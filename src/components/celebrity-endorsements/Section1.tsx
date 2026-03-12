import Image from "next/image";

export default function Section1() {
  return (
    <section
      className='w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[515px]
      bg-[url("/service-v3/celebrity-endorsements/banners/celebrity_mobile.png")]
      md:bg-[url("/service-v3/celebrity-endorsements/banners/celebrity-endorsement.jpg")]
      bg-cover bg-no-repeat bg-center flex items-end pb-8 sm:pb-12 md:pb-16 lg:pb-22
      xl:pb-20 px-4 sm:px-6 md:px-8 lg:px-0'
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[95%] sm:max-w-[88%] md:max-w-[80%] lg:max-w-none">
        <div className="w-[120px] sm:w-[140px] md:w-[155px] lg:w-[179px] h-[28px] sm:h-[32px] md:h-[35px] lg:h-[37px] relative">
          <Image
            src="/home-v3/service-imgs/s1/yellow-reactangle.png"
            alt="RMW"
            fill
            className="object-contain"
            sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
            priority
          />
          <p
            className="font-[700] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white absolute top-[50%] uppercase -translate-y-1/2 right-4 sm:right-5 md:right-6 lg:right-8"
            style={{ fontFamily: "MontserratBold" }}
          >
            Services
          </p>
        </div>

        <div className="pl-0 sm:pl-3 md:pl-6 lg:pl-16">
          <p
            className="font-[500] text-[13px] sm:text-[15px] md:text-[16px] lg:text-[19px] xl:text-[21px] text-white leading-[1.45] sm:leading-snug md:leading-normal"
            style={{ fontFamily: "MontserratMedium" }}
          >
            Talent selection to campaign execution, we build brand <br/>
            <span className="block sm:inline">engagement, visibility, & trust.</span>
          </p>
          <h1
            className="font-[800] text-[26px] sm:text-[34px] md:text-[42px] lg:text-[55px] text-white leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-18 mt-1 sm:mt-2 md:mt-3"
            style={{ fontFamily: "MontserratExtraBold" }}
          >
            Celebrity Endorsements <br className="hidden sm:block" />
            <span className="font-[500]" style={{ fontFamily: "MontserratMedium" }}>
              Services
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}