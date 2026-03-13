"use client";
import { useEffect, useState } from "react";

function NewBanner() {
    const [imgSlide, setImgSlide] = useState<number>(1)

    useEffect(() => {
        const interval = setInterval(() => {
            if (imgSlide === 5) {
                setImgSlide(1)
            } else {
                setImgSlide(imgSlide + 1)
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [imgSlide]);

    return (
        <section className="w-full">
            <img src={`/4th_floor_rmw/home/banner/rmw-bn-i${imgSlide}.jpg`} alt="" className="w-full h-auto object-cover transition-all  duration-500 ease-linear " />
        </section>
    );
}

export default NewBanner;