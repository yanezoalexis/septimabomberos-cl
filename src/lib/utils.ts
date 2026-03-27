import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    NUEVO: "bg-green-100 text-green-800",
    USADO: "bg-blue-100 text-blue-800",
    MAL_ESTADO: "bg-yellow-100 text-yellow-800",
    BAJA: "bg-red-100 text-red-800",
    DISPONIBLE: "bg-green-100 text-green-800",
    ASIGNADO: "bg-blue-100 text-blue-800",
    EN_MANTENCION: "bg-yellow-100 text-yellow-800",
    PERDIDO: "bg-red-100 text-red-800",
    OPERATIVO: "bg-green-100 text-green-800",
    MANTENCION: "bg-yellow-100 text-yellow-800",
    FUERA_SERVICIO: "bg-red-100 text-red-800",
    ACTIVO: "bg-green-100 text-green-800",
    INACTIVO: "bg-red-100 text-red-800",
    REUNION: "bg-blue-100 text-blue-800",
    CAPACITACION: "bg-green-100 text-green-800",
    PRACTICA: "bg-orange-100 text-orange-800",
    EMERGENCIA: "bg-red-100 text-red-800",
    GUARDIA: "bg-purple-100 text-purple-800",
    OTRO: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    NUEVO: "Nuevo",
    USADO: "Usado",
    MAL_ESTADO: "Mal Estado",
    BAJA: "Dado de Baja",
    DISPONIBLE: "Disponible",
    ASIGNADO: "Asignado",
    EN_MANTENCION: "En Mantención",
    PERDIDO: "Perdido",
    OPERATIVO: "Operativo",
    MANTENCION: "En Mantención",
    FUERA_SERVICIO: "Fuera de Servicio",
    ACTIVO: "Activo",
    INACTIVO: "Inactivo",
    REUNION: "Reunión",
    CAPACITACION: "Capacitación",
    PRACTICA: "Práctica",
    EMERGENCIA: "Emergencia",
    GUARDIA: "Guardia",
    OTRO: "Otro",
  };
  return labels[status] || status;
}

export const categories = [
  "Equipos de Protección",
  "Mangueras",
  "Herramientas",
  "Equipos de Rescate",
  "Material Clínico",
  "Equipos de Comunicación",
  "Vehículos",
  "Otros",
];

export const vehicleTypes = [
  "Camión",
  "Ambulancia",
  "Vehículo Ligero",
  "Motobomba",
  "Carro Escalera",
  "Otros",
];

export const attendanceTypes = [
  { value: "REUNION", label: "Reunión" },
  { value: "CAPACITACION", label: "Capacitación" },
  { value: "PRACTICA", label: "Práctica" },
  { value: "EMERGENCIA", label: "Emergencia" },
  { value: "GUARDIA", label: "Guardia" },
];

export const salidaTypes = [
  { value: "EMERGENCIA", label: "Emergencia" },
  { value: "PRACTICA", label: "Práctica" },
  { value: "CAPACITACION", label: "Capacitación" },
  { value: "OTRO", label: "Otro" },
];

export const eventTypes = [
  { value: "REUNION", label: "Reunión" },
  { value: "CAPACITACION", label: "Capacitación" },
  { value: "PRACTICA", label: "Práctica" },
  { value: "OTRO", label: "Otro" },
];
