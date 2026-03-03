"use client";

export default function Section9() {
  return (
    <section className="w-full flex justify-center items-center py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-0">
      <div className="w-[92%] sm:w-[90%] md:w-[86%] lg:w-[80%] mx-auto flex justify-center items-center">
        <div className="flex flex-col gap-2 sm:gap-3 justify-center text-center items-center bg-[#F5F5F5] min-h-[200px] sm:min-h-[240px] lg:min-h-[279px] w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-10 lg:py-12">
          <h2
            className="font-[800] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px]"
            style={{ fontFamily: "MontserratExtraBold" }}
          >
            Ready to Elevate Your Brand?
          </h2>
          <p
            className="font-[400] text-[14px] sm:text-[18px] md:text-[24px] lg:text-[30px]"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            Let&apos;s discuss your next brand-elevating campaign
          </p>
          <button
            onClick={() =>
              window.open("https://ritzmediaworld.com/contact.html", "_blank")
            }
            className="w-full sm:w-[260px] lg:w-[282px] h-[48px] sm:h-[50px] lg:h-[54px] mt-4 bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] rounded-[5px] hover:bg-[#B8822F] transition-colors"
            style={{ fontFamily: "OpenSansBold" }}
          >
            <span className="text-white">Schedule Free Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
}
