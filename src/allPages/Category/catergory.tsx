"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./category.module.css";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { useParams } from "next/navigation";
import Image from "next/image";

type Card = {
  id?: string;
  blog_image?: string;
  title?: string;
  slug?: string;
  _id: string;
  blogTitle?: string;
  blogBanner?: string;
  blogSlug?: string;
};

const Category = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const category_slug = params?.categorypage as string;
  const itemsPerPage = 6;
  const [isMongo, setIsMongo] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/category/${category_slug}`);
        setCardData(response.data);
        setIsMongo(false);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
        try {
          const res = await axios.get(
            `/api/ritz_blogs/get-categorized-blogs/${category_slug}`
          );
          setCardData(res.data.blogs);
          setIsMongo(true);
        } catch (error) {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category_slug]);

  // const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCards = cardData.slice(startIndex, startIndex + itemsPerPage);

  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  // const handlePrev = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // ✅ Use early return for loading and error
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container my-5">
      {cardData.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No blogs found.</div>
      ) : (
        <>
          <div className="row">
            {selectedCards.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div
                  style={{ height: "100%" }}
                  className={`card bg-white text-black ${styles.card}`}
                >
                  <div className={styles.imageContainer}>
                    {(isMongo && card.blogBanner) ||
                    (!isMongo && card.blog_image) ? (
                      <Image
                        src={
                          isMongo
                            ? `/api/images${
                                card.blogBanner?.split("/images")[1] || ""
                              }`
                            : `/blogs/${card.blog_image}`
                        }
                        alt={card.title || card.blogTitle || "Blog image"}
                        fill
                        className={styles.image}
                        style={{ objectFit: "fill" }}
                        priority={false}
                      />
                    ) : (
                      <div
                        style={{ height: "200px", backgroundColor: "#ccc" }}
                      />
                    )}
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{card.title}</h5>
                    <Link
                    target="_blank"
                      href={`/${isMongo ? card.blogSlug : card.slug}`}
                      className={styles.button}
                    >
                      Read more <span className={styles.arrow}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
