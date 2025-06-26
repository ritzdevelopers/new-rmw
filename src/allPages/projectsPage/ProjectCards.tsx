"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Card.module.css";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
type Card = {
  id: string;
  blog_image: string;
  title: string;
  slug: string; // or just string if there are more statuses
};
const ProjectCards = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/case_studies");
        setCardData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCards = cardData.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <p className="text-white text-lg">
            <Loader />
          </p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
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
                    <img
                      src={`/blogs/${card.blog_image}`}
                      style={{ height: "200px", objectFit: "fill" }}
                      className={`card-img-top ${styles.image}`}
                      alt={card.title}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{card.title}</h5>
                    <Link
                      href={card.slug}
                      className={`bg-[#6ea2ee] ${styles.button}`}
                    >
                      Case Studies <span className={styles.arrow}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                color: "#000",
                background: "var(--tp-primary-blue)",
                padding: "10px 20px",
                // border: "2px solid #000",
                borderRadius: "30px",
                fontWeight: "bold",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                transition: "all 0.3s ease-in-out",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              }}
              className="mx-2"
            >
              ⬅ Prev
            </button>

            <span
              style={{
                fontSize: "16px",
                padding: "5px 15px",
                color: "#0c0c0c",
                borderRadius: "20px",
              }}
            >
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                color: "#000",
                background: "var(--tp-primary-blue)",
                padding: "10px 20px",
                // border: "2px solid #000",
                borderRadius: "30px",
                fontWeight: "bold",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                transition: "all 0.3s ease-in-out",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              }}
              className="mx-2"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCards;
