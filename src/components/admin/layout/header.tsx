"use client";

import { useSession } from "next-auth/react";
import { Bell, User, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function AdminHeader() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 lg:pl-0 pl-12">
        <div>
          <h2 className="text-white font-semibold">
            Bienvenido, {session?.user?.name || "Usuario"}
          </h2>
          <p className="text-gray-500 text-xs">
            {new Date().toLocaleDateString("es-CL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C41E3A] rounded-full" />
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-[#2A2A2A]">
          <div className="w-9 h-9 bg-[#C41E3A] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-medium">{session?.user?.name}</p>
            <p className="text-gray-500 text-xs">
              {session?.user?.role === "ADMIN" ? "Administrador" : "Bombero"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
