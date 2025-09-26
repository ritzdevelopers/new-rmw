"use client";
import React from "react";

function page() {
  return (
    <main>
      {/* From Here The Section 1 Is Starting  */}
      <section
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* This Is Row 1  */}
        <div
          style={{
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/RITZ DIGITAL XPERTS ACADEMY.png"
            style={{
              width: "700px",
            }}
            alt=""
          />
          <p
            style={{
              fontSize: "50px",
              lineHeight: "70px",
              textAlign: "center",
              textTransform: "capitalize",
              width: "90%",
            }}
          >
            Learn{" "}
            <span style={{ fontWeight: 600, color: "#8A5A0D" }}>
              Digital Marketing the agency
            </span>{" "}
            way. <b>Build skills that hiring managers</b> actually want.
          </p>
        </div>

        {/* This Is Row 2  */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Side  */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div
              style={{
                width: "112px",
                height: "112px",
                backgroundColor: "#8B4D09",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <button
              style={{
                width: "222px",
                height: "64px",
                fontWeight: 500,
                fontSize: "18px",
                color: "#CF983E",
                backgroundColor: "black",
                textTransform: "uppercase",
              }}
            >
              Talk to an Advisor
            </button>
          </div>

          {/* Right Side  */}
          <div
            style={{
              width: "575px",
            }}
          >
            <p
              style={{
                fontWeight: 400,
                color: "#8A5A0D",
                fontSize: "20px",
              }}
            >
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
      <section
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "1023px",
            height: "594px",
            position: "relative",
          }}
        >
          {/* Absolute Position Div 1  */}
          <div style={{ position: "absolute", right: "20px", top: "40px" }}>
            <img
              src="/rdx/rdxi2.png"
              style={{
                width: "132px",
                height: "132px",
              }}
              alt=""
            />
          </div>

          {/* Absolute Position Div 2  */}
          <div style={{ position: "absolute", left: "-40px", top: "300px" }}>
            <img
              src="/rdx/rdxi3.png"
              style={{
                width: "210px",
                height: "210px",
              }}
              alt=""
            />
          </div>

          <img
            src="/rdx/rdxi1.png"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
            alt=""
          />
        </div>
      </section>

      {/* From Here The Section 3 Is Starting  */}
      <section
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Absolute  */}
        <img
          src="/rdx/s2/esxe1.png"
          style={{
            position: "absolute",
            left: "0px",
            top: "180px",
            zIndex: "-0",
          }}
          alt=""
        />

        <img
          src="/rdx/s2/rdxe2.png"
          style={{
            position: "absolute",
            right: "0px",
            bottom: "0px",
            zIndex: "-0",
          }}
          alt=""
        />

        {/* Centered Align Div  */}
        <div
          style={{
            width: "1243px",
            height: "1126px",
            display: "flex",
            flexDirection: "column",
            zIndex: "50",
            backgroundColor: "white",
          }}
        >
          {/* Top 1  */}
          <div
            style={{
              width: "100%",
              borderBottom: "2px solid #00000099",
            }}
          >
            <p
              style={{
                fontWeight: 400,
                fontSize: "24px",
                color: "#00000099",
              }}
            >
              About
            </p>
          </div>

          {/* Top 2  */}
          <div
            style={{
              width: "691px",
              marginTop: "40px",
            }}
          >
            <h2
              style={{
                fontWeight: 600,
                fontSize: "48px",
              }}
            >
              Why Digital Marketing, Why Now (Industry Trends)
            </h2>
          </div>

          {/* Grid Cards Container  */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "40px",
            }}
          >
            {/* Card1  */}
            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn1.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                India is the world’s growth market online{" "}
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                Exploding mobile usage, vernacular adoption, and video-first
                behaviour mean brands need skilled marketers more than ever.
              </p>
            </div>

            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn2.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                Performance promises
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                budgets follow outcomes. If you can plan, run, and scale
                campaigns, you’ll never be “bench.”
              </p>
            </div>

            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn3.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                AI is a copilot, not a replacement
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                the pros who pair human insight with AI tools out-ship everyone
                else.
              </p>
            </div>

            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn4.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                First-party data & privacy
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                smart tagging, consent, and CRM fluency are now core skills, not
                “nice to haves.”
              </p>
            </div>

            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn5.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                Creator economy meets commerce
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                social + search + influencers + landing pages = measurable
                revenue.
              </p>
            </div>

            <div
              style={{
                width: "400px",
                height: "424px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 6px #0000001A",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                padding: "35px",
                textAlign: "center",
                gap: "20px",
              }}
            >
              {/* Icon Img  */}
              <img
                src="/rdx/s2/rdxicn6.png"
                style={{
                  width: "92px",
                  height: "92px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                Real skills beat certificates
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#00000099",
                }}
              >
                portfolios with live results move resumes to the top of the
                pile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 4 Is Starting  */}
      <section
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          paddingTop: "50px",
          marginBottom: "50px",
        }}
      >
        {/* Centered Align Div  */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Side Container  */}
          <div>
            <img
              src="/rdx/s4/rdxs4.png"
              style={{
                width: "558px",
              }}
              alt=""
            />
          </div>

          {/* Right Side Container  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              width: "761px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderBottom: "3px solid #00000099",
              }}
            >
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#00000099",
                }}
              >
                Info
              </p>
            </div>
            <div
              style={{
                width: "691px",
              }}
            >
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "48px",
                  color: "black",
                }}
              >
                Career Pathways You Can Step Into
              </h2>
            </div>
            <ul style={{
              listStyle:'none'
            }}>
              <li>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <img
                    src="/rdx/s4/rdxveriify.png"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    alt=""
                  />
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "22px",
                    }}
                  >
                    Performance Marketing Specialist (Meta/Google)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
