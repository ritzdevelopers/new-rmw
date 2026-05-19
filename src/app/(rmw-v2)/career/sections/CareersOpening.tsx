

"use client";

import { useState } from "react";

export default function CareersOpening() {
  const careersData = {
    sectionTitle: "Current Openings",

    jobs: [
      {
        id: 1,
        title: "UI/UX Designer",
        experience: "2-5 Years",
        location: "Noida",

        about: [
          "When developing a partnership with an influencer, it is critical to find someone who not only has a voice, but also has the ability to create trust and influence purchasing behaviour amongst their audience.",

          "Ritz Digital Media provides result-driven influencer partnerships through identifying and qualifying each influencer that shares similar values with the brand delivering authentic engagement."
        ],

        requirements: [
          "Bachelor's / B.Des in UI/UX, Graphic Design.",
          "Strong portfolio of digital projects.",
          "Expertise in responsive design."
        ],

        responsibilities: [
          "Develop UI/UX design concepts.",
          "Collaborate with development team.",
          "Work with creative & marketing teams."
        ],

        applyLink: "#"
      },

      {
        id: 2,
        title: "Frontend Developer",
        experience: "3-6 Years",
        location: "Delhi",

        about: [
          "We are looking for a Frontend Developer with React.js experience.",
          "The candidate should build scalable responsive interfaces."
        ],

        requirements: [
          "React.js",
          "Tailwind CSS",
          "Responsive Design"
        ],

        responsibilities: [
          "Build reusable components.",
          "Optimize website performance.",
          "Collaborate with UI team."
        ],

        applyLink: "#"
      },

      {
        id: 3,
        title: "Backend Developer",
        experience: "2-4 Years",
        location: "Gurgaon",

        about: [
          "Looking for a Node.js backend developer.",
          "Experience with APIs and databases preferred."
        ],

        requirements: [
          "Node.js",
          "MongoDB",
          "REST APIs"
        ],

        responsibilities: [
          "Develop APIs.",
          "Manage database.",
          "Integrate services."
        ],

        applyLink: "#"
      }
    ]
  };

  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id: any) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="bg-[#f7f7f7] min-h-screen py-10">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            {careersData.sectionTitle}
          </h1>
        </div>

        {/* Accordion */}
        <div className="space-y-4">

          {careersData.jobs.map((job, index) => {
            const isOpen = openId === job.id;

            return (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
              >

                {/* Header */}
                <button
                  onClick={() => toggleAccordion(job.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >

                  <div className="flex items-start gap-4">

                    {/* Number */}
                    <span className="text-gray-400 font-semibold text-sm sm:text-base">
                      {String(index + 1).padStart(2, "0")}.
                    </span>

                    <div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-semibold text-black">
                        {job.title}
                      </h2>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">

                        {/* Experience */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                            />
                          </svg>

                          <span>{job.experience}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a6 6 0 008.485-8.485l-4.243-4.243"
                            />
                          </svg>

                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div className="text-3xl text-gray-500">
                    {isOpen ? "×" : "+"}
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${isOpen
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-5 sm:px-6 pb-6">

                    {/* About */}
                    <div className="bg-[#FAFAFA] rounded-2xl p-5">

                      <h3 className="font-semibold text-black mb-4">
                        About the Job
                      </h3>

                      {job.about.map((item, i) => (
                        <p
                          key={i}
                          className="text-sm text-gray-600 leading-7 mb-4"
                        >
                          {item}
                        </p>
                      ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                      {/* Requirements */}
                      <div>
                        <h3 className="font-semibold text-black mb-4">
                          Requirements
                        </h3>

                        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
                          {job.requirements.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Responsibilities */}
                      <div>
                        <h3 className="font-semibold text-black mb-4">
                          Key Responsibilities
                        </h3>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
                          {job.responsibilities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="mt-8">
                      <a
                        href={job.applyLink}
                        className="inline-flex items-center gap-3 font-medium text-black hover:text-yellow-600 transition"
                      >
                        Apply Now

                     
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}