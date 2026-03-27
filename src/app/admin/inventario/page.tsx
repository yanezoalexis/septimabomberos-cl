"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, X, AlertCircle, Package, Truck, Warehouse, Building2, ChevronDown, ChevronUp, ArrowDown, ArrowUp, Eye, Calendar, MapPin, Hash, AlertTriangle } from "lucide-react";

type LocationType = "UNIDADES" | "BODEGA_INFERIOR" | "BODEGA_SUPERIOR" | "CUARTEL";
type ItemStatus = "NUEVO" | "USADO" | "MAL_ESTADO" | "BAJA";
type VehicleCode = "M-71" | "M-72" | "M-73" | "UR-3" | "";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  minStock: number;
  location: string;
  unit?: string;
  status: ItemStatus;
  acquisitionDate: string;
}

const locationConfig: Record<LocationType, { label: string; icon: typeof Package; color: string; description: string }> = {
  UNIDADES: { label: "Unidades", icon: Truck, color: "text-blue-400", description: "Equipos en vehículos M-71, M-72, M-73, UR-3" },
  BODEGA_INFERIOR: { label: "Bodega Inferior", icon: ArrowDown, color: "text-yellow-400", description: "Material mayor y equipos pesados" },
  BODEGA_SUPERIOR: { label: "Bodega Superior", icon: ArrowUp, color: "text-orange-400", description: "Material menor y materiales de aseo" },
  CUARTEL: { label: "Cuartel", icon: Building2, color: "text-green-400", description: "Equipos en dependencias del cuartel" },
};

const vehicleUnits = [
  { value: "", label: "General" },
  { value: "M-71", label: "M-71" },
  { value: "M-72", label: "M-72" },
  { value: "M-73", label: "M-73" },
  { value: "UR-3", label: "UR-3" },
];

const statusOptions: { value: ItemStatus; label: string; color: string }[] = [
  { value: "NUEVO", label: "Nuevo", color: "bg-green-500/20 text-green-400" },
  { value: "USADO", label: "Usado", color: "bg-blue-500/20 text-blue-400" },
  { value: "MAL_ESTADO", label: "Mal Estado", color: "bg-orange-500/20 text-orange-400" },
  { value: "BAJA", label: "Dado de Baja", color: "bg-red-500/20 text-red-400" },
];

const initialItems: InventoryItem[] = [
  { id: "1", name: "Manguera 2.5\"", description: "Manguera de alta presión", quantity: 8, minStock: 4, location: "BODEGA_INFERIOR", status: "NUEVO", acquisitionDate: "2024-01-15" },
  { id: "2", name: "Casco de Rescate", description: "Casco táctico", quantity: 4, minStock: 2, location: "UNIDADES", unit: "M-71", status: "USADO", acquisitionDate: "2023-06-20" },
  { id: "3", name: "Chamairo", description: "Overol de protección", quantity: 6, minStock: 3, location: "UNIDADES", unit: "M-72", status: "USADO", acquisitionDate: "2023-03-10" },
  { id: "4", name: "Linterna LED", description: "Linterna táctica 1000 lumens", quantity: 4, minStock: 2, location: "UNIDADES", unit: "M-73", status: "NUEVO", acquisitionDate: "2024-02-01" },
  { id: "5", name: "Rozadora", description: "Rozadora de emergencia", quantity: 2, minStock: 1, location: "BODEGA_INFERIOR", status: "USADO", acquisitionDate: "2022-11-05" },
  { id: "6", name: "Extractor de Humo", description: "Extractor axial", quantity: 1, minStock: 1, location: "BODEGA_INFERIOR", status: "NUEVO", acquisitionDate: "2024-01-20" },
  { id: "7", name: "Botiquín Completo", description: "Kit de primeros auxilios", quantity: 3, minStock: 2, location: "CUARTEL", status: "NUEVO", acquisitionDate: "2023-12-01" },
  { id: "8", name: "Escalera de 10m", description: "Escalera de aluminio", quantity: 2, minStock: 1, location: "BODEGA_INFERIOR", status: "USADO", acquisitionDate: "2022-05-15" },
  { id: "9", name: "Detergente Industrial", description: "Para limpieza de equipos", quantity: 5, minStock: 3, location: "BODEGA_SUPERIOR", status: "NUEVO", acquisitionDate: "2024-03-01" },
  { id: "10", name: "Escobillón", description: "Escoba industrial", quantity: 4, minStock: 2, location: "BODEGA_SUPERIOR", status: "USADO", acquisitionDate: "2023-08-20" },
  { id: "11", name: "Trapeador", description: "Trapeador de cotton", quantity: 6, minStock: 4, location: "BODEGA_SUPERIOR", status: "USADO", acquisitionDate: "2023-08-20" },
  { id: "12", name: "Guantes de Latex", description: "Guantes descartables caja x100", quantity: 10, minStock: 5, location: "BODEGA_SUPERIOR", status: "NUEVO", acquisitionDate: "2024-02-15" },
  { id: "13", name: "Equipo SCBA", description: "Equipo respiración autónoma", quantity: 2, minStock: 2, location: "UNIDADES", unit: "M-71", status: "USADO", acquisitionDate: "2021-06-10" },
  { id: "14", name: "Manguera 1.5\"", description: "Manguera de ataque", quantity: 6, minStock: 4, location: "BODEGA_INFERIOR", status: "NUEVO", acquisitionDate: "2024-01-15" },
  { id: "15", name: "Hidrolavadora", description: "Para limpieza de unidades", quantity: 1, minStock: 1, location: "BODEGA_SUPERIOR", status: "NUEVO", acquisitionDate: "2023-11-01" },
  { id: "16", name: "Hacha de Rescate", description: "Hacha de emergencia", quantity: 4, minStock: 2, location: "BODEGA_SUPERIOR", status: "USADO", acquisitionDate: "2020-05-15" },
  { id: "17", name: "Mascarilla KN95", description: "Caja x50 unidades", quantity: 8, minStock: 5, location: "BODEGA_SUPERIOR", status: "NUEVO", acquisitionDate: "2024-01-10" },
  { id: "18", name: "Botas de Goma", description: "Botas para zona inundada", quantity: 6, minStock: 3, location: "BODEGA_SUPERIOR", status: "USADO", acquisitionDate: "2022-03-20" },
  { id: "19", name: "Cortante para Vidrio", description: "Cortador de cristal", quantity: 3, minStock: 2, location: "BODEGA_SUPERIOR", status: "NUEVO", acquisitionDate: "2023-11-05" },
  { id: "20", name: "Lona de 6x8m", description: "Lona para cubrimiento", quantity: 4, minStock: 2, location: "BODEGA_INFERIOR", status: "USADO", acquisitionDate: "2021-08-10" },
  { id: "21", name: "Generador Eléctrico", description: "Generador 5000W", quantity: 1, minStock: 1, location: "BODEGA_INFERIOR", status: "NUEVO", acquisitionDate: "2023-06-01" },
  { id: "22", name: "Radio Handy", description: "Radio de comunicación", quantity: 6, minStock: 4, location: "CUARTEL", status: "USADO", acquisitionDate: "2022-01-15" },
  { id: "23", name: "Cuaderno de Bitácora", description: "Bitácora de salidas", quantity: 5, minStock: 2, location: "CUARTEL", status: "NUEVO", acquisitionDate: "2024-01-01" },
  { id: "24", name: "Impresora", description: "Impresora laser", quantity: 1, minStock: 1, location: "CUARTEL", status: "USADO", acquisitionDate: "2022-06-10" },
];

export default function InventarioPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<LocationType>("UNIDADES");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const filteredItems = items.filter((item) => {
    const matchesLocation = item.location === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = !selectedUnit || item.unit === selectedUnit || (!item.unit && !selectedUnit);
    return matchesLocation && matchesSearch && matchesUnit;
  });

  const groupedByCategory = filteredItems.reduce((acc, item) => {
    const key = item.unit || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusInfo = (status: ItemStatus) => statusOptions.find((s) => s.value === status) || statusOptions[0];

  const getTotalByLocation = (location: LocationType) => {
    return items.filter((item) => item.location === location).length;
  };

  const getLowStockByLocation = (location: LocationType) => {
    return items.filter((item) => item.location === location && item.quantity <= item.minStock).length;
  };

  function openAddModal() {
    setEditingItem(null);
    setIsModalOpen(true);
  }

  function openEditModal(item: InventoryItem) {
    setEditingItem(item);
    setIsModalOpen(true);
  }

  function openDetailModal(item: InventoryItem) {
    setDetailItem(item);
    setIsDetailModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const itemData: InventoryItem = {
      id: editingItem?.id || Date.now().toString(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      quantity: parseInt(formData.get("quantity") as string) || 0,
      minStock: parseInt(formData.get("minStock") as string) || 0,
      location: activeTab,
      unit: formData.get("unit") as string || undefined,
      status: formData.get("status") as ItemStatus || "NUEVO",
      acquisitionDate: formData.get("acquisitionDate") as string || new Date().toISOString().split("T")[0],
    };

    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? itemData : item)));
    } else {
      setItems([...items, itemData]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
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
            Inventario
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Gestión de materiales por ubicación
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Item
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(locationConfig) as LocationType[]).map((key) => {
          const config = locationConfig[key];
          const Icon = config.icon;
          const lowStock = getLowStockByLocation(key);
          const total = getTotalByLocation(key);
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? "border-[#C41E3A] bg-[#C41E3A]/10"
                  : "border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#3A3A3A]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${isActive ? "bg-[#C41E3A]/20" : "bg-[#2A2A2A]"}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#C41E3A]" : config.color}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-300"}`}>
                    {config.label}
                  </p>
                </div>
                {lowStock > 0 && (
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">
                    {lowStock}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{config.description}</p>
              <p className="text-xs text-gray-600 mt-1">{total} items</p>
            </button>
          );
        })}
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
          {activeTab === "UNIDADES" && (
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
            >
              {vehicleUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByCategory).length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-12 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No hay items en esta ubicación</p>
            <button
              onClick={openAddModal}
              className="mt-4 text-[#C41E3A] hover:underline"
            >
              Agregar el primer item
            </button>
          </div>
        ) : (
          Object.entries(groupedByCategory).map(([category, categoryItems]) => (
            <div key={category} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 bg-[#0F0F0F] hover:bg-[#151515] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C41E3A]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#C41E3A] font-bold">{categoryItems.length}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">
                      {category === "General" ? `Ubicación: ${locationConfig[activeTab].label}` : `Unidad ${category}`}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {categoryItems.reduce((sum, item) => sum + item.quantity, 0)} unidades en total
                    </p>
                  </div>
                </div>
                {expandedCategories[category] ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedCategories[category] && (
                <div className="border-t border-[#2A2A2A]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2A2A2A] bg-[#0F0F0F]/50">
                        <th className="text-left text-gray-400 text-xs font-medium py-2 px-4">Nombre</th>
                        <th className="text-left text-gray-400 text-xs font-medium py-2 px-4">Descripción</th>
                        <th className="text-center text-gray-400 text-xs font-medium py-2 px-4">Cantidad</th>
                        <th className="text-center text-gray-400 text-xs font-medium py-2 px-4">Mínimo</th>
                        <th className="text-center text-gray-400 text-xs font-medium py-2 px-4">Estado</th>
                        <th className="text-right text-gray-400 text-xs font-medium py-2 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryItems.map((item) => {
                        const statusInfo = getStatusInfo(item.status);
                        const isLowStock = item.quantity <= item.minStock;

                        return (
                          <tr key={item.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]/50 transition-colors">
                            <td className="py-3 px-4">
                              <p className="text-white text-sm font-medium">{item.name}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-gray-400 text-sm">{item.description}</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <span className={`text-sm font-bold ${isLowStock ? "text-red-400" : "text-white"}`}>
                                  {item.quantity}
                                </span>
                                {isLowStock && <AlertCircle className="w-4 h-4 text-red-400" />}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-gray-500 text-sm">{item.minStock}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => openDetailModal(item)}
                                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                  title="Ver Detalle"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openEditModal(item)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {deleteConfirm === item.id ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="px-2 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded"
                                    >
                                      Eliminar
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm(null)}
                                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirm(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                    title="Eliminar"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">
                {editingItem ? "Editar Item" : `Agregar Item - ${locationConfig[activeTab].label}`}
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
                  placeholder="Ej: Manguera 2.5 pulgadas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  placeholder="Descripción del item..."
                />
              </div>

              {activeTab === "UNIDADES" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Unidad</label>
                  <select
                    name="unit"
                    defaultValue={editingItem?.unit || ""}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  >
                    {vehicleUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={editingItem?.quantity || 1}
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    name="minStock"
                    defaultValue={editingItem?.minStock || 1}
                    min="0"
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                <select
                  name="status"
                  defaultValue={editingItem?.status || "NUEVO"}
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de Adquisición</label>
                <input
                  type="date"
                  name="acquisitionDate"
                  defaultValue={editingItem?.acquisitionDate || new Date().toISOString().split("T")[0]}
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
                  className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md transition-colors"
                >
                  {editingItem ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailModalOpen && detailItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A1A] border-b border-[#2A2A2A] p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Package className="w-6 h-6 text-[#C41E3A]" />
                Detalle del Item
              </h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)} 
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{detailItem.name}</h3>
                  <p className="text-gray-400 mt-1">{detailItem.description}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusInfo(detailItem.status).color}`}>
                  {getStatusInfo(detailItem.status).label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F0F0F] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">Cantidad Actual</span>
                  </div>
                  <p className={`text-3xl font-bold ${detailItem.quantity <= detailItem.minStock ? "text-red-400" : "text-white"}`}>
                    {detailItem.quantity}
                  </p>
                  {detailItem.quantity <= detailItem.minStock && (
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Stock bajo (mínimo: {detailItem.minStock})</span>
                    </div>
                  )}
                </div>
                <div className="bg-[#0F0F0F] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Stock Mínimo</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{detailItem.minStock}</p>
                </div>
              </div>

              <div className="border-t border-[#2A2A2A] pt-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Información Adicional</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#C41E3A]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ubicación</p>
                      <p className="text-white">
                        {locationConfig[detailItem.location as LocationType]?.label || detailItem.location}
                        {detailItem.unit && ` - Unidad ${detailItem.unit}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#C41E3A]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de Adquisición</p>
                      <p className="text-white">
                        {new Date(detailItem.acquisitionDate).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-lg flex items-center justify-center">
                      <Hash className="w-5 h-5 text-[#C41E3A]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ID del Item</p>
                      <p className="text-white font-mono text-sm">{detailItem.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#2A2A2A]">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    openEditModal(detailItem);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-3 rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar Item
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-6 py-3 border border-[#3A3A3A] text-gray-400 hover:text-white hover:border-gray-500 rounded-md transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
