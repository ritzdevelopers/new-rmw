import React from 'react';
import { BsArrowUpRight } from "react-icons/bs";

function Section2() {
    return (
        <section className='flex justify-center items-center px-20 py-[70px]'>

            {/* Center Align Container  */}
            <div className="flex justify-between items-center gap-10 w-full">
                {/* Left Side Container  */}
                <div className="flex flex-col gap-6 w-[547px]">
                    <h2 className="font-[600] text-[30px] text-black">At Ritz Media World, we have an obsession with being wizards of quirkiness that morph good ideas into Brilliant ones.</h2>
                    <p className="font-[400] text-[16px] text-black">
                        Our services deliver results that drive your competitor’s envy. We blend digital magic, classic & modern mediums, and creative ingenuity to ensure that your brand doesn’t just speak; it captivates.
                    </p>
                    <div>
                        <button className="flex justify-between items-center gap-4 bg-transparent border-none">
                            <p className="font-[500] text-[18px] text-black">Contact us</p>

                            <div className="bg-[#C99237] h-[40px] w-[40px] rounded-[50px] flex justify-center items-center text-white">
                                <BsArrowUpRight className='text-white' />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Side Container  */}
                <div className="flex gap-10">
                    <div className='w-[253px] h-[341px] bg-black'></div>
                    <div className='w-[443px] h-[417px]'>
                        <img src="/home-v3/service-imgs/s2/s2-circle-container.png" alt="" className='w-full h-full' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;