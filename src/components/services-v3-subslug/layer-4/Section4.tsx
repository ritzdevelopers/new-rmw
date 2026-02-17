import Image from "next/image";

export default function Section4() {
  return (
    <section className="w-full bg-[#F7F7F7]">
      <div className="w-[92%] sm:w-[90%] md:w-[86%] lg:w-[80%] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          {/* Left column */}
          <div className="flex flex-col gap-6 max-w-[560px] self-start">
            {/* 17+ badge */}
            <div className="flex items-center gap-4 bg-[red]">
              {/* Half-cut 17+ badge container */}
              <div
                className="relative w-[140px] h-[140px] bg-[#000000] rounded-full"
                style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 100%, 0% 100%)" }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full flex items-center justify-center"
                  style={{
                    background: "transparent",
                  }}
                >
                  <span
                    className="text-6xl font-[800] leading-none text-[#C99237]"
                  >
                    17<span className="align-top text-2xl">+</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className="uppercase text-[12px] tracking-[0.12em] text-[#6E6E6E]"
                  style={{ fontFamily: "MontserratMedium" }}
                >
                  Years Working
                </span>
                <span
                  className="uppercase text-[12px] tracking-[0.12em] text-[#6E6E6E]"
                  style={{ fontFamily: "MontserratMedium" }}
                >
                  Experience
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[cyan] mb-auto">
              <div className="flex items-start gap-3 relative">
                <div className="flex-1 pr-16">
                  <h2
                    className="text-[22px] sm:text-[26px] md:text-[25px] leading-[1.25] text-black"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    A Skilled{" "}
                    <span className="font-[800]">Creative Team Delivering</span>{" "}
                    Solutions That Drive{" "}
                    <span className="font-[800]">Brand Growth</span>
                  </h2>
                </div>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-block w-[64px] h-[64px]">
                  <Image
                    src="/services-v3-slug/images/12110%201.png"
                    alt="Rocket"
                    fill
                    className="object-contain"
                    priority
                  />
                </span>
              </div>

              <div className="relative w-full rounded-[18px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
                <Image
                  src="/services-v3-slug/images/image%20861.png"
                  alt="RMW Team"
                  width={900}
                  height={480}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Center column - mobile frame */}
          <div className="flex justify-center self-start">
            <div className="relative w-[290px] h-[560px] sm:w-[320px] sm:h-[620px] overflow-hidden rounded-[44px] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
              <Image
                src="/service-v3/layer1/charts/mobile-frame-img.avif"
                alt="Mobile frame"
                fill
                className="object-cover z-10"
                priority
              />
              <video
                src="/test-images/test-video.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start self-start gap-6 w-[300px]">
            {/* Art image */}
            <div className="relative w-[300px] h-[360px] rounded-[22px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
              <Image
                src="/services-v3-slug/images/style.jpg"
                alt="Creative artwork"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Stats */}
            <div className="flex items-stretch gap-10">
              <div className="flex flex-col items-start text-left">
                <span
                  className="text-[28px] font-[800] text-black"
                  style={{ fontFamily: "MontserratBold" }}
                >
                  1B+
                </span>
                <span
                  className="text-[13px] text-[#6E6E6E]"
                  style={{ fontFamily: "PoppinsRegular" }}
                >
                  Creatives Published
                </span>
              </div>
              <div className="flex flex-col items-start text-left">
                <span
                  className="text-[28px] font-[800] text-black"
                  style={{ fontFamily: "MontserratBold" }}
                >
                  500+
                </span>
                <span
                  className="text-[13px] text-[#6E6E6E]"
                  style={{ fontFamily: "PoppinsRegular" }}
                >
                  Success Stories
                </span>
              </div>
            </div>
            {/* Google reviews badge from footer */}
            <a
              href="https://share.google/vdKYtVQQ8Ym2AvZj3"
              target="_blank"
              rel="noopener noreferrer"
              title="Google reviews"
              className="block w-[220px] h-[54px] relative overflow-hidden rounded-full"
            >
              <Image
                src="/new-about/google-reviews.png"
                alt="Google reviews"
                fill
                className="object-contain"
                priority
              />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mt-12">
        <div className="h-[1px] w-full bg-[#D9D9D9]" />
      </div>


    </section>
  );
}
