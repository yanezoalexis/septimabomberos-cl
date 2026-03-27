import { Package, Users, AlertTriangle, Truck } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#3A3A3A] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trendUp ? "text-green-400" : "text-red-400"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-[#C41E3A]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#C41E3A]" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <>
      <StatsCard title="Total Inventario" value={156} icon={Package} trend="+12 este mes" trendUp />
      <StatsCard title="Bomberos Activos" value={48} icon={Users} />
      <StatsCard title="Salidas Mes" value={23} icon={AlertTriangle} trend="+5 vs mes anterior" trendUp />
      <StatsCard title="Vehículos Operativos" value={5} icon={Truck} trend="2 en mantención" trendUp={false} />
    </>
    );
}
