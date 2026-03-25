import BrandThatTrustUs from "./BrandThatTrustUs";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

type Card = {
  title: string;
  description: string;
  highlighted?: boolean;
};

const cards: Card[] = [
  {
    title: "Visibility & Reach",
    description:
      "To improve your digital presence and increase discoverability, target particular audiences.",
  },
  {
    title: "Why Influencer Marketing Matters",
    description: "",
    highlighted: true,
  },
  {
    title: "Long-Term Impact",
    description:
      "For a long-term return on investment, cultivate audience loyalty and enduring visibility.",
  },
  {
    title: "Engagement & Social Influence",
    description:
      "Increase shares and generate buzz to improve brand recall and engagement.",
  },
  {
    title: "Leads & Conversions",
    description:
      "Influencer marketing generates high-quality leads and quicker conversions.",
  },
  {
    title: "Brand Positioning",
    description:
      "Your brand becomes more relevant and aspirational when you collaborate with influencers.",
  },
];

export default function Section4() {
  return (
    <>
      <section className="w-full bg-white pt-10 sm:pt-12 md:pt-16 flex justify-center px-4 sm:px-6 lg:px-0">
        <div className={`w-full mx-auto overflow-hidden ${containerStyles.containerWidth}`}>
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={`w-full sm:w-1/2 lg:w-1/3 min-h-[180px] sm:min-h-[210px] px-6 sm:px-8 lg:px-6 xl:px-8 py-8 sm:py-10 flex flex-col items-center justify-center text-center border border-[#DFDDDD] border-r-0 sm:border-r -ml-px ${
                  card.title === "Visibility & Reach" || card.title === "Long-Term Impact"
                    ? "-mt-0 !border-t !border-t-[#DFDDDD]"
                    : "-mt-px"
                } ${
                  card.highlighted ? "order-first lg:order-none" : (["order-2", "order-3", "order-4", "order-5", "order-6"][index === 0 ? 0 : index - 1] + " lg:order-none")
                } ${
                  card.highlighted
                    ? "bg-[linear-gradient(149.48deg,#C1892C_-2.74%,#EFBB68_114.55%)]"
                    : "bg-white"
                } ${card.title === "Engagement & Social Influence" ? "sm:!border-l-0 sm:!border-b-0" : ""} ${
                  card.title === "Brand Positioning" ? "sm:!border-r-0 sm:!border-b-0" : ""
                }`}
              >
                <h3
                  className={`${
                    card.highlighted
                      ? "text-white text-[22px] md:text-[25px] leading-normal lg:text-[30px] xl:text-[36px] lg:leading-[50px]"
                      : "text-black text-[20px] leading-[30px]"
                  } font-[700]`}
                  style={{
                    fontFamily: "MontserratBold",
                    ...(card.title === "Engagement & Social Influence"
                      ? { whiteSpace: "nowrap" as const, fontSize: "18px" }
                      : {}),
                  }}
                >
                  {card.highlighted ? (
                    <>
                      Why Influencer
                      <br />
                      Marketing
                      <br />
                      Matters
                    </>
                  ) : (
                    card.title
                  )}
                </h3>

                {!card.highlighted && (
                  <p
                    className="mt-2 sm:mt-3 text-black text-[16px] lg:text-[15px] xl:lg:text-[16px] leading-[28px] font-[400] lg:font-[400] max-w-[320px] lg:max-w-[300px] xl:max-w-[320px] mx-auto"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {card.title === "Engagement & Social Influence" ? (
                      <>
                        Increase shares and generate buzz
                        <br />
                        to improve brand recall and
                        <br />
                        engagement.
                      </>
                    ) : card.title === "Leads & Conversions" ? (
                      <>
                        Influencer marketing generates
                        <br />
                        high-quality leads and quicker
                        <br />
                        conversions.
                      </>
                    ) : (
                      card.description
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <BrandThatTrustUs />
      <section className="w-full bg-[#0F1640] py-7 sm:py-8 md:py-9 flex justify-center px-4 sm:px-6 lg:px-0">
        <div className={`w-full mx-auto overflow-hidden flex items-center justify-center text-center ${containerStyles.containerWidth}`}>
          <h3
            className="text-white font-[600] text-[20px] sm:text-[28px] md:text-[28px] leading-tight"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Ready to Turn Followers into Genuine Customers?
          </h3>
        </div>
      </section>
    </>
  );
}
