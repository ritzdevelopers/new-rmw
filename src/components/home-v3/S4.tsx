"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import styles from './S3.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function S4() {
    const swiperRef = useRef<SwiperType | null>(null);
    
    // Data array for success stories
    const successStories = [
        {
            img: "/home-v3/s3/v2s3i1.png",
            category: "Luxury Real Estate",
            title: "Digital Advertising",
            description: "Our digital advertising case studies showcase how smart targeting, compelling creatives, and data-driven optimisation translate into real business outcomes. Explore how brands across sectors achieved higher visibility, stronger engagement, and measurable conversions through strategic, performance-focused campaigns.",
            stats: [
                { value: "250%", label: "Increase in qualified leads" },
                { value: "85%", label: "Target audience reach" },
                { value: "40%", label: "Conversion rate" }
            ]
        },
        {
            img: "/home-v3/s3/v2s3i2.png",
            category: "E-commerce Brand",
            title: "Social Media Marketing",
            description: "Our social media marketing campaigns drive engagement and conversions through strategic content creation, community building, and data-driven optimization. Discover how brands achieved remarkable growth in followers, engagement rates, and sales through our comprehensive social media strategies.",
            stats: [
                { value: "300%", label: "Increase in followers" },
                { value: "120%", label: "Engagement rate" },
                { value: "65%", label: "Sales growth" }
            ]
        },
        {
            img: "/home-v3/s3/v2s2i2.png",
            category: "Tech Startup",
            title: "SEO & Content Marketing",
            description: "Our SEO and content marketing strategies help brands achieve top search rankings and organic growth. Learn how we've helped companies increase their online visibility, drive qualified traffic, and generate leads through comprehensive SEO optimization and strategic content creation.",
            stats: [
                { value: "400%", label: "Organic traffic growth" },
                { value: "95%", label: "Keyword rankings" },
                { value: "180%", label: "Lead generation" }
            ]
        },
    ];

    return (
        <section className='w-full min-h-screen bg-white flex justify-center items-center flex-col gap-10 sm:gap-16 lg:gap-20 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-0'>
            {/* Center Align Container 1 */}
            <div className='w-full sm:w-[95%] lg:w-[90%] h-[95%] flex flex-col gap-4 sm:gap-6'>
                {/* Top Row  */}
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    {/* Left Side Container  */}
                    <div className='w-full sm:w-auto'>
                        <p className='font-[600] text-[14px] sm:text-[16px] text-[#C99237] uppercase' style={{
                            fontFamily: "OpenSansSemiBold",
                        }}>PRoven result</p>
                        <h2 className='font-[700] text-[24px] sm:text-[30px] lg:text-[36px]' style={{
                            fontFamily: "MontserratBold",
                        }}>Success Stories That Inspire</h2>
                        <p className='font-[400] text-[14px] sm:text-[16px]' style={{
                            fontFamily: "OpenSansRegular",
                        }}>Real challenges. Creative solutions. Measurable results</p>
                    </div>
                    {/* Slider Btns  */}
                    <div className="flex gap-2 flex-shrink-0">
                        <button 
                            onClick={() => swiperRef.current?.slidePrev()}
                            className='cursor-pointer'
                            aria-label="Previous slide"
                        >
                            <img src="/home-v3/s3/lftb.png" alt="RMW" className='w-[27px] h-[27px]' />
                        </button>
                        <button 
                            onClick={() => swiperRef.current?.slideNext()}
                            className='cursor-pointer'
                            aria-label="Next slide"
                        >
                            <img src="/home-v3/s3/rhgt.png" alt="RMW" className='w-[27px] h-[27px]' />
                        </button>
                    </div>
                </div>

                {/* Bottom Row - Swiper Slider  */}
                <div className='w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[395px]'>
                    <div className="w-full overflow-visible">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            modules={[Navigation]}
                            spaceBetween={64}
                            slidesPerView={1}
                            breakpoints={{
                                // Mobile
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 16,
                                },
                                // Tablet
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 32,
                                },
                                // Desktop
                                1024: {
                                    slidesPerView: 1,
                                    spaceBetween: 64,
                                },
                            }}
                            className={styles.swiperContainer}
                        >
                            {successStories.map((story, idx) => {
                                return (
                                    <SwiperSlide key={idx} style={{ height: 'auto' }}>
                                        <div className="w-full h-full flex flex-col lg:flex-row justify-start gap-6 sm:gap-8 lg:gap-16">
                                            {/* Image Card  */}
                                            <div className='h-[250px] sm:h-[300px] md:h-[350px] lg:h-[395px] w-full lg:w-[590px] relative flex-shrink-0'>
                                                <Image src={story.img} alt={story.title} fill className='object-cover'></Image>
                                            </div>

                                            {/* Content Card  */}
                                            <div className='w-full lg:w-[604px] flex flex-col gap-4 sm:gap-5'>
                                                <p className='font-[600] text-[16px] sm:text-[18px] text-[#C99237]' style={{
                                                    fontFamily: "OpenSansSemiBold",
                                                }}>{story.category}</p>
                                                <h2 className='font-[600] text-[22px] sm:text-[24px] lg:text-[26px]' style={{
                                                    fontFamily: "OpenSansSemiBold",
                                                }}>{story.title}</h2>
                                                <p className='font-[400] text-[14px] sm:text-[15px] lg:text-[16px]' style={{
                                                    fontFamily: "OpenSansRegular",
                                                }}>{story.description}</p>

                                                <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 lg:gap-4'>
                                                    {story.stats.map((stat, statIdx) => {
return (
                                                            <div 
key={statIdx}
className={`flex flex-col justify-center items-center gap-1 w-full sm:w-auto ${
statIdx === 1 ? 'sm:px-4 lg:px-8 sm:border-l-[1px] sm:border-r-[1px] sm:border-l-[#D8D8D8] sm:border-r-[#D8D8D8]' : ''
}`}
>
                                                                <img src="/home-v3/s4/arrow.png" alt="RMW" className='w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]' />
                                                                <h2 className='font-[700] text-[32px] sm:text-[36px] lg:text-[44px]' style={{
                                                                    fontFamily: "MontserratBold",
                                                                }}>{stat.value}</h2>
                                                                <p className='font-[600] text-[12px] sm:text-[14px] lg:text-[15px] text-center' style={{
                                                                    fontFamily: "OpenSansSemiBold",
                                                                }}>{stat.label}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* Center Align Container 2  */}
            <div className='w-full sm:w-[95%] lg:w-[90%] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[426px] flex justify-center items-center relative'>

                <Image src={"/home-v3/s2/team-bg3.png"} alt='' fill className='object-cover'></Image>

                <div className="flex absolute top-[50%] right-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[54px] lg:h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] z-10">

                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[8px] h-[9px] sm:w-[10px] sm:h-[11px]'>
                        <path d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z" fill="black" />
                    </svg>

                </div>

                {/* Overlay  */}
                <div className="absolute inset-0 bg-[#00000051] w-full h-full z-0"></div>
            </div>
        </section>
    )
}

export default S4