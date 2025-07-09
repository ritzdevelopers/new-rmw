// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./page.module.css";
// import ServiceThirdHero from "@/allPages/serviceThirdPage/ServiceThirdHero";
// import ServiceThirdQuality from "@/allPages/serviceThirdPage/ServiceThirdQuality";
// import ServiceThirdColorMarque from "@/allPages/serviceThirdPage/ServiceThirdColorMarque";
// import ServiceThirdAward from "@/allPages/serviceThirdPage/ServiceThirdAward";
// import ServiceMainTestimonial from "@/allPages/serviceMainpage/ServiceMainTestimonial";
// import ProjectSwiper from "@/allPages/Homepage/ProjectSwiper";
// import { Form } from "react-hook-form";
// import ServiceThirdSlowMarque from "@/allPages/serviceThirdPage/ServiceThirdSlowMarque";
// import ServiceEndTag from "@/components/endTag/serviceEndTag";
// import Footer from "@/components/footer/Footer";
// import Loader from "@/components/loader/Loader";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
//   meta_title: string;
//   meta_description: string;
//   meta_keywords: string;
//   blog_image: string;
//   description: string;
//   created_at: string;
//   status: string;
// }

// const Page: React.FC = () => {
//   const params = useParams();
//   const { slug } = params as { slug: string };
//   const [singleBlog, setSingleBlog] = useState<Blog | null>(null);

//   const getSingleBlog = async () => {
//     try {
//       const response = await axios.get(`/api/blog/${slug}`);
//       setSingleBlog(response.data.blog);
//     } catch (error) {
//       console.error("Error fetching blog: ", error);
//       alert("Internal Server Error!");
//     }
//   };

//   useEffect(() => {
//     if (slug) getSingleBlog();
//   }, [slug]);

//   // services
//   interface CardData {
//     title: string;
//     description: string;
//     image_url?: string;
//   }
//   const [cardData, setCardData] = useState<CardData[]>([]);
//   const [head, setHead] = useState<string | null>(null);
//   const [endTag, setEndTag] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const { secondPage, thirdPage } = params as {
//     secondPage: string;
//     thirdPage: string;
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`/api/services/${secondPage}/${thirdPage}`);
//         setCardData(res.data.cards);
//         setHead(res.data.s3heading1);
//         setEndTag(res.data.s3endtag);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (secondPage && thirdPage) {
//       fetchData();
//     }
//   }, [secondPage, thirdPage]);

//   if (loading) return <Loader />;

//   if (singleBlog) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.card}>
//           <img
//             src={`/blogs/${singleBlog.blog_image}`}
//             alt={singleBlog.title}
//             className={styles.image}
//           />

//           <div className={styles.content}>
//             <h1 className={styles.title}>{singleBlog.title}</h1>
//             <p className={styles.date}>
//               Published on:
//               {new Date(singleBlog.created_at).toLocaleDateString("en-IN", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//             <div
//               className={styles.description}
//               dangerouslySetInnerHTML={{ __html: singleBlog.description }}
//             />

//             <div className={styles.tags}>
//               {singleBlog.meta_keywords?.split(",").map((keyword, index) => (
//                 <span key={index} className={styles.tag}>
//                   #{keyword.trim()}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <>
//         {head && <ServiceThirdHero heading={head} />}
//         {/* <SwiperHome /> */}
//         <ServiceThirdQuality cardData={cardData} />
//         <ServiceThirdColorMarque />
//         <ServiceThirdAward />
//         <ServiceMainTestimonial />
//         <ProjectSwiper />
//         <Form />
//         <ServiceThirdSlowMarque />
//         <ServiceEndTag endtag={endTag} />
//         <Footer />
//       </>
//     );
//   }
// };

// export default Page;

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/core-css.css";
import "../styles/unit-css.css";
import "../styles/spacing.css";
import "../styles/magnific-popup-css.css";
import "../styles/elementor-css.css";
import "../styles/animation-css.css";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import styles from "./page.module.css";
import ServiceThirdHero from "@/allPages/serviceThirdPage/ServiceThirdHero";
import ServiceThirdQuality from "@/allPages/serviceThirdPage/ServiceThirdQuality";
import ServiceThirdColorMarque from "@/allPages/serviceThirdPage/ServiceThirdColorMarque";
import ServiceThirdAward from "@/allPages/serviceThirdPage/ServiceThirdAward";
import ServiceMainTestimonial from "@/allPages/serviceMainpage/ServiceMainTestimonial";
import ProjectSwiper from "@/allPages/Homepage/ProjectSwiper";
import ServiceThirdSlowMarque from "@/allPages/serviceThirdPage/ServiceThirdSlowMarque";
import ServiceEndTag from "@/components/endTag/serviceEndTag";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";
import Form from "@/allPages/Contactpage/Form";
import Header from "@/components/header/Header";

// Blog interface
interface Blog {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  blog_image: string;
  description: string;
  created_at: string;
  status: string;
}

// Service interface
interface CardData {
  title: string;
  description: string;
  image_url?: string;
}

const Page: React.FC = () => {
  let { slug } = useParams() as { slug: string };

  const [loading, setLoading] = useState(true);

  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [head, setHead] = useState<string | null>(null);
  const [endTag, setEndTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        slug = slug.replace(/\.html$/, "");

        const response = await axios.get(`/api/resolve/${slug}`);

        // console.log("Resolve response : ", response.data);

        if (response.data.type === "blog") {
          setSingleBlog(response.data.blog);
        } else if (response.data.type === "service") {
          const { secondLayer, thirdLayer } = response.data;

          const serviceResponse = await axios.get(
            `/api/services/${secondLayer}/${thirdLayer}`
          );

          setCardData(serviceResponse.data.cards || []);
          setHead(serviceResponse.data.s3heading1 || null);
          setEndTag(serviceResponse.data.s3endtag || null);

          // console.log("services : ", serviceResponse);
        }
      } catch (error) {
        console.error("Error resolving content: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  useEffect(() => {
    if (metaRef.current && activeMeta !== null) {
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeMeta]);

  if (loading) return <Loader />;

  // ✅ Render Blog if found
  if (singleBlog) {
    return (
      <>
        <Header />
        <div className="mt-100"></div>
        <div className={styles.container}>
          <div className={styles.card}>
            <img
              src={`/blogs/${singleBlog.blog_image}`}
              alt={singleBlog.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <h1 className={styles.title}>{singleBlog.title}</h1>
              <p className={styles.date}>
                Published on:{" "}
                {new Date(singleBlog.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: singleBlog.description }}
              />
              <div className={styles.tags}>
                {singleBlog.meta_keywords?.split(",").map((keyword, index) => (
                  <span key={index} className={styles.tag}>
                    #{keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Else render service_third content
  return (
    <>
      <Header />
      {head && <ServiceThirdHero heading={head} />}
      <ServiceThirdQuality cardData={cardData} />
      <ServiceThirdColorMarque />
      <ServiceThirdAward />
      <ServiceMainTestimonial />
      <ProjectSwiper />
      <Form />
      <ServiceThirdSlowMarque />
      <ServiceEndTag endtag={endTag} />
      <Footer />
    </>
  );
};

export default Page;
