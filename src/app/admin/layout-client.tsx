"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayoutClient } from "@/components/admin/layout/admin-layout-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("bomberos_session");
    if (!session) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C41E3A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
