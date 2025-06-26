// app/(admin)/layout.tsx
import "@/app/styles/admin.css";
import Sidebar from "@/components/sidenav/Sidenav";

export const metadata = {
  title: "Admin panel",
  description: "Admin panel page",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
}
