import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export default function Section2() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16 border-b border-[#E6E3E3]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-6 lg:gap-5 xl:gap-6 items-start">
          <div className="w-full lg:w-[56%] xl:w-[58%] lg:pl-16">
            <div className="w-full max-w-[760px]">
              <div className="lg:w-[616px]">
                <h2
                  className="text-[#1C1C1C] text-[26px] leading-[42px] font-[400] tracking-[0em]"
                  style={{ fontFamily: "MontserratRegular" }}
                >
                  <span className="font-[700]" style={{ fontFamily: "MontserratBold" }}>
                    Celebrity endorsement services
                  </span>{" "}
                  are more than just glamour, they help brands build trust, achieve
                  brand recognition, and shape consumer behavior. At{" "}
                  <span className="font-[700] text-[#C99237]" style={{ fontFamily: "MontserratBold" }}>
                    Ritz Media World
                  </span>
                  , we connect brands with celebrities to retain attention and impact,
                  through effective endorsement campaigns.
                </h2>
              </div>

              <div
                className="mt-5 sm:mt-6 text-[#000000] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] lg:w-[604px]"
                style={{ fontFamily: "OpenSansRegular" }}
              >
                <p>
                  Whether you are searching for{" "}
                  <span className="font-[700]" style={{ fontFamily: "OpenSansBold" }}>
                    celebrity endorsement services for brand promotion
                  </span>
                  , planning celebrity marketing campaigns, or seeking high-performing
                  brand ambassador partnerships, our team takes care of the entire
                  process with utmost care.
                </p>
                <p className="mt-4">
                  From scouting the best talent and setting up collaboration agreements
                  to executing flawless celebrity influencer marketing campaigns, we
                  ensure that every celebrity endorsement campaign enhances
                  credibility, reach, and engagement.
                </p>
              </div>

              <div className="mt-7 sm:mt-8 md:mt-9 flex items-center gap-4">
                <span
                  className="text-black text-[19px] sm:text-[20px] md:text-[30px] lg:text-[18px] font-[500]"
                  style={{ fontFamily: "MontserratMedium" }}
                >
                  Let&apos;s Talk Today
                </span>
                <Link
                  href="/contact.html"
                  target="_blank"
                  aria-label="Let's Talk Today"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                >
                  <GoArrowUpRight className="text-white" size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[50%]  pl-4 sm:pl-5 md:pl-6 lg:pl-0">
            <div className="flex items-stretch gap-0">
              <div className="w-[42%] flex flex-col">
                <div className="pl-6 border-l-[1px] border-[#D9D9D9] ">
                  <h3
                    className="text-[#0F1640] text-[52px] sm:text-[56px] md:text-[58px] lg:text-[56px] xl:text-[60px] leading-none font-[700]"
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    35
                    <sup className="text-[30px] sm:text-[32px] md:text-[34px] top-[-1.7rem]">+</sup>
                  </h3>
                  <p
                    className="mt-2 text-[#1A1A1A] text-[44px] sm:text-[42px] md:text-[38px] lg:text-[20px] font-[700] leading-none"
                    style={{ fontFamily: "MontserratBold" }}
                  >
                    Awards
                  </p>
                  <p
                    className="mt-2 text-[#353535] text-[17px] sm:text-[16px] md:text-[15px] lg:text-[16px] leading-[1.5]"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    Passion, Obsession, and Persistence always pay off.
                  </p>
                </div>

                <div className="relative w-full mt-3 sm:mt-4 h-[280px] sm:h-[360px] md:h-[460px] lg:h-[433px]  overflow-hidden lg:mt-[40px]">
                  <Image
                    src="/service-v3/layer1/s7/aw2.png"
                    alt="Studio setup"
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 260px, (min-width:1024px) 220px, 42vw"
                  />
                </div>
              </div>

              <div className="w-[46%] flex flex-col pl-3 sm:pl-4 md:pl-5 lg:pl-0">
                <div className="relative lg:w-[310px] h-[120px] sm:h-[160px] md:h-[190px] lg:h-[190px]  overflow-hidden">
                  <Image
                    src="/service-v3/celebrity-endorsements/s2/team.jpg"
                    alt="Ritz Media World team"
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 360px, (min-width:1024px) 310px, 58vw"
                  />
                </div>

                <div className="mt-5 sm:mt-6 lg:mt-7 w-full max-w-[340px] mx-auto lg:ml-[26px]">
                  <p
                    className="text-[#1A1A1A] text-[20px] leading-[28px] font-[400] tracking-[0em]"
                    style={{ fontFamily: "MontserratRegular" }}
                  >
                    Years of Storytelling, Turning Ideas Into Stories That Matter
                  </p>

                  <div className="relative w-full mt-4 sm:mt-5 h-[72px] sm:h-[88px] md:h-[96px] lg:h-[190px] ">
                    <Image
                      src="/service-v3/content-marketing/s5/17-yow2.png"
                      alt="17 years working experience"
                      fill
                      className="object-contain object-left"
                      sizes="(min-width:1280px) 340px, (min-width:1024px) 300px, 58vw"
                    />
                  </div>

                  <div className="mt-3 sm:mt-4 lg:mt-1">
                    
                    <div className="relative w-full h-[36px] sm:h-[44px] md:h-[52px] lg:h-[111px]">
                      <Image
                        src="/service-v3/content-marketing/s5/google-reviews.png"
                        alt="Google reviews rating"
                        fill
                        className="object-contain object-left"
                        sizes="(min-width:1280px) 340px, (min-width:1024px) 300px, 58vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
