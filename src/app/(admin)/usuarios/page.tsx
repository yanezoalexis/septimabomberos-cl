"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Shield, User } from "lucide-react";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserData[]>([
    { id: "1", name: "Carlos Mendoza", email: "carlos.mendoza@7ciabomberos.cl", role: "ADMIN", isActive: true, createdAt: "2023-01-15", lastLogin: "2024-03-27" },
    { id: "2", name: "Juan Pérez", email: "juan.perez@7ciabomberos.cl", role: "BOMBERO", isActive: true, createdAt: "2023-03-20", lastLogin: "2024-03-26" },
    { id: "3", name: "Roberto Sánchez", email: "roberto.sanchez@7ciabomberos.cl", role: "BOMBERO", isActive: true, createdAt: "2023-05-10", lastLogin: "2024-03-25" },
    { id: "4", name: "Miguel Torres", email: "miguel.torres@7ciabomberos.cl", role: "BOMBERO", isActive: true, createdAt: "2023-08-15", lastLogin: "2024-03-24" },
    { id: "5", name: "Pedro Ramírez", email: "pedro.ramirez@7ciabomberos.cl", role: "BOMBERO", isActive: false, createdAt: "2023-09-01", lastLogin: "2024-02-15" },
    { id: "6", name: "Ana María López", email: "ana.lopez@7ciabomberos.cl", role: "BOMBERO", isActive: true, createdAt: "2024-01-10", lastLogin: "2024-03-20" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const activeUsers = users.filter((u) => u.isActive).length;
  const adminUsers = users.filter((u) => u.role === "ADMIN").length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...editingUser } : u)));
    } else {
      const newUser: UserData = {
        id: Date.now().toString(),
        name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
        email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
        role: (e.currentTarget.elements.namedItem("role") as HTMLSelectElement).value,
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: null,
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  }

  function handleDelete(id: string) {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  }

  function toggleActive(id: string) {
    setUsers(users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Gestión de Usuarios
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Administradores y bomberos
          </p>
        </div>
        <button
          onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#C41E3A]/10 rounded-lg">
              <User className="w-6 h-6 text-[#C41E3A]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Usuarios</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <User className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Activos</p>
              <p className="text-3xl font-bold text-white">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#D4AF37]/10 rounded-lg">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Administradores</p>
              <p className="text-3xl font-bold text-white">{adminUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#C41E3A]"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]"
          >
            <option value="">Todos los roles</option>
            <option value="ADMIN">Administrador</option>
            <option value="BOMBERO">Bombero</option>
          </select>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0F0F0F]">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Usuario</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Email</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Rol</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Estado</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Último Acceso</th>
                <th className="text-right text-gray-400 text-sm font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#C41E3A] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <span className="text-white text-sm font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full flex w-fit ${
                      user.role === "ADMIN" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {user.role === "ADMIN" ? (
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>
                      ) : "Bombero"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleActive(user.id)}>
                      <span className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                        user.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{user.lastLogin || "Nunca"}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {deleteConfirm === user.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(user.id)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Confirmar</button>
                          <button onClick={() => setDeleteConfirm(null)} className="p-1.5 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(user.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
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
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron usuarios</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">
                {editingUser ? "Editar Usuario" : "Agregar Usuario"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                <input type="text" name="name" defaultValue={editingUser?.name} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                <input type="email" name="email" defaultValue={editingUser?.email} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña {editingUser ? "(dejar vacío para no cambiar)" : "*"}</label>
                <input type="password" name="password" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rol *</label>
                <select name="role" defaultValue={editingUser?.role || "BOMBERO"} required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                  <option value="ADMIN">Administrador</option>
                  <option value="BOMBERO">Bombero</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md">{editingUser ? "Actualizar" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
