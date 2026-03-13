import Image from "next/image";
import Link from "next/link";


const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16 border-b border-[#E6E3E3]">
      <div className={`w-full max-w-[1300px] mx-auto containerWidth`}>
        <div className="w-full flex flex-col lg:flex-row gap-0 items-start">
          <div className="w-full lg:w-[54%]">
            <div className="w-full max-w-[760px]">
              <div className="w-full max-w-[616px]">
                <h2
                  className="text-[#1C1C1C]"
                  style={{
                    fontFamily: "MontserratRegular",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "26px",
                    lineHeight: "42px",
                    letterSpacing: 0,
                  }}
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
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                >
                  <Image
                    src={EXPLORE_ARROW_IMAGE}
                    alt="Arrow"
                    width={22}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[46%]">
            <div className="grid grid-cols-[42%_58%]">
              <div className="flex flex-col">
                <div className="pl-0 pr-5 pt-6 sm:pt-7 md:pt-2 lg:min-h-[189px] pl-[16px] border-l border-[#D9D9D9]">
                  <h3
                    className="text-[#0F1640] text-[52px] sm:text-[56px] md:text-[58px] lg:text-[60px] leading-none font-[700]"
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    35
                    <sup className="text-[30px] sm:text-[32px] md:text-[34px] top-[-1.7rem]">+</sup>
                  </h3>
                  <p
                    className="mt-3 text-[#000000] text-[30px] sm:text-[34px] md:text-[18px] lg:text-[20px] font-[700] leading-none"
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    Awards
                  </p>
                  <p
                    className="mt-3 text-[#000000] text-[16px] leading-[28px] font-[400] tracking-[0em]"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    Passion, Obsession, and Persistence always pay off.
                  </p>
                </div>

                <div className="relative w-full mt-0 h-[300px] sm:h-[360px] md:h-[430px] lg:h-[433px] overflow-hidden">
                  <Image
                    src="/service-v3/layer1/s7/aw2.png"
                    alt="Studio setup"
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 260px, (min-width:1024px) 220px, 42vw"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative w-full h-[150px] sm:h-[170px] md:h-[190px] lg:h-[190px] overflow-hidden">
                  <Image
                    src="/service-v3/celebrity-endorsements/s2/team.jpg"
                    alt="Ritz Media World team"
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 360px, (min-width:1024px) 310px, 58vw"
                  />
                </div>

                <div className="px-6 sm:px-7 py-6 sm:py-7 md:py-8 lg:px-7 lg:py-7">
                  <p
                    className="text-[#000000] text-[20px] leading-[28px] font-[400] tracking-[0em]"
                    style={{ fontFamily: "MontserratRegular" }}
                  >
                    Years of Storytelling, Turning Ideas Into Stories That Matter
                  </p>

                  <div className="relative w-full mt-6 sm:mt-7 h-[120px] sm:h-[140px] md:h-[150px] lg:h-[174px]">
                    <Image
                      src="/service-v3/content-marketing/s5/17-yow2.png"
                      alt="17 years working experience"
                      fill
                      className="object-contain object-left"
                      sizes="(min-width:1280px) 340px, (min-width:1024px) 300px, 58vw"
                    />
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <img
                      src="/service-v3/content-marketing/s5/google-reviews.png"
                      alt="Google reviews rating"
                      className="w-full h-auto"
                    />
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
