const hiringSteps = [
    {
      id: 1,
      title: "Discover Open Roles & Apply",
      active: true,
    },
    {
      id: 2,
      title: "Portfolio & Profile Review",
    },
    {
      id: 3,
      title: "Creative / Technical Interaction",
    },
    {
      id: 4,
      title: "Team & HR Conversation",
      
    },
    {
      id: 5,
      title: "Final Selection & Offer",
    },
  ];
  
  export default function HomePage() {
    return (
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 md:px-8">
        <section className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black md:text-5xl">
              Hiring Process
            </h1>
  
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
            Putting people first starts from the very first conversation. Share your skills and aspirations, and discover opportunities aligned with your journey.
            </p>
          </div>
  
          {/* Steps */}
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
            {hiringSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-md border px-5 py-4 transition-all duration-300
                  ${
                    step.active
                      ? "bg-[#12163b] text-white border-[#12163b]"
                      : "bg-white text-gray-700 border-gray-200"
                  }
                `}
              >
                {/* Number */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
                    ${
                      step.active
                        ? "bg-white text-[#12163b]"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {step.id}
                </div>
  
                {/* Title */}
                <p className="max-w-[170px] text-sm font-medium leading-5">
                  {step.title}
                </p>
  
                {/* Line Connector Desktop */}
                {index !== hiringSteps.length - 1 && (
                  <div className="hidden md:block h-[1px] w-10 bg-gray-300 ml-2" />
                )}
              </div>
            ))}
          </div>
  
          {/* Description */}
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <p className="text-sm leading-7 text-gray-600 md:text-base">
            Browse current openings, choose the role matching your skills, and submit your application with resume and portfolio to begin your journey with our creative team.
            </p>
          </div>
  
          {/* Life Section */}
          <div className="mt-16 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              {/* Left Content */}
              <div className="px-6 py-10 md:px-12">
                <h2 className="text-4xl font-light text-black md:text-5xl">
                  Life @
                </h2>
  
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-wide text-[#c58b2d]">
                  Ritz Media World
                </h3>
  
                <p className="mt-6 max-w-md text-sm leading-7 text-gray-600 md:text-base">
                  Life at RMW fosters creativity, collaboration, growth,
                  empowering people, innovation, balance, and meaningful impact
                  daily.
                </p>
  
                <button className="mt-8 rounded-md bg-[#12163b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1b2259]">
                  Explore Our Gallery
                </button>
              </div>
  
              {/* Right Image */}
              <div className="relative h-full min-h-[320px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-l-[120px] lg:rounded-l-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                    alt="Team"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }