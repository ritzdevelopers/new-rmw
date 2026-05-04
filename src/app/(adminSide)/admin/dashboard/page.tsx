"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

function formatRole(role: string): string {
  if (role === "super_admin") return "Super admin";
  if (role === "editor") return "Editor";
  return role.replace(/_/g, " ");
}

const Page = () => {
  const [visitorData, setVisitorData] = useState<{ visitors: number } | null>(
    null
  );
  const [user, setUser] = useState<ManagementSessionUser | null>(null);

  useEffect(() => {
    setUser(readManagementSessionUser());
  }, []);

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
        <Breadcrumb currentPage="Dashboard" />
      </div>

      <div className="dashboard-stat-grid">
        <div className="dashboard-stat-card">
          <div className="visitors-icon">
            <UserCircle className="size-11 text-[#394A59]" strokeWidth={1.25} />
          </div>
          <div className="visitors-info w-full max-w-sm">
            <p className="visitors-label">Signed in</p>
            {user ? (
              <>
                <h2 className="visitors-count !text-2xl md:!text-3xl !mt-3">
                  {user.name}
                </h2>
                <p className="user-session-meta">{user.email}</p>
                <span className="user-session-role-badge">
                  {formatRole(user.role)}
                </span>
              </>
            ) : (
              <p className="user-session-meta mt-3 text-[#6c757d]">
                User details unavailable. Refresh or sign in again.
              </p>
            )}
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="visitors-icon">
            <FaUsers size={40} className="text-[#394A59]" />
          </div>
          <div className="visitors-info">
            <p className="visitors-label">Total visitors on website</p>
            <h2 className="visitors-count">
              {visitorData ? visitorData.visitors : "…"}
            </h2>
          </div>
        </div>
      </div>

      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
