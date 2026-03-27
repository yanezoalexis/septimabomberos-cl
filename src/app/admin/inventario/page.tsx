"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, FileDown, FileSpreadsheet, X, AlertCircle } from "lucide-react";
import { getStatusColor, getStatusLabel, categories } from "@/lib/utils";
import { createInventoryItem, updateInventoryItem, deleteInventoryItem } from "@/actions/inventory";

interface InventoryItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  quantity: number;
  minStock: number;
  location: string | null;
  status: string;
  acquisitionDate: string | null;
  createdAt: string;
}

export default function InventarioPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setItems([
      { id: "1", name: "Manguera 2.5\"", description: "Manguera de alta presión", category: "Mangueras", quantity: 24, minStock: 10, location: "Cuartel - Estante A", status: "NUEVO", acquisitionDate: "2024-01-15", createdAt: "2024-01-15" },
      { id: "2", name: "Casco de Rescate", description: "Casco táctico de rescate", category: "Equipos de Protección", quantity: 15, minStock: 5, location: "Cuartel - Estante B", status: "USADO", acquisitionDate: "2023-06-20", createdAt: "2023-06-20" },
      { id: "3", name: "Motobomba", description: "Motobomba de achique", category: "Herramientas", quantity: 3, minStock: 2, location: "Garaje - Slot 1", status: "NUEVO", acquisitionDate: "2024-02-10", createdAt: "2024-02-10" },
      { id: "4", name: "Equipo de respiración", description: "SCBA autonomía 45min", category: "Equipos de Rescate", quantity: 8, minStock: 4, location: "Cuartel - Estante C", status: "USADO", acquisitionDate: "2022-11-05", createdAt: "2022-11-05" },
      { id: "5", name: "Linterna táctica", description: "Linterna LED 1000 lumens", category: "Herramientas", quantity: 12, minStock: 6, location: "Cuartel - Estante B", status: "NUEVO", acquisitionDate: "2024-03-01", createdAt: "2024-03-01" },
    ]);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    if (editingItem) {
      formData.set("id", editingItem.id);
      const result = await updateInventoryItem(formData);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }
    } else {
      const result = await createInventoryItem(formData);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    const result = await deleteInventoryItem(id);
    if (result.success) {
      setItems(items.filter((item) => item.id !== id));
    }
    setDeleteConfirm(null);
  }

  function openEditModal(item: InventoryItem) {
    setEditingItem(item);
    setIsModalOpen(true);
  }

  function exportToPDF() {
    window.print();
  }

  function exportToExcel() {
    const headers = ["Nombre", "Categoría", "Cantidad", "Stock Mínimo", "Ubicación", "Estado"];
    const rows = filteredItems.map((item) => [
      item.name,
      item.category,
      item.quantity.toString(),
      item.minStock.toString(),
      item.location || "",
      getStatusLabel(item.status),
    ]);
    
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `inventario_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Inventario General
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Gestión de materiales y equipos
          </p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Item
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#C41E3A]"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
          >
            <option value="">Todos los estados</option>
            <option value="NUEVO">Nuevo</option>
            <option value="USADO">Usado</option>
            <option value="MAL_ESTADO">Mal Estado</option>
            <option value="BAJA">Dado de Baja</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] text-gray-300 rounded-md hover:bg-[#2A2A2A] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] text-gray-300 rounded-md hover:bg-[#2A2A2A] transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0F0F0F]">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Nombre</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Categoría</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Cantidad</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Ubicación</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Estado</th>
                <th className="text-right text-gray-400 text-sm font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F] transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{item.category}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${item.quantity <= item.minStock ? "text-red-400" : "text-white"}`}>
                        {item.quantity}
                      </span>
                      {item.quantity <= item.minStock && (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{item.location || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
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
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron items</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">
                {editingItem ? "Editar Item" : "Agregar Item"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

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
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Categoría *</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category}
                    required
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || "NUEVO"}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    <option value="NUEVO">Nuevo</option>
                    <option value="USADO">Usado</option>
                    <option value="MAL_ESTADO">Mal Estado</option>
                    <option value="BAJA">Dado de Baja</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={editingItem?.quantity || 0}
                    min="0"
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    name="minStock"
                    defaultValue={editingItem?.minStock || 0}
                    min="0"
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingItem?.location || ""}
                  placeholder="Ej: Cuartel - Estante A"
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de Adquisición</label>
                <input
                  type="date"
                  name="acquisitionDate"
                  defaultValue={editingItem?.acquisitionDate?.split("T")[0] || ""}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Guardando..." : editingItem ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
