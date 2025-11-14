"use client";
import React from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

function S3C() {
  // Array of 24 client logos - update these paths with actual logo images
  const clientsCompanyLogos = [
    {
      name: "BJP",
      src: "/new-page/clients/home-swiper1-img2.avif",
      alt: "BJP Logo",
    },
    {
      name: "Honda",
      src: "/new-page/clients/home-swiper1-img3.avif",
      alt: "Honda Logo",
    },
    {
      name: "BMW",
      src: "/new-page/clients/home-swiper1-img4.avif",
      alt: "BMW Logo",
    },
    {
      name: "Adani Realty",
      src: "/new-page/clients/home-swiper1-img5.avif",
      alt: "Adani Realty Logo",
    },
    {
      name: "Jindal Steel & Power",
      src: "/new-page/clients/home-swiper1-img6.avif",
      alt: "Jindal Steel & Power Logo",
    },
    {
      name: "Cars24",
      src: "/new-page/clients/home-swiper1-img7.avif",
      alt: "Cars24 Logo",
    },
    {
      name: "Zomato",
      src: "/new-page/clients/home-swiper1-img8.avif",
      alt: "Zomato Logo",
    },
    {
      name: "Honda",
      src: "/new-page/clients/home-swiper1-img9.avif",
      alt: "Honda Logo",
    },
    {
      name: "HDFC ERGO",
      src: "/new-page/clients/home-swiper1-img10.avif",
      alt: "HDFC ERGO Logo",
    },
    {
      name: "DLF",
      src: "/new-page/clients/home-swiper1-img11.avif",
      alt: "DLF Logo",
    },
    {
      name: "Rakesh",
      src: "/new-page/clients/home-swiper1-img12.avif",
      alt: "Rakesh Logo",
    },
    {
      name: "TVS",
      src: "/new-page/clients/home-swiper1-img13.avif",
      alt: "TVS Logo",
    },
    {
      name: "SBI",
      src: "/new-page/clients/home-swiper1-img14.avif",
      alt: "SBI Logo",
    },
    {
      name: "Punjab National Bank",
      src: "/new-page/clients/home-swiper1-img15.avif",
      alt: "Punjab National Bank Logo",
    },
    {
      name: "Visit Monaco",
      src: "/new-page/clients/home-swiper1-img16.avif",
      alt: "Visit Monaco Logo",
    },
    {
      name: "IndiGo",
      src: "/new-page/clients/home-swiper1-img17.avif",
      alt: "IndiGo Logo",
    }, //sanskarLog.png
    {
      name: "Visit Monaco",
      src: "/new-page/clients/eldecoLogo-removebg-preview.png",
      alt: "Visit Monaco Logo",
    },
    {
      name: "Visit Monaco",
      src: "/new-page/clients/sanskarLog.png",
      alt: "Visit Monaco Logo",
    },
  ];

  return (
    <section className="w-full bg-[#F5F5F5] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <h2 className="text-2xl font-semibold text-[#101828] sm:text-3xl lg:text-4xl">
            Our Clients
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {clientsCompanyLogos.map((client, index) => (
            <div
              key={index}
              className="group flex items-center justify-center rounded-lg bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:p-4 md:p-5 lg:p-6"
            >
              <div className="relative h-12 w-full sm:h-14 md:h-16 lg:h-20">
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-8 flex justify-center sm:mt-12 lg:mt-16">
          <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A574] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c2925d] sm:px-8 sm:py-3.5">
            See More
            <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default S3C;
