"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import styles from "./page.module.css";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteWarningModal from "@/components/DeleteWarningModal/DeleteWarningModal";

interface PageLink {
  link: string;
  name: string;
  sub: {
    link: string;
    name: string;
  }[];
}

interface CardItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

interface PAGECARD {
  s3heading1: string;
  s3para: string;
  cards: CardItem[];
}

export default function Page() {
  const [pagesLinks, setPagesLinks] = useState<PageLink[]>([]);
  const [selectedSubLink, setSelectedSubLink] = useState<string | null>(null);
  const [cardsData, setCardsData] = useState<PAGECARD | null>(null);

  const getAllPagesLinks = async () => {
    try {
      const { data } = await axios.get("/api/header_data");
      setPagesLinks(data);
    } catch (error) {
      console.error("Error in fetching page links: ", error);
    }
  };

  const getCardsData = async (subLink: string) => {
    try {
      const { data } = await axios.get(`/api/${subLink}`);
      setCardsData(data);
      setSelectedSubLink(subLink);
    } catch (error) {
      console.error("Error in fetching cards data: ", error);
    }
  };

  const handleBack = () => {
    setSelectedSubLink(null);
    setCardsData(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const { status } = await axios.delete(
        `/api/sql-single-page-card/delete/${id}`
      );
      if (status === 200) {
        alert("Page Card Deleted Successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.log(
        "There are some errors in handle delete controller plz fix the bug first ",
        error
      );
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/admin/content/edit/${id}`);
  };

  useEffect(() => {
    getAllPagesLinks();
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.adminContainer}>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h1 className={styles.heading}>Admin Panel - Page Manager</h1>
        <button
          onClick={() => router.push("/admin/content/add")}
          className={styles.addMoreBtn}
        >
          <Plus size={18} />
          <span>Add More</span>
        </button>
      </div>

      {!selectedSubLink && (
        <div className={styles.pagesWrapper}>
          {pagesLinks.map((page, idx) => (
            <div key={idx} className={styles.pageCard}>
              <h3 className={styles.pageTitle}>{page.name}</h3>
              <div className={styles.subLinks}>
                {page.sub.map((sub, subIdx) => (
                  <button
                    key={subIdx}
                    className={`${styles.subLinkBtn} ${
                      selectedSubLink === sub.link ? styles.active : ""
                    }`}
                    onClick={() => getCardsData(sub.link)}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {cardsData && (
        <div className={styles.cardsSection}>
          <button className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <h2 className={styles.cardsHeading}>
            {cardsData.s3heading1 || "Cards"}
          </h2>

          {/* List Format */}
          <div className={styles.cardsList}>
            {cardsData.cards.map((card, idx) => (
              <div key={idx} className={styles.cardListItem}>
                <DeleteWarningModal
                  isOpen={showModal}
                  onCancel={() => setShowModal(false)}
                  onConfirm={() => handleDelete(card.id)}
                />
                <div className={styles.cardImageWrapper}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/${card.image_url}`}
                    alt={card.title}
                    className={styles.cardListImage}
                  />
                </div>
                <div className={styles.cardListContent}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className={styles.cardListActions}>
                  <button onClick={() => handleEdit(card.id)} title="Edit">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    // onClick={() => handleDelete(card.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} color="red" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
