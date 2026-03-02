import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { Plus } from "lucide-react";

const services = [
  "Cost-Benefit Analysis",
  "Terms Negotiations",
  "Creative Collaboration",
  "Campaign Integration",
  "Messaging Optimization",
];

export default function Section3() {
  return (
    <section className="w-full bg-[#0F1640] py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="w-[94%] sm:w-[92%] md:w-[90%] lg:w-[88%] xl:w-[84%] mx-auto">
        <div className="text-center">
          <p
            className="uppercase text-[11px] sm:text-[12px] tracking-[0.1em] text-[#C99237]"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Services
          </p>
          <h2
            className="text-white text-[27px] sm:text-[34px] md:text-[42px] lg:text-[36px] font-[700] leading-tight"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h2>
          <p
            className="text-[#FFFFFF] text-[12px] sm:text-[13px] md:text-[14px] mt-1"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#2A3378] mt-8 sm:mt-10" />

        <div className="py-5 sm:py-6 border-b border-[#2A3378]">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 items-start">
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 w-full lg:w-[24%] xl:w-[22%] shrink-0 ml-[-22px]">
              <span
                className="text-[#FFFFFF] text-[13px] sm:text-[15px] lg:pt-1"
                style={{ fontFamily: "MontserratMedium" }}
              >
                01
              </span>

              <h3
                className="text-white text-[34px] sm:text-[40px] lg:text-[28px] leading-[1.05] font-[500]"
                style={{ fontFamily: "PoppinsMedium" }}
              >
                Influencer
                <br />
                Identification
              </h3>
            </div>

            <div className="w-full lg:flex-1">
              <p
                className="text-[#FFFFFF] text-[16px] font-[400] leading-[28px] tracking-[0 lg:text-[16px] "
                style={{ fontFamily: "PoppinsRegular" }}
              >
                When developing a partnership with an influencer, it is
                critical to find someone who not only has a voice, but also has
                the ability to create trust and influence purchasing behaviour
                amongst their audience, becoming lifelong customers for your
                business!
                <br />
                <br />
                Ritz Digital Media provides results-driven influencer
                partnerships through identifying and qualifying each influencer
                that shares similar values with the brand delivering authentic
                engagement, authentic influence, and measurable conversions.
              </p>

              <div className="mt-5 sm:mt-6 flex items-center gap-3">
                <span
                  className="text-white text-[14px] sm:text-[15px]"
                  style={{ fontFamily: "MontserratMedium" }}
                >
                  Learn more
                </span>
                <Link
                  href="/contact.html"
                  target="_blank"
                  aria-label="Learn more"
                  className="w-8 h-8 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                >
                  <GoArrowUpRight className="text-white" size={16} />
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-auto flex items-start gap-3 shrink-0">
              <div
                className="relative w-full max-w-[357.3134460449219px] h-[252px] rounded-[2px] overflow-hidden"
                style={{ width: "357px", height: "252px" }}
              >
                <Image
                  src="/service-v3/influencer-marketing-agency-in-india/s2/influencer_identify.jpg"
                  alt="Influencer identification"
                  fill
                  className="object-cover"
                />
              </div>
              <Image
                src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                alt="Close"
                width={30}
                height={30}
                className="shrink-0 mt-1"
              />
            </div>
          </div>
        </div>

        {services.map((label) => (
          <div
            key={label}
            className="py-4 sm:py-5 border-b border-[#2A3378] flex items-center justify-between gap-3"
          >
            <p
              className="text-[#E5E8FF] text-[15px] sm:text-[17px] md:text-[20px]"
              style={{ fontFamily: "MontserratRegular" }}
            >
              {label}
            </p>
            <Plus className="text-[#BFC6FF] w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </div>
        ))}

        <p
          className="text-[#FFFFFF] text-[14px] font-[400] leading-[24px] tracking-[0] mt-4 ml-[-22px]"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          Not sure which path fits your brand? Let&apos;s discuss your unique
          needs.
        </p>
      </div>
    </section>
  );
}
