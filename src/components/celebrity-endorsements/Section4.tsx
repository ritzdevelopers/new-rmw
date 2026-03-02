import Image from "next/image";
import BrandThatTrustUs from "@/components/influencer-marketing-agency-in-india/BrandThatTrustUs";
import Section5 from "@/components/influencer-marketing-agency-in-india/Section5";
import Section8 from "../influencer-marketing-agency-in-india/Section8";
import Section7 from "../influencer-marketing-agency-in-india/Section7";

const cards = [
  {
    icon: "/service-v3/celebrity-endorsements/s4/blue_capture.png",
    title: "Increase Visibility & Reach",
    description:
      "Celebrity endorsement of your brand captures instant attention and increases your brand reach. This helps your brand get noticed in a crowded marketplace.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/s4/golden_capture.png",
    title: "Establish Trust & Credibility",
    description:
      "Trust-building celebrities increase brand trust and credibility. Professional celebrity endorsement services increase your brand's credibility and believability.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/s4/blue_capture.png",
    title: "Generate Engagement & Influence",
    description:
      "Celebrity marketing campaigns generate buzz and social media engagement. This builds stronger audience interaction and recall.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/s4/golden_capture.png",
    title: "Generate Leads & Conversions",
    description:
      "Brands partnering with celebrities for promotion generate stronger persuasion and recall. This results in higher enquiries, sales, and customer interest.",
  },
];

const rampOffsets = ["lg:mt-[180px]", "lg:mt-[120px]", "lg:mt-[60px]", "lg:mt-[0px]"];

export default function Section4() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="mx-auto w-[94%] sm:w-[92%] md:w-[90%] lg:w-[88%] xl:w-[84%] max-w-[1280px]">
        <h2
          className="text-center text-black font-[700] text-[38px] sm:text-[44px] md:text-[50px] lg:text-[52px] leading-[1.1]"
          style={{ fontFamily: "MontserratBold" }}
        >
          Why Celebrity
          <br />
          Endorsement Matter
        </h2>

        <div className="mt-12 md:mt-16 lg:mt-12">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={`w-full sm:w-1/2 lg:w-1/4 pb-10 sm:pb-12 lg:pb-0 ${rampOffsets[index]}`}
              >
                <div className="relative lg:border-l lg:border-[#D9D9D9] lg:pl-6 xl:pl-7 lg:pr-4 xl:pr-5 lg:pt-6">
                  <div className="w-[20px] h-[20px] mb-4 lg:mb-0 lg:absolute lg:top-0 lg:left-0 lg:-translate-x-1/2">
                    <Image
                      src={card.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>

                  <h3
                    className="text-black font-[700] text-[20px] leading-[30px] tracking-[0em] max-w-[204px]"
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

                  <p
                    className="mt-3 text-black font-[400] text-[16px] leading-[28px] tracking-[0em] max-w-[228px]"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 lg:-mt-[120px]">
          <Image
            src="/service-v3/celebrity-endorsements/s4/new_wave.jpg"
            alt="Decorative wave"
            width={1014}
            height={282}
            className="w-full h-auto object-contain"
            sizes="(min-width:1280px) 1014px, (min-width:1024px) 88vw, 94vw"
          />
        </div>
      </div>
      <div className="mt-2">
        <BrandThatTrustUs/>
      </div>
      <div className="mt-2">
        <Section5/>
      </div>
      <section className="w-full bg-[#0F1640] py-7 sm:py-8 md:py-9">
        <div className="w-[92%] sm:w-[90%] md:w-[86%] lg:w-[88%] xl:w-[86%] mx-auto flex items-center justify-center text-center">
          <h3
            className="text-white font-[600] text-[22px] sm:text-[28px] md:text-[34px] leading-tight"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Ready to Leverage Star Power into Real Business Results?
          </h3>
        </div>
      </section>
      <div>
        <Section7/>
      </div>
      <div>
        <Section8/>
      </div>
    </section>
  );
}
