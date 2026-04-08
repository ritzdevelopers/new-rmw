import Image from 'next/image'
import React from 'react'
import styles from './discussion.module.css';

export default function AskDiscussGrow() {

    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    return (
        <section className="w-full bg-[#08143f] text-white px-4 py-10 sm:px-6 md:px-10 lg:px-16 xl:px-20 my-5 md:my-12">
            <div className="mx-auto flex  flex-col items-center text-center">
                <h1 className={`text-[56px]  leading-[0.95] tracking-[-0.04em] sm:text-[3.2rem] md:text-[56px] ${styles.montserratBold}`}>
                    ASK.  DISCUSS. GROW.
                </h1>

                <div className="relative mt-8 flex items-center justify-center">
                    <div className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] md:h-[215px] md:w-[242px]">
                        <Image
                            src="/discussion-forum/quote.png"
                            alt="discussion quote bubble"
                            fill
                            className="object-contain"
                        />
                        <div className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-sm font-semibold leading-tight sm:text-base md:text-[30px]  ${styles.montserratMedium}`}>
                            <span>Got a</span>
                            <span className="">question or</span>
                            <span>idea?</span>
                        </div>
                    </div>
                </div>

                <p className="mx-auto mt-10 text-[0.95rem] leading-7 text-[#e8ebf4] sm:text-base md:text-lg">
                    Start a discussion and get insights from industry experts and the creative minds at{' '}<br />
                    <span className={`font-semibold text-white ${styles.montserratBold}`}>RITZ MEDIA WORLD</span>.
                </p>

                <p className="mx-auto mt-2 text-sm leading-7 sm:text-base">
                    Because great brands are not built alone, they are built through ideas, conversations, and strategy.
                </p>

                <div className="flex items-center gap-[10px] mt-5">
                    <span className="text-[16px] font-[500]">
                        Let’s Talk
                    </span>

                    <div className="w-[36px] h-[36px] bg-[#C99237] rounded-full flex items-center justify-center">
                        <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                    </div>
                </div>
            </div>
        </section>
    )
}
