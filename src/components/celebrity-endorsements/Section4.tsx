import Image from "next/image";
import styles from "./page.module.css";

import ClientTestimonials from "@/components/influencer-marketing-agency-in-india/Section5";
import BrandImpactSection1 from "../copy/BrandImpactSection1";
import ServicesV3SubslugLayer4Section5 from "@/components/services-v3-subslug/layer-4/Section5";
import Link from "next/link";


const cards = [
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/blueelip.png",
    title: "Increase Visibility & Reach",
    description:
      "Celebrity endorsement of your brand captures instant attention and increases your brand reach. This helps your brand get noticed in a crowded marketplace.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/yellowelip.png",
    title: "Establish Trust & Credibility",
    description:
      "Trust-building celebrities increase brand trust and credibility. Professional celebrity endorsement services increase your brand's credibility and believability.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/blueelip.png",
    title: "Generate Engagement & Influence",
    description:
      "Celebrity marketing campaigns generate buzz and social media engagement. This builds stronger audience interaction and recall.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/yellowelip.png",
    title: "Generate Leads & Conversions",
    description:
      "Brands partnering with celebrities for promotion generate stronger persuasion and recall. This results in higher enquiries, sales, and customer interest.",
  },
];

const rampOffsets = ["lg:mt-[180px]", "lg:mt-[120px]", "lg:mt-[60px]", "lg:mt-[0px]"];



export default function Section4() {
  return (
    <section className="w-full bg-white py-[35px] lg:py-[70px] overflow-x-hidden flex flex-col items-center">
      <div
        className={`w-full mx-auto px-4 sm:px-6 lg:px-0 ${styles.containerWidth}`}
      >
        <h2
          className="text-center text-black font-[700] leading-[30px] text-[24px] sm:text-[44px] md:text-[28px] lg:text-[36px] md:leading-[48px]"
          style={{ fontFamily: "MontserratBold" }}
        >
          Why Celebrity
          <br />
          Endorsement Matter
        </h2>

        <div className="mt-5 md:mt-10 lg:mt-25">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={`w-full min-w-0 sm:w-1/2 lg:w-1/4 pb-5 sm:pb-12 lg:pb-0 ${rampOffsets[index]}`}
              >
                <div
                  className="relative lg:pl-7 xl:pl-8 lg:pr-4 xl:pr-5 lg:pt-0"
                >
                  {index === 0 ? (
                    <div className="absolute left-0 top-[38px] z-[1] hidden h-[274px] w-[0.5px] min-w-[0.5px] bg-[#E3E0E0] lg:block" />
                  ) : (
                    <div className="absolute left-0 top-[36px] z-[1] hidden h-[calc(100%+22px)] w-[0.5px] min-w-[0.5px] bg-[#E3E0E0] lg:block" />
                  )}
                  <div className="absolute left-0 top-[6px] z-0 hidden -translate-x-1/2 lg:mb-0 lg:block lg:-translate-x-1/2">
                    <img
                      src={card.icon}
                      alt={`${card.title} – Ritz Media World`}
                      title="Ritz Media World"
                      className="w-[30px] h-auto object-contain"
                    />
                  </div>

                  <div
                    className={
                      card.title === "Generate Engagement & Influence"
                        ? "lg:-mt-11"
                        : "lg:-mt-8"
                    }
                  >
                    <h3
                      className="text-center md:text-left mx-auto md:mx-0 text-black font-[700] text-[20px] leading-[30px] tracking-[0em] max-w-[288px] lg:leading-[25px] xl:leading-[30px]"
                      style={{ fontFamily: "MontserratBold" }}
                    >
                      {card.title === "Generate Engagement & Influence" ? (
                        <>
                          Generate Engagement
                          <br />
                          & Influence
                        </>
                      ) : (
                        card.title
                      )}
                    </h3>

                    {card.title === "Generate Leads & Conversions" ? (
                      <div className="mt-1 md:mt-3 w-full min-w-0 max-w-[224px] text-center md:text-left mx-auto md:mx-0">
                        <p
                          className="text-black font-[400] text-[16px] leading-[18px]  md:leading-[28px] tracking-[0em] lg:text-[17px] lg:leading-[25px] xl:text-[16px] xl:leading-[28px]"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {card.description}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="mt-1 md:mt-3 max-w-[234px] text-center md:text-left mx-auto md:mx-0 text-black font-[400] text-[16px] leading-[28px] tracking-[0em] lg:text-[17px] lg:leading-[25px] xl:text-[16px] xl:leading-[28px]"
                        style={{ fontFamily: "OpenSansRegular" }}
                      >
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:block lg:-mt-[180px] xl:-mt-[230px]">
          <Image
            src="/service-v3/celebrity-endorsements/s4/new_wave2.jpg"
            alt="Decorative wave"
            title="Decorative wave"
            width={1014}
            height={282}
            className="w-full h-auto object-contain"
            sizes="(min-width:1280px) 1014px, (min-width:1024px) 88vw, 94vw"
          />
        </div>
      </div>

      <div className="w-full -mt-8 sm:-mt-12 lg:mt-[30px] xl:-mt-[100px] lg:pb-[70px]">
        <ServicesV3SubslugLayer4Section5 />
      </div>

      <div className="w-full -mt-4 sm:-mt-6 md:-mt-[30px] lg:-mt-[50px] xl:-mt-[60px]">
        <ClientTestimonials />
      </div>

      <section className="w-full bg-[#0F1640] py-7 sm:py-8 md:py-10 flex justify-center px-4 sm:px-6 lg:px-0">
       
<Link href="/contact.html" target="_blank">
  <div className={`w-full mx-auto flex items-center justify-center text-center ${styles.containerWidth} cursor-pointer`}>
    <h3
      className="text-white font-[600] text-[18px] sm:text-[26px] md:text-[20px] lg:text-[28px] leading-tight"
      style={{ fontFamily: "MontserratSemiBold" }}
    >
      Ready to Leverage Star Power into Real Business Results?
    </h3>
  </div>
</Link>
      </section>
      <div className="pt-[35px] lg:pt-[70px]">       
        <BrandImpactSection1 />
      </div>
    </section>
  );
}
