import "@/app/styles/admin.css";

import { Metadata } from "next";
import AdminLayoutClient from "./layout-client";

 
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
