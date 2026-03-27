"use client";

import { useState } from "react";
import { Plus, Clock, User, CalendarDays, FileDown } from "lucide-react";
import { getStatusLabel, attendanceTypes } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  user: { id: string; name: string };
  date: string;
  entryTime: string;
  exitTime: string | null;
  type: string;
  notes: string | null;
}

const mockUsers = [
  { id: "1", name: "Carlos Mendoza" },
  { id: "2", name: "Juan Pérez" },
  { id: "3", name: "Roberto Sánchez" },
  { id: "4", name: "Miguel Torres" },
];

export default function AsistenciaPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { id: "1", user: { id: "1", name: "Carlos Mendoza" }, date: "2024-03-27", entryTime: "18:00", exitTime: "21:30", type: "CAPACITACION", notes: "Rescate en altura" },
    { id: "2", user: { id: "2", name: "Juan Pérez" }, date: "2024-03-27", entryTime: "18:05", exitTime: "21:30", type: "CAPACITACION", notes: null },
    { id: "3", user: { id: "3", name: "Roberto Sánchez" }, date: "2024-03-27", entryTime: "17:55", exitTime: "21:30", type: "CAPACITACION", notes: null },
    { id: "4", user: { id: "1", name: "Carlos Mendoza" }, date: "2024-03-26", entryTime: "20:00", exitTime: "22:00", type: "REUNION", notes: "Reunión mensual" },
    { id: "5", user: { id: "4", name: "Miguel Torres" }, date: "2024-03-26", entryTime: "20:00", exitTime: "22:00", type: "REUNION", notes: null },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const todayCount = records.filter((r) => r.date === "2024-03-27").length;
  const monthCount = records.filter((r) => r.date.startsWith("2024-03")).length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const formData = new FormData(e.currentTarget);
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        user: { id: formData.get("userId") as string, name: mockUsers.find((u) => u.id === formData.get("userId"))?.name || "" },
        date: formData.get("date") as string,
        entryTime: formData.get("entryTime") as string,
        exitTime: (formData.get("exitTime") as string) || null,
        type: formData.get("type") as string,
        notes: (formData.get("notes") as string) || null,
      };
      setRecords([newRecord, ...records]);
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Control de Asistencia
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Registro y seguimiento de asistencia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] text-gray-300 rounded-md hover:bg-[#2A2A2A] transition-colors">
            <FileDown className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Registrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C41E3A]/10 rounded-lg">
              <User className="w-6 h-6 text-[#C41E3A]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Asistencia Hoy</p>
              <p className="text-3xl font-bold text-white">{todayCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-lg">
              <CalendarDays className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Este Mes</p>
              <p className="text-3xl font-bold text-white">{monthCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Promedio Asistencia</p>
              <p className="text-3xl font-bold text-white">85%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0F0F0F]">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Bombero</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Fecha</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Tipo</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Entrada</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Salida</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Notas</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                  <td className="py-3 px-4 text-white text-sm">{record.user.name}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{record.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.type === "EMERGENCIA" ? "bg-red-500/20 text-red-400" :
                      record.type === "CAPACITACION" ? "bg-green-500/20 text-green-400" :
                      record.type === "REUNION" ? "bg-blue-500/20 text-blue-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {getStatusLabel(record.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{record.entryTime}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{record.exitTime || "-"}</td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{record.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">Registrar Asistencia</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Bombero *</label>
                <select name="userId" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                  <option value="">Seleccionar...</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fecha *</label>
                <input type="date" name="date" required defaultValue="2024-03-27" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Entrada *</label>
                  <input type="time" name="entryTime" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Salida</label>
                  <input type="time" name="exitTime" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tipo *</label>
                <select name="type" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                  {attendanceTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Notas</label>
                <textarea name="notes" rows={2} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md disabled:opacity-50">
                  {isLoading ? "Guardando..." : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
