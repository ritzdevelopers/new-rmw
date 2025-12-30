"use client";
import React from "react";
import styles from "./page.module.css"

function S1() {
  return (
    <section className={`${styles.s1Sec} flex items-center bg-[#000000] text-white min-h-[400px] sm:min-h-[500px] lg:min-h-[648px] w-full relative bg-[url(/home-v3/s1/slider1.jpg)] bg-center bg-cover bg-no-repeat px-4 sm:px-6 md:pl-8 lg:pl-16 py-12 sm:py-16 lg:py-0`}>

      <div className="w-full max-w-[600px] flex flex-col gap-12 sm:gap-16 lg:gap-20 mt-0 sm:mt-12 lg:mt-20">
        {/* Top Row  */}
        <div className="font-[500] text-[12px] sm:text-[13px] lg:text-[14px] flex flex-col gap-4 sm:gap-5 lg:gap-6 md:mt-0 mt-10">
          <div>
            <p
              className="text-[13px] sm:text-[13.5px]  lg:text-[14px] uppercase MontserratRegular"
              style={{
                fontFamily: "MontserratRegular",
              }}
            >
              We craft brands, websites, & campaigns that move your business
              closer to its vision.
            </p>
            <h1 className="font-[500] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] leading-tight sm:leading-tight lg:leading-normal" style={{
                fontFamily: 'MontserratMedium',
            }}>
                <span className="text-[#C99237] font-[800]" style={{
                    fontFamily: 'MontserratExtraBold',
                }}>Beyond</span><span  className="font-[800]" style={{
                  fontFamily: 'MontserratExtraBold',
              }}> your typical </span>Advertising agency
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-0">
            {/* Left Side Container  */}
            <div className="">
              <img
                src="/home-v3/s1/v2-s1-i2.png"
                alt=""
                className="h-[80px] sm:h-[100px] lg:h-[118px]"
              />
            </div>

            {/* Right Side Container  */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-0 sm:-ml-[23px]">
              <h2 className="font-[600] text-[16px] sm:text-[17px] lg:text-[19px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Award-Winning Agency{" "}
              </h2>
              <div className="flex items-end gap-1 sm:gap-0">
                <img
                  src="/home-v3/star.png"
                  alt=""
                  className="w-[40px] h-[36px] sm:w-[48px] sm:h-[43px] lg:w-[55px] lg:h-[49px]"
                />

                <p className="font-[500] text-[16px] sm:text-[17px] lg:text-[19px]" style={{
                  fontFamily: 'MontserratMedium',
                }}>
                  Since <span style={{
                    fontFamily: 'MontserratExtraBold',
                  }}>2008</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row  */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
          <button onClick={()=>window.open("https://ritzmediaworld.com/contact.html","_blank")} className="s1-btn-gold w-full sm:w-[199px] h-[48px] sm:h-[50px] lg:h-[54px] bg-[#C99237] rounded-[5px] shadow-[0_4px_4px_0_rgba(0, 0, 0, 0.25)] text-[14px] sm:text-[14.5px] lg:text-[15px] font-[700] cursor-pointer" >
            <p className="text-white ">Free Consulting</p>
          </button>

          <button onClick={()=>window.open("https://ritzmediaworld.com/web-stories","_blank")} className="s1-btn-transparent w-full sm:w-[201px] h-[48px] sm:h-[50px] lg:h-[58px] text-[14px] sm:text-[14.5px] lg:text-[15px] font-[700] cursor-pointer flex justify-center gap-2 sm:gap-3 px-2 py-2 rounded-[5px] items-center">
            <div className=" flex cursor-pointer px-2 py-2 w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] lg:w-[54px] lg:h-[54px] rounded-full justify-center items-center bg-[#FFFFFF]">
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
                  fill="black"
                />
              </svg>
            </div>
            <p>Watch Our Story</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default S1;