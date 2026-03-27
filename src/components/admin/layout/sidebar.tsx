"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Wrench,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Truck,
  BarChart3,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inventario", href: "/admin/inventario", icon: Package },
  { name: "Material Menor", href: "/admin/material-menor", icon: Wrench },
  { name: "Asistencia", href: "/admin/asistencia", icon: ClipboardCheck },
  { name: "Bitácora", href: "/admin/bitacora", icon: BookOpen },
  { name: "Calendario", href: "/admin/calendario", icon: Calendar },
  { name: "Vehículos", href: "/admin/vehiculos", icon: Truck },
  { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { name: "Usuarios", href: "/admin/usuarios", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] border border-[#3A3A3A] rounded-md text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-[#0F0F0F] border-r border-[#2A2A2A] z-50 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn("p-4 border-b border-[#2A2A2A]", collapsed && "p-2")}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C41E3A] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">7</span>
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-white font-bold text-lg whitespace-nowrap" style={{ fontFamily: "Oswald, sans-serif" }}>
                    BomberOS
                  </h1>
                  <p className="text-[#C41E3A] text-xs whitespace-nowrap">
                    7ma Cía
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                        isActive
                          ? "bg-[#C41E3A] text-white"
                          : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-sm font-medium whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-2 border-t border-[#2A2A2A]">
            <button
              onClick={() => {
                localStorage.removeItem("bomberos_session");
                window.location.href = "/auth/login";
              }}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-gray-400 hover:bg-[#1A1A1A] hover:text-white transition-colors",
                collapsed && "justify-center px-2"
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">Cerrar Sesión</span>
              )}
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-gray-400 hover:bg-[#1A1A1A] hover:text-white transition-colors mt-1",
                collapsed && "justify-center px-2"
              )}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Colapsar</span>
                </>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </aside>
    </>
  );
}
