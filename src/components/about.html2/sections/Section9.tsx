import styles from "./page.module.css";

function Section9() {
    return (
        <section className="w-full pt-[40px] xl:pt-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth}`}>
                <div className="w-full">
                    <div className="w-full border-[1px] border-[#D7D7D7] rounded-[5px] p-10 flex flex-col gap-4 justify-center items-center text-center">
                        <p className={`font-[700] text-[36px] ${styles.fontmontserrat}`}>Why Choose Us</p>
                        <p className={`font-[400] text-[22px] ${styles.fontpoppins}`}>17+ Years Of Storytelling Driving Brand Growth & Recognition.
                        </p>
                        <p className={`font-[400] max-w-[840px] text-[16px] ${styles.fontpoppins}`}>We've been helping brands turn ideas into impactful campaigns through our creative strategies and data-driven marketing, allowing them to stand out against its competition and be a household name.</p>
                    </div>
                    <div className="flex w-full items-stretch">
                        {/* Left Side Container  */}
                        <div className="w-[calc(100%-857px)] py-8 self-stretch bg-[#0F1640] flex flex-col justify-between items-center gap-3">
                            <div className="flex flex-col gap-2 max-w-[206px] justify-center items-center text-center">
                                <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat}`}>350+</p>
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}> very satisfied clients worldwide.</p>
                            </div>

                            <div className="flex flex-col gap-2 max-w-[236px] justify-center items-center text-center">
                                <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat}`}>200+</p>
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}> Good award winning digital media agency.</p>
                            </div>

                            <div className="flex flex-col gap-2 max-w-[236px] justify-center items-center text-center">
                                <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat}`}>300+</p>
                                <p className={`font-[400] text-[16px] text-white ${styles.fontopensans}`}> Successful projects completed in one year..</p>
                            </div>
                        </div>

                        {/* Right Side Container  */}
                        <div className="w-[857px] shrink-0 relative">
                            <img src="/new-about-imgs/s9/team2.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-full h-auto" />

                            <div className="absolute bottom-0 max-h-[117px] right-0 text-center bg-white max-w-[281px] p-8">
                                <p className={`font-[600] text-[18px] ${styles.fontmontserrat}`}>Years of Storytelling, Turning Ideas Into Stories That Matter</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section9;