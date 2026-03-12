import Image from "next/image";

function Section4() {
    return (
        <section className="w-full py-[70px] flex justify-center items-center px-20">
            {/* Centered Align Container  */}
            <div className="w-full flex justify-between items-center">
                {/* Left Side Container  */}
                <div className="w-[603px] h-[566px] relative">
                    <Image src={'/slug/s3/seo-s3-img1.jpg'} fill alt="SEO"></Image>
                </div>

                {/* Right Side Container  */}
                <div></div>
            </div>
        </section>
    )
}


export default Section4;