"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clearManagementSessionUser } from "@/lib/managementSession";
import { cn } from "../../lib/utils";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  expanded?: boolean; // Optional prop with default value
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ expanded = false }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    localStorage.removeItem("rm_token");
    clearManagementSessionUser();
    window.location.assign("/admin/dashboard");
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
