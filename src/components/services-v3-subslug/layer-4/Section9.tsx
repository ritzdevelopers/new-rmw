import containerStyles from "@/components/celebrity-endorsements/page.module.css";

export default function Section9() {
  return (
    <section className="w-full bg-[#0F1640] py-7 sm:py-8 md:py-9 flex justify-center px-4 sm:px-6 lg:px-0 mb-8">
      <div
        className={`w-full mx-auto overflow-hidden flex items-center justify-center text-center ${containerStyles.containerWidth}`}
      >
        <h3
          className="text-white font-[600] text-[20px] sm:text-[28px] md:text-[28px] leading-tight"
          style={{ fontFamily: "MontserratSemiBold" }}
        >
         Ready to Trade Ordinary for Extraordinary Results?
        </h3>
      </div>
    </section>
  );
}
