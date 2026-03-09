function Banner() {
    return (
        <section className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[409px] relative bg-[#0F1640] flex justify-center items-end pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="absolute left-0 bottom-0 w-full h-full z-0 flex items-end pointer-events-none">
                <img src="/blogs2/s1/s1-layer.png" alt="" className="w-full h-auto object-cover object-bottom" />
            </div>

            {/* Page Heading And Info  */}
            <div className="w-full flex flex-col justify-center items-center text-center z-10 gap-3 sm:gap-4 max-w-[1280px]">
                <h1 className="font-[800] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] text-white leading-tight">
                    Blogs
                </h1>
                <p className="font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[21px] text-white max-w-[650px] leading-snug">
                    Stay updated with the latest trends, innovations, and in-depth articles to keep you ahead in the digital world.
                </p>
            </div>
        </section>
    )
}


export default Banner;