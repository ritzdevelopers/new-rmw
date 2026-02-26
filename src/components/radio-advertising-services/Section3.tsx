import styles from "./page.module.css";

function Section3() {
    return (
        <section className="w-full flex justify-center   pt-[30px] px-20">
            {/* Center Align Container  */}
            <div className={`w-full flex justify-center  items-center ${styles.containerWidth}`}>
                {/* Col 1  */}
                <div className="w-[222px] h-full flex flex-col justify-end items-center pb-8">
                    <img src="/radio-advertising-page/s3/s3-i2.png" alt="" className="w-full h-auto object-cover" />
                </div>

                {/* Col 2  */}
                <div className="relative w-[798px]">

                    <div className="absolute left-[50%] -top-10 transform -translate-x-1/2 w-full max-w-[450px] py-4 px-4 bg-[#F7F7F7] rounded-[4px]">
                        <div className="w-full min-h-0 shrink-0">
                            <p className="font-[500] text-[20px] text-center">We strategically <span className="font-[700]">place your brand</span> across leading <span className="font-[700]">FM stations</span> to build maximum audience engagement and visibility.
                            </p>
                        </div>
                    </div>
                    <img src="/radio-advertising-page/s3/s3-i1.png" alt="" className="w-full h-auto object-cover" />
                </div>

                {/* Col 3  */}
                <div className="flex justify-center h-full  items-end pb-8">
                    <button className="flex justify-center curspo
                     items-center gap-2 text-black px-4 py-2 rounded-[5px] w-[203px">
                        <p className="font-[500] text-[18px]">Let’s Talk Today</p>

                        <div className="w-[40px] h-[40px] bg-[#C99237] rounded-full flex justify-center items-center">  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                            <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                        </svg></div>

                    </button>
                </div>
            </div>
        </section>
    )
}

export default Section3;