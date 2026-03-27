"use client";

import { useEffect, useState } from "react";
import { AdminLayoutClient } from "@/components/admin/layout/admin-layout-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const session = localStorage.getItem("bomberos_session");
    if (!session) {
      window.location.href = "/auth/login";
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C41E3A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
