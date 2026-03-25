import styles from "../page.module.css";
function S2Card({ index, data }: { index: number, data: any }) {
    return (
        <div className="w-full flex h-auto lg:h-[470px] ">
            <div className={`flex flex-col-reverse gap-4 lg:gap-14 h-full w-full ${index % 2 === 0 ? "lg:flex-row" : "lg:justify-start lg:flex-row-reverse"}`}>
                {/* Left Side Container  */}
                <div className="w-full lg:w-[653px] h-[460px] lg:h-full relative ">
                    <img src={`/${data.image_url}`} alt="" className="w-full h-full md:object-cover" />
                </div>

                {/* Right Side Container  */}
                <div className={`flex flex-col items-center lg:items-start justify-center gap-4 max-w-full lg:max-w-[470px] mt-5 lg:mt-0 ${index % 2 === 0 ? "text-start" : "text-start lg:text-end"}`}>
                    <h2 className={`font-[700] text-[30px] ${styles.fontmontserrat}`}>{data.title}</h2>
                    <p className={`font-[400] text-[16px] leading-[28px] text-center lg:text-left ${styles.fontpoppins}`}>{data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default S2Card;