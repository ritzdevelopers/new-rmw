"use client"
import Image from 'next/image';
import React from 'react'
import { CiCalendar } from "react-icons/ci";

function S8() {
    return (
        <section className='w-full min-h-screen bg-[#ffffff] flex justify-center items-center'>
            {/* Centered Align Container  */}
            <div className='w-[92%] flex flex-col'>
                {/* Row 1  */}
                <div className='w-full flex flex-col gap-10'>
                    {/* Header  */}
                    <div className="flex justify-between items-end">
                        {/* Left Side Container  */}
                        <div className='flex flex-col gap-3'>
                            <p className='font-[600] text-[16px] text-[#C99237]'>Latest Insights</p>
                            <h2 className='font-[700] text-[36px] text-black'>Here's what we've been up to</h2>
                            <p className='font-[400] text-[16px] text-black max-w-5xl'>
                                Explore industry insights, expert tips, and creative inspiration from the Ritz team. Our blog is where we share knowledge, ideas, and what's next in digital.
                            </p>
                        </div>

                        {/* Right Side Container  */}
                        <button className='font-[600] text-[15px] w-[179px] h-[54px] border-1 border-[#C99237] rounded-[5px] cursor-pointer'>
                            Read more blogs
                        </button>
                    </div>

                    {/* Main Container  */}
                    <div className="w-full flex justify-between">
                        {
                            [
                                {
                                    img: "/home-v3/s8/v3s8i1.png",
                                    date: "09-12-2025",
                                    ttl: "UGC & Influencers: How to Brief, Track, and Pay for Performance",
                                    link: "/"
                                },
                                {
                                    img: "/home-v3/s8/v3s8i2.png",
                                    date: "08-12-2025",
                                    ttl: "How Generative AI Is Helping Brands Evolve Through Storytelling",
                                    link: "/"
                                },
                                {
                                    img: "/home-v3/s8/v3s8i1.png",
                                    date: "03-12-2025",
                                    ttl: "Salary & Roles in India: Performance Marketer, SEO, Analyst: 2025 Snapshot",
                                    link: "/"
                                },
                            ].map((ob, idx) => {
                                return (
                                    <div className='w-[405px] h-[311px] flex flex-col gap-2 '>
                                        {/* Image Container  */}
                                        <div className="w-full relative h-[212px]">
                                            <Image src={ob.img} alt='RMW' fill></Image>
                                        </div>
                                        <p className='font-[400] text-[15px] text-[#575757] flex gap-2'><CiCalendar className='w-[18px] h-[18px]' /> {ob.date}</p>
                                        <h3 className='font-[600] text-[18px] text-black'>{ob.ttl}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Row 2  */}
                <div className="w-full flex justify-between">
                    {/* Left Side Container  */}
                    <div className="w-[603px] h-[526px] bg-[#F7F7F7]"></div>

                      {/* Right Side Container  */}
                      <div className="w-[603px] h-[526px] border-1 border-[#D4D4D4]"></div>
                </div>
            </div>
        </section>
    )
}

export default S8;