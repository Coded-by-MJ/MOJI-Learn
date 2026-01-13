import { AdminNavbar } from "@/components/global/Navbar";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
