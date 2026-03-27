"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const asistenciaData = [
  { name: "Lun", asistencia: 42 },
  { name: "Mar", asistencia: 38 },
  { name: "Mié", asistencia: 45 },
  { name: "Jue", asistencia: 40 },
  { name: "Vie", asistencia: 35 },
  { name: "Sáb", asistencia: 48 },
  { name: "Dom", asistencia: 32 },
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

export function AttendanceChart() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Asistencia Semanal</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={asistenciaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="asistencia" fill="#C41E3A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function InventoryChart() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Inventario por Categoría</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={inventarioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {inventarioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "8px",
              }}
            />
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
  );
}

export function SalidasChart() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Salidas por Mes</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salidasData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="emergencias" stroke="#C41E3A" strokeWidth={2} dot={{ fill: "#C41E3A" }} />
            <Line type="monotone" dataKey="practicas" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37" }} />
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
  );
}
