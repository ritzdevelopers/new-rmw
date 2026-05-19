"use client";

import Image from "next/image";
import CareerForm from "@/allPages/careerPage/careerForm";
import styles from "@/components/home-v3/services/page.module.css";

const perks = [
  {
    title: "Creative Freedom",
    description: "Work on exciting projects and bring your bold ideas to life.",
  },
  {
    title: "Growth Opportunities",
    description:
      "Learn, experiment, and grow with a team that supports your career.",
  },
  {
    title: "Friendly Work Culture",
    description:
      "Collaborative environment with zero unnecessary hierarchy.",
  },
  {
    title: "Challenging Projects",
    description:
      "Work with startups, brands, and enterprises across industries.",
  },
];

export default function LeftSectionForm() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div
        className={`mx-auto grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16 ${styles.containerWidth}`}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h2
              className="mt-2 text-2xl font-bold text-black sm:text-3xl md:text-4xl"
              style={{ fontFamily: "MontserratBold" }}
            >
              Why Join Us?
            </h2>
          </div>

          <ul className="flex flex-col gap-5">
            {perks.map((perk) => (
              <li key={perk.title} className="flex flex-col gap-1">
                <span
                  className="text-base font-semibold text-[#0F1640] sm:text-lg"
                  style={{ fontFamily: "MontserratSemiBold" }}
                >
                  {perk.title}
                </span>
                <span
                  className="text-sm leading-relaxed text-gray-600 sm:text-[15px]"
                  style={{ fontFamily: "OpenSansRegular" }}
                >
                  {perk.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none">
            <Image
              src="/career/career-img.png"
              alt="Career at Ritz Media World"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </div>
        </div>

        <div className="w-full min-w-0">
          <CareerForm />
        </div>
      </div>
    </section>
  );
}
