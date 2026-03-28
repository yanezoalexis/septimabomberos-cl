"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FileDown } from "lucide-react";

const asistenciaData = [
  { name: "Ene", asistencia: 85, inasistencias: 15 },
  { name: "Feb", asistencia: 78, inasistencias: 22 },
  { name: "Mar", asistencia: 92, inasistencias: 8 },
  { name: "Abr", asistencia: 88, inasistencias: 12 },
  { name: "May", asistencia: 75, inasistencias: 25 },
  { name: "Jun", asistencia: 82, inasistencias: 18 },
];

const inventarioData = [
  { name: "Eq. Protección", value: 35, color: "#C41E3A" },
  { name: "Mangueras", value: 28, color: "#D4AF37" },
  { name: "Herramientas", value: 22, color: "#228B22" },
  { name: "Rescate", value: 15, color: "#4169E1" },
];

const salidasData = [
  { name: "Ene", emergencias: 12, practicas: 8 },
  { name: "Feb", emergencias: 15, practicas: 10 },
  { name: "Mar", emergencias: 10, practicas: 12 },
  { name: "Abr", emergencias: 18, practicas: 6 },
];

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Reportes y Estadísticas
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Análisis y visualización de datos
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#3A3A3A] text-gray-300 rounded-md hover:bg-[#2A2A2A] transition-colors">
          <FileDown className="w-4 h-4" />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <p className="text-gray-400 text-sm">Asistencia Promedio</p>
          <p className="text-3xl font-bold text-white mt-1">83%</p>
          <p className="text-green-400 text-xs mt-2">+5% vs mes anterior</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <p className="text-gray-400 text-sm">Total Items Inventario</p>
          <p className="text-3xl font-bold text-white mt-1">156</p>
          <p className="text-gray-500 text-xs mt-2">En 8 categorías</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <p className="text-gray-400 text-sm">Salidas Totales</p>
          <p className="text-3xl font-bold text-white mt-1">73</p>
          <p className="text-gray-500 text-xs mt-2">Últimos 6 meses</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <p className="text-gray-400 text-sm">Vehículos Operativos</p>
          <p className="text-3xl font-bold text-white mt-1">80%</p>
          <p className="text-yellow-400 text-xs mt-2">2 en mantención</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Asistencia Mensual</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={asistenciaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px" }} />
                <Bar dataKey="asistencia" fill="#C41E3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Inventario por Categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventarioData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {inventarioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {inventarioData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400 text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Salidas por Mes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salidasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="emergencias" stroke="#C41E3A" strokeWidth={2} />
                <Line type="monotone" dataKey="practicas" stroke="#D4AF37" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C41E3A]" />
              <span className="text-gray-400 text-xs">Emergencias</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <span className="text-gray-400 text-xs">Prácticas</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Top 5 Bomberos con Mayor Asistencia</h3>
          <div className="space-y-3">
            {[
              { name: "Carlos Mendoza", asistencia: 95 },
              { name: "Juan Pérez", asistencia: 92 },
              { name: "Roberto Sánchez", asistencia: 88 },
              { name: "Miguel Torres", asistencia: 85 },
              { name: "Pedro Ramírez", asistencia: 82 },
            ].map((bombero, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#C41E3A] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="flex-1 text-gray-300 text-sm">{bombero.name}</span>
                <div className="w-32 h-2 bg-[#0F0F0F] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C41E3A] rounded-full" style={{ width: `${bombero.asistencia}%` }} />
                </div>
                <span className="text-gray-400 text-sm w-10 text-right">{bombero.asistencia}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
