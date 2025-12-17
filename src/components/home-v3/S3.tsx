"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function S3() {
    return (
        <section className='w-full min-h-[895px] bg-[#F7F7F7] flex justify-end items-center'>

            {/* Centered Align End Container  */}
            <div className="w-[95%] h-[90%]">
                {/* Top Row  */}
                <div>
                    <p className='uppercase font-[600] text-[16px]'>What We Do</p>
                    <h2 className='font-[700] text-[36px]'>360° Brand Elevation Services</h2>
                    <p className='font-[400] text-[16px] max-w-6xl'>Our in-house team masters the entire spectrum of digital marketing , from strategy and creative development to sophisticated campaigns. Our in-house team masters the entire spectrum</p>
                </div>

                {/* Bottom Row  */}
                <div className='w-full flex flex-col gap-6'>
                    {/* Btn Container  */}
                    <div className="w-full flex justify-end items-center gap-2 pr-6">
                        <img src="/home-v3/s3/lftb.png" alt="RMW" className='w-[27px] h-[27px]' />
                        <img src="/home-v3/s3/rhgt.png" alt="RMW" className='w-[27px] h-[27px]' />
                    </div>

                    {/* Slider Container  */}
                    <div className='flex gap-4'>
                        {
                            [
                                {
                                    img: "/home-v3/s3/v2s3i1.png",
                                    category: "Digital Marketing",
                                    ttl: "Digital marketing strategies that drive growth",
                                    list: ["SEO (Search Engine Optimization)",
                                        "PPC (Google Ads) Services",
                                        "Social Media Management",
                                        "ORM (Online Reputation Management)"],
                                    link: "/"
                                },
                                {
                                    img: "/home-v3/s3/v2s3i2.png",
                                    category: "Creative Services",
                                    ttl: "Creative design solutions that elevate brands",
                                    list: [
                                        "Branding & Identity Development",
                                        "Graphic Design",
                                        "Logo Design",
                                        "Print Advertising Design"
                                    ],
                                    link: "/"
                                },
                                {
                                    img: "/home-v3/s3/v2s2i2.png",
                                    category: "Print Advertising",
                                    ttl: "Print advertising campaigns that maximize impact",
                                    list: [
                                        "Ad Placement",
                                        "Copywriting",
                                        "Ad Scheduling",
                                        "Cost Negotiation",
                                    ],
                                    link: "/"
                                },
                            ].map((ob, idx) => {
                                return (
                                    <div className='min-h-[600px] w-[503px] relative'>
                                        <div className='w-full h-[336px] relative z-0'><Image src={ob.img} alt={ob.ttl} fill></Image></div>
                                        <div 
                                        className='w-[442px] z-10 h-[calc(100%-336px)] bg-[#F7F7F7] absolute bottom-8 right-0 pl-8 py-8 flex flex-col gap-3'>
                                            <h3 className='font-[600] text-[18px] text-[#C99237]'>{ob.category}</h3>
                                            <h2 className='font-[600] text-[26px]'>{ob.ttl}</h2>
                                            <ul className='font-[400] text-[16px] flex flex-col gap-2 list-disc pl-5'>
                                                {
                                                    ob.list.map((ob, idx) => {
                                                        return (
                                                            <li key={idx}>{ob}</li>
                                                        )
                                                    })}
                                            </ul>
                                            <Link href={ob.link} className='font-[600] text-[16px]'>Read More</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default S3;