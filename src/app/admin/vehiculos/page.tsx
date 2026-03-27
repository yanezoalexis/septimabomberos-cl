"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Wrench, Gauge, AlertTriangle, Calendar, FileText, ChevronDown, ChevronUp, Settings } from "lucide-react";

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    OPERATIVO: "bg-green-500/20 text-green-400",
    MANTENCION: "bg-yellow-500/20 text-yellow-400",
    FUERA_SERVICIO: "bg-red-500/20 text-red-400",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    OPERATIVO: "Operativo",
    MANTENCION: "En Mantención",
    FUERA_SERVICIO: "Fuera de Servicio",
  };
  return labels[status] || status;
}

interface VehicleEvent {
  id: string;
  vehicleId: string;
  date: string;
  time: string;
  type: string;
  description: string;
  createdAt: string;
}

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

const eventTypes = [
  { value: "INCIDENTE", label: "Incidente", color: "bg-red-500/20 text-red-400" },
  { value: "MANTENIMIENTO", label: "Mantenimiento", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "REPARACION", label: "Reparación", color: "bg-orange-500/20 text-orange-400" },
  { value: "REVISION", label: "Revisión", color: "bg-blue-500/20 text-blue-400" },
  { value: "OTRO", label: "Otro", color: "bg-gray-500/20 text-gray-400" },
];

export default function VehiculosPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", name: "M-71", type: "Camión - Rescate Desnivel", plate: "BZ-7101", status: "OPERATIVO", mileage: 45000, lastMaintenance: "2024-02-15", nextMaintenance: "2024-05-15", observations: "Unidad de Rescate en Desnivel Urban Interface 4x4" },
    { id: "2", name: "M-72", type: "Camión - Primera Intervención", plate: "BZ-7202", status: "OPERATIVO", mileage: 32000, lastMaintenance: "2024-01-20", nextMaintenance: "2024-04-20", observations: "Nueva Spartan MetroStar (2024)" },
    { id: "3", name: "M-73", type: "Camión - Aljibe", plate: "BZ-7303", status: "MANTENCION", mileage: 28000, lastMaintenance: "2024-03-01", nextMaintenance: "2024-03-25", observations: "Unidad Aljibe 8,000 litros" },
    { id: "4", name: "UR-3", type: "Unidad de Rescate", plate: "BZ-UR3", status: "OPERATIVO", mileage: 12000, lastMaintenance: "2024-02-28", nextMaintenance: "2024-08-28", observations: "Unidad de rescate urbano" },
  ]);

  const [events, setEvents] = useState<VehicleEvent[]>([
    { id: "1", vehicleId: "2", date: "2024-03-25", time: "14:30", type: "INCIDENTE", description: "Colisión con poste de luz en Av. Valparaíso. Se afectó parachoque delantero y mica de luz lateral derecha.", createdAt: "2024-03-25" },
    { id: "2", vehicleId: "1", date: "2024-03-20", time: "09:00", type: "MANTENIMIENTO", description: "Cambio de aceite y filtros. Revisión de mangueras.", createdAt: "2024-03-20" },
    { id: "3", vehicleId: "4", date: "2024-03-15", time: "10:00", type: "REVISION", description: "Revisión completa de equipos de rescate. Todo en orden.", createdAt: "2024-03-15" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const operativos = vehicles.filter((v) => v.status === "OPERATIVO").length;
  const enMantención = vehicles.filter((v) => v.status === "MANTENCION").length;
  const fueraServicio = vehicles.filter((v) => v.status === "FUERA_SERVICIO").length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const vehicleData: Vehicle = {
      id: editingVehicle?.id || Date.now().toString(),
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      plate: formData.get("plate") as string,
      status: formData.get("status") as string,
      mileage: parseInt(formData.get("mileage") as string) || 0,
      lastMaintenance: editingVehicle?.lastMaintenance || null,
      nextMaintenance: editingVehicle?.nextMaintenance || null,
      observations: formData.get("observations") as string || null,
    };

    if (editingVehicle) {
      setVehicles(vehicles.map((v) => (v.id === editingVehicle.id ? vehicleData : v)));
    } else {
      setVehicles([...vehicles, vehicleData]);
    }
    setIsModalOpen(false);
    setEditingVehicle(null);
  }

  function handleEventSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: VehicleEvent = {
      id: Date.now().toString(),
      vehicleId: formData.get("vehicleId") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setEvents([newEvent, ...events]);
    setIsEventModalOpen(false);
  }

  function handleDeleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  }

  function getEventsForVehicle(vehicleId: string) {
    return events.filter((e) => e.vehicleId === vehicleId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function getEventTypeInfo(type: string) {
    return eventTypes.find((t) => t.value === type) || eventTypes[4];
  }

  function handleQuickStatusChange(vehicleId: string, newStatus: string) {
    setVehicles(vehicles.map((v) => (v.id === vehicleId ? { ...v, status: newStatus } : v)));
  }

  function handleEditVehicle(vehicle: Vehicle) {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Gestión de Vehículos
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Estado, mantenimiento y eventos de unidades M-71, M-72, M-73, UR-3
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEventModalOpen(true)}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962F] text-black px-4 py-2 rounded-md transition-colors font-medium"
          >
            <FileText className="w-4 h-4" />
            Registrar Evento
          </button>
          <button
            onClick={() => { setEditingVehicle(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Vehículo
          </button>
        </div>
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
              <p className="text-gray-400 text-xs">Total Eventos</p>
              <p className="text-2xl font-bold text-white">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Vehículos y Eventos</h2>
        {vehicles.map((vehicle) => {
          const vehicleEvents = getEventsForVehicle(vehicle.id);
          const isExpanded = expandedVehicle === vehicle.id;

          return (
            <div key={vehicle.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 hover:bg-[#0F0F0F] transition-colors"
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => setExpandedVehicle(isExpanded ? null : vehicle.id)}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                    vehicle.status === "OPERATIVO" ? "bg-green-500/20 text-green-400" :
                    vehicle.status === "MANTENCION" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {vehicle.name}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{vehicle.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(vehicle.status)}`}>
                        {getStatusLabel(vehicle.status)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{vehicle.type} • {vehicle.plate} • {vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={vehicle.status}
                      onChange={(e) => handleQuickStatusChange(vehicle.id, e.target.value)}
                      className={`px-3 py-1.5 text-xs rounded-md border focus:outline-none cursor-pointer ${
                        vehicle.status === "OPERATIVO" 
                          ? "bg-green-500/20 border-green-500/50 text-green-400" 
                          : vehicle.status === "MANTENCION"
                          ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                          : "bg-red-500/20 border-red-500/50 text-red-400"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="OPERATIVO">Operativo</option>
                      <option value="MANTENCION">En Mantención</option>
                      <option value="FUERA_SERVICIO">Fuera de Servicio</option>
                    </select>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditVehicle(vehicle);
                      }}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors"
                      title="Editar vehículo"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">{vehicleEvents.length} eventos</p>
                    <p className="text-gray-500 text-xs">registrados</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 cursor-pointer" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-[#2A2A2A] p-4 bg-[#0F0F0F]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-gray-300 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Historial de Eventos
                    </h4>
                  </div>

                  {vehicleEvents.length > 0 ? (
                    <div className="space-y-3">
                      {vehicleEvents.map((event) => {
                        const typeInfo = getEventTypeInfo(event.type);
                        return (
                          <div key={event.id} className="flex items-start gap-3 p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                            <div className="flex-shrink-0 text-center">
                              <div className="w-12 text-xs">
                                <div className="text-gray-400">{new Date(event.date).toLocaleDateString("es-CL", { day: "2-digit" })}</div>
                                <div className="text-gray-500">{new Date(event.date).toLocaleDateString("es-CL", { month: "short" })}</div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 text-xs rounded-full ${typeInfo.color}`}>
                                  {typeInfo.label}
                                </span>
                                <span className="text-gray-500 text-xs">{event.time} hrs</span>
                              </div>
                              <p className="text-gray-300 text-sm">{event.description}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No hay eventos registrados para este vehículo</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Registrar Evento
              </h2>
              <button onClick={() => setIsEventModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Vehículo *</label>
                <select
                  name="vehicleId"
                  required
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                >
                  <option value="">Seleccionar vehículo...</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} - {v.plate}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fecha *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora *</label>
                  <input
                    type="time"
                    name="time"
                    required
                    defaultValue={new Date().toTimeString().slice(0, 5)}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Evento *</label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción del Evento *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describa el evento ocurrido: daños, reparaciones, mantenciones, observaciones..."
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A] placeholder-gray-600"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md transition-colors"
                >
                  Registrar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">{editingVehicle ? "Editar Vehículo" : "Agregar Vehículo"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre (ej: M-71) *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingVehicle?.name}
                  required
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tipo *</label>
                  <select
                    name="type"
                    defaultValue={editingVehicle?.type}
                    required
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    <option value="Camión">Camión</option>
                    <option value="Ambulancia">Ambulancia</option>
                    <option value="Unidad de Rescate">Unidad de Rescate</option>
                    <option value="Motobomba">Motobomba</option>
                    <option value="Vehículo Ligero">Vehículo Ligero</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Patente *</label>
                  <input
                    type="text"
                    name="plate"
                    defaultValue={editingVehicle?.plate}
                    required
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                  <select
                    name="status"
                    defaultValue={editingVehicle?.status || "OPERATIVO"}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    <option value="OPERATIVO">Operativo</option>
                    <option value="MANTENCION">En Mantención</option>
                    <option value="FUERA_SERVICIO">Fuera de Servicio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Kilometraje</label>
                  <input
                    type="number"
                    name="mileage"
                    defaultValue={editingVehicle?.mileage || 0}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Observaciones</label>
                <textarea
                  name="observations"
                  defaultValue={editingVehicle?.observations || ""}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md">
                  {editingVehicle ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
