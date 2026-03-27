"use client";

import { useState, useMemo } from "react";
import { Plus, CalendarDays, Download, Search, AlertCircle } from "lucide-react";
import { emergencyCategories, incidentKeys, attendanceCodes, septimaBombers } from "@/lib/utils";

interface IncidentRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  horaSalida: string;
  horaLlegada: string;
  clave: string;
  lugar: string;
}

interface AttendanceRecord {
  id: string;
  bomberId: string;
  bomberNro: number;
  bomberName: string;
  incidentId: string;
  code: string;
  notes: string | null;
}

interface FormData {
  date: string;
  category: string;
  clave: string;
  description: string;
  horaSalida: string;
  horaLlegada: string;
  lugar: string;
  bomberId: string;
  code: string;
  notes: string;
}

const mockIncidents: IncidentRecord[] = [];

const mockAttendance: AttendanceRecord[] = [];

export default function AsistenciaPage() {
  const [selectedMonth, setSelectedMonth] = useState("2024-03");
  const [selectedIncident, setSelectedIncident] = useState<string | null>("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"incident" | "attendance">("incident");
  const [incidentFilter, setIncidentFilter] = useState("");
  const [editingAttendance, setEditingAttendance] = useState<AttendanceRecord | null>(null);
  const [editingIncident, setEditingIncident] = useState<IncidentRecord | null>(null);
  const [incidents, setIncidents] = useState<IncidentRecord[]>(mockIncidents);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [formData, setFormData] = useState<FormData>({
    date: "",
    category: "",
    description: "",
    horaSalida: "",
    horaLlegada: "",
    clave: "",
    lugar: "",
    bomberId: "",
    code: "",
    notes: "",
  });

  const filteredIncidents = useMemo(() => {
    return incidents.filter(i => 
      incidentFilter === "" || 
      i.date === incidentFilter ||
      i.type.toLowerCase().includes(incidentFilter.toLowerCase())
    );
  }, [incidentFilter, incidents]);

  const currentIncident = incidents.find(i => i.id === selectedIncident);
  
  const subKeys = useMemo(() => {
    return formData.category ? incidentKeys[formData.category] || [] : [];
  }, [formData.category]);
  
  const currentAttendance = useMemo(() => {
    if (!selectedIncident) return [];
    return attendance.filter(a => a.incidentId === selectedIncident);
  }, [selectedIncident, attendance]);

  const stats = useMemo(() => {
    const present = currentAttendance.filter(a => a.code === "P").length;
    const presentAbsence = currentAttendance.filter(a => a.code === "PA").length;
    const absent = currentAttendance.filter(a => a.code === "A").length;
    const license = currentAttendance.filter(a => a.code === "L").length;
    const total = septimaBombers.length;
    return { present, presentAbsence, absent, license, total, rate: total > 0 ? Math.round(((present + presentAbsence) / total) * 100) : 0 };
  }, [currentAttendance]);

  const getCodeColor = (code: string) => {
    if (code === "P") return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    if (code === "PA") return "bg-red-500/20 text-red-400 border border-red-500/30";
    if (code === "A") return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    if (code === "L") return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
    return "bg-gray-500/20 text-gray-400";
  };

  const handleSelectCode = (code: string) => {
    setFormData({ ...formData, code });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category, clave: "" });
  };

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingIncident) {
      setIncidents(incidents.map(i => 
        i.id === editingIncident.id 
          ? { ...i, date: formData.date, type: formData.category, description: formData.description, horaSalida: formData.horaSalida, horaLlegada: formData.horaLlegada, clave: formData.clave, lugar: formData.lugar }
          : i
      ));
    } else {
      const newIncident: IncidentRecord = {
        id: Date.now().toString(),
        date: formData.date || new Date().toISOString().split("T")[0],
        type: formData.category,
        description: formData.description,
        horaSalida: formData.horaSalida,
        horaLlegada: formData.horaLlegada,
        clave: formData.clave,
        lugar: formData.lugar,
      };
      setIncidents([newIncident, ...incidents]);
      setSelectedIncident(newIncident.id);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const bomber = septimaBombers.find(b => b.id === formData.bomberId);
    if (!bomber || !selectedIncident) return;

    if (editingAttendance) {
      setAttendance(attendance.map(a => 
        a.id === editingAttendance.id 
          ? { ...a, code: formData.code, notes: formData.notes || null }
          : a
      ));
    } else {
      const newAttendance: AttendanceRecord = {
        id: Date.now().toString(),
        bomberId: bomber.id,
        bomberNro: bomber.nro,
        bomberName: bomber.name,
        incidentId: selectedIncident,
        code: formData.code,
        notes: formData.notes || null,
      };
      setAttendance([...attendance, newAttendance]);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEditAttendance = (record: AttendanceRecord) => {
    setEditingAttendance(record);
    setFormData({
      ...formData,
      bomberId: record.bomberId,
      code: record.code,
      notes: record.notes || "",
      lugar: "",
      clave: "",
    });
    setModalType("attendance");
    setIsModalOpen(true);
  };

  const handleEditIncident = (incident: IncidentRecord) => {
    setEditingIncident(incident);
    setFormData({
      date: incident.date,
      category: incident.type,
      description: incident.description,
      horaSalida: incident.horaSalida,
      horaLlegada: incident.horaLlegada,
      clave: incident.clave,
      lugar: incident.lugar,
      bomberId: "",
      code: "",
      notes: "",
    });
    setModalType("incident");
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      date: "",
      category: "",
      description: "",
      horaSalida: "",
      horaLlegada: "",
      clave: "",
      lugar: "",
      bomberId: "",
      code: "",
      notes: "",
    });
    setEditingAttendance(null);
    setEditingIncident(null);
  };

  const getEmergencyTypeLabel = (type: string) => {
    const category = emergencyCategories.find(e => e.value === type);
    return category?.label || type;
  };

  const getEmergencyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "1": "bg-red-500/20 text-red-400",
      "2": "bg-green-500/20 text-green-400",
      "3": "bg-blue-500/20 text-blue-400",
      "4": "bg-yellow-500/20 text-yellow-400",
      "5": "bg-orange-500/20 text-orange-400",
      "6": "bg-purple-500/20 text-purple-400",
      "7": "bg-gray-500/20 text-gray-400",
      "8": "bg-cyan-500/20 text-cyan-400",
      "9": "bg-pink-500/20 text-pink-400",
      "10": "bg-indigo-500/20 text-indigo-400",
      "11": "bg-amber-500/20 text-amber-400",
      "12": "bg-teal-500/20 text-teal-400",
      "13": "bg-rose-500/20 text-rose-400",
      "14": "bg-yellow-600/20 text-yellow-600",
      "15": "bg-sky-500/20 text-sky-400",
      "16": "bg-slate-500/20 text-slate-400",
    };
    return colors[type] || "bg-gray-500/20 text-gray-400";
  };

  const openAddModal = (type: "incident" | "attendance") => {
    resetForm();
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Control de Asistencia CBVM
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Sistema de asistencia según clasificación de emergencia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] text-gray-300 rounded-md hover:bg-[#2A2A2A] transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => openAddModal("incident")}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962F] text-black px-4 py-2 rounded-md transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Nueva Salida
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 font-medium">P</span>
          <span className="text-gray-400">Fue al lugar</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30 font-medium">P</span>
          <span className="text-gray-400">Otras funciones</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 font-medium">A</span>
          <span className="text-gray-400">Ausente</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30 font-medium">L</span>
          <span className="text-gray-400">Licencia</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-400 text-sm">P Fue al lugar</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{stats.present}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">P Otras funciones</p>
          <p className="text-3xl font-bold text-red-400 mt-1">{stats.presentAbsence}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-400 text-sm">A Ausente</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{stats.absent}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">L Licencia</p>
          <p className="text-3xl font-bold text-red-400 mt-1">{stats.license}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4">
          <p className="text-[#D4AF37] text-sm">Tasa</p>
          <p className="text-3xl font-bold text-[#D4AF37] mt-1">{stats.rate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Salidas / Eventos</h2>
            <button
              onClick={() => openAddModal("incident")}
              className="p-1.5 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por fecha o tipo..."
              value={incidentFilter}
              onChange={(e) => setIncidentFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white text-sm focus:outline-none focus:border-[#C41E3A]"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredIncidents.map((incident) => (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedIncident === incident.id
                    ? "bg-[#C41E3A]/10 border-[#C41E3A]/50"
                    : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#3A3A3A]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${getEmergencyTypeColor(incident.type)}`}>
                        {incident.clave}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(incident.date).toLocaleDateString("es-CL")}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium mt-1">
                      {getEmergencyTypeLabel(incident.type)}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                      {incident.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {incident.horaSalida} - {incident.horaLlegada}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditIncident(incident); }}
                    className="text-gray-500 hover:text-white text-xs px-2 py-1 transition-colors"
                  >
                    Editar
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {currentIncident ? (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#2A2A2A] bg-[#0F0F0F]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${getEmergencyTypeColor(currentIncident.type)}`}>
                        {currentIncident.clave}
                      </span>
                      <h2 className="text-lg font-semibold text-white">
                        {getEmergencyTypeLabel(currentIncident.type)}
                      </h2>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{currentIncident.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {new Date(currentIncident.date).toLocaleDateString("es-CL", { 
                        weekday: "long", 
                        day: "numeric", 
                        month: "long",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-[#D4AF37] text-sm mt-1">
                      {currentIncident.horaSalida} - {currentIncident.horaLlegada}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Control de Asistencia</h3>
                  <button
                    onClick={() => openAddModal("attendance")}
                    className="flex items-center gap-1 text-sm text-[#C41E3A] hover:text-[#A01830] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Bombero
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2A2A2A]">
                        <th className="text-left text-gray-400 text-sm font-medium py-2 px-3">Grado</th>
                        <th className="text-left text-gray-400 text-sm font-medium py-2 px-3">Bombero</th>
                        <th className="text-center text-gray-400 text-sm font-medium py-2 px-3">Código</th>
                        <th className="text-left text-gray-400 text-sm font-medium py-2 px-3">Observaciones</th>
                        <th className="text-right text-gray-400 text-sm font-medium py-2 px-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {septimaBombers.map((bomber) => {
                        const attendance = currentAttendance.find(
                          a => a.bomberId === bomber.id
                        );
                        return (
                          <tr key={bomber.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]/50">
                            <td className="py-2 px-3 text-gray-400 text-sm">{bomber.nro}</td>
                            <td className="py-2 px-3 text-white text-sm font-medium">{bomber.name}</td>
                            <td className="py-2 px-3 text-center">
                              {attendance ? (
                                <span className={`px-3 py-1 rounded font-bold ${getCodeColor(attendance.code)}`}>
                                  {attendance.code}
                                </span>
                              ) : (
                                <span className="text-gray-600">-</span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-gray-400 text-sm">
                              {attendance?.notes || <span className="text-gray-600">-</span>}
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button 
                                onClick={() => attendance && handleEditAttendance(attendance)}
                                className="text-gray-500 hover:text-white text-sm transition-colors"
                              >
                                Editar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Selecciona un evento para ver la asistencia</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">
                {modalType === "incident" ? (editingIncident ? "Editar Salida" : "Registrar Nueva Salida") : editingAttendance ? "Editar Asistencia" : "Registrar Asistencia"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <form onSubmit={modalType === "incident" ? handleAddIncident : handleAddAttendance} className="p-4 space-y-4">
              {modalType === "incident" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Fecha *</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Categoría *</label>
                      <select 
                        required
                        value={formData.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      >
                        <option value="">Seleccionar categoría...</option>
                        {emergencyCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Subclave *</label>
                      <select 
                        required
                        value={formData.clave}
                        onChange={(e) => setFormData({ ...formData, clave: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                        disabled={!formData.category}
                      >
                        <option value="">Seleccionar subclave...</option>
                        {subKeys.map((key) => (
                          <option key={key.value} value={key.value}>{key.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                    <textarea 
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      placeholder="Dirección, detalles del incidente..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Hora Salida *</label>
                      <input 
                        type="time" 
                        required 
                        value={formData.horaSalida}
                        onChange={(e) => setFormData({ ...formData, horaSalida: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Hora Llegada</label>
                      <input 
                        type="time" 
                        value={formData.horaLlegada}
                        onChange={(e) => setFormData({ ...formData, horaLlegada: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {!editingAttendance && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Bombero *</label>
                      <select 
                        required
                        value={formData.bomberId}
                        onChange={(e) => setFormData({ ...formData, bomberId: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      >
                        <option value="">Seleccionar bombero...</option>
                        {septimaBombers.map((bomber) => (
                          <option key={bomber.id} value={bomber.id}>
                            {bomber.nro} - {bomber.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Código de Asistencia *</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectCode("P")}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.code === "P" 
                            ? "bg-blue-500/30 border-blue-400 text-blue-400" 
                            : "bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30"
                        }`}
                      >
                        <span className="text-xl font-bold">P</span>
                        <span className="block text-xs mt-1 opacity-70">Presente</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectCode("PA")}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.code === "PA" 
                            ? "bg-red-500/30 border-red-400 text-red-400" 
                            : "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                        }`}
                      >
                        <span className="text-xl font-bold">PA</span>
                        <span className="block text-xs mt-1 opacity-70">P. Ausente</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectCode("A")}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.code === "A" 
                            ? "bg-gray-500/50 border-gray-400 text-gray-300" 
                            : "bg-gray-500/20 border-gray-500/50 text-gray-400 hover:bg-gray-500/30"
                        }`}
                      >
                        <span className="text-xl font-bold">A</span>
                        <span className="block text-xs mt-1 opacity-70">Ausente</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectCode("L")}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.code === "L" 
                            ? "bg-orange-500/30 border-orange-400 text-orange-400" 
                            : "bg-orange-500/20 border-orange-500/50 text-orange-400 hover:bg-orange-500/30"
                        }`}
                      >
                        <span className="text-xl font-bold">L</span>
                        <span className="block text-xs mt-1 opacity-70">Licencia</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Observaciones</label>
                    <textarea 
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                      placeholder="Motivo de ausencia, reemplazo, etc."
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => { resetForm(); setIsModalOpen(false); }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={modalType === "attendance" && !formData.code}
                  className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingAttendance ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
