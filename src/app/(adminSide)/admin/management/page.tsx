"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type MeUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ManagementRow = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
};

type ActivityRow = {
  _id: string;
  managementId: string;
  activity: string;
  activityTime: string;
  createdAt?: string;
};

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("rm_token") : null;
  return {
    Authorization: `Bearer ${token ?? ""}`,
    "Content-Type": "application/json",
  };
}

function formatRole(role: string): string {
  if (role === "super_admin") return "Super admin";
  if (role === "editor") return "Editor";
  return role.replace(/_/g, " ");
}

function rowId(row: ManagementRow): string {
  return String(row._id);
}

export default function ManagementPage() {
  const [me, setMe] = useState<MeUser | null>(null);
  const [management, setManagement] = useState<ManagementRow[]>([]);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});
  const [deleteTarget, setDeleteTarget] = useState<ManagementRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await fetch("/api/management/controller", {
        headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
      });
      if (!meRes.ok) {
        const j = await meRes.json().catch(() => ({}));
        throw new Error(
          typeof j.message === "string" ? j.message : "Could not load profile"
        );
      }
      const meJson = (await meRes.json()) as {
        user?: { id?: string; name?: string; email?: string; role?: string };
      };
      const u = meJson.user;
      if (
        !u?.name ||
        !u?.email ||
        !u?.role ||
        (u.role !== "super_admin" && u.role !== "editor")
      ) {
        throw new Error("Invalid session");
      }
      setMe({
        id: typeof u.id === "string" ? u.id : "",
        name: u.name,
        email: u.email,
        role: u.role,
      });

      const listRes = await fetch("/api/management/get-all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
      });
      if (!listRes.ok) {
        const j = await listRes.json().catch(() => ({}));
        throw new Error(
          typeof j.message === "string" ? j.message : "Could not load team"
        );
      }
      const listJson = (await listRes.json()) as {
        management?: ManagementRow[];
        activities?: ActivityRow[];
      };
      setManagement(
        Array.isArray(listJson.management)
          ? listJson.management.map((m) => ({
              ...m,
              _id: String(m._id),
            }))
          : []
      );

      if (u.role === "super_admin") {
        const actRes = await fetch("/api/management/activities", {
          headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
        });
        if (!actRes.ok) {
          const j = await actRes.json().catch(() => ({}));
          throw new Error(
            typeof j.message === "string"
              ? j.message
              : "Could not load activities"
          );
        }
        const actJson = (await actRes.json()) as { activities?: ActivityRow[] };
        setActivities(
          Array.isArray(actJson.activities)
            ? actJson.activities.map((a) => ({
                ...a,
                _id: String(a._id),
                managementId: String(a.managementId),
              }))
            : []
        );
      } else {
        setActivities([]);
      }
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Something went wrong");
      setMe(null);
      setManagement([]);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setActiveForUser = async (row: ManagementRow, next: boolean) => {
    const id = rowId(row);
    setRowBusy((b) => ({ ...b, [id]: true }));
    try {
      const res = await fetch("/api/management/controller", {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ userId: id, isActive: next }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof j.message === "string" ? j.message : "Update failed");
        return;
      }
      setManagement((prev) =>
        prev.map((m) =>
          rowId(m) === id ? { ...m, isActive: next } : m
        )
      );
      toast.success("Status updated");
    } finally {
      setRowBusy((b) => ({ ...b, [id]: false }));
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const id = rowId(deleteTarget);
    setDeleting(true);
    try {
      const res = await fetch("/api/management/controller", {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ userId: id }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof j.message === "string" ? j.message : "Delete failed");
        return;
      }
      setManagement((prev) => prev.filter((m) => rowId(m) !== id));
      setDeleteTarget(null);
      toast.success("User removed");
      if (me?.role === "super_admin") {
        const actRes = await fetch("/api/management/activities", {
          headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
        });
        if (actRes.ok) {
          const actJson = (await actRes.json()) as { activities?: ActivityRow[] };
          setActivities(
            Array.isArray(actJson.activities)
              ? actJson.activities.map((a) => ({
                  ...a,
                  _id: String(a._id),
                  managementId: String(a.managementId),
                }))
              : []
          );
        }
      }
    } finally {
      setDeleting(false);
    }
  };

  const isSuperAdmin = me?.role === "super_admin";
  const myId = me?.id ?? "";

  if (loading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-hidden />
        <p className="text-sm">Loading management…</p>
        <Toaster position="top-right" />
      </div>
    );
  }

  if (!me) {
    return (
      <div className="p-6">
        <p className="text-sm text-destructive">Unable to load this page.</p>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-2 md:p-4">
      <Toaster position="top-right" />
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Management
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSuperAdmin
            ? "Manage team accounts, status, and review the full activity log."
            : "Update active status or remove non–super-admin accounts."}
        </p>
      </header>
      <Breadcrumb currentPage="Management" />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your session</CardTitle>
          <CardDescription>
            Signed in as <span className="font-medium text-foreground">{me.name}</span>{" "}
            ({me.email})
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{formatRole(me.role)}</Badge>
          <Button type="button" variant="outline" size="sm" onClick={() => load()}>
            Refresh
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team</CardTitle>
          <CardDescription>
            {isSuperAdmin
              ? "All management users. Toggle active status or delete accounts."
              : "Editors can change editors and other roles except super admins."}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px]">Active</TableHead>
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {management.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                management.map((row) => {
                  const id = rowId(row);
                  const isSelf = myId !== "" && id === myId;
                  const isTargetSuper = row.role === "super_admin";
                  const editorLocked =
                    me.role === "editor" && isTargetSuper;
                  const switchDisabled = rowBusy[id] || editorLocked || isSelf;
                  const deleteDisabled =
                    rowBusy[id] || isSelf || editorLocked;

                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{formatRole(row.role)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={row.isActive}
                          disabled={switchDisabled}
                          onCheckedChange={(checked) =>
                            setActiveForUser(row, checked)
                          }
                          aria-label={`Active ${row.name}`}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          disabled={deleteDisabled}
                          onClick={() => setDeleteTarget(row)}
                          aria-label={`Delete ${row.name}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isSuperAdmin ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity log</CardTitle>
            <CardDescription>
              All management actions (from{" "}
              <code className="text-xs">/api/management/activities</code>).
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[480px] overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">When</TableHead>
                  <TableHead>Event</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-muted-foreground"
                    >
                      No activities yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  activities.map((a) => (
                    <TableRow key={a._id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-xs md:text-sm">
                        {new Date(a.activityTime || a.createdAt || "").toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{a.activity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email}). This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={() => void confirmDelete()}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
