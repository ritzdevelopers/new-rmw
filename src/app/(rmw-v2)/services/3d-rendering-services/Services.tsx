"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import "./3dservice.css";
import React from "react";

const accent = "#C99237";



type ServiceTab = {
    num: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    features: { label: string; icon: string }[];
};

const services: ServiceTab[] = [
    {
        num: "01",
        title: "3D Exterior Rendering",
        description:
            "High-quality 3D exterior rendering showcases your building's architecture, landscaping, and surroundings with photorealistic lighting and materials—helping buyers visualize the complete development before construction begins.",
        image: "/services/3drendring/3d1.png",
        imageAlt: "Modern residential complex 3D exterior visualization",
        features: [
            { label: "Residential Apartments", icon: "/services/3drendring/processicon/service1/service1.png" },
            { label: "Villas Bungalows", icon: "/services/3drendring/processicon/service1/service2.png" },
            { label: "Commercial Towers", icon: "/services/3drendring/processicon/service1/service3.png" },
            { label: "Townships", icon: "/services/3drendring/processicon/service1/service4.png" },
        ],
    },
    {
        num: "02",
        title: "3D Interior Rendering",
        description:
            "Real-to-life living & dining rooms, master bedrooms, kitchens and commercial spaces are vividly depicted through interiors that display proper lighting, texture of material, furniture and décor. A prime service for luxury and high-end residences.",
        image: "/services/3drendring/3d2.png",
        imageAlt: "Luxury interior 3D visualization",
        features: [
            { label: "Living & Dining Spaces", icon: "/services/3drendring/processicon/service2/service1.png" },
            { label: "Master Bedrooms", icon: "/services/3drendring/processicon/service2/service2.png" },
            { label: "Kitchens & Bathrooms", icon: "/services/3drendring/processicon/service2/service3.png" },
            { label: "Office Interiors", icon: "/services/3drendring/processicon/service2/service4.png" },
        ],
    },
    {
        num: "03",
        title: "Aerial & Township",
        description:
            "3D master plans and bird's-eye view renderings effectively and realistically depict the overall planning, grandeur and scale of plots, mixed-use development projects and entire townships—an excellent tool for government submissions, investor pitches and RERA filing.",
        image: "/services/3drendring/3d3.png",
        imageAlt: "Aerial view of urban township development",
        features: [
            { label: "Master Plan Views", icon: "/services/3drendring/processicon/service3/service1.png" },
            { label: "Aerial Perspectives", icon: "/services/3drendring/processicon/service3/service2.png" },
            { label: "Site Layout Renders", icon: "/services/3drendring/processicon/service3/service3.png" },
            { label: "Township Visualization", icon: "/services/3drendring/processicon/service3/service4.png" },
        ],
    },
    {
        num: "04",
        title: "3D Floor Plan Rendering",
        description:
            "The most simplified and easily understandable form of floor plan design is the 3D floor plan, which helps avoid ambiguity during site visits by depicting layout, furnishing and texture. Suitable for unit floor plans, 3D cut-away views, furnished layouts, and commercial space plans.",
        image: "/services/3drendring/3d4.png",
        imageAlt: "3D floor plan visualization",
        features: [
            { label: "Unit Floor Plans", icon: "/services/3drendring/processicon/service4/service1.png" },
            { label: "3D Cut-Away Views", icon: "/services/3drendring/processicon/service4/service2.png" },
            { label: "Furnished Layouts", icon: "/services/3drendring/processicon/service4/service3.png" },
            { label: "Commercial Space Plans", icon: "/services/3drendring/processicon/service4/service4.png" },
        ],
    },
    {
        num: "05",
        title: "Amenity & Landscape Rendering",
        description:
            "The best selling tool for any residential project—exclusive renderings of clubhouses, swimming pools, manicured gardens, play zones, gyms and rooftops that are a major draw for buyers and investors.",
        image: "/services/3drendring/3d5.png",
        imageAlt: "Amenity and landscape 3D rendering",
        features: [
            { label: "Clubhouse Renders", icon: "/services/3drendring/processicon/service5/service1.png" },
            { label: "Pool  Landscape", icon: "/services/3drendring/processicon/service5/service2.png" },
            { label: "Gym  Co-working", icon: "/services/3drendring/processicon/service5/service3.png" },
            { label: "Rooftop Terrace", icon: "/services/3drendring/processicon/service5/service4.png" },
        ],
    },
];


export default function Services3D() {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const current = services[active];

    const selectTab = useCallback((index: number) => {
        setActive(index);
    }, []);

    const onKeyDown = useCallback(
        (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
            let next = index;
            if (e.key === "ArrowRight") next = (index + 1) % services.length;
            else if (e.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = services.length - 1;
            else return;
            e.preventDefault();
            selectTab(next);
            tabRefs.current[next]?.focus();
        },
        [selectTab]
    );

    useEffect(() => {
        tabRefs.current[active]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [active]);

    return (

        <section className=" bg-white pb-[70px]">
            <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm"
                        style={{ color: accent }}>
                        Services
                    </p>

                    <h2
                        className=" text-center md:text-[45px] text-[45px] 
          font-semibold leading-[36px] font-weight-600 text-[#000000] sm:text-[28px] 
     md:leading-[42px] "
                        style={{
                            fontFamily: "MontserratRegular, Montserrat, sans-serif",
                            fontWeight: 400,
                        }}
                    >
                        Our 3D Rendering Services
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#444444] sm:text-base md:text-lg md:leading-8">
                        We create your ideas into 3D visualizations &amp; make your projects valuable, attract
                        buyers and drive faster sales.
                    </p>
                </header>

                <div className="mt-5">
                    <div className="-mx-4 sm:mx-0">
                        <div
                            role="tablist"
                            aria-label="3D rendering service types"
                            className="services-tabs-scroll 
                            flex w-full flex-nowrap gap-[150px] overflow-x-auto
                             overflow-y-hidden border-b border-[#e5e5e5]
                              [-ms-overflow-style:none] [scrollbar-width:none]
                               [&::-webkit-scrollbar]:hidden"
                        >
                            {services.map((tab, i) => {
                                const isActive = i === active;
                                return (
                                    <button
                                        key={tab.title}
                                        ref={(el) => {
                                            tabRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        id={`service-tab-${i}`}
                                        aria-controls={`service-panel-${i}`}
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => selectTab(i)}
                                        onKeyDown={(e) => onKeyDown(e, i)}
                                        className={`relative min-w-[min(90vw,280px)]
                                             shrink-0 cursor-pointer px-4 py-4 text-left 
                                             transition-colors sm:min-w-[220px]
                                             
                                              sm:px-5 xl:min-w-max xl:px-6 xl:py-5 xl:text-center ${isActive ? "services-tab-active" : "hover:text-neutral-700"
                                            }`}
                                    >
                                        <span className="block text-xs text-left font-normal text-[#9ca3af] sm:text-sm">
                                            {tab.num}
                                        </span>
                                        <span className=" block whitespace-nowrap text-[15px]
                                         font-bold font-weight-700 leading-snug text-[#111111] sm:text-base md:text-[32px] md:leading-[42px] lg:text-[32px] lg:leading-[42px] xl:text-[32px] xl:leading-[42px]">
                                            {tab.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div
                    key={active}
                    role="tabpanel"
                    id={`service-panel-${active}`}
                    aria-labelledby={`service-tab-${active}`}
                    className="services-panel-enter mt-8 grid grid-cols-1 
                    gap-8 lg:mt-10 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14"
                >
                    <div className="relative w-full overflow-hidden bg-[#f5f5f5]">
                        <img
                            src={current.image}
                            alt={current.imageAlt}
                            className=" w-full h-[407px] object-cover"
                        // priority={active === 0}
                        />
                    </div>

                    <div className="flex flex-col max-w-[500px] justify-center items-center">
                        <p className="text-left  text-sm leading-relaxed text-[#444444] sm:text-base md:text-[17px] md:leading-8">
                            {current.description}
                        </p>

                        <ul className="services-tabs-scroll mt-8 flex w-full gap-6 overflow-x-auto pb-1 md:mt-10 md:gap-8 lg:mt-12">
                            {current.features.map((f) => (
                                <li
                                    key={f.label}
                                    className="flex min-w-[5.5rem] shrink-0 flex-col items-start text-left sm:min-w-[6.5rem]"
                                >
                                    <img src={f.icon} alt={f.label} className="w-10 h-10 object-cover" />
                                    <span
                                        className="mt-3 text-[10px] font-semibold uppercase leading-snug tracking-wide sm:text-[11px]"
                                        style={{ color: accent }}
                                    >
                                        {
                                            f.label.split(' ').map((word, index) => (
                                                <React.Fragment key={index}>
                                                    {word}
                                                    <br />
                                                </React.Fragment>
                                            ))
                                        }
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
