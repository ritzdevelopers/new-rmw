import Image from "next/image";
function Section4() {
    return (
        <section className="w-full h-[640px] relative">

            {/* Row 1  */}
            <div className="w-full absolute top-0 left-0 z-10">
                <div className="relative w-full">
                    <p className="absolute top-10 right-[17%] font-[400] text-white text-[14px] text-center w-[230px]">
                        FM Advertising, in fact amongst many other mediums usually brings the lowest cost per reach.
                    </p>
                </div>
                <div className="relative w-full">
                    <p className="absolute top-24 right-[40%] font-[400] text-white text-[14px] text-center w-[230px]">
                    Radio reaches the same listener repeatedly; studies show four to five ad exposures build consideration and drive action, FM effective.
                    </p>
                </div>
            </div>


               {/* Row 1  */}
               <div className="w-full absolute bottom-0 left-0 z-10">
                <div className="relative w-full">
                    <p className="absolute bottom-10 right-[8%] font-[400] text-white text-[14px] text-center w-[200px]">
                    You can also run multiple jungles in one campaign to keep the message exciting.
                    </p>
                </div>
                <div className="relative w-full">
                    <p className="absolute bottom-8 right-[50%] font-[400] text-white text-[14px] text-center w-[230px]">
                    FM advertising lets brands target one city, like Delhi, by choosing stations covering specific areas, such as Radio Mirchi effectively.
                    </p>
                </div>
            </div>
            <Image src="/radio-advertising-page/s4/s4-banner.jpg" alt="Radio Advertising" fill className="object-cover" />
        </section>
    )
}


export default Section4;