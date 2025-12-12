"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

interface PageLink {
  link: string;
  name: string;
  sub: {
    link: string;
    name: string;
  }[];
}


export default function Page() {
  const [pagesLinks, setPagesLinks] = useState<PageLink[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const getAllPagesLinks = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get("/api/header_data");
      setPagesLinks(data);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status:
            error instanceof Error && "status" in error
              ? (error as { status?: number }).status ?? 500
              : 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  const router = useRouter();

  // Get Backup Of All Content  :::
  const getBackup = async ()=>{
    try {
      
    } catch (error) {
      console.error("Internal Server Error : ", error)
    }
  }




  useEffect(() => {
    getAllPagesLinks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
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

      <div className={styles.pagesWrapper}>
        {pagesLinks.map((page, idx) => (
          <div key={idx} className={styles.pageCard}>
            <h3 className={styles.pageTitle}>{page.name}</h3>
            <div className={styles.subLinks}>
              {page.sub.map((sub, subIdx) => (
                <button
                  key={subIdx}
                  className={`${styles.subLinkBtn} `}
                  onClick={() => {
                    const createdLink = sub.link.split("/").join("=");
                    router.push(`/admin/content/${createdLink}`);
                  }}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
