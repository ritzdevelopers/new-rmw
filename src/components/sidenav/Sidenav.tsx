"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  FileText,
  BookOpen,
  Newspaper,
  Monitor,
  Home,
  Settings,
  Users,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import LogoutButton from "../logout/Logout";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";
import "./Sidenav.css";

type SidebarProps = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: NavChild[];
  group: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    group: "main",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    group: "main",
  },
  {
    label: "Chats",
    icon: MessageCircle,
    group: "main",
    children: [
      { label: "Overview", href: "/admin/chats/overview" },
      { label: "History", href: "/admin/chats/history" },
      { label: "Export", href: "/admin/chats/export" },
    ],
  },
  {
    label: "Blog",
    icon: FileText,
    group: "content",
    children: [
      { label: "Add Blog", href: "/admin/add-blog" },
      { label: "Manage Blogs", href: "/admin/manage-blogs" },
    ],
  },
  {
    label: "Web Stories",
    icon: BookOpen,
    group: "content",
    children: [
      { label: "Add Topics", href: "/admin/add-web-story-topics" },
      { label: "Manage Topics", href: "/admin/manage-web-story-topics" },
      { label: "Add Story", href: "/admin/add-web-story" },
      { label: "Manage Stories", href: "/admin/manage-web-stories" },
    ],
  },
  {
    label: "Newspaper",
    icon: Newspaper,
    group: "content",
    children: [
      { label: "Manage", href: "/admin/newspaper/manage" },
      { label: "Add Newspaper", href: "/admin/newspaper" },
      { label: "Manage Ads", href: "/admin/newspaper/ads/manage" },
    ],
  },
  {
    label: "Web Pages",
    icon: Monitor,
    group: "website",
    children: [
      { label: "Page Cards", href: "/admin/content" },
      { label: "Categories", href: "/admin/menu_category" },
    ],
  },
  {
    label: "Home",
    icon: Home,
    group: "website",
    children: [
      { label: "Services", href: "/admin/manage-services/service-third" },
    ],
  },
  {
    label: "System Settings",
    icon: Settings,
    group: "system",
    children: [
      { label: "Contact Enquiry", href: "/admin/enquiry" },
      { label: "Career Enquiry", href: "/admin/enquiry/career" },
      { label: "All Enquiries", href: "/admin/enquiry/enquiries" },
      { label: "Enquiry Tracker", href: "/admin/enquiry/tracker" },
    ],
  },
  {
    label: "Management",
    href: "/admin/management",
    icon: Users,
    group: "system",
  },
  {
    label: "Create User",
    href: "/admin/register",
    icon: UserPlus,
    group: "system",
  },
];

const GROUP_LABELS: Record<string, string> = {
  main: "Overview",
  content: "Content",
  website: "Website",
  system: "Administration",
};

const GROUPS = ["main", "content", "website", "system"];

export default function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<ManagementSessionUser | null>(null);

  useEffect(() => {
    setUser(readManagementSessionUser());
  }, []);

  // Auto-open submenu when current route is a child
  useEffect(() => {
    const autoOpen: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        const childActive = item.children.some((child) =>
          pathname.startsWith(child.href)
        );
        if (childActive) autoOpen[item.label] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...autoOpen }));
  }, [pathname]);

  const toggleMenu = (label: string) => {
    if (!expanded) return;
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen flex flex-col transition-all duration-300 z-40",
        expanded ? "w-64" : "w-16"
      )}
      style={{
        background: "#0B1623",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo / Brand */}
      <div
        className="flex items-center gap-3 px-4 h-16 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all overflow-hidden"
          title="Toggle sidebar"
          // style={{
          //   background: "rgba(197,157,79,0.12)",
          //   boxShadow: "0 4px 14px rgba(197,157,79,0.22)",
          //   border: "1px solid rgba(197,157,79,0.25)",
          // }}
        >
          <Image
            src="/favicon.ico"
            alt="RMW logo"
            width={28}
            height={28}
            className="object-contain"
            priority
          />
        </button>
        {expanded && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <p
              className="text-white font-bold text-sm tracking-wide leading-none"
              style={{ whiteSpace: "nowrap" }}
            >
              RMW Admin
            </p>
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: "#C59D4F", whiteSpace: "nowrap" }}
            >
              Management v2.0
            </p>
          </div>
        )}
      </div>

      {/* User profile */}
      {expanded && user && (
        <div
          className="mx-3 mt-4 p-3 rounded-xl flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(197,157,79,0.2), rgba(197,157,79,0.4))",
                color: "#C59D4F",
                border: "1.5px solid rgba(197,157,79,0.3)",
              }}
            >
              {user.name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold leading-tight truncate text-white"
              >
                {user.name}
              </p>
              <p className="text-xs leading-tight mt-0.5" style={{ color: "#C59D4F" }}>
                {user.role === "super_admin" ? "Super Admin" : "Editor"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed avatar */}
      {!expanded && user && (
        <div className="flex justify-center mt-4 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            title={user.name}
            style={{
              background:
                "linear-gradient(135deg, rgba(197,157,79,0.2), rgba(197,157,79,0.4))",
              color: "#C59D4F",
              border: "1.5px solid rgba(197,157,79,0.3)",
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() ?? "A"}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto hide-scrollbar py-4 px-2 space-y-1">
        {GROUPS.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          if (items.length === 0) return null;

          return (
            <div key={group} className={group !== "main" ? "pt-2" : ""}>
              {/* Group label */}
              {expanded && (
                <p
                  className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "#334D63" }}
                >
                  {GROUP_LABELS[group]}
                </p>
              )}
              {!expanded && group !== "main" && (
                <div
                  className="mx-auto mb-2 h-px"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    width: "32px",
                  }}
                />
              )}

              {items.map((item) => {
                const Icon = item.icon;
                const hasChildren = !!item.children;
                const isOpen = openMenus[item.label];
                const parentActive = hasChildren
                  ? item.children!.some((c) => isRouteActive(c.href))
                  : item.href
                  ? isRouteActive(item.href)
                  : false;

                return (
                  <div key={item.label}>
                    {/* Parent item */}
                    {hasChildren ? (
                      <button
                        onClick={() => toggleMenu(item.label)}
                        title={!expanded ? item.label : undefined}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group text-left",
                          parentActive ? "text-white" : "text-gray-500"
                        )}
                        style={
                          parentActive
                            ? {
                                background: "rgba(197,157,79,0.12)",
                              }
                            : {}
                        }
                        onMouseEnter={(e) => {
                          if (!parentActive)
                            (e.currentTarget as HTMLElement).style.background =
                              "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLElement).style.color =
                            "#CBD5E1";
                        }}
                        onMouseLeave={(e) => {
                          if (!parentActive)
                            (e.currentTarget as HTMLElement).style.background =
                              "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            parentActive ? "white" : "#6B7280";
                        }}
                      >
                        <Icon
                          className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
                          style={{ color: parentActive ? "#C59D4F" : undefined }}
                        />
                        {expanded && (
                          <>
                            <span className="flex-1 text-sm font-medium text-left">
                              {item.label}
                            </span>
                            <ChevronRight
                              className={cn(
                                "w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0",
                                isOpen ? "rotate-90" : ""
                              )}
                              style={{ color: "#334D63" }}
                            />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link href={item.href!}>
                        <div
                          title={!expanded ? item.label : undefined}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 cursor-pointer group",
                            parentActive ? "text-white" : "text-gray-500"
                          )}
                          style={
                            parentActive
                              ? { background: "rgba(197,157,79,0.12)" }
                              : {}
                          }
                          onMouseEnter={(e) => {
                            if (!parentActive)
                              (e.currentTarget as HTMLElement).style.background =
                                "rgba(255,255,255,0.04)";
                            (e.currentTarget as HTMLElement).style.color =
                              "#CBD5E1";
                          }}
                          onMouseLeave={(e) => {
                            if (!parentActive)
                              (e.currentTarget as HTMLElement).style.background =
                                "transparent";
                            (e.currentTarget as HTMLElement).style.color =
                              parentActive ? "white" : "#6B7280";
                          }}
                        >
                          <Icon
                            className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
                            style={{
                              color: parentActive ? "#C59D4F" : undefined,
                            }}
                          />
                          {expanded && (
                            <span className="flex-1 text-sm font-medium">
                              {item.label}
                            </span>
                          )}
                          {expanded && parentActive && (
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "#C59D4F" }}
                            />
                          )}
                        </div>
                      </Link>
                    )}

                    {/* Submenu */}
                    {hasChildren && expanded && isOpen && (
                      <div
                        className="ml-4 pl-3 mb-1"
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {item.children!.map((child) => {
                          const childActive = isRouteActive(child.href);
                          return (
                            <Link key={child.href} href={child.href}>
                              <div
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all duration-150 cursor-pointer text-sm"
                                )}
                                style={
                                  childActive
                                    ? {
                                        color: "#C59D4F",
                                        background: "rgba(197,157,79,0.08)",
                                        fontWeight: 500,
                                      }
                                    : { color: "#4A6070" }
                                }
                                onMouseEnter={(e) => {
                                  if (!childActive) {
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.background =
                                      "rgba(255,255,255,0.04)";
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.color = "#CBD5E1";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!childActive) {
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.background = "transparent";
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.color = "#4A6070";
                                  }
                                }}
                              >
                                {childActive && (
                                  <div
                                    className="w-1 h-1 rounded-full flex-shrink-0"
                                    style={{ background: "#C59D4F" }}
                                  />
                                )}
                                {child.label}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="p-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <LogoutButton expanded={expanded} />
      </div>
    </div>
  );
}
