import styles from "./page.module.css";
import { ChevronDown } from "lucide-react";

function Section3() {
    const images = Array.from({ length: 16 }, () => "/rmw-logo-sm-size.png");

    return (
        <section className="w-full py-[40px] xl:py-[70px] flex flex-col gap-4 justify-center items-center">
            {/* Center Align Container  */}
            <div className={`w-full ${styles.containerWidth}`}>
                {Array.from({ length: 4 }).map((_, rowIdx) => (
                    <div key={rowIdx} className="w-full flex border-b border-[#D8D8D8]">
                        {images.slice(rowIdx * 4, rowIdx * 4 + 4).map((imgSrc, colIdx) => (
                            <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`w-1/4 h-[120px] flex items-center justify-center ${colIdx !== 3 ? "border-r border-[#D8D8D8]" : ""
                                    }`}
                            >
                                <img
                                    src={imgSrc}
                                    alt={`Client ${rowIdx * 4 + colIdx + 1}`}
                                    className="max-h-[72px] w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center items-center">
                <button className="bg-[#0F1640] rounded-[700] font-[500] w-[179px] h-[50px] flex justify-center items-center gap-2">
                    <p className="font-[400] text-[16px] text-white">Load More</p>

                     {/* Dropdown Icon */}
                     <ChevronDown className="w-5 h-5 text-white" />
                </button>
            </div>
        </section>
    )
}

export default Section3;