import { DashboardStats } from "@/components/admin/dashboard/stats-card";
import { AttendanceChart, InventoryChart, SalidasChart } from "@/components/admin/charts/dashboard-charts";
import { AlertTriangle, Calendar, Wrench, Clock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Resumen general del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <InventoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalidasChart />
        
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Alertas
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-md border border-yellow-500/20">
              <span className="text-gray-300 text-sm">Material bajo stock</span>
              <span className="text-yellow-500 font-semibold">3 items</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
              <span className="text-gray-300 text-sm">Mantención próxima</span>
              <span className="text-blue-500 font-semibold">2 vehículos</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-md border border-red-500/20">
              <span className="text-gray-300 text-sm">Emergencias pendientes</span>
              <span className="text-red-500 font-semibold">1 reporte</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C41E3A]" />
            Próximos Eventos
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[#0F0F0F] rounded-md">
              <div className="w-10 h-10 bg-[#C41E3A] rounded-md flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">28</span>
                <span className="text-white text-[10px]">MAR</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">Capacitación RESCATE</p>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> 18:00 - 21:00
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#0F0F0F] rounded-md">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-md flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">02</span>
                <span className="text-white text-[10px]">ABR</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">Reunión Mensual</p>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> 20:00 - 22:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#D4AF37]" />
          Materiales Recientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-2">Nombre</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-2">Categoría</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-2">Cantidad</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                <td className="py-3 px-2 text-white text-sm">Manguera 2.5&quot;</td>
                <td className="py-3 px-2 text-gray-400 text-sm">Mangueras</td>
                <td className="py-3 px-2 text-white text-sm">24</td>
                <td className="py-3 px-2"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Nuevo</span></td>
              </tr>
              <tr className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                <td className="py-3 px-2 text-white text-sm">Casco de Rescate</td>
                <td className="py-3 px-2 text-gray-400 text-sm">Eq. Protección</td>
                <td className="py-3 px-2 text-white text-sm">15</td>
                <td className="py-3 px-2"><span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">Usado</span></td>
              </tr>
              <tr className="border-b border-[#2A2A2A]/50 hover:bg-[#0F0F0F]">
                <td className="py-3 px-2 text-white text-sm">Motobomba</td>
                <td className="py-3 px-2 text-gray-400 text-sm">Herramientas</td>
                <td className="py-3 px-2 text-white text-sm">3</td>
                <td className="py-3 px-2"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Operativo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
