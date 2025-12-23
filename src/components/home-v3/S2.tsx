"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import CanvasTransition from "./CanvasTransition";
interface CardItem {
  act: boolean;
  id: string;
  ttl: string;
  img: string;
  para: string;
}
function S2() {
  const [activeCard, setActiveCard] = useState<CardItem>({
    act: true,
    id: "01",
    ttl: "Digital Marketing",
    img: "/home-v3/s2/v2s2i2.png",
    para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
  });

  const [prevImage, setPrevImage] = useState<string>("/home-v3/s2/v2s2i2.png");
  const [nextImage, setNextImage] = useState<string>("/home-v3/s2/v2s2i2.png");
  const [showTransition, setShowTransition] = useState(false);
  const [displayImage, setDisplayImage] = useState<string>("/home-v3/s2/v2s2i2.png");
  const pendingCardRef = useRef<CardItem | null>(null);
  const imagePreloadRef = useRef<HTMLImageElement | null>(null);
  const stateChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardHover = (ob: CardItem) => {
    if (ob.img !== activeCard.img && !showTransition) {
      setPrevImage(activeCard.img);
      setNextImage(ob.img);
      setDisplayImage(activeCard.img); // Keep showing old image during transition
      pendingCardRef.current = ob;

      // Clear any existing timeout
      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
      }

      // Preload the new image first
      const img = document.createElement("img");
      img.onload = () => {
        // Image is loaded, start transition (keep old image visible underneath)
        setShowTransition(true);
        
        // Calculate total animation time:
        // - Setup delay: 200ms
        // - Petal animation duration: 800ms
        // - Max petal delay: ~1.9s (sin(19*0.1) + 19*0.05)
        // - Total: ~200ms + 800ms + 1900ms = ~2.9 seconds
        // Change state 1 second before completion: 2.9s - 1s = 1.9s
        const totalAnimationTime = 2900; // milliseconds
        const stateChangeTime = totalAnimationTime - 1500; // 1 second before completion
        
        // Update state 1 second before animation completes
        stateChangeTimeoutRef.current = setTimeout(() => {
          if (pendingCardRef.current) {
            const newCard = { ...pendingCardRef.current };
            
            // Update display image to new image
            setDisplayImage(newCard.img);
            
            // Update active card state
            setActiveCard((prev) => {
              prev.act = false;
              newCard.act = true;
              return newCard;
            });
          }
        }, stateChangeTime);
      };
      img.onerror = () => {
        // Even if image fails to load, start transition
        setShowTransition(true);
        
        // Same timing calculation
        const totalAnimationTime = 2900;
        const stateChangeTime = totalAnimationTime - 1500;
        
        stateChangeTimeoutRef.current = setTimeout(() => {
          if (pendingCardRef.current) {
            const newCard = { ...pendingCardRef.current };
            setDisplayImage(newCard.img);
            setActiveCard((prev) => {
              prev.act = false;
              newCard.act = true;
              return newCard;
            });
          }
        }, stateChangeTime);
      };
      img.src = ob.img;
      imagePreloadRef.current = img;
    }
  };

  const handleTransitionComplete = () => {
    // Clear the state change timeout if it hasn't fired yet
    if (stateChangeTimeoutRef.current) {
      clearTimeout(stateChangeTimeoutRef.current);
      stateChangeTimeoutRef.current = null;
    }

    // Final cleanup after transition fully completes
    if (pendingCardRef.current) {
      const newCard = { ...pendingCardRef.current };
      
      // Ensure display image is updated (in case timeout didn't fire)
      setDisplayImage(newCard.img);
      
      // Ensure active card is updated (in case timeout didn't fire)
      setActiveCard((prev) => {
        prev.act = false;
        newCard.act = true;
        return newCard;
      });
      
      pendingCardRef.current = null;
      
      // Hide transition overlay after image is updated
      setShowTransition(false);
    }
  };
  
  return (
    <section className="bg-white w-full flex flex-col items-center justify-center min-h-screen py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-0">
      {/* Centered Align Main Container  */}
      <div className="w-full sm:w-[95%] lg:w-[90%] flex flex-col gap-8 sm:gap-9 lg:gap-10">
        {/* Row 1  */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
          {/* Col 1  */}
          <div className="w-full lg:max-w-[422px] flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <p className="font-[700] text-[22px] sm:text-[26px] lg:text-[30px]" style={{
              fontFamily: 'MontserratBold',
            }}>
              What can you expect from the It's a potent question with a
              surprisingly simple answer.
            </p>
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              You can expect a dose of obsession with creative storytelling with
              a strong hint of consistency.
              <b style={{
                fontFamily: 'OpenSansBold',
              }}> Best advertising agency in NOIDA?</b> That's what{" "}
              <b className="text-[#C99237]" style={{
                fontFamily: 'OpenSansBold',
              }}>Ritz Media World</b>  is all about.
            </p>
            <button className="w-full sm:w-[200px] lg:w-[219px] h-[48px] sm:h-[50px] lg:h-[54px] border-[1px] border-[#C99237] rounded-[5px] font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] hover:bg-[#C99237] hover:text-white transition-colors">
              Click to know more
            </button>
          </div>

          {/* Col 2 */}
          <div className="w-full lg:w-[375px] h-[250px] sm:h-[300px] lg:h-[370px] relative mx-auto lg:mx-0">
            <Image src={"/home-v3/s2/s2-i1.png"} alt="rmw" fill className="object-contain"></Image>
          </div>

          {/* Col 3  */}
          <div className="w-full lg:w-[402px] h-[250px] sm:h-[280px] lg:h-[317px]">
            {/* Row 1  */}
            <div className="flex w-full h-[50%] border-b-[1px] border-b-[#AFAFAF]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF] ">
                <p className="font-[700] text-[36px] sm:text-[48px] lg:text-[60px]" style={{
                  fontFamily: 'MontserratBold',
                }}>1M+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Creatives Published</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center ">
                <p className="font-[700] text-[36px] sm:text-[48px] lg:text-[60px]" style={{
                  fontFamily: 'MontserratBold',
                }}>1K+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Campaigns Executed</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full h-[50%]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF]">
                <p className="font-[700] text-[36px] sm:text-[48px] lg:text-[60px]" style={{
                  fontFamily: 'MontserratBold',
                }}>500+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Success Stories</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center">
                <p className="font-[700] text-[36px] sm:text-[48px] lg:text-[60px]" style={{
                  fontFamily: 'MontserratBold',
                }}>1B+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Words Written</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2  */}
        <div className="w-full">
          {/* Row 1  */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20 border-[1px] border-[#E2E2E2] py-6 sm:py-7 lg:py-8 px-4 sm:px-6 lg:px-0">
            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/clock.png" alt="RMW" className="w-[48px] sm:w-[56px] lg:w-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Seamless Global <br /> Time-Zone Alignment
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                Smooth collaboration with near-zero time differences
              </p>
            </div>

            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/board.png" alt="RMW" className="w-[48px] sm:w-[56px] lg:w-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Expert Talent Delivered <br /> at Competitive Prices
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                Premium expertise delivered at the right value
              </p>
            </div>

            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/wave.png" alt="RMW" className="w-[48px] sm:w-[56px] lg:w-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Culture-Driven Values & Clear Communication
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                Smooth, reliable support — always just a call away
              </p>
            </div>
          </div>

          {/* Row 2  */}
          <div className="flex justify-center items-center w-full h-[250px] sm:h-[350px] lg:h-[426px] relative">
            <Image src={"/home-v3/s2/team-bg2.png"} alt="" fill className="object-cover"></Image>

            <div className="flex absolute top-[50%] right-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[54px] lg:h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] z-10">
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
                  fill="black"
                />
              </svg>
            </div>

            {/* Overlay  */}
            <div className="absolute inset-0 bg-[#0000007b] w-full h-full z-0"></div>
          </div>
        </div>

        {/* Row 3  */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Left Side Container  */}
          <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-4 sm:pb-0">
            <p className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]" style={{
              fontFamily: 'MontserratBold',
            }}>Brands That Trust Us</p>

            <p className="absolute top-[50%] transform -translate-y-[50%] -right-3 hidden sm:block">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z"
                  fill="#D9D9D9"
                />
              </svg>
            </p>
          </div>

          {/* Right Side Container  */}
          <div className="flex w-full sm:w-[calc(100%-194px)] overflow-x-hidden">
            {/* Slider Container  */}
            <div className="w-full overflow-hidden">
              <div className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${styles.clientSlider}`}>
                {[
                  "/home-v3/clients/sikka.png",
                  "/home-v3/clients/landmark.png",
                  "/home-v3/clients/master.png",
                  "/home-v3/clients/ace.png",
                  "/home-v3/clients/tdi.png",
                  // duplicate set 1
                  "/home-v3/clients/sikka.png",
                  "/home-v3/clients/landmark.png",
                  "/home-v3/clients/master.png",
                  "/home-v3/clients/ace.png",
                  "/home-v3/clients/tdi.png",
                  // duplicate set 2 for seamless loop
                  "/home-v3/clients/sikka.png",
                  "/home-v3/clients/landmark.png",
                  "/home-v3/clients/master.png",
                  "/home-v3/clients/ace.png",
                  "/home-v3/clients/tdi.png",
                ].map((url, idx) => (
                  <div
                    key={idx}
                    className="w-[100px] h-[56px] sm:w-[120px] sm:h-[67px] lg:w-[146px] lg:h-[81px] relative shrink-0"
                  >
                    <Image src={url} fill alt="RMW" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* View More Container  */}
            <div className="w-[100px] sm:w-[120px] lg:w-[146px] h-[56px] sm:h-[67px] lg:h-[81px] flex justify-center items-center flex-shrink-0">
              <Link
                href={"/"}
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer border-b"
              >
                Show more
              </Link>
            </div>
          </div>
        </div>

        {/* Row 4  */}
        <div className="w-full flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Div 1  */}
          <div className="w-full">
            <h3 className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px]" style={{
              fontFamily: 'MontserratBold',
            }}  >
              Choose Your Brand Journey
            </h3>
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              Tailored growth programmes engineered for the industries and
              audiences most.
            </p>
          </div>

          {/* Div 2  */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
            {/* Left Side Container  */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                {
                  act: true,
                  id: "01",
                  ttl: "Digital Marketing",
                  img: "/home-v3/s2/v2s2i2.png",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "02",
                  ttl: "Creative Service",
                  img: "/blogs/2a8692ff-eefd-94f3-8020-2974bb230a51_700_393.jpg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "03",
                  ttl: "Print Advertisement",
                  img: "/blogs/2a88be34-7ea0-035b-8362-8a99a3023d06_1280_720.jpg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "04",
                  ttl: "Radio Advertisement",
                  img: "/blogs/7e70bd60-2e03-5cdf-12a4-465c84fbdadf_825_319.jpg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "05",
                  ttl: "Content Marketing",
                  img: "/blogs/88ac7d72-e41b-b348-cb5a-6f1f8a78f9a7_1280_720.jpg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "06",
                  ttl: "Web Development",
                  img: "/blogs/713bc1de-9f00-294a-fd52-e58490e8e042_1280_720.jpg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "07",
                  ttl: "Influencer Marketing",
                  img: "/blogs/2639b489-6083-8912-6a05-a7d5e49c1220_2100_1050.png",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
                {
                  act: false,
                  id: "08",
                  ttl: "Celebrity Endorsement",
                  img: "/blogs/a3c2daad-70f4-8775-021d-59aaa762d660_960_640.jpeg",
                  para: " We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
                },
              ].map((ob) => {
                return (
                  <div
                    key={ob.id}
                    onMouseEnter={() => handleCardHover(ob)}
                    className={`relative pl-8 sm:pl-12 lg:pl-16 flex gap-2 sm:gap-3 lg:gap-4 ${
                      ob.ttl === activeCard.ttl ? "text-[#000000]" : "text-[#C5C5C5]"
                    } cursor-pointer transition-colors`}
                  >
                    <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                      fontFamily: 'MontserratRegular',
                    }}>{ob.id}</p>
                    <h2 className="font-[700] text-[20px] sm:text-[24px] lg:text-[30px]">{ob.ttl}</h2>
                  </div>
                );
              })}
            </div>
            {/* Right Side Container  */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full lg:max-w-[602px]">
              <div className="w-full lg:w-[602px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[336px] relative overflow-hidden mx-auto lg:mx-0">
                <Image 
                  src={displayImage} 
                  alt="RMW" 
                  fill 
                  priority
                  className="object-cover"
                  style={{ transition: 'opacity 0.1s' }}
                />
                {showTransition && (
                  <CanvasTransition
                    key={`${prevImage}-${nextImage}`}
                    width={602}
                    height={336}
                    oldImage={prevImage}
                    newImage={nextImage}
                    onComplete={handleTransitionComplete}
                  />
                )}
              </div>
              <p className="font-[400] text-[13px] sm:text-[13.5px] lg:text-[14px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                {activeCard.para}
              </p>
              <button className="w-full sm:w-[240px] lg:max-w-[261px] font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] h-[48px] sm:h-[50px] lg:h-[54px] rounded-[5px] cursor-pointer border-[1px] border-[#C99237] hover:bg-[#C99237] hover:text-white transition-colors">
                Explore {activeCard.ttl}
              </button>
            </div>
          </div>

          {/* Div 3  */}
          <div className="w-full">
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              Not sure which path fits your brand? Let's discuss your unique
              needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S2;
