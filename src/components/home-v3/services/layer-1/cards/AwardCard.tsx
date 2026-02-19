import Image from "next/image";

function AwardCard({ img, title, description }: { img: string, title: string, description: string }) {
    return (
        <div className="w-[407px]">
            {/* Top Row For Image */}
            <div className="w-full h-[328px] relative">
                <Image src={img} alt={title} fill className="object-cover" />

                {/* Absolute Positioned Div For Star Image  */}
                <div className="absolute bottom-6 left-6">
                    <img src="/service-v3/layer1/s7/excellence-img.png" alt="" className="w-[125px] h-auto" />
                </div>
            </div>

            {/* Bottom Row For Description */}
            <div className="w-full bg-white border-[1px] border-[#D4D4D4] h-[86px] p-4">
                <p className="font-[500] text-[16px] text-black">{description}</p>
            </div>

        </div>
    )
}

export default AwardCard;