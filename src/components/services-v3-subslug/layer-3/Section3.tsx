import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { X } from "lucide-react";

export default function Section3() {
  return (
    <section className="w-full bg-[#F7F7F7] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="w-[92%] sm:w-[90%] md:w-[86%] lg:w-[80%] mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className="uppercase text-[12px] sm:text-[13px] md:text-[14px] tracking-wide text-[#C99237] font-[700]"
            style={{ fontFamily: "MontserratBold" }}
          >
            Services
          </p>
          <h3
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[44px] font-[800] text-black"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h3>
          <p
            className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6E6E6E]"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#AAA8A8] mb-8 sm:mb-10 md:mb-12" />

        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <h4
            className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black font-[500]"
            style={{ fontFamily: "PoppinsMedium" }}
          >
            Branding &amp; Identity Development
          </h4>
          <X className="text-[#6E6E6E]" />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14 justify-center">
          {/* Left Media Block */}
          <div className="relative lg:max-w-[430px] xl:max-w-[480px]">
            {/* Gold decorative rectangle (image) */}
            <div className="absolute -left-10 top-6 hidden sm:block w-[179px] h-[208px]">
              <Image
                src="/services-v3-slug/images/Rectangle%2045282.jpg"
                alt="Decorative shape"
                fill
                className="object-contain"
                sizes="128px"
                priority
              />
            </div>
            {/* Main photo */}
            <div className="relative  sm:w-[249px] sm:h-[270px] rounded-[22px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)] z-[1]">
              <Image
                src="/services-v3-slug/images/what_we_provide.png"
                alt="What we provide"
                fill
                className="object-cover"
                
                priority
              />
            </div>
          </div>

          {/* Right Copy Block */}
          <div className="flex-1 max-w-[680px] justify-center">
            <div className="space-y-4 justify-center mt-[24px]">
              <p
                className="text-[16px] leading-[28px] text-[#2D2D2D]"
                style={{ fontFamily: "PoppinsRegular" }}
              >
                Your brand is more than a logo—it’s a promise. We strategically
                craft identities that resonate, impress, and persuade customers
                long-term.
              </p>
              <p
                className="text-[16px] leading-[28px] text-[#2D2D2D]"
                style={{ fontFamily: "PoppinsRegular" }}
              >
                Combining insightful positioning with imaginative visuals, we
                make your brand memorable, authentic, and compelling enough to
                command loyalty in crowded markets.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span
                className="text-[#101828] text-[16px]"
                style={{ fontFamily: "MontserratSemiBold" }}
              >
                Learn more
              </span>
              <Link
                href="/contact.html"
                target="_blank"
                aria-label="Learn more"
                className="w-10 h-10 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
              >
                <GoArrowUpRight className="text-white" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14 space-y-4">
          {[
            "Graphic Design",
            "Logo Design",
            "Print Advertising Design",
            "Packaging Design",
          ].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-[#AAA8A8] pb-4"
            >
              <p
                className="text-[16px] sm:text-[18px] text-[#101828]"
                style={{ fontFamily: "MontserratMedium" }}
              >
                {label}
              </p>
              <span className="text-[#6E6E6E] text-2xl leading-none select-none">
                +
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
