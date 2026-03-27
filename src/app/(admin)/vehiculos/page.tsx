"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Wrench, Gauge, AlertTriangle } from "lucide-react";
import { getStatusColor, getStatusLabel, vehicleTypes } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  plate: string;
  status: string;
  mileage: number;
  lastMaintenance: string | null;
  nextMaintenance: string | null;
  observations: string | null;
}

export default function VehiculosPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", name: "Camión BZ-01", type: "Camión", plate: "BZ-1234", status: "OPERATIVO", mileage: 45000, lastMaintenance: "2024-02-15", nextMaintenance: "2024-05-15", observations: "Unidad principal de emergencia" },
    { id: "2", name: "Ambulancia BZ-02", type: "Ambulancia", plate: "BZ-2345", status: "OPERATIVO", mileage: 32000, lastMaintenance: "2024-01-20", nextMaintenance: "2024-04-20", observations: null },
    { id: "3", name: "Vehículo Ligero BZ-03", type: "Vehículo Ligero", plate: "BZ-3456", status: "MANTENCION", mileage: 28000, lastMaintenance: "2024-03-01", nextMaintenance: "2024-03-25", observations: "En mantención preventiva" },
    { id: "4", name: "Motobomba BZ-04", type: "Motobomba", plate: "BZ-4567", status: "OPERATIVO", mileage: 12000, lastMaintenance: "2024-02-28", nextMaintenance: "2024-08-28", observations: null },
    { id: "5", name: "Carro Escalera BZ-05", type: "Carro Escalera", plate: "BZ-5678", status: "FUERA_SERVICIO", mileage: 78000, lastMaintenance: "2023-12-10", nextMaintenance: null, observations: "Fuera de servicio por reparación mayor" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const operativos = vehicles.filter((v) => v.status === "OPERATIVO").length;
  const enMantención = vehicles.filter((v) => v.status === "MANTENCION").length;
  const fueraServicio = vehicles.filter((v) => v.status === "FUERA_SERVICIO").length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingVehicle) {
      setVehicles(vehicles.map((v) => (v.id === editingVehicle.id ? { ...editingVehicle } : v)));
    }
    setIsModalOpen(false);
    setEditingVehicle(null);
  }

  function handleDelete(id: string) {
    setVehicles(vehicles.filter((v) => v.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Gestión de Vehículos
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Estado y mantenimiento de unidades
          </p>
        </div>
        <button
          onClick={() => { setEditingVehicle(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Vehículo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded">
              <Wrench className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Operativos</p>
              <p className="text-2xl font-bold text-white">{operativos}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded">
              <Gauge className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">En Mantención</p>
              <p className="text-2xl font-bold text-white">{enMantención}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Fuera de Servicio</p>
              <p className="text-2xl font-bold text-white">{fueraServicio}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded">
              <Gauge className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">{vehicles.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0F0F0F]">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Vehículo</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Patente</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Tipo</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Estado</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Kilometraje</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Próxima Mantención</th>
                <th className="text-right text-gray-400 text-sm font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white text-sm font-medium">{vehicle.name}</p>
                      {vehicle.observations && (
                        <p className="text-gray-500 text-xs mt-0.5">{vehicle.observations}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm font-mono">{vehicle.plate}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{vehicle.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(vehicle.status)}`}>
                      {getStatusLabel(vehicle.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{vehicle.mileage.toLocaleString()} km</td>
                  <td className="py-3 px-4">
                    {vehicle.nextMaintenance ? (
                      <span className={`text-sm ${new Date(vehicle.nextMaintenance) < new Date() ? "text-red-400" : "text-gray-400"}`}>
                        {vehicle.nextMaintenance}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-sm">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingVehicle(vehicle); setIsModalOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {deleteConfirm === vehicle.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(vehicle.id)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Confirmar</button>
                          <button onClick={() => setDeleteConfirm(null)} className="p-1.5 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(vehicle.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">{editingVehicle ? "Editar Vehículo" : "Agregar Vehículo"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                <input type="text" name="name" defaultValue={editingVehicle?.name} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tipo *</label>
                  <select name="type" defaultValue={editingVehicle?.type} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Patente *</label>
                  <input type="text" name="plate" defaultValue={editingVehicle?.plate} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                  <select name="status" defaultValue={editingVehicle?.status || "OPERATIVO"} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                    <option value="OPERATIVO">Operativo</option>
                    <option value="MANTENCION">En Mantención</option>
                    <option value="FUERA_SERVICIO">Fuera de Servicio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Kilometraje</label>
                  <input type="number" name="mileage" defaultValue={editingVehicle?.mileage || 0} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Última Mantención</label>
                  <input type="date" name="lastMaintenance" defaultValue={editingVehicle?.lastMaintenance || ""} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Próxima Mantención</label>
                  <input type="date" name="nextMaintenance" defaultValue={editingVehicle?.nextMaintenance || ""} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Observaciones</label>
                <textarea name="observations" defaultValue={editingVehicle?.observations || ""} rows={2} className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md">{editingVehicle ? "Actualizar" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
