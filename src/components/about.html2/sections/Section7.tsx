import styles from "./page.module.css";

function Section7() {
    return (
        <section className="w-full flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth}`}>
                <div className="w-full flex flex-col gap-8 justify-center items-center">
                    {/* Row 1  */}
                    <div className="w-full flex flex-col items-center text-center gap-2 ">
                    <p className={`font-[600] text-[16px] text-[#C99237] uppercase ${styles.fontpoppins}`}>Our Commitment</p>
                        <h2 className={`font-[400] text-[36px] max-w-[725px] ${styles.fontmontserrat}`}><span className="font-[700]">Innovating</span> for Tomorrow with 
                            <span className="font-[700]"> Creativity</span> and <span className="font-[700]">Technology</span></h2>
                    </div>

                    {/* Row 2  */}
                    <div className="w-full flex justify-between gap-4">
                        {/* Card 1  */}
                        <div className="w-[392px] h-[456px] rounded-[5px] border-[1px] border-[#D7D7D7] flex flex-col justify-between items-start p-10">
                            <p className={`font-[400] text-[16px] ${styles.fontpoppins}`}>Where visuals driving tangible actions are a daily reality, we deliver meaningful results through foresight and innovation. Believing that everything can be achieved via never-ending evolution.</p>

                            <div className="flex flex-col gap-3">
                                <img src="/new-about-imgs/s7/bulb.png" alt="Ritz Media World" title="Ritz Media World" className="w-[82px] h-auto" />
                                <p className={`font-[500] text-[36px] ${styles.fontmontserrat}`}>Our Vision</p>
                            </div>
                        </div>

                        {/* Card 2  */}
                        <div className="w-[392px] h-[456px] rounded-[5px]">
                            <img src="/new-about-imgs/s7/brain.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-full h-full " />
                        </div>

                        {/* Card 3  */}
                        <div className="w-[392px] h-[456px] rounded-[5px] bg-[#0F1640] flex flex-col justify-between items-start p-10">
                            <p className={`font-[400] text-[16px] text-white max-w-[307px] ${styles.fontpoppins}`}>Every strategy we put together unlocks fresh opportunities. As a forward thinker, our aim is to create the future today. Every project we deliver leaves a mark and has real impact and consequence.</p>

                            <div className="flex flex-col gap-3">
                                <img src="/new-about-imgs/s7/arrow.png" alt="Ritz Media World" title="Ritz Media World" className="w-[98px] h-auto" />
                                <p className={`font-[500] text-[21px] text-white ${styles.fontmontserrat}`}>Crafting Strategies, Shaping the Future, & Driving Impact</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section7;