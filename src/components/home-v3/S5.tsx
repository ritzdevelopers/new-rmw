"use client"
import React from 'react'

function S5() {
    return (
        <section className='w-full min-h-[632px] bg-[#F7F7F7] py-20 flex justify-center items-center'>
            {/* Center Align Container  */}
            <div className="w-[90%] flex flex-col gap-8">
                {/* Top Row  */}
                <div className="w-full flex items-center justify-between">
                    {/* Left Side Container  */}
                    <div>
                        <p className='font-[600] text-[16px] text-[#C99237] uppercase'>our Journey</p>
                        <h2 className='font-[700] text-[36px]'>17 Years of Brand Excellence</h2>
                        <p className='font-[400] text-[16px]'>From pioneering print innovations to 360° digital mastery, our journey reflects our commitment to excellence.</p>
                    </div>

                    <div className="flex gap-2">
                        <img src="/home-v3/s3/lftb.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                        <img src="/home-v3/s3/rhgt.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                    </div>
                </div>

                {/* Bottom Row  */}
                <div className="w-full">
                    {/* Slider */}
                    <div className="w-full flex flex-col gap-6">

                        {/* Slider Header Part */}
                        <div className="flex justify-center gap-[24rem] items-center w-full">

                            <h2 className="font-[700] text-[30px]">
                                2008
                            </h2>

                            <h2
                                className="
      relative font-[700] text-[30px] px-4
      before:content-['']
      before:absolute
      before:top-1/2
      before:right-full
      before:w-[361px]
      before:h-[1px]
      before:bg-[#B2B2B2]

      after:content-['']
      after:absolute
      after:top-1/2
      after:left-full
      after:w-[361px]
      after:h-[1px]
      after:bg-[#B2B2B2]
    "
                            >
                                2012
                            </h2>

                            <h2 className="font-[700] text-[30px]">
                                2016
                            </h2>

                        </div>

                        {/* Slider Main Part  */}
                        <div className="w-full flex justify-center items-center gap-[15rem]">
                            {
                                [
                                    {
                                        img: "/home-v3/s5/s5i5.jpg",
                                        ttl: "Foundation",
                                        para: "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets."
                                    },
                                    {
                                        img: "/home-v3/s5/s5i2.png",
                                        ttl: "Innovation Leadership",
                                        para: "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print."
                                    },
                                    {
                                        img: "/home-v3/s5/s5i3.png",
                                        ttl: "Digital Expansion",
                                        para: "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands."
                                    },
                                ].map((ob, idx) => {
                                    return (
                                        <div className='w-[276px] flex flex-col gap-3 text-center justify-center items-center'>
                                            <div className='w-[165px] h-[165px] border-1 border-[#E2DEDE] rounded-full flex justify-center items-center'>
                                                <img src={ob.img} alt={ob.ttl} className='w-[95%] h-[95%] rounded-full' />
                                            </div>
                                            <h2 className='font-[600] text-[20px]'>{ob.ttl}</h2>
                                            <p className='font-[400] text-[14px]'>
                                                {
                                                    ob.para
                                                }
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default S5