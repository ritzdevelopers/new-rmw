"use client";

import Image from "next/image";
import styles from "./page.module.css";

function Section8() {
  return (
    <section className="flex w-full items-center justify-center pt-[40px] xl:pt-[70px]">
      <div className={`w-full ${styles.containerWidth} flex flex-col gap-8 xl:gap-12`}>
        <div className="w-full flex flex-col justify-center items-center text-center">
          <h2 className={`font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] ${styles.fontmontserrat}`}>
            Our Culture
          </h2>
          <p className={`font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#000000] max-w-[698px] md:px-4 ${styles.fontpoppins}`}>
            In our culture, we nurture creativity, seek out innovation,
            encourage collaboration, cultivate happiness, and occasionally
            break into senseless laughter.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 md:gap-6">
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            {[
              "/new-about/s7/s7-r1-i1.png",
              "/new-about/s7/awd.jpg",
              "/new-about/s7/s7-r1-i2.png",
            ].map((img, idx) => {
              return (
                <div
                  className="w-full sm:w-[calc(33.333%-0.67rem)] md:w-[calc(33.333%-1rem)] lg:w-[400px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px] relative overflow-hidden group cursor-pointer"
                  key={idx}
                >
                  <Image
                    src={img}
                    alt="RMW"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                    className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col justify-center gap-4 md:gap-6 lg:flex-row lg:items-stretch">
            <div className="flex w-full shrink-0 flex-col gap-4 md:gap-6 lg:w-[400px]">
              {["/new-about/s7/s7-r2-i1.png", "/new-about/s7/s7-r2-i3.png"].map(
                (img, idx) => {
                  return (
                    <div
                      className={`w-full ${
                        idx === 0
                          ? "h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px]"
                          : "h-[300px] sm:h-[350px] md:h-[400px] lg:h-[449px]"
                      } relative overflow-hidden group cursor-pointer`}
                      key={idx}
                    >
                      <Image
                        src={img}
                        alt="RMW"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  );
                }
              )}
            </div>

            <div className="group relative h-[400px] w-full min-h-[280px] overflow-hidden sm:h-[500px] md:h-[600px] lg:h-auto lg:min-h-0 lg:w-[820px] lg:shrink-0 lg:self-stretch">
              <Image
                src={"/new-about/s7/s7-r2-i2.png"}
                alt="RMW"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 820px"
                className="transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => window.open("https://ritzmediaworld.com/gallery", "_blank")}
            className="w-[141px] h-[50px] text-[15px] font-[700] text-white rounded-[8px]
            bg-[#C99237] cursor-pointer"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section8;