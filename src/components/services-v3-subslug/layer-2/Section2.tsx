import Image from "next/image";
import Link from "next/link";
// import styles from "./Section2.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="w-full flex items-center justify-center py-12 sm:py-16 md:py-16 lg:py-20 bg-white">
      <div className={`w-[92%] sm:w-[85%] md:w-[80%] lg:w-[68%] text-center mx-auto`}>
        <h2
          className="text-black font-[800] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-[1.3] sm:leading-tight"
          style={{ fontFamily: "MontserratBold" }}
        >
          Creativity is not an afterthought, but an advantage. At{" "}
          <span className="text-[#C99237]">Ritz Media World</span>, we realize
          that mediocracy is something no brand can truly afford.
        </h2>

        <div
          className="mt-6 sm:mt-7 md:mt-8 text-[#2d2d2d] space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          <p>
            From branding that shapes perception to design that demands
            attention, our creative services are strategically inventive,
            memorably original, and reliably persuasive.Whether it’s crafting identities that resonate deeply or visuals
            that linger delightfully, every piece of creative is engineered not
            just to be seen, but to sell. Good design gets noticed; great
            design gets chosen.
          </p>
          <p>
            With Ritz, your brand won’t merely blend in—it will confidently
            stand apart, win hearts, and effortlessly outperform competitors
            stuck in the predictable rut of convention.
          </p>
        </div>

        <div className="mt-8 sm:mt-5 md:mt-7 flex items-center justify-center gap-4">
          <span
            className="text-black text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]"
            style={{ fontFamily: "MontserratMedium" }}
          >
            Contact us
          </span>
          <Link
            href="/contact.html"
            target="_blank"
            aria-label="Contact us"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
          >
            <Image
              src={EXPLORE_ARROW_IMAGE}
              alt="Arrow"
              width={20}
              height={18}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
