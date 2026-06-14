"use client";

import { useState } from "react";
import { clearManagementSessionUser } from "@/lib/managementSession";
import { AlertTriangle, LogOut, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogoutButtonProps {
  expanded?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded = false }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("rm_token");
    clearManagementSessionUser();
    window.location.assign("/admin/dashboard");
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        title={!expanded ? "Logout" : undefined}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
          expanded ? "justify-start" : "justify-center"
        )}
        style={{ background: "rgba(239,68,68,0.08)", color: "#F87171" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(239,68,68,0.16)";
          (e.currentTarget as HTMLElement).style.color = "#EF4444";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(239,68,68,0.08)";
          (e.currentTarget as HTMLElement).style.color = "#F87171";
        }}
      >
        <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
        {expanded && (
          <span className="text-sm font-medium">
            {loading ? "Logging out…" : "Logout"}
          </span>
        )}
      </button>

      {/* Confirmation modal — rendered outside sidebar via portal-like approach */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            className="relative w-full max-w-[380px] rounded-2xl p-6"
            style={{
              background: "#FFFFFF",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.12), 0 32px 80px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ color: "#9CA3AF" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#F3F4F6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon + title */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.08)" }}
              >
                <AlertTriangle
                  className="w-6 h-6"
                  style={{ color: "#EF4444" }}
                />
              </div>
              <div className="pt-0.5">
                <h3
                  className="font-bold text-lg leading-tight"
                  style={{ color: "#0B1623" }}
                >
                  Sign out?
                </h3>
                <p className="text-sm mt-1" style={{ color: "#64748B" }}>
                  You&apos;ll need to sign in again to access the admin panel.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{ background: "#F3F4F6" }}
            />

            {/* Message */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#475569" }}>
              Your current session will be terminated and you will be redirected to the login screen.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{ background: "#F3F4F6", color: "#374151" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#E5E7EB")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#F3F4F6")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all duration-150 disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
                }}
              >
                {loading ? "Signing out…" : "Yes, sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
