"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Home, FileText, ChevronDown, Menu, User } from "lucide-react";
import { cn } from "../../lib/utils";
import axios from "axios";
import Link from "next/link";
import LogoutButton from "../logout/Logout";
import Image from "next/image";

type ProfileType = {
  email: string;
  name: string;
  createdAt: string;
  profileImage: string;
};

const Sidebar = () => {
  const pathname = usePathname(); // Get current URL path
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogOpen, setBlogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // Sidebar toggle state

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile data", error))
      .finally(() => setLoading(false));
  }, []);

  // 🔴 Hide sidebar for /admin/sign-in
  if (pathname === "/admin/sign-in") return null;

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="fixed top-1.5 pl-3 dark:bg-gray-800 rounded-md z-50"
      >
        <Menu className="w-6 h-6 text-black dark:text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "h-screen bg-gray-100 dark:bg-gray-900 shadow-lg flex flex-col fixed top-0 left-0 transition-all duration-300",
          expanded ? "w-64" : "w-16"
        )}
      >
        {/* Profile card */}
        <div className="flex items-center relative top-6 gap-3 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition rounded-md">
          {loading ? (
            <p>...</p>
          ) : (
            <Image
              src={profile?.profileImage || "/profile-images/img-2.webp"}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          {expanded && (
            <div className="flex flex-col">
              <span>{profile?.name}</span>
              <span>{profile?.email}</span>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 mt-4">
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition rounded-md">
              <Home className="w-5 h-5" />
              {expanded && <span>Dashboard</span>}
            </div>
          </Link>

          {/* Blog with submenu */}
          <div
            onClick={() => setBlogOpen(!blogOpen)}
            className="flex items-center gap-3 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition rounded-md justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              {expanded && <span>Blog</span>}
            </div>
            {expanded && (
              <ChevronDown
                className={cn("w-4 h-4 transition", blogOpen ? "rotate-180" : "")}
              />
            )}
          </div>

          {/* Blog Submenu */}
          {expanded && blogOpen && (
            <div className="ml-8 space-y-2">
              <Link href="/admin/add-blog">
                <div className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                  Add Blog
                </div>
              </Link>
              <Link href="/admin/manage-blogs">
                <div className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                  Manage Blogs
                </div>
              </Link>
            </div>
          )}

          <Link href="/admin/register">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition rounded-md">
              <User className="w-5 h-5" />
              {expanded && <span>Create user</span>}
            </div>
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
