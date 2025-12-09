"use client";
import Image from "next/image";
import React from "react";

function Section4() {
  const d1 = [
    {
      cnt: 300,
      icn: "+",
      ttl: "Satisfied Clients",
      para: "Brands we've helped grow and succeed",
      link: "",
    },
    {
      cnt: 300,
      icn: "+",
      ttl: "Satisfied Clients",
      para: "Brands we've helped grow and succeed",
      link: "",
    },
  ];
  const d2 = [
    {
      cnt: 300,
      icn: "+",
      ttl: "Satisfied Clients",
      para: "Brands we've helped grow and succeed",
      link: "",
    },
    {
      cnt: 300,
      icn: "+",
      ttl: "Satisfied Clients",
      para: "Brands we've helped grow and succeed",
      link: "",
    },
  ];
  return (
    <section className="w-full flex flex-col items-center gap-4 md:gap-5 lg:gap-8 pb-8 sm:pb-10 px-4 sm:px-6 md:px-0">
      {/* Top Header Container  */}
      <div className="w-[100%] min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[234px] bg-[#E7EEFA] flex justify-center items-center py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        {/* Centered Align Text Container  */}
        <div className=" lg:max-w-4xl text-center px-4">
          <h2
            style={{
              fontFamily: "InterSemiBold",
            }}
            className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] uppercase"
          >
            Our Vision
          </h2>
          <p
            style={{
              fontFamily: "InterRegular",
            }}
            className="font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#00000099] capitalize mt-2 sm:mt-3"
          >
            A future-driven organization empowering clients with innovative
            digital solutions that lead to measurable success.
          </p>
        </div>
      </div>

      {/* Centered Align Container  */}
      <div className="md:w-[90%] flex flex-col justify-between items-center gap-3 sm:gap-4 px-0">
        <p
          style={{
            fontFamily: "InterRegular",
          }}
          className="w-[120px] sm:w-[130px] h-[30px] sm:h-[34px] rounded-full bg-[#F6F6F6] flex justify-center items-center font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#4A5565]"
        >
          Proven Results
        </p>

        <h2
          style={{
            fontFamily: "InterSemiBold",
          }}
          className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-center"
        >
          Our Work is Our <span className="text-[#F79024]">Reward</span>
        </h2>

        <p
          style={{
            fontFamily: "InterRegular",
          }}
          className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] md:max-w-4xl text-center text-[#00000099] px-4"
        >
          Our Mad Men are obsessed with building stories. Like a moth to a
          flame, they're just obsessed with any branding problem that may need a
          solution.
        </p>
      </div>

      {/* Bottom Main Container  */}
      <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-12 xl:gap-0">
        {/* Left Side Container  */}
        <div className="w-full md:w-[95%] lg:w-[60%] xl:w-[639px] flex flex-col gap-6 sm:gap-8 md:gap-10">
          {/* Text Content  */}
          <p
            style={{
              fontFamily: "InterRegular",
            }}
            className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#00000099] text-center lg:text-start"
          >
            Our Mad Men are obsessed with building stories. Like a moth to a
            flame, they're just obsessed with any branding problem that may need
            a solution.Our Mad Men are obsessed with building stories. Like a
            moth.
          </p>

          <div className="w-full relative flex flex-col sm:flex-row  justify-center xl:justify-between gap-4 lg:gap-8">
            {/* Left Side Sub Container  */}
            <div className="flex flex-col w-full sm:w-[48%] lg:w-[250px] xl:w-[307px] gap-4">
              {d1.map((val, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full h-[140px] sm:h-[150px] md:h-[155px] shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] relative flex justify-center items-center overflow-hidden abs3"
                  >
                    {/* Centered Align Container  */}
                    <div className="w-[90%] z-10">
                      <div className="relative">
                        <h2
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[600] text-[28px] sm:text-[32px] md:text-[36px]"
                        >
                          {val.cnt}
                        </h2>
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[500] text-[28px] sm:text-[32px] md:text-[36px] absolute -top-3 sm:-top-4 left-12 sm:left-14 md:left-16"
                        >
                          {val.icn}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterRegular",
                          }}
                          className="font-[400] text-[14px] sm:text-[16px] md:text-[18px] text-[rgba(0, 0, 0, 1)]"
                        >
                          {val.ttl}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "InterRegular",
                        }}
                        className="font-[400] text-[12px] sm:text-[14px] md:text-[16px] text-[#00000099] mt-1"
                      >
                        {val.para}
                      </p>
                    </div>

                    {/* Absolute Positioned Animated Elips  */}
                    <div className="absolute -top-5 -left-6 w-[60px] sm:w-[65px] md:w-[70px] h-[60px] sm:h-[65px] md:h-[70px] bg-[#ED8B24] rounded-full z-0 abs3Abs"></div>
                  </div>
                );
              })}
            </div>

            {/* Right Side Sub Container  */}
            <div className="flex flex-col w-full sm:w-[48%]  lg:w-[250px] xl:w-[307px] gap-4 mt-0 sm:mt-6">
              {d2.map((val, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full h-[140px] sm:h-[150px] md:h-[155px] shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] relative flex justify-center items-center overflow-hidden abs3"
                  >
                    {/* Centered Align Container  */}
                    <div className="w-[90%] z-10">
                      <div className="relative">
                        <h2
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[600] text-[28px] sm:text-[32px] md:text-[36px]"
                        >
                          {val.cnt}
                        </h2>
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[500] text-[28px] sm:text-[32px] md:text-[36px] absolute -top-3 sm:-top-4 left-12 sm:left-14 md:left-16"
                        >
                          {val.icn}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterRegular",
                          }}
                          className="font-[400] text-[14px] sm:text-[16px] md:text-[18px] text-[rgba(0, 0, 0, 1)]"
                        >
                          {val.ttl}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "InterRegular",
                        }}
                        className="font-[400] text-[12px] sm:text-[14px] md:text-[16px] text-[#00000099] mt-1"
                      >
                        {val.para}
                      </p>
                    </div>

                    {/* Absolute Positioned Animated Elips  */}
                    <div className="absolute -top-5 -left-6 w-[60px] sm:w-[65px] md:w-[70px] h-[60px] sm:h-[65px] md:h-[70px] bg-[#ED8B24] rounded-full z-0 abs3Abs"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Container  */}
        <div
          className="w-full 
      h-[345px]
        md:w-[60%] lg:w-[380px]
        xl:w-[545px]
         sm:h-[500px] imgCont md:h-[450px] lg:h-[450px] xl:h-[652px] relative mt-4 sm:mt-6 lg:mt-0"
        >
          <Image
            src={"/new-about/s4/ab-s4-i1.png"}
            fill
            alt="RMW"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 545px"
          ></Image>
        </div>
      </div>
    </section>
  );
}

export default Section4;
