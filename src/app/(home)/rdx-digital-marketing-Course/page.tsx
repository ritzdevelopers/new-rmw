"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

function Page() {
  const slides = [
    {
      img: "/rdx/s9/seeo.png",
      alt: "SEO",
      title: "SEO (Search Engine Optimization)",
    },
    {
      img: "/rdx/s9/google-ads-icon.png",
      alt: "Google Ads",
      title: "PPC (Google Ads) Services",
    },
    {
      img: "/rdx/s9/seeo2.png",
      alt: "Social Media",
      title: "Social Media Management",
    },
    {
      img: "/rdx/s9/google-ads-icon.png",
      alt: "Content",
      title: "Content Marketing",
    },
    {
      img: "/rdx/s9/seeo2.png",
      alt: "Email",
      title: "Email Campaigns",
    },
    {
      img: "/rdx/s9/seeo.png",
      alt: "SEO",
      title: "SEO (Search Engine Optimization)",
    },
    {
      img: "/rdx/s9/google-ads-icon.png",
      alt: "Google Ads",
      title: "PPC (Google Ads) Services",
    },
    {
      img: "/rdx/s9/seeo2.png",
      alt: "Social Media",
      title: "Social Media Management",
    },
    {
      img: "/rdx/s9/google-ads-icon.png",
      alt: "Content",
      title: "Content Marketing",
    },
    {
      img: "/rdx/s9/seeo2.png",
      alt: "Email",
      title: "Email Campaigns",
    },
    {
      img: "/rdx/s9/seeo.png",
      alt: "SEO",
      title: "SEO (Search Engine Optimization)",
    },
    {
      img: "/rdx/s9/google-ads-icon.png",
      alt: "Google Ads",
      title: "PPC (Google Ads) Services",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1200) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev + cardsPerView >= slides.length ? 0 : prev + cardsPerView
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [cardsPerView, slides.length]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev + cardsPerView >= slides.length ? 0 : prev + cardsPerView
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev - cardsPerView < 0
        ? slides.length - cardsPerView
        : prev - cardsPerView
    );
  };

  // Pagination count
  const totalPages = Math.ceil(slides.length / cardsPerView);
  const currentPage = Math.floor(current / cardsPerView);

  const s8Slides = [
    {
      text: `"I moved from content to performance in 10 weeks. The capstone plus interview prep sealed the deal."`,
      author: "— Aastha S",
      role: "Performance Marketer, Gurgaon",
    },
    {
      text: `"The analytics + CRO combo finally made sense. Built dashboards I now use at work daily."`,
      author: "— Kunal M.",
      role: "Marketing Analyst, Noida",
    },
    {
      text: `"As a founder, I stopped burning budget. The RDX testing cadence and landing page playbook paid for the course."`,
      author: "— Riya V",
      role: "D2C Founder, Delhi",
    },
    {
      text: `"My LinkedIn profile exploded after completing the program. Recruiters started approaching me directly."`,
      author: "— Sameer P",
      role: "Growth Manager, Mumbai",
    },
    {
      text: `"This program gave me clarity on analytics and campaign structures. I finally feel confident running paid ads."`,
      author: "— Neha T",
      role: "Digital Marketer, Bangalore",
    },
  ];

  const [s8Current, setS8Current] = useState(0);
  const [s8CardsPerView, setS8CardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const updateS8CardsPerView = () => {
      if (window.innerWidth <= 768) {
        setS8CardsPerView(1);
      } else if (window.innerWidth <= 1200) {
        setS8CardsPerView(2);
      } else {
        setS8CardsPerView(3);
      }
    };

    updateS8CardsPerView();
    window.addEventListener("resize", updateS8CardsPerView);
    return () => window.removeEventListener("resize", updateS8CardsPerView);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setS8Current((prev) =>
        prev + s8CardsPerView >= s8Slides.length ? 0 : prev + s8CardsPerView
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [s8CardsPerView, s8Slides.length]);

  const s8NextSlide = () => {
    setS8Current((prev) =>
      prev + s8CardsPerView >= s8Slides.length ? 0 : prev + s8CardsPerView
    );
  };

  const s8PrevSlide = () => {
    setS8Current((prev) =>
      prev - s8CardsPerView < 0
        ? s8Slides.length - s8CardsPerView
        : prev - s8CardsPerView
    );
  };

  // Pagination count
  const s8TotalPages = Math.ceil(s8Slides.length / s8CardsPerView);
  const s8CurrentPage = Math.floor(s8Current / s8CardsPerView);

  const cards = [
    {
      img: "/rdx/s7/rdxs7i1.png",
      title: "Foundations & Consumer Psychology",
      desc: "Digital funnels, JTBD thinking, offer design, creative strategy, ethics, and the numbers that matter.",
    },
    {
      img: "/rdx/s7/rdxs7i2.png",
      title: "SEO Deep Dive",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
    {
      img: "/rdx/s7/rdxs7i3.png",
      title: "Search Advertising (Google Ads)",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
    {
      img: "/rdx/s7/rdxs7i1.png",
      title: "Foundations & Consumer Psychology",
      desc: "Digital funnels, JTBD thinking, offer design, creative strategy, ethics, and the numbers that matter.",
    },
    {
      img: "/rdx/s7/rdxs7i2.png",
      title: "SEO Deep Dive",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
    {
      img: "/rdx/s7/rdxs7i3.png",
      title: "Search Advertising (Google Ads)",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
    {
      img: "/rdx/s7/rdxs7i1.png",
      title: "Foundations & Consumer Psychology",
      desc: "Digital funnels, JTBD thinking, offer design, creative strategy, ethics, and the numbers that matter.",
    },
    {
      img: "/rdx/s7/rdxs7i2.png",
      title: "SEO Deep Dive",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
    {
      img: "/rdx/s7/rdxs7i3.png",
      title: "Search Advertising (Google Ads)",
      desc: "Keyword strategy, on-page & technical SEO, internal linking, Core Web Vitals, local SEO, content briefs, Search Console workflows.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  console.log(visibleCards);

  // Responsive cards count
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth <= 768) setVisibleCards(1);
      else if (window.innerWidth <= 1200) setVisibleCards(2);
      else setVisibleCards(3);
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Width of each card (same as CSS)
  const cardWidth = 390; // px
  const gap = 20; // px (approx spacing in flex-wrap responsive)

  // Calculate translateX
  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <main>
      {/* From Here The Section 1 Is Starting  */}
      <section className={styles.section}>
        {/* This Is Row 1 */}
        <div className={styles.row1}>
          <img
            src="/RITZ DIGITAL XPERTS ACADEMY.png"
            className={styles.logo}
            alt="Ritz Digital Xperts Academy"
          />
          <p className={styles.heading}>
            Learn{" "}
            <span className={styles.highlight}>
              Digital Marketing the agency
            </span>{" "}
            way. <b>Build skills that hiring managers</b> actually want.
          </p>
        </div>

        {/* This Is Row 2 */}
        <div className={styles.row2}>
          {/* Left Side */}
          <div className={styles.leftSide}>
            <button className={styles.circleButton}>
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0003 44.5L44.0003 20.5M44.0003 20.5L44.0003 43.1666M44.0003 20.5L21.3337 20.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className={styles.advisorButton}>Talk to an Advisor</button>
          </div>

          {/* Right Side */}
          <div className={styles.rightSide}>
            <p className={styles.description}>
              Backed by <b>Ritz Media World</b>, an INS-registered,
              award-winning agency with a Meta partner and Google-certified
              team, RDX turns curious learners into confident digital marketers.
              We keep it practical, fast, and career-focused. There are no
              jargon marathons, just the real work.
            </p>
          </div>
        </div>
      </section>

      {/* From Here The Section 2 Is Starting  */}
      <section className={styles.section2s2}>
        <div className={styles.containers2}>
          {/* Absolute Position Div 1  */}
          <div className={styles.absoluteDiv1s2}>
            <img
              src="/rdx/rdxi2.png"
              className={styles.absoluteImg1s2}
              alt="Decoration 1"
            />
          </div>

          {/* Absolute Position Div 2  */}
          <div className={styles.absoluteDiv2s2}>
            <img
              src="/rdx/rdxi3.png"
              className={styles.absoluteImg2s2}
              alt="Decoration 2"
            />
          </div>

          <img
            src="/rdx/rdxi1.png"
            className={styles.mainImages2}
            alt="Main Image"
          />
        </div>
      </section>

      {/* From Here The Section 3 Is Starting  */}
      <section className={styles.section3}>
        {/* Absolute  */}
        <img
          src="/rdx/s2/esxe1.png"
          className={styles.absoluteImg1}
          alt="Background decoration 1"
        />

        <img
          src="/rdx/s2/rdxe2.png"
          className={styles.absoluteImg2}
          alt="Background decoration 2"
        />

        {/* Centered Align Div  */}
        <div className={styles.centeredDiv}>
          {/* Top 1  */}
          <div className={styles.top1}>
            <p className={styles.top1Text}>About</p>
          </div>

          {/* Top 2  */}
          <div className={styles.top2}>
            <h2 className={styles.top2Heading}>
              Why Digital Marketing, Why Now (Industry Trends)
            </h2>
          </div>

          {/* Grid Cards Container  */}
          <div className={styles.gridContainer}>
            {/* Card1  */}
            <div className={styles.card}>
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn1.png"
                className={styles.cardIcon}
                alt="India growth market icon"
              />
              <h2 className={styles.cardHeading}>
                India is the world growth market online
              </h2>
              <p className={styles.cardText}>
                Exploding mobile usage, vernacular adoption, and video first
                behaviour mean brands need skilled marketers more than ever.
              </p>
            </div>

            <div className={styles.card}>
            
              <img
                src="/rdx/s2/rdxicn2.png"
                className={styles.cardIcon}
                alt="Performance promises icon"
              />
              <h2 className={styles.cardHeading}>Performance promises</h2>
              <p className={styles.cardText}>
                budgets follow outcomes. If you can plan, run, and scale
                campaigns, you will never be bench.
              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn3.png"
                className={styles.cardIcon}
                alt="AI copilot icon"
              />
              <h2 className={styles.cardHeading}>
                AI is a copilot, not a replacement
              </h2>
              <p className={styles.cardText}>
                the pros who pair human insight with AI tools out-ship everyone
                else.
              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn4.png"
                className={styles.cardIcon}
                alt="First-party data icon"
              />
              <h2 className={styles.cardHeading}>First-party data & privacy</h2>
              <p className={styles.cardText}>
                smart tagging, consent, and CRM fluency are now core skills, not
                nice to haves.
              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn5.png"
                className={styles.cardIcon}
                alt="Creator economy icon"
              />
              <h2 className={styles.cardHeading}>
                Creator economy meets commerce
              </h2>
              <p className={styles.cardText}>
                social + search + influencers + landing pages = measurable
                revenue.
              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn6.png"
                className={styles.cardIcon}
                alt="Real skills icon"
              />
              <h2 className={styles.cardHeading}>
                Real skills beat certificates
              </h2>
              <p className={styles.cardText}>
                portfolios with live results move resumes to the top of the
                pile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 4 Is Starting  */}
      <section className={styles.section4}>
        {/* Centered Align Div  */}
        <div className={styles.centeredContainer}>
          {/* Left Side Container  */}
          <div className={styles.leftSide}>
            <img
              src="/rdx/s4/rdxs4.png"
              className={styles.leftImage}
              alt="Career pathways illustration"
            />
          </div>

          {/* Right Side Container  */}
          <div className={styles.rightSide}>
            <div className={styles.infoHeader}>
              <p className={styles.infoText}>Info</p>
            </div>
            <div className={styles.headingContainer}>
              <h2 className={styles.sectionHeading}>
                Career Pathways You Can Step Into
              </h2>
            </div>
            <ul className={styles.careerList}>
              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Performance Marketing Specialist (Meta/Google)
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    SEO Strategist / Technical SEO
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Social Media & Content Strategist (IG/YouTube/LinkedIn)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Marketing Analyst (GA4, Looker/Data Studio)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Marketing Automation & CRM (HubSpot/Zoho/WhatsApp)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Conversion Rate Optimization (CRO) & Landing Page Specialist
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    E-commerce Performance Marketer (D2C & Marketplaces)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Media Planner / Digital Strategist
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    Influencer & Partnerships Manager
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    className={styles.verifyIcon}
                    alt="Verified"
                  />
                  <p className={styles.careerText}>
                    AI-for-Marketing Specialist (creative ops, testing, prompts)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* From Here The Section 5 Is Starting  */}
      <section className={styles.s5}>
        {/* Left Side Girl Image Png  */}
        <div className={styles.leftImage}>
          <img
            src="/rdx/s5/grlImgPng.png"
            alt="RDX"
            className={styles.girlImage}
          />
        </div>

        {/* Right Side Actual Content Div  */}
        <div className={styles.rightContent}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.heading2}>
              The Course We Offer: Digital Marketing Mastery
            </h2>
            <p className={styles.paragraph}>
              A practitioner-led program designed by an agency that ships
              campaigns daily. Each module ends with a hands-on project;
              everything rolls into a final Capstone you can show in interviews.
            </p>
            <div className={styles.listContainer}>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <p>
                    <b> 12 Weeks :</b> 2–3 sessions/week · Live + recorded
                    access
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Tool labs:</b> Google Ads, Meta Ads, GA4, GTM, Looker
                    Studio, Search Console, ChatGPT & AI tools, HubSpot/Zoho
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Live briefs :</b> from the RMW ecosystem (when available)
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Career sprint :</b> resume clinic, portfolio reviews,
                    mock interviews
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Language:</b> English (with Hinglish comfort where
                    helpful)
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Batch size :</b> Small, so you get real feedback
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 6 Is Starting  */}
      <section className={styles.s6}>
        {/* Centered Align Div  */}
        <div className={styles.s6centeredDiv}>
          {/* Top Header Div  */}
          <div className={styles.topHeader}>
            <div className={styles.headerBorder}>
              <p className={styles.aboutText}>About</p>
              <h1 className={styles.mainHeading}>Why RDX Works</h1>
            </div>
          </div>

          {/* Main Container  */}
          <div className={styles.mainContainer}>
            {/* Left Side Div  */}
            <div className={styles.leftSide6}>
              {/* Cards  */}
              <div className={styles.s6card}>
                <h2 className={styles.cardTitle}>Agency DNA</h2>
                <p className={styles.cardDescription}>
                  Agency DNA: Built by Ritz Media World; we practice what we
                  teach.
                </p>
              </div>

              <div className={styles.s6card}>
                <h2 className={styles.cardTitle}>Tool-first, fluff-free</h2>
                <p className={styles.cardDescription}>
                  You will touch the dashboards every week.
                </p>
              </div>

              <div className={styles.s6card}>
                <h2 className={styles.cardTitle}>Portfolio over PowerPoint</h2>
                <p className={styles.cardDescription}>Proof beats theory.</p>
              </div>

              <div className={styles.s6card}>
                <h2 className={styles.cardTitle}>Career support</h2>
                <p className={styles.cardDescription}>
                  Mock interviews, referrals when relevant, and access to the
                  RDX Talent Pool.
                </p>
              </div>

              <div className={styles.s6card}>
                <h2 className={styles.cardTitle}>Approachable mentors</h2>
                <p className={styles.cardDescription}>
                  Clear feedback, office hours, real talk.
                </p>
              </div>
            </div>

            {/* Right Side Div  */}
            <div className={styles.rightSide6}>
              <div className={styles.imageContainer}>
                {/* Image Container  */}
                <div className={styles.mainImageWrapper}>
                  <img
                    src="/rdx/s6/rdxs6.png"
                    className={styles.mainImage}
                    alt=""
                  />
                </div>

                {/* Absolute Position Image  */}
                <img
                  src="/rdx/s6/rdxs62.png"
                  className={styles.absoluteImage}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 7 Is Starting  */}
      <section className={styles.s7}>
        <div className={styles.s7Centered}>
          <div className={styles.s7Border}>
            <p className={styles.s7About}>About</p>
          </div>
          <h2 className={styles.s7Heading}>What You will Learn</h2>

          {/* Slider Container */}
          <div className={styles.s7Slider} style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.6s ease-in-out",
                transform: `translateX(${translateX}px)`,
                gap: `${gap}px`,
              }}
            >
              {cards.map((card, idx) => (
                <div className={styles.s7Card} key={idx}>
                  <img
                    src={card.img}
                    className={styles.s7CardImage}
                    alt={card.title}
                  />
                  <div className={styles.s7CardContent}>
                    <h2 className={styles.s7CardTitle}>{card.title}</h2>
                    <p className={styles.s7CardDesc}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.s7Buttons}>
            <div className={styles.s7ButtonGroup}>
              <button className={styles.s7Button} onClick={handlePrev}>
                {/* Left Arrow */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path
                    d="M0.439339 10.9393C-0.146448 11.5251 -0.146448 12.4749 0.439339 13.0607L9.98528 22.6066C10.5711 23.1924 11.5208 23.1924 12.1066 22.6066C12.6924 22.0208 12.6924 21.0711 12.1066 20.4853L3.62132 12L12.1066 3.51472C12.6924 2.92893 12.6924 1.97919 12.1066 1.3934C11.5208 0.807611 10.5711 0.807611 9.98528 1.3934L0.439339 10.9393ZM31.5 12V10.5L1.5 10.5V12V13.5L31.5 13.5V12Z"
                    fill="#323232"
                  />
                </svg>
              </button>

              <button
                className={`${styles.s7Button} ${styles.s7ButtonNext}`}
                onClick={handleNext}
              >
                {/* Right Arrow */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path
                    d="M31.5607 10.9393C32.1464 11.5251 32.1464 12.4749 31.5607 13.0607L22.0147 22.6066C21.4289 23.1924 20.4792 23.1924 19.8934 22.6066C19.3076 22.0208 19.3076 21.0711 19.8934 20.4853L28.3787 12L19.8934 3.51472C19.3076 2.92893 19.3076 1.97919 19.8934 1.3934C20.4792 0.807611 21.4289 0.807611 22.0147 1.3934L31.5607 10.9393ZM0.5 12L0.5 10.5L30.5 10.5V12V13.5L0.5 13.5L0.5 12Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 8 Is Starting  */}
      <section className={styles.s8}>
        <div className={styles.s8Centered}>
          {/* Top Header Div */}
          <div className={styles.s8Header}>
            <h2 className={styles.s8Title}>What Learners Say</h2>
            <p className={styles.s8Subtitle}>
              Real success stories from professionals who transformed their
              careers with our performance marketing program.
            </p>
          </div>

          {/* Bottom Slider Div */}
          <div className={styles.s8Bottom}>
            {/* Slider */}
            <div className={styles.s8Slider}>
              {/* Visible Cards */}
              {s8Slides
                .slice(s8Current, s8Current + s8CardsPerView)
                .map((slide, index) => (
                  <div key={index} className={styles.s8Card}>
                    <img
                      src="/rdx/s8/tabler_quote.png"
                      alt="quote"
                      className={styles.s8Quote}
                    />
                    <p className={styles.s8CardText}>{slide.text}</p>
                    <p className={styles.s8CardAuthor}>
                      {slide.author}
                      <span className={styles.s8CardRole}>{slide.role}</span>
                    </p>
                  </div>
                ))}
            </div>

            {/* Buttons and Pagination Container */}
            <div className={styles.s8Controls}>
              {/* Navigation Buttons */}
              <div className={styles.s8ButtonContainer}>
                <button className={styles.s8Btn} onClick={s8PrevSlide}>
                  ◀
                </button>
                <button className={styles.s8Btn} onClick={s8NextSlide}>
                  ▶
                </button>
              </div>

              {/* Pagination Dots */}
              <div className={styles.s8Pagination}>
                {Array.from({ length: s8TotalPages }).map((_, index) => (
                  <p
                    key={index}
                    className={`${styles.s8Dot} ${
                      s8CurrentPage === index
                        ? styles.s8DotActive
                        : styles.s8DotInactive
                    }`}
                    onClick={() => setS8Current(index * s8CardsPerView)}
                  ></p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 9 Is Starting  */}
      <section className={styles.s9}>
        <div className={styles.s9Centered}>
          {/* Slider */}
          <div className={styles.s9Slider}>
            {/* Visible Cards */}
            {slides
              .slice(current, current + cardsPerView)
              .map((slide, index) => (
                <div key={index} className={styles.s9Card}>
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className={styles.s9CardImage}
                  />
                  <h2 className={styles.s9CardTitle}>{slide.title}</h2>
                </div>
              ))}
            {/* Left Button */}
            <button
              className={styles.s9Btn}
              onClick={prevSlide}
              disabled={current === 0} // Disable when at start
            >
              ◀
            </button>
            {/* Right Button */}
            <button
              className={styles.s9Btn}
              onClick={nextSlide}
              disabled={current + cardsPerView >= slides.length} // Disable when at end
            >
              ▶
            </button>
          </div>

          {/* Pagination Dots */}
          <div className={styles.s9Pagination}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                key={index}
                className={`${styles.s9Dot} ${
                  currentPage === index ? styles.activeDot : ""
                }`}
                onClick={() => setCurrent(index * cardsPerView)}
              ></p>
            ))}
          </div>
        </div>
      </section>

      {/* From Here The Section 10 Is Starting  */}
      <section className={styles.s10}>
        {/* Absolute Position Elips  */}
        <img
          src="/rdx/s10/s10_elips.png"
          alt="rmw"
          className={styles.s10Elips}
        />

        {/* Centered Align Div  */}
        <div className={styles.s10Centered}>
          {/* Top Header Div  */}
          <div className={styles.s10Header}>
            <h2 className={styles.s10Title}>Frequently Asked Question</h2>
            <p className={styles.s10Subtitle}>
              Real success stories from professionals who transformed their
              careers with our performance marketing program.
            </p>
          </div>

          {/* Center Align Div  */}
          <div className={styles.s10Center}>
            {/* Cards  */}
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
            <div className={styles.s10Card}>
              <p className={styles.s10CardText}>Do I need prior experience?</p>
              <img
                src="/rdx/s10/icons8_plus.png"
                alt="plus"
                className={styles.s10CardIcon}
              />
            </div>
          </div>

          {/* Bottom Align Div  */}
          <div className={styles.s10Bottom}>
            {/* Left Side Div  */}
            <div className={styles.s10Left}>
              {/* Elips */}
              <img
                src="/rdx/s10/s-11-elps.png"
                alt="elips"
                className={styles.s10ElipsSmallTop}
              />
              <img
                src="/rdx/s10/s-12-elps.png"
                alt="elips"
                className={styles.s10ElipsSmallBottom}
              />
              <div className={styles.s10LeftContent}>
                <h2 className={styles.s10LeftTitle}>
                  Fees, Scholarships & EMIs
                </h2>
                <p className={styles.s10LeftText}>
                  Transparent fees. Early-bird and women-in-tech scholarships
                  are available for select seats. EMI options on request.
                </p>
                <p className={styles.s10LeftText}>
                  Ask our team for the current cohort pricing.
                </p>
                <button className={styles.s10Button}>
                  Request a Scholarship
                </button>
              </div>
            </div>

            {/* Right Side Div  */}
            <div className={styles.s10Right}>
              <img
                src="/rdx/s10/s10Img.png"
                alt="RDX"
                className={styles.s10RightImage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
