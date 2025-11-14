"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function S3() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden  bg-[#FFFFFF] py-16 sm:py-20 lg:py-0">
      <div className="flex w-full max-w-[95%] flex-col gap-12 px-4 sm:px-6 lg:px-8 ">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1] md:flex">
            Choose Your <span className="text-[#D4A574]  md:block transform -translate-y-[4px]">Brand Journey</span>
          </h2>
          <p className="max-w-2xl text-base text-[#4A5565] sm:text-lg">
            Tailored growth programmes engineered for the industries and
            audiences most.
          </p>
        </div>

        {/* Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1 - Digital Marketing */}
          <div className="relative md:py-6 flex min-h-[440px] flex-col overflow-hidden rounded-[28px] p-[1px] transition-transform duration-300 hover:-translate-y-2 bg-gradient-to-b from-[#101828] to-[#1E2939]">
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 rounded-[28px]  px-8 py-10 backdrop-blur-sm sm:px-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4A57433]">
                <Image
                  src="/new-page/icns/building-icn.png"
                  alt="Digital Marketing"
                  width={36}
                  height={36}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[32px] font-semibold text-white sm:text-[36px]">
                  Digital Marketing
                </h3>
                <p className="text-sm text-[#D6DAE4] sm:text-base">
                  Cut through the noise with conversion-led performance
                  campaigns crafted for premium audiences.
                </p>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-[#D6DAE4] sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Hyper-targeted media planning & buying</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Persona-driven communication frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Always-on analytics & optimisation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Automated lead nurturing journeys</span>
                </li>
              </ul>

              <Link
                href="/services/digital-marketing"
                className="group inline-flex  md:h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-[#D4A574] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c2925d]"
              >
                Explore Digital Marketing
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

              {/* Absolute Position Image Container  */}
              <div className="absolute -right-22 -top-22 z-10">
            <img
              src="/new-page/elip.png"
              alt="RMW"
              className="w-[256px] h-[256px]"
            />
          </div>
          </div>

          {/* Card 2 - Brand & Communication */}
          <div className="relative  md:py-6 flex min-h-[440px] flex-col overflow-hidden rounded-[28px] p-[1px] transition-transform duration-300 hover:-translate-y-2 bg-gradient-to-b from-[#D4A574] to-[#C49A6C]">
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 rounded-[28px]  px-8 py-10 backdrop-blur-sm sm:px-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFFFFF33]">
                <Image
                  src="/new-page/icns/stars-icn.png"
                  alt="Brand & Communication"
                  width={36}
                  height={36}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[32px] font-semibold text-white sm:text-[36px]">
                  Brand & Communication
                </h3>
                <p className="text-sm text-[#FFFFFFE5] sm:text-base">
                  Build an iconic brand voice with insight-backed storytelling
                  that scales across every channel.
                </p>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-[#FFFFFFE5] sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Brand workshops & positioning blueprints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Integrated creative campaign systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>Experience-first content architectures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                  <span>ATL / BTL orchestration for launches</span>
                </li>
              </ul>

              <Link
                href="/services/brand-communication"
                className="group inline-flex md:h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-[#ffffff] px-6 py-3 text-base font-semibold text-[#D4A574] transition-colors duration-200 hover:bg-[#c2925d] hover:text-white"
              >
                Explore Brand Communication
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

       
            {/* Absolute Position Image Container  */}
          <div className="absolute -right-22 -top-22 z-10">
            <img
              src="/new-page/elip2.png"
              alt="RMW"
              className="w-[256px] h-[256px]"
            />
          </div>
          </div>

          
        </div>

        {/* Row 3 */}
        <div className="flex justify-center text-center">
          <p className="max-w-xl text-sm text-[#4A5565] sm:text-base">
            Not sure which path fits your brand?{" "}
            <Link
              href="/contact"
              className="text-[#4A5565] underline"
            >
              Let's discuss your unique needs
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default S3;
