"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import {
  formatScheduledAt,
  isBlogPubliclyVisible,
  resolveAdminPublishLabel,
} from "@/lib/blogPublish";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

import {
  buildMongoCategoryLookup,
  buildMysqlCategoryLookup,
  exportBlogsToExcel,
  mapMongoBlogToExportRow,
  mapMysqlBlogToExportRow,
  type ExportProgress,
  type MongoBlogExportSource,
  type MysqlBlogExportSource,
} from "@/lib/exportBlogsExcel";

function managementAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("rm_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface Blog {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  blogCategory: string;
  categoryName: string;
  createdAt: string | Date;
  blogStatus: boolean;
  blogSlug: string;
  publishStatus?: string;
  scheduledAt?: string | Date;
}

interface SQLBLOGS {
  blog_image: string;
  created_at: string | Date;
  title: string;
  slug: string;
  status: string;
}
interface MERGEDBLOGS {
  title: string;
  blogIMG: string;
  createdAT: string;
  blogID: string;
  blogStatus: string;
  publishLabel: "draft" | "scheduled" | "published" | "inactive";
  scheduledAtLabel?: string;
  canViewPublic: boolean;
  mongoID?: string;
}

type StatusFilter = "all" | "draft" | "scheduled" | "published" | "inactive";

function isMongoBlog(blg: Blog | SQLBLOGS): blg is Blog {
  return "blogTitle" in blg && "blogSlug" in blg;
}

function countByLabel(blogs: MERGEDBLOGS[], label: StatusFilter) {
  if (label === "all") return blogs.length;
  return blogs.filter((blog) => blog.publishLabel === label).length;
}

function publishBadgeStyle(label: MERGEDBLOGS["publishLabel"]) {
  switch (label) {
    case "draft":
      return { background: "rgba(100,116,139,0.12)", color: "#475569" };
    case "scheduled":
      return { background: "rgba(245,158,11,0.12)", color: "#D97706" };
    case "published":
      return { background: "rgba(16,185,129,0.12)", color: "#059669" };
    case "inactive":
      return { background: "rgba(239,68,68,0.12)", color: "#DC2626" };
    default:
      return { background: "rgba(100,116,139,0.12)", color: "#475569" };
  }
}

interface MONGOEXCELBLOG {
  blogBanner: string;
  metaDescription: string;
  metaTitle: string;
  _id: string;
  blogCategoryId: string;
  blogDescription: string;
  blogSlug: string;
  blogStatus: boolean;
  blogTitle: string;
  createdAt: string;
  updatedAt: string;
  metaKeywords: string;
  mtDesc: string;
}

interface MYSQLBLOGS {
  blog_image: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
}

export default function ManageBlogs() {
  // const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [llength, setLastLength] = useState<number>(0);
  // const [sqlBlogs, setSQLBlogs] = useState<SQLBLOGS[]>([]);
  const [mergedBlogs, setMergedBlogs] = useState<MERGEDBLOGS[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchedBl, setSearchedB] = useState("");
  // const [isMongo, setIsMongo] =
  const blogsPerPage = 15;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  // const [blogForSearch, setBlogForSearch] = useState<MERGEDBLOGS[]>([]);

  function mergedALLBLOGS(blog: (Blog | SQLBLOGS)[]): MERGEDBLOGS[] {
    return blog.map((blg) => {
      if (isMongoBlog(blg)) {
        const mongoBLG = blg;
        const publishLabel = resolveAdminPublishLabel({
          publishStatus: mongoBLG.publishStatus,
          scheduledAt: mongoBLG.scheduledAt,
          blogStatus: mongoBLG.blogStatus,
        });
        return {
          title: mongoBLG.blogTitle,
          blogIMG: mongoBLG.blogBanner,
          createdAT: new Date(mongoBLG.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          blogID: mongoBLG.blogSlug,
          blogStatus: mongoBLG.blogStatus === true ? "active" : "inactive",
          publishLabel,
          scheduledAtLabel:
            publishLabel === "scheduled" && mongoBLG.scheduledAt
              ? formatScheduledAt(mongoBLG.scheduledAt)
              : undefined,
          canViewPublic: isBlogPubliclyVisible(mongoBLG),
          mongoID: mongoBLG._id,
        };
      } else {
        const sqlBlog = blg as SQLBLOGS;
        const publishLabel =
          sqlBlog.status === "active" ? "published" : "inactive";
        return {
          title: sqlBlog.title,
          blogIMG: sqlBlog.blog_image,
          createdAT: new Date(sqlBlog.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          blogID: sqlBlog.slug,
          blogStatus: sqlBlog.status,
          publishLabel,
          canViewPublic: sqlBlog.status === "active",
        };
      }
    });
  }

  // useEffect(() => {
  //   setSearchQuery("");
  //   setSelectedCategory("");
  // }, []);
  // const allMergedRef = useRef<MERGEDBLOGS[]>([]);

  const [lftBtn, setLftBtn] = useState(0);
  const [rightBtn, setRightBtn] = useState(9);

  const getFilteredBlogs = () => {
    let list = mergedBlogs;
    if (statusFilter !== "all") {
      list = list.filter((blog) => blog.publishLabel === statusFilter);
    }
    if (searchedBl.trim()) {
      list = list.filter((blog) =>
        blog.title.toLowerCase().includes(searchedBl.toLowerCase())
      );
    }
    return list;
  };

  // Fetch blogs whenever filters or page changes
  const loadBlogs = async (showSuccessPopup = false) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(`/api/ritz_blogs/get-all-blogs`, {
        headers: managementAuthHeaders(),
        params: { _: Date.now() },
      });
      const res2 = await axios.get("/api/all_blogs", {
        params: { _: Date.now() },
      });

      let combined: MERGEDBLOGS[] = [];

      if (data?.allBlogs) {
        combined = [...combined, ...mergedALLBLOGS(data.allBlogs)];
        setTotalBlogs(data.allBlogs.length);
      }

      if (res2?.data) {
        combined = [...combined, ...mergedALLBLOGS(res2.data)];
      }

      setMergedBlogs(combined);
      setLastLength(combined.length);

      if (showSuccessPopup && data?.message) {
        setPopupData({ message: data.message, status });
        setShowPopup(true);
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tab = searchParams.get("status");
    if (
      tab === "draft" ||
      tab === "scheduled" ||
      tab === "published" ||
      tab === "inactive" ||
      tab === "all"
    ) {
      setStatusFilter(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    loadBlogs(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadBlogs(false);
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async () => {
    if (!deleteBlog) return;
    try {
      const { data, status } = await axios.delete("/api/blog/delete_blog", {
        data: { blog__id: deleteBlog._id },
        headers: managementAuthHeaders(),
      });
      // After deletion, refetch current page (or adjust page if last blog deleted)
      const newTotal = totalBlogs - 1;
      const maxPage = Math.ceil(newTotal / blogsPerPage);
      if (currentPage > maxPage) setCurrentPage(maxPage > 0 ? maxPage : 1);
      else setCurrentPage(currentPage);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
    } catch (error) {
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
    setDeleteBlog(null);
  };

  // const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const deleteBlogNow = async () => {
    try {
      if (!deleteKey) {
        alert("Internal Key Error Please Try Again!");
        return;
      } else {
        const { data, status } = await axios.delete(
          `/api/ritz_blogs/delete-blog/${deleteKey}`,
          { headers: managementAuthHeaders() }
        );
        setPopupData({ message: data.message, status });
        setShowPopup(true);
        if (status === 200) {
          window.location.reload();
          setDeleteConfirmModal(false);
        }
      }
    } catch (error) {
      try {
        if (!deleteKey) {
          alert("Internal Key Error Please Try Again!");
          return;
        } else {
          const res = await axios.delete(`/api/delete_blog/${deleteKey}`, {
            headers: managementAuthHeaders(),
          });
          if (res.status === 200) {
            alert("Your Blog Has Been Deleted Successfully!");
            window.location.reload();
            setDeleteConfirmModal(false);
          }
        }
      } catch (error) {
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
        setDeleteConfirmModal(false);
      }
      // console.log("====================================");
      console.log(
        "There are some errors in your delete blog now controller plz fix the bug first ",
        error
      );
      // console.log("====================================");
    }
  };

  const handleDataDeleteModal = (key: string) => {
    setDeleteKey(" ");
    setDeleteConfirmModal(true);
    setDeleteKey(key);
  };

  // Pagination Is Starting From Here
  const [page, setPage] = useState<MERGEDBLOGS[]>([]);
  const [ttPage, setTTPage] = useState(0);

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
    setLftBtn(0);
  }, [statusFilter, searchedBl]);

  useEffect(() => {
    const filtered = getFilteredBlogs();
    let start = lftBtn;
    if (start >= filtered.length) {
      start = 0;
      if (lftBtn !== 0) {
        setLftBtn(0);
      }
    }
    setPage(filtered.slice(start, Math.min(start + 9, filtered.length)));
    setLastLength(filtered.length);
    setTTPage(Math.max(1, Math.ceil(filtered.length / 9)));
  }, [mergedBlogs, statusFilter, searchedBl, lftBtn]);

  const leftPage = () => {
    const filteredLength = getFilteredBlogs().length;
    let newLeft = lftBtn - 9;
    if (newLeft < 0) newLeft = 0;

    let newRight = Math.min(newLeft + 9, filteredLength);
    setActivePage((prev) => (prev > 1 ? prev - 1 : prev));
    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const rightPage = () => {
    const filteredLength = getFilteredBlogs().length;
    let newLeft = lftBtn + 9;
    if (newLeft >= filteredLength) return;

    let newRight = Math.min(newLeft + 9, filteredLength);
    setActivePage((prev) => (prev < Math.ceil(filteredLength / 9) ? prev + 1 : prev));
    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const directPageNavigation = (e: HTMLElement) => {
    const filteredLength = getFilteredBlogs().length;
    const pageNum = Number(e.innerText);
    setActivePage(pageNum);
    let newLeft = (pageNum - 1) * 9;
    let newRight = Math.min(newLeft + 9, filteredLength);
    if (newLeft >= filteredLength) {
      newLeft = 0;
      newRight = Math.min(9, filteredLength);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const getEntriesManually = (e: number) => {
    const val = Number(e);
    setPage(getFilteredBlogs().slice(0, val));
  };

  const handleActiveBtnToggle = async (
    blStatus: string,
    dbSt: string,
    blID: string
  ) => {
    try {
      let res;
      if (dbSt.includes("mongo")) {
        res = await axios.patch("/api/blog-updation", {
          blStatus: blStatus === "active" ? false : true,
          dbSt,
          blID,
        });
      } else {
        res = await axios.patch("/api/blog-updation", {
          blStatus: blStatus === "active" ? "inactive" : "active",
          dbSt,
          blID,
        });
      }
      if (res.status === 200) {
        window.location.reload();
      } else {
        alert("Server Error!");
      }
    } catch (error) {
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

  function stripHTML(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const [backupLoading, setBackupLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState<ExportProgress>({
    phase: "preparing",
    current: 0,
    total: 0,
    percent: 0,
    label: "Starting backup...",
  });

  const rmwBackUpHandler = async () => {
    setBackupLoading(true);
    setBackupProgress({
      phase: "preparing",
      current: 0,
      total: 0,
      percent: 2,
      label: "Fetching blogs...",
    });
    let mongoBlogs: MONGOEXCELBLOG[] | undefined;
    let sqlBlogs: MYSQLBLOGS[] | undefined;

    try {
      const [mysqlCategoryNames, mongoCategoryNames] = await Promise.all([
        buildMysqlCategoryLookup(),
        buildMongoCategoryLookup(),
      ]);

      setBackupProgress((prev) => ({
        ...prev,
        percent: 8,
        label: "Fetching MongoDB blogs...",
      }));

      // Fetch All The MongoDb Blogs ::
      try {
        const { data } = await axios.get<{ allBlogs: MONGOEXCELBLOG[] }>(
          "/api/ritz_blogs/get-all-blogs"
        );
        if (data && data.allBlogs && data.allBlogs.length > 0) {
          mongoBlogs = data.allBlogs.map((ob: MONGOEXCELBLOG) => {
            const plainText = stripHTML(ob.blogDescription);
            return {
              ...ob,
              blogDescription: plainText,
            };
          });
        }
      } catch (error) {
        console.error("Error in fetching MongoDB blogs:", error);
        setPopupData({
          message: "Failed to fetch MongoDB blogs. Continuing with available data...",
          status: 500,
        });
        setShowPopup(true);
      }

      setBackupProgress((prev) => ({
        ...prev,
        percent: 15,
        label: "Fetching MySQL blogs...",
      }));

      // Fetch All The MySQL Blogs ::
      try {
        const { data } = await axios.get<MYSQLBLOGS[]>("/api/all_mysql_blogs");
        if (data && Array.isArray(data) && data.length > 0) {
          sqlBlogs = data.map((ob: MYSQLBLOGS) => {
            const plainText = stripHTML(ob.description);
            return {
              ...ob,
              description: plainText,
            };
          });
        }
      } catch (error) {
        console.error("Error in fetching MySQL blogs:", error);
        setPopupData({
          message: "Failed to fetch MySQL blogs. Continuing with available data...",
          status: 500,
        });
        setShowPopup(true);
      }

      setBackupProgress((prev) => ({
        ...prev,
        percent: 20,
        label: "Preparing export rows...",
      }));

      const exportRows = [
        ...(mongoBlogs || []).map((blog) =>
          mapMongoBlogToExportRow(
            blog as MongoBlogExportSource,
            stripHTML,
            mongoCategoryNames
          )
        ),
        ...(sqlBlogs || []).map((blog) =>
          mapMysqlBlogToExportRow(
            blog as MysqlBlogExportSource,
            stripHTML,
            mysqlCategoryNames
          )
        ),
      ];

      if (exportRows.length === 0) {
        setPopupData({
          message: "No blogs found to backup.",
          status: 404,
        });
        setShowPopup(true);
        setBackupLoading(false);
        return;
      }

      const fileName = `rmw-blogs-backup-${new Date().toISOString().split("T")[0]}.xlsx`;
      await exportBlogsToExcel(exportRows, fileName, setBackupProgress);

      setPopupData({
        message: `Backup completed. ${exportRows.length} blogs exported with images in Excel.`,
        status: 200,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error in backup process:", error);
      setPopupData({
        message:
          error instanceof Error && "message" in error
            ? (error as { message: string }).message
            : "An error occurred during backup process.",
        status:
          error instanceof Error && "status" in error
            ? (error as { status?: number }).status ?? 500
            : 500,
      });
      setShowPopup(true);
    } finally {
      setBackupLoading(false);
      setBackupProgress({
        phase: "done",
        current: 0,
        total: 0,
        percent: 0,
        label: "",
      });
    }
  };
  return (
    <div className="flex flex-col gap-5 min-h-screen">
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      {deleteConfirmModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(11,22,35,0.6)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.currentTarget === e.target) setDeleteConfirmModal(false);
          }}
        >
          <div
            className="relative w-full max-w-[400px] rounded-2xl p-6 text-center"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 24px 80px rgba(11,22,35,0.24)",
            }}
          >
            <div
              className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(239,68,68,0.1)" }}
            >
              <AlertTriangle className="w-7 h-7" style={{ color: "#EF4444" }} />
            </div>
            <h2 className="text-lg font-bold" style={{ color: "#0B1623" }}>
              Delete this blog?
            </h2>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>
              This action cannot be undone. The blog will be permanently removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 h-10 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "#F3F4F6", color: "#374151" }}
                onClick={() => setDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #EF4444, #DC2626)",
                  boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
                }}
                onClick={deleteBlogNow}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0B1623, #1E2D3D)",
              boxShadow: "0 6px 18px rgba(11,22,35,0.18)",
            }}
          >
            <FileText className="w-5 h-5" style={{ color: "#C59D4F" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#0B1623" }}>
              Manage Blogs
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>
              {mergedBlogs.length > 0
                ? `${mergedBlogs.length} total · ${mergedBlogs.filter((b) => b.publishLabel === "draft").length} drafts · ${mergedBlogs.filter((b) => b.publishLabel === "scheduled").length} scheduled`
                : "All blog posts"}
            </p>
          </div>
        </div>
        <button
          onClick={rmwBackUpHandler}
          disabled={backupLoading}
          className="min-w-[200px] px-5 py-2.5 rounded-xl font-semibold text-white disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex flex-col items-center gap-2"
          style={{
            background: backupLoading
              ? "#94A3B8"
              : "linear-gradient(135deg, #0B1623, #1E2D3D)",
            boxShadow: backupLoading ? "none" : "0 6px 18px rgba(11,22,35,0.18)",
          }}
        >
          {backupLoading ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Backup... {backupProgress.percent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: `${backupProgress.percent}%` }}
                />
              </div>
              {backupProgress.label ? (
                <span className="text-xs font-normal text-white/90 text-center leading-tight">
                  {backupProgress.label}
                </span>
              ) : null}
            </>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Get Backup
            </span>
          )}
        </button>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb currentPage="Manage Blogs" middleLinks={[]} />

      {/* Toolbar card */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: "#64748B" }}>
            Show
          </span>
          <select
            onChange={(E) => getEntriesManually(Number(E.target.value))}
            className="rounded-xl px-3 py-2 text-sm font-medium cursor-pointer"
            style={{
              border: "1px solid #E2E8F0",
              background: "#F8FAFC",
              color: "#0B1623",
            }}
          >
            <option value="10">10 entries</option>
            <option value="25">25 entries</option>
            <option value="50">50 entries</option>
            <option value="100">100 entries</option>
            {mergedBlogs.length > 0 && (
              <option value={mergedBlogs && Math.ceil(mergedBlogs.length / 2)}>
                {mergedBlogs && Math.ceil(mergedBlogs.length / 2)} entries
              </option>
            )}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 sm:w-72"
            style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
          >
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#94A3B8" }} />
            <input
              type="text"
              placeholder="Search blogs by title..."
              onChange={(e) => setSearchedB(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              style={{ color: "#0B1623" }}
            />
          </div>
          <Link
            title="Add New Blog"
            href={"/admin/add-blog"}
            className="px-4 py-2 rounded-xl font-semibold text-white cursor-pointer transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #C59D4F, #9A7530)",
              boxShadow: "0 4px 12px rgba(197,157,79,0.25)",
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Blog</span>
          </Link>
        </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["all", "published", "scheduled", "draft", "inactive"] as StatusFilter[]).map(
            (filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition"
                style={
                  statusFilter === filter
                    ? {
                        background: "linear-gradient(135deg, #0B1623, #1E2D3D)",
                        color: "#ffffff",
                      }
                    : {
                        background: "#F8FAFC",
                        color: "#64748B",
                        border: "1px solid #E2E8F0",
                      }
                }
              >
                {filter} ({countByLabel(mergedBlogs, filter)})
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => loadBlogs(false)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#2955B3] border border-[#2955B3]/20 bg-blue-50 hover:bg-blue-100 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <div
          className="rounded-2xl flex flex-col items-center justify-center gap-3 py-20"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#C59D4F", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Loading blogs…
          </p>
        </div>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
          }}
        >
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full admin-blog-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Blog Title</th>
                  <th>Added</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {page.length > 0 &&
                  page.map((blog) => (
                    <tr key={blog.blogID}>
                      <td>
                        <Image
                          src={`${blog.blogIMG.includes("/images")
                            ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH
                            }/api/images${blog.blogIMG.split("/images")[1]}`
                            : `/blogs/${blog.blogIMG}`
                            }`}
                          alt={blog.title}
                          width={120}
                          height={120}
                          className="rounded-md"
                        />
                      </td>
                      <td>{blog.title}</td>
                      <td>
                        <div>{blog.createdAT}</div>
                        {blog.scheduledAtLabel && (
                          <div className="text-xs text-amber-600">
                            Scheduled: {blog.scheduledAtLabel}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="flex flex-col gap-2">
                          <span
                            className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                            style={publishBadgeStyle(blog.publishLabel)}
                          >
                            {blog.publishLabel}
                          </span>
                          <button
                            onClick={() =>
                              blog.blogIMG.includes("/images")
                                ? handleActiveBtnToggle(
                                    blog.blogStatus,
                                    "mongo",
                                    blog.mongoID ? blog.mongoID : blog.blogID
                                  )
                                : handleActiveBtnToggle(
                                    blog.blogStatus,
                                    "mysql",
                                    blog.blogID
                                  )
                            }
                            className="inline-flex w-fit items-center gap-1.5 cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all"
                            style={
                              blog.blogStatus === "active"
                                ? {
                                    background: "rgba(16,185,129,0.12)",
                                    color: "#059669",
                                  }
                                : {
                                    background: "rgba(239,68,68,0.12)",
                                    color: "#DC2626",
                                  }
                            }
                          >
                            {blog.blogStatus}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="admin-blog-actions">
                          {blog.canViewPublic ? (
                            <Link href={`/${blog.blogID}`} title="View Blog">
                              <button className="text-blue-600 cursor-pointer">
                                <FaEye />
                              </button>
                            </Link>
                          ) : (
                            <button
                              className="text-slate-300 cursor-not-allowed"
                              title="Not publicly visible yet"
                              disabled
                            >
                              <FaEye />
                            </button>
                          )}
                          <Link
                            title="Edit Blog"
                            href={
                              blog.mongoID
                                ? `/admin/update/step-1/${blog.mongoID}`
                                : `/admin/update/sqlB/${blog.blogID}`
                            }
                          >
                            <button className="text-green-600 cursor-pointer">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDataDeleteModal(blog.blogID)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {page.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-16">
                <FileText className="w-8 h-8" style={{ color: "#CBD5E1" }} />
                <p className="text-sm font-medium" style={{ color: "#64748B" }}>
                  {statusFilter === "scheduled"
                    ? "No scheduled blogs yet."
                    : statusFilter === "draft"
                      ? "No draft blogs yet."
                      : statusFilter === "published"
                        ? "No published blogs found."
                        : statusFilter === "inactive"
                          ? "No inactive blogs found."
                          : "No blogs found."}
                </p>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {page.map((blog) => (
              <div
                key={blog.blogID}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src={`/blogs/${blog.blogIMG}`}
                  alt={blog.title}
                  width={400}
                  height={200}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <h3
                    className="text-sm font-semibold line-clamp-2"
                    style={{ color: "#0B1623" }}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>
                    {blog.createdAT}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={
                        blog.blogStatus === "active"
                          ? { background: "rgba(16,185,129,0.12)", color: "#059669" }
                          : { background: "rgba(239,68,68,0.12)", color: "#DC2626" }
                      }
                    >
                      {blog.blogStatus}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/${blog.blogID}`} title="View Blog">
                        <button className="text-blue-600">
                          <FaEye size={16} />
                        </button>
                      </Link>
                      <Link
                        title="Edit Blog"
                        href={
                          blog.mongoID
                            ? `/admin/update/step-1/${blog.mongoID}`
                            : `/admin/update/sqlB/${blog.blogID}`
                        }
                      >
                        <button className="text-green-600">
                          <FaEdit size={16} />
                        </button>
                      </Link>
                      <button
                        className="text-red-600"
                        onClick={() =>
                          handleDataDeleteModal(blog.mongoID || blog.blogID)
                        }
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-3 px-5 py-4"
            style={{ borderTop: "1px solid #F1F5F9" }}
          >
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              Page {activePage}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={leftPage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1px solid #E2E8F0",
                  color: "#475569",
                  background: "#ffffff",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <span
                className="px-3.5 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0B1623, #1E2D3D)" }}
              >
                {activePage}
              </span>

              <button
                onClick={rightPage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1px solid #E2E8F0",
                  color: "#475569",
                  background: "#ffffff",
                }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {deleteBlog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[200] p-4"
            style={{ background: "rgba(11,22,35,0.6)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[400px] rounded-2xl p-6 text-center"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 24px 80px rgba(11,22,35,0.24)",
              }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)" }}
              >
                <AlertTriangle className="w-7 h-7" style={{ color: "#EF4444" }} />
              </div>
              <h2 className="text-lg font-bold" style={{ color: "#0B1623" }}>
                Delete this blog?
              </h2>
              <p className="text-sm mt-2" style={{ color: "#64748B" }}>
                Are you sure you want to delete &quot;{deleteBlog.blogTitle}
                &quot;? This cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 h-10 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#F3F4F6", color: "#374151" }}
                  onClick={() => setDeleteBlog(null)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #EF4444, #DC2626)",
                    boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
                  }}
                  onClick={handleDelete}
                >
                  Yes, delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
