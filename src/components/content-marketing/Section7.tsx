import styles from "./page.module.css";

function Section7({text = "Ready to Transform Your Website from Ordinary to Unforgettable?"}: {text: string}) {
    return (
        <a href="/contact.html" target="_blank" className="w-full flex justify-center items-center py-6 sm:py-12 md:py-16 lg:py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-center bg-[#0F1640] overflow-x-hidden">
            <p className={`font-[600] text-[15px] leading-[1.5] break-words sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[28px] text-white ${styles.fontmontserrat}`}>{text}</p>
        </a>
    )
}

export default Section7;