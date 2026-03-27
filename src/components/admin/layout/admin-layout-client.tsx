"use client";

import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./header";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#121212]">
        <AdminSidebar />
        <div className="lg:pl-64 transition-all duration-300">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
