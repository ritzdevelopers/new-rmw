"use client";

import styles from "../page.module.css";

type S5CardMobileProps = {
    title: string;
    image: string;
    content: string;
    index: number;
};

function S5CardMobile({ title, image, content, index }: S5CardMobileProps) {
    // const badge = (index + 1).toString().padStart(2, "0");
    return (
        <article className="w-full flex-shrink-0 flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8E8E8] shadow-sm">
            <div className="relative w-full h-auto flex items-center justify-start p-3">
                <img src={image} alt={title} className="max-w-full rounded-[10px] max-h-full object-contain" />
                {/* <span className={`absolute top-3 right-3 font-[500] text-[14px] text-[#222] ${styles.fontmontserrat}`}>
                    {badge}
                </span> */}
            </div>
            <div className="flex flex-col gap-3 p-4">
                <h3 className={`font-[500] text-[18px] leading-tight text-[#1a1a1a] ${styles.fontmontserrat}`}>
                    {title}
                </h3>
                <p className={`font-[400] text-[14px] leading-relaxed text-left text-[#444] line-clamp-4 ${styles.fontopensans}`}>
                    {content}
                </p>
                <button type="button" className="flex items-center gap-2 w-fit mt-1">
                    <span className={`font-[500] text-[16px] ${styles.fontopensans}`}>Learn more</span>
                    <div className="w-[36px] h-[36px] bg-[#C99237] rounded-full flex justify-center items-center flex-shrink-0">
                        <svg width="18" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                            <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                        </svg>
                    </div>
                </button>
            </div>
        </article>
    );
}

export default S5CardMobile;
