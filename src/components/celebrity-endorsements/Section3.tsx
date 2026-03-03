import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const featuredService = {
  id: "01.",
  title: "Celebrity Identification",
  description:
    "Selecting the correct celebrity endorsement is not guesswork, it is strategy. At Ritz Media World, we identify celebrities for brand endorsement who have an image, set of values, and fan base that perfectly aligns with your brand. Our rigorous process ensures that each endorsement is authentic, credible, and conversion-driven, converting celebrity fans into lifelong customers of your brand.",
  image: "/service-v3/celebrity-endorsements/s3/celebrity.jpg",
};

const secondaryServices = [
  { id: "02.", title: "Contract Negotiations" },
  { id: "03.", title: "Campaign Integration" },
  { id: "04.", title: "Creative Collaboration" },
  { id: "05.", title: "Public Relations" },
  { id: "06.", title: "Legal Compliance" },
];

export default function Section3() {
  return (
    <section className="w-full bg-[#0F1640] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="mx-auto w-[94%] sm:w-[92%] md:w-[90%] lg:w-[88%] xl:w-[84%]">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p
              className="text-[#C99237] uppercase text-[12px] sm:text-[13px] font-[600]"
              style={{ fontFamily: "MontserratSemiBold" }}
            >
              Services
            </p>
            <h2
              className="text-white text-[34px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-[1.05] font-[700]"
              style={{ fontFamily: "MontserratBold" }}
            >
              What We Provide <span className="text-[#FFFFFF] text-[16px] md:text-[17px] lg:text-[16px]" style={{ fontFamily: "OpenSansRegular" }}>Is more than what you&apos;ll ever need</span>
            </h2>
            
          </div>

          <div className="w-full max-w-[1246px] mx-auto rounded-[10px] overflow-hidden">
            <div
              className="px-4 sm:px-5 md:px-6 lg:px-7 py-5 sm:py-6 md:py-7 lg:min-h-[506px]"
              style={{
                background:
                  "linear-gradient(149.48deg, #C1892C -2.74%, #EFBB68 114.55%)",
              }}
            >
              <div className="flex items-start justify-between gap-6 sm:gap-8">
                <div className="flex items-start gap-8 sm:gap-10 md:gap-12 lg:gap-17">
                  <p
                    className="text-white text-[24px] sm:text-[26px] md:text-[28px] leading-[1] pt-1"
                    style={{ fontFamily: "MontserratRegular" }}
                  >
                    {featuredService.id}
                  </p>
                  <h3 className="text-white font-[600] text-[28px] leading-[50px] tracking-[0em]" style={{ fontFamily: "MontserratSemiBold" }}>
                    {featuredService.title}
                  </h3>
                </div>

                <Link
                  href="/contact.html"
                  target="_blank"
                  aria-label="Explore more"
                  className="shrink-0 flex items-center gap-3"
                >
                  <span
                    className="text-white text-[16px] sm:text-[18px]"
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    Explore More
                  </span>
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center">
                    <GoArrowUpRight className="text-[#C99237]" size={18} />
                  </span>
                </Link>
              </div>

              <div className="pl-0 sm:pl-[86px] lg:pl-[96px]">
                <p
                  className="mt-4 sm:mt-5 text-white font-[400] text-[16px] leading-[28px] tracking-[0em] max-w-[796px] lg:ml-[10px] lg:text-[17px]"
                  style={{ fontFamily: "OpenSansRegular" }}
                >
                  {featuredService.description}
                </p>

                <div className="mt-8 sm:mt-9 md:mt-10 relative w-full max-w-[760px] h-[190px] sm:h-[225px] md:h-[250px] lg:h-[206px] xl:h-[210px] rounded-[8px] overflow-hidden">
                  <Image
                    src={featuredService.image}
                    alt="Celebrity identification"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 90vw"
                  />
                </div>
              </div>
            </div>

            {secondaryServices.map((item) => (
              <div
                key={item.id}
                className="bg-[#18215A] border-t border-[#1E286A] px-4 sm:px-5 md:px-6 lg:px-7 py-5 sm:py-6 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-4 sm:gap-5 lg:gap-17">
                  <p
                    className="text-[#D9DDF5] text-[24px] sm:text-[26px] md:text-[28px] leading-[1]"
                    style={{ fontFamily: "MontserratRegular" }}
                  >
                    {item.id}
                  </p>
                  <h3
                    className="text-white font-[600] text-[28px] leading-[50px] tracking-[0em]"
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <Link
                  href="/contact.html"
                  target="_blank"
                  aria-label={`Explore ${item.title}`}
                  className="shrink-0 flex items-center gap-3"
                >
                  <span
                    className="text-white text-[16px] sm:text-[18px]"
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    Explore More
                  </span>
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center">
                    <GoArrowUpRight className="text-[#C99237]" size={18} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
