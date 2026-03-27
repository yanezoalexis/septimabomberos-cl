"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, User } from "lucide-react";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface MaterialItem {
  id: string;
  name: string;
  description: string | null;
  status: string;
  assignedTo: { id: string; name: string } | null;
  createdAt: string;
}

const mockUsers = [
  { id: "1", name: "Carlos Mendoza" },
  { id: "2", name: "Juan Pérez" },
  { id: "3", name: "Roberto Sánchez" },
];

export default function MaterialMenorPage() {
  const [items, setItems] = useState<MaterialItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setItems([
      { id: "1", name: "Llave francesa 10\"", description: "Llave adjustable", status: "DISPONIBLE", assignedTo: null, createdAt: "2024-01-15" },
      { id: "2", name: "Destornillador Phillips", description: "Phillips #2", status: "ASIGNADO", assignedTo: { id: "1", name: "Carlos Mendoza" }, createdAt: "2024-01-15" },
      { id: "3", name: "Alicates universales", description: "8\" Stanley", status: "ASIGNADO", assignedTo: { id: "2", name: "Juan Pérez" }, createdAt: "2024-02-10" },
      { id: "4", name: "Cortafrío", description: "Para cable", status: "EN_MANTENCION", assignedTo: null, createdAt: "2024-03-01" },
      { id: "5", name: "Pinza de presión", description: "10\"", status: "PERDIDO", assignedTo: null, createdAt: "2023-11-05" },
    ]);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (editingItem) {
        setItems(items.map((i) => (i.id === editingItem.id ? { ...editingItem } : i)));
      } else {
        const newItem: MaterialItem = {
          id: Date.now().toString(),
          name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
          description: (e.currentTarget.elements.namedItem("description") as HTMLInputElement).value || null,
          status: (e.currentTarget.elements.namedItem("status") as HTMLSelectElement).value,
          assignedTo: null,
          createdAt: new Date().toISOString(),
        };
        setItems([newItem, ...items]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setIsLoading(false);
    }, 500);
  }

  function handleDelete(id: string) {
    setItems(items.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Material Menor
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Herramientas y equipos menores
          </p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#C41E3A]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
          >
            <option value="">Todos los estados</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="ASIGNADO">Asignado</option>
            <option value="EN_MANTENCION">En Mantención</option>
            <option value="PERDIDO">Perdido</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 hover:border-[#3A3A3A] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                )}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
            {item.assignedTo && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <User className="w-4 h-4" />
                {item.assignedTo.name}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              {deleteConfirm === item.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="p-1.5 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
          <p className="text-gray-500">No se encontraron materiales</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">
                {editingItem ? "Editar" : "Agregar Material"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name}
                  required
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                <select
                  name="status"
                  defaultValue={editingItem?.status || "DISPONIBLE"}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                >
                  <option value="DISPONIBLE">Disponible</option>
                  <option value="ASIGNADO">Asignado</option>
                  <option value="EN_MANTENCION">En Mantención</option>
                  <option value="PERDIDO">Perdido</option>
                </select>
              </div>
              {editingItem?.status === "ASIGNADO" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Asignado a</label>
                  <select
                    name="assignedTo"
                    defaultValue={editingItem?.assignedTo?.id || ""}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    <option value="">Seleccionar...</option>
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">
                  Cancelar
                </button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md disabled:opacity-50">
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function openEditModal(item: MaterialItem) {
  throw new Error("Function not implemented.");
}
