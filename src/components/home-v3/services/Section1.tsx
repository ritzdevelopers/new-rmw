import React from 'react';

function Section1() {
    return (
        <section className='w-full min-h-[615px] bg-[url("/home-v3/service-imgs/s1/rmw-service-banner1.jpg")] bg-cover bg-no-repeat bg-center flex items-end pb-26'>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col gap-6'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="w-[165px] h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="" className='w-full h-full' />
                    <p className="font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8">Services</p>
                </div>

                {/* Row 2  */}
                <div className='pl-16'>
                    <p className="font-[500] text-[21px] text-white">Services Tailored to Transform Your Brand from</p>
                    <h1 className="font-[800] text-[65px] text-white leading-18">"Just Another" <br />
                        to "The ones"<span className='text-[#C99237]'>.</span></h1>
                </div>
            </div>
        </section>
    )
}

export default Section1;