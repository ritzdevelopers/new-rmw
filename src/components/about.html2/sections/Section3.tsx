import styles from "./page.module.css";
function Section3() {

    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-8 ${styles.containerWidth}`}>
                {
                    [0, 1, 2, 3].map((idx) => {
                        return (
                            <div className={`w-full flex justify-between ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                {/* Left Side Div  */}
                                <div className={`w-full flex flex-col gap-2 relative`}>

                                    {/* Abs Div  */}
                                    <div className="w-full absolute inset-0 h-[42px] border-b border-[#0F1640]"></div>


                                    {/* Row 1  */}
                                    <div className={`w-full flex gap-4 items-end pl-1 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                        <p className="font-[700] text-[36px]">
                                            <span className="font-[500] text-[16px] mr-4">0{idx + 1}.</span>
                                            Brand Identity</p>
                                    </div>
                                    {/* Row 2  */}
                                    <div className={`w-full flex gap-4 ml-9 flex-col ${idx % 2 === 0 ? "items-start text-start" : "items-end text-end"}`}>
                                        <p className="font-[400] text-[16px] max-w-[640px]">
                                            As a leading creative digital marketing agency and a top branding agency in Delhi NCR, we design visual systems that strengthen brand recognition and long lasting growth. Branding advancements given by us help businesses to compete efficiently in Delhi NCR and pan India level.
                                        </p>
                                        <div className="w-[40px] cursor-pointer h-[40px] rounded-full bg-[#C99237] flex justify-center items-center">
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                                <rect x="2.19672" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7171)" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Div  */}
                                <div className="w-[477px] h-auto">
                                    <img src={`/new-about-imgs/s3/abt-s3-img1.jpg`} alt="about" className="w-full h-auto" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Section3;