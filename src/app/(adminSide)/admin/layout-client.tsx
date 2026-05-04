"use client";

import Sidebar from "@/components/sidenav/Sidenav";
import Form from "@/components/admin/Form";
import {
  clearManagementSessionUser,
  MANAGEMENT_SESSION_USER_KEY,
} from "@/lib/managementSession";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const [authState, setAuthState] = useState<AuthState>("loading");

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem("rm_token");
    if (!token) {
      clearManagementSessionUser();
      setAuthState("unauthenticated");
      return;
    }
    try {
      const res = await fetch("/api/management/controller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = (await res.json()) as {
          user?: { id?: string; name?: string; email?: string; role?: string };
        };
        const u = data.user;
        if (
          u &&
          typeof u.name === "string" &&
          typeof u.email === "string" &&
          typeof u.role === "string"
        ) {
          sessionStorage.setItem(
            MANAGEMENT_SESSION_USER_KEY,
            JSON.stringify({
              ...(typeof u.id === "string" ? { id: u.id } : {}),
              name: u.name,
              email: u.email,
              role: u.role,
            })
          );
        } else {
          clearManagementSessionUser();
        }
        setAuthState("authenticated");
      } else {
        localStorage.removeItem("rm_token");
        clearManagementSessionUser();
        setAuthState("unauthenticated");
      }
    } catch {
      localStorage.removeItem("rm_token");
      clearManagementSessionUser();
      setAuthState("unauthenticated");
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  if (authState === "loading") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-muted/30 text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-hidden />
        <p className="text-sm">Checking session…</p>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <Form onAuthenticated={verifySession} />;
  }

  return (
    <div className="flex w-full">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main
        className={`transition-all duration-300 p-4 w-full ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
