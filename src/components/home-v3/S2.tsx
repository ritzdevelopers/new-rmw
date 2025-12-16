"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function S2() {
    return (
        <section className='bg-white w-full flex flex-col items-center justify-center min-h-screen py-20'>

            {/* Centered Align Main Container  */}
            <div className="w-[1246px] flex flex-col gap-10">
                {/* Row 1  */}
                <div className="w-full flex justify-between">
                    {/* Col 1  */}
                    <div className='max-w-[422px] flex flex-col gap-6'>
                        <p className='font-[700] text-[30px]'>What can you expect from the It’s a potent question with a surprisingly simple answer.</p>
                        <p className='font-[400] text-[16px]'>You can expect a dose of obsession with creative storytelling with a strong hint of consistency.
                            <b> Best advertising agency in NOIDA?</b> That’s what <b className='text-[#C99237]'>Ritz Media World</b>  is all about.</p>
                        <button className='w-[219px] h-[54px] border-[1px] border-[#C99237] rounded-[5px] font-[600] text-[15px]'>
                            Click to know more
                        </button>
                    </div>

                    {/* Col 2 */}
                    <div className='w-[375px] h-[370px] relative'>
                        <Image src={"/home-v3/s2/s2-i1.png"} alt='rmw' fill></Image>
                    </div>

                    {/* Col 3  */}
                    <div className='w-[402px] h-[317px]'>
                        {/* Row 1  */}
                        <div className="flex w-full h-[50%] border-b-[1px] border-b-[#AFAFAF]">
                            <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF] ">
                                <p className='font-[700] text-[60px]'>1M+</p>
                                <p className='font-[600] text-[16px]'>Creatives Published</p>
                            </div>
                            <div className="w-[50%] h-full flex flex-col justify-center items-center text-center ">
                                <p className='font-[700] text-[60px]'>1K+</p>
                                <p className='font-[600] text-[16px]'>Campaigns Executed</p>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex w-full h-[50%]">
                            <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF]">
                                <p className='font-[700] text-[60px]'>500+</p>
                                <p className='font-[600] text-[16px]'>Success Stories</p>
                            </div>
                            <div className="w-[50%] h-full flex flex-col justify-center items-center text-center">
                                <p className='font-[700] text-[60px]'>1B+</p>
                                <p className='font-[600] text-[16px]'>Words Written</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2  */}
                <div className="w-full">
                    {/* Row 1  */}
                    <div className='w-full flex justify-center items-center gap-20 border-[1px] border-[#E2E2E2] py-8'>
                        <div className='w-[280px] flex flex-col justify-center items-center gap-2 text-center'>
                            <img src="/home-v3/s2/clock.png" alt="RMW" />
                            <h3 className='font-[600] text-[20px]'>Seamless Global <br /> Time-Zone Alignment</h3>
                            <p className='font-[400] text-[16px]'>Smooth collaboration with near-zero time differences</p>
                        </div>

                        <div className='w-[280px] flex flex-col justify-center items-center gap-2 text-center'>
                            <img src="/home-v3/s2/board.png" alt="RMW" />
                            <h3 className='font-[600] text-[20px]'>Expert Talent Delivered <br /> at Competitive Prices</h3>
                            <p className='font-[400] text-[16px]'>Premium expertise delivered at the right value</p>
                        </div>

                        <div className='w-[280px] flex flex-col justify-center items-center gap-2 text-center'>
                            <img src="/home-v3/s2/wave.png" alt="RMW" />
                            <h3 className='font-[600] text-[20px]'>Culture-Driven Values & Clear Communication</h3>
                            <p className='font-[400] text-[16px]'>Smooth, reliable support — always just a call away</p>
                        </div>
                    </div>

                    {/* Row 2  */}
                    <div className="flex justify-center items-center w-full h-[426px] relative">

                        <Image src={"/home-v3/s2/team-bg2.png"} alt='' fill></Image>

                        <div className="flex absolute top-[50%] right-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer w-[54px] h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] z-10">

                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z" fill="black" />
                            </svg>

                        </div>

                        {/* Overlay  */}
                        <div className="absolute inset-0 bg-[#0000007b] w-full h-full z-0"></div>
                    </div>
                </div>

                {/* Row 3  */}
                <div className="w-full flex justify-between items-center">
                    {/* Left Side Container  */}
                    <div className='relative w-[194px] h-[156px] border-r-[1px] border-r-[#D9D9D9] flex items-center'>
                        <p className='font-[700] text-[24px]'>
                            Brands That Trust Us
                        </p>

                        <p className="absolute top-[50%] transform -translate-y-[50%] -right-3">
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z" fill="#D9D9D9" />
                            </svg>
                        </p>
                    </div>

                    {/* Right Side Container  */}
                    <div className='flex'>
                        {/* Slider Container  */}
                        <div className='flex justify-center items-center gap-8'>
                            {
                                ["/home-v3/clients/sikka.png", "/home-v3/clients/landmark.png", "/home-v3/clients/master.png", "/home-v3/clients/ace.png", "/home-v3/clients/tdi.png"].map((url, idx) => {
                                    return (
                                        <div className='w-[146px] h-[81px] relative'>
                                            <Image src={url} key={idx} fill alt='RMW'></Image>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* View More Container  */}
                        <div className='w-[146px] h-[81px] flex justify-center items-center'>
                            <Link href={"/"} className='font-[600] text-[16px] cursor-pointer border-b'>Show more</Link>
                        </div>
                    </div>
                </div>

                {/* Row 4  */}
                <div className="w-full flex flex-col gap-12">
                    {/* Div 1  */}
                    <div className="w-full">
                        <h3 className='font-[700] text-[36px]'>Choose Your Brand Journey</h3>
                        <p className='font-[400] text-[16px]'>Tailored growth programmes engineered for the industries and audiences most.</p>
                    </div>

                    {/* Div 2  */}
                    <div className="w-full flex justify-between ">
                        {/* Left Side Container  */}
                        <div className="flex flex-col gap-4">
                            {
                                [
                                    {
                                        act: true,
                                        id: "01",
                                        ttl: "Digital Marketing"
                                    },
                                    {
                                        act: false,
                                        id: "02",
                                        ttl: "Creative Service"
                                    },
                                    {
                                        act: false,
                                        id: "03",
                                        ttl: "Print Advertisement"
                                    },
                                    {
                                        act: false,
                                        id: "04",
                                        ttl: "Radio Advertisement"
                                    },
                                    {
                                        act: false,
                                        id: "05",
                                        ttl: "Content Marketing",
                                    },
                                    {
                                        act: false,
                                        id: "06",
                                        ttl: "Web Development"
                                    },
                                    {
                                        act: false,
                                        id: "07",
                                        ttl: "Influencer Marketing"
                                    },
                                    {
                                        act: false,
                                        id: "08",
                                        ttl: "Celebrity Endorsement"
                                    }

                                ].map((ob) => {
                                    return (
                                        <div className={`relative pl-16 flex gap-4 ${ob.act === true ? 'text-[#000000]' : 'text-[#C5C5C5]'}`}>
                                            <p className='font-[400] text-[16px]'>{ob.id}</p>
                                            <h2 className='font-[700] text-[30px]'>{ob.ttl}</h2>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Right Side Container  */}
                        <div className='flex flex-col gap-6 max-w-[602px]'>
                            <div className='w-[602px] h-[336px] relative'>
                                <Image src={"/home-v3/s2/v2s2i2.png"} alt='RMW' fill></Image>
                            </div>
                            <p className='font-[400] text-[14px]'>
                                We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.
                            </p>
                            <button className='max-w-[261px] font-[600] text-[15px] h-[54px] rounded-[5px] cursor-pointer border-[1px] border-[#C99237]'>Explore Digital Marketing</button>
                        </div>
                    </div>

                    {/* Div 3  */}
                    <div className="w-full">
                        <p className='font-[400] text-[16px]'>Not sure which path fits your brand? Let's discuss your unique needs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default S2