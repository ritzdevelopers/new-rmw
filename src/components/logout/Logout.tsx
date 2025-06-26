"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  expanded?: boolean; // Optional prop with default value
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded = false }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/admin/sign-in"); // Redirect after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
  onClick={handleLogout}
  disabled={loading}
  className={cn(
    "flex items-center gap-3 p-3 cursor-pointer transition rounded-md text-white bg-red-100 hover:bg-red-200 dark:text-red-400",
    expanded ? "justify-start" : "justify-center"
  )}
>
  <LogOut className="w-5 h-5 text-red-700" />
  {expanded && <span className="text-red-700">{loading ? "Logging out..." : "Logout"}</span>}
</Button>
  );
};

export default LogoutButton;
