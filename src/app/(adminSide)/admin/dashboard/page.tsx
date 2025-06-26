"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

const Page = () => {
  const [visitorData, setVisitorData] = useState<{ visitors: number } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-visit-data");
        setVisitorData(res.data);
      } catch (err) {
        console.error("Failed to fetch visitors data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Dashboard</h1>
      </header>

      <div className="breadcrumb-placeholder" aria-hidden="true">
        <h5>Home / Dashboard</h5>
      </div>

      <div className="visitors-card">
        <div className="visitors-icon">
          <FaUsers size={40} />
        </div>
        <div className="visitors-info">
          <p className="visitors-label">Total Visitors on Website</p>
          <h2 className="visitors-count">
            {visitorData ? visitorData.visitors : "Loading..."}
          </h2>
        </div>
      </div>

      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
