import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import styles from "@/components/shared/container.module.css";

export default function Section2() {
  return (
    <section className="w-full flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className={`w-[92%] sm:w-[88%] md:w-[82%] lg:w-[70%] text-center mx-auto ${styles.containerWidth}`}>
        <h2
          className="text-black font-[400] text-[25px] sm:text-[31px] md:text-[37px] lg:text-[24px] leading-[1.5]"
          style={{ fontFamily: "MontserratRegular" }}
        >
          Influencer marketing services are more than social media hype, they are
          about trust, reach, and customer activation. At{" "}
          <span className="font-[700]" style={{ fontFamily: "MontserratBold" }}>
            Ritz Media World
          </span>
          , we are a performance-driven influencer marketing agency that connects
          brands with the right influencers through effective influencer brand
          partnerships that engage the desired audience.
        </h2>

        <div
          className="mt-6 sm:mt-7 md:mt-8 text-[#2d2d2d] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.75] lg:text-[18px]"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          <p>
            From influencer research and planning to full influencer campaign
            management, we create effective{" "}
            <span className="font-[700]" style={{ fontFamily: "OpenSansBold" }}>
              influencer marketing campaigns
            </span>{" "}
            that boost awareness, engagement, and conversions. Whether you are
            looking to partner with influencers for brand marketing or looking
            for effective{" "}
            <span className="font-[700]" style={{ fontFamily: "OpenSansBold" }}>
              influencer marketing solutions
            </span>
            , our solutions will ensure that every partnership results in
            measurable visibility and business growth.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-4">
          <span
            className="text-black text-[24px] sm:text-[26px] md:text-[18px] font-[500]"
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
    </section>
  );
}
