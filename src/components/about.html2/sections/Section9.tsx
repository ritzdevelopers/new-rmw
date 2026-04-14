import styles from "./page.module.css";

function Section9() {
    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth}`}>
                <div className="w-full">
                    <div className="w-full border-[1px] border-[#D7D7D7] rounded-[5px] p-10 flex flex-col gap-4 justify-center items-center text-center">
                        <p className="font-[700] text-[36px]">Why Choose Us</p>
                        <p className="font-[400] text-[22px]">17+ Years Of Storytelling Driving Brand Growth & Recognition.
                        </p>
                        <p className="font-[400] text-[16px]">We've been helping brands turn ideas into impactful campaigns through our creative strategies and data-driven marketing, allowing them to stand out against its competition and be a household name.</p>
                    </div>
                    <div className="flex w-full items-stretch">
                        {/* Left Side Container  */}
                        <div className="w-[calc(100%-857px)] self-stretch bg-[#0F1640]"></div>

                        {/* Right Side Container  */}
                        <div className="w-[857px] shrink-0">
                            <img src="/new-about-imgs/s9/team2.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section9;