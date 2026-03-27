"use client";

import { useState } from "react";
import { Plus, Search, Trash2, X, MapPin, Clock, Users, Truck } from "lucide-react";
import { getStatusLabel, salidaTypes } from "@/lib/utils";

interface BitacoraRecord {
  id: string;
  date: string;
  departureTime: string;
  returnTime: string | null;
  type: string;
  description: string;
  location: string;
  participantes: { name: string }[];
  vehiculos: { name: string }[];
}

export default function BitacoraPage() {
  const [records, setRecords] = useState<BitacoraRecord[]>([
    { id: "1", date: "2024-03-27", departureTime: "14:30", returnTime: "17:00", type: "EMERGENCIA", description: "Incendio estructural en Av. Valparaíso", location: "Av. Valparaíso #456", participantes: [{ name: "Carlos Mendoza" }, { name: "Juan Pérez" }], vehiculos: [{ name: "BZ-01" }] },
    { id: "2", date: "2024-03-25", departureTime: "09:00", returnTime: "12:00", type: "PRACTICA", description: "Ejercicio de rescate en desnivel", location: "Cerro Playa Ancha", participantes: [{ name: "Roberto Sánchez" }, { name: "Miguel Torres" }], vehiculos: [{ name: "BZ-01" }, { name: "BZ-03" }] },
    { id: "3", date: "2024-03-20", departureTime: "18:00", returnTime: "21:00", type: "CAPACITACION", description: "Capacitación manejo de mangueras", location: "Cuartel 7ma Cía", participantes: [{ name: "Carlos Mendoza" }, { name: "Juan Pérez" }, { name: "Roberto Sánchez" }], vehiculos: [] },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredRecords = records.filter((r) => !filterType || r.type === filterType);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsModalOpen(false);
  }

  function handleDelete(id: string) {
    setRecords(records.filter((r) => r.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Bitácora de Salidas
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Registro de salidas de emergencia y prácticas
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Salida
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
          >
            <option value="">Todos los tipos</option>
            {salidaTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5 hover:border-[#3A3A3A] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.type === "EMERGENCIA" ? "bg-red-500/20 text-red-400" :
                  record.type === "PRACTICA" ? "bg-orange-500/20 text-orange-400" :
                  "bg-green-500/20 text-green-400"
                }`}>
                  {getStatusLabel(record.type)}
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 text-sm">{record.date}</span>
              </div>
              {deleteConfirm === record.id ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">
                    Confirmar
                  </button>
                  <button onClick={() => setDeleteConfirm(null)} className="p-1 text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(record.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <h3 className="text-white font-semibold mb-2">{record.description}</h3>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {record.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {record.departureTime} {record.returnTime && `- ${record.returnTime}`}
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <Users className="w-4 h-4" />
                  Participantes ({record.participantes.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {record.participantes.map((p, i) => (
                    <span key={i} className="px-2 py-1 bg-[#0F0F0F] rounded text-sm text-gray-300">{p.name}</span>
                  ))}
                </div>
              </div>
              {record.vehiculos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Truck className="w-4 h-4" />
                    Vehículos ({record.vehiculos.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {record.vehiculos.map((v, i) => (
                      <span key={i} className="px-2 py-1 bg-[#0F0F0F] rounded text-sm text-gray-300">{v.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
          <p className="text-gray-500">No hay registros</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">Nueva Salida</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fecha *</label>
                  <input type="date" name="date" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tipo *</label>
                  <select name="type" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                    {salidaTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción *</label>
                <textarea name="description" required rows={2} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ubicación</label>
                <input type="text" name="location" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Salida</label>
                  <input type="time" name="departureTime" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Regreso</label>
                  <input type="time" name="returnTime" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
