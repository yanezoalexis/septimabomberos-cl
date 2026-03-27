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

export const emergencyCategories = [
  { value: "1", label: "1 - Emergencias Estructurales" },
  { value: "2", label: "2 - Emergencias Forestales" },
  { value: "3", label: "3 - Emergencias Vehiculares" },
  { value: "4", label: "4 - Materiales Peligrosos" },
  { value: "5", label: "5 - Rescates Vehiculares" },
  { value: "6", label: "6 - Rescates" },
  { value: "7", label: "7 - Acuartelamiento" },
  { value: "8", label: "8 - Apoyo a Otros Cuerpos" },
  { value: "9", label: "9 - Emergencia Industrial" },
  { value: "10", label: "10 - Otros Servicios" },
  { value: "11", label: "11 - Escombros/Remoción" },
  { value: "12", label: "12 - Academia" },
  { value: "13", label: "13 - Simulacro" },
  { value: "14", label: "14 - Riesgo Eléctrico" },
  { value: "15", label: "15 - Accidente Aéreo" },
  { value: "16", label: "16 - Servicios Internos" },
  { value: "1A", label: "1° Alarma - Estructural" },
  { value: "2A", label: "2° Alarma" },
  { value: "3A", label: "3° Alarma" },
];

export const incidentKeys: Record<string, { value: string; label: string }[]> = {
  "1": [
    { value: "1-1-1", label: "1-1-1 Casa habitación o locales comerciales" },
    { value: "1-1-2", label: "1-1-2 Casa habitación (Difícil Acceso)" },
    { value: "1-1-3", label: "1-1-3 Casa habitación con explosión" },
    { value: "1-2-1", label: "1-2-1 Edificios 6 pisos o más" },
    { value: "1-2-2", label: "1-2-2 Edificios 5 pisos o menos" },
    { value: "1-2-3", label: "1-2-3 Edificios con explosión" },
    { value: "1-2-4", label: "1-2-4 Edificaciones antiguas" },
    { value: "1-3-1", label: "1-3-1 Estructuras complejas" },
    { value: "1-3-2", label: "1-3-2 Estructuras complejas con explosión" },
  ],
  "2": [
    { value: "2-1", label: "2-1 Forestal cercano a viviendas" },
    { value: "2-2", label: "2-2 Forestal índice alto/extremo (Rural)" },
    { value: "2-3", label: "2-3 Forestal índice alto/extremo (Tomas)" },
    { value: "2-4", label: "2-4 Forestal índice alto/extremo (Peligro viviendas)" },
  ],
  "3": [
    { value: "3-1", label: "3-1 Vehicular simple" },
    { value: "3-2", label: "3-2 Vehicular compleja" },
  ],
  "4": [
    { value: "4-1", label: "4-1 Escape de gas simple" },
    { value: "4-2", label: "4-2 Escape de gas compleja" },
    { value: "4-3", label: "4-3 Materiales peligrosos" },
    { value: "4-4", label: "4-4 Materiales peligrosos compleja" },
  ],
  "5": [
    { value: "5-1", label: "5-1 Rescate vehicular liviano" },
    { value: "5-2-1", label: "5-2-1 Rescate vehicular pesado" },
    { value: "5-2-2", label: "5-2-2 Vehicular con desbarrancamiento" },
    { value: "5-2-3", label: "5-2-3 Vehicular pesado + desbarrancamiento + mat. peligrosos" },
    { value: "5-2-4", label: "5-2-4 Vehicular pesado + mat. peligrosos" },
  ],
  "6": [
    { value: "6-1", label: "6-1 Rescate en altura" },
    { value: "6-2", label: "6-2 Rescate técnico" },
    { value: "6-3", label: "6-3 Rescate por encierro" },
    { value: "6-4", label: "6-4 Rescate agreste" },
    { value: "6-5-1", label: "6-5-1 Otros rescates de emergencia" },
    { value: "6-5-2", label: "6-5-2 Otros rescates (Presunta desgrac ia)" },
    { value: "6-5-3", label: "6-5-3 Otros rescates (Apoyo camilla/canastillo)" },
    { value: "6-5-4", label: "6-5-4 Otros rescates (Apoyo DEA)" },
    { value: "6-5-5", label: "6-5-5 Otros rescates (Apoyo interno)" },
    { value: "6-6", label: "6-6 Rescate acuático" },
  ],
  "7": [
    { value: "7-1", label: "7-1 Acuartelamiento general" },
    { value: "7-2", label: "7-2 Acuartelamiento grupo específico" },
  ],
  "8": [
    { value: "8-1-1", label: "8-1-1 Apoyo otros cuerpos (Clave 1-1)" },
    { value: "8-1-2", label: "8-1-2 Apoyo otros cuerpos (Clave 1-2)" },
    { value: "8-2", label: "8-2 Apoyo otros cuerpos (Clave 2)" },
  ],
  "9": [
    { value: "9-1", label: "9-1 Emergencia industrial" },
  ],
  "10": [
    { value: "10-1", label: "10-1 Llamado a otros servicios" },
  ],
  "11": [
    { value: "11-1", label: "11-1 Escombros, remoción y/o basura" },
  ],
  "12": [
    { value: "12-1", label: "12-1 Academia" },
  ],
  "13": [
    { value: "13-1", label: "13-1 Simulacro" },
  ],
  "14": [
    { value: "14-1", label: "14-1 Riesgo eléctrico" },
  ],
  "15": [
    { value: "15-1", label: "15-1 Accidente aéreo" },
  ],
  "16": [
    { value: "16-1", label: "16-1 Servicios internos" },
  ],
  "1A": [
    { value: "1A-1", label: "1° Alarma Estructural (Normal)" },
    { value: "1A-2", label: "1° Alarma Estructural (Difícil Acceso)" },
    { value: "1A-3", label: "1° Alarma Industrial" },
    { value: "1A-4", label: "1° Alarma Forestal" },
  ],
  "2A": [
    { value: "2A-1", label: "2° Alarma Estructural" },
    { value: "2A-2", label: "2° Alarma (Difícil Acceso)" },
    { value: "2A-3", label: "2° Alarma Industrial" },
    { value: "2A-4", label: "2° Alarma Forestal" },
  ],
  "3A": [
    { value: "3A-1", label: "3° Alarma Estructural" },
    { value: "3A-2", label: "3° Alarma Industrial" },
    { value: "3A-3", label: "3° Alarma Forestal" },
    { value: "3A-4", label: "3° Alarma (Difícil Acceso)" },
  ],
};

export const attendanceCodes = [
  { value: "P", label: "Presente", color: "blue", bg: "bg-blue-500", description: "Presente" },
  { value: "PA", label: "Presente Ausente", color: "red", bg: "bg-red-500", description: "Presente en otras funciones" },
  { value: "A", label: "Ausente", color: "gray", bg: "bg-gray-500", description: "Ausente" },
  { value: "L", label: "Licencia", color: "orange", bg: "bg-orange-500", description: "Licencia médica" },
];

export const unitKeys = [
  { value: "1-1", label: "1-1", vehicle: "M-71" },
  { value: "1-2", label: "1-2", vehicle: "M-72" },
  { value: "1-3", label: "1-3", vehicle: "M-73" },
  { value: "4-1", label: "4-1", vehicle: "UR-3" },
];

export interface Bomber {
  id: string;
  nro: number;
  nroReg: number;
  name: string;
  category: string;
}

export const septimaBombers: Bomber[] = [
  { id: "7001", nro: 1, nroReg: 7001, name: "Sergio Muñoz Carrasco", category: "Fundadores" },
  { id: "7002", nro: 2, nroReg: 7002, name: "Pablo Zavala Cornejo", category: "Fundadores" },
  { id: "7003", nro: 3, nroReg: 7003, name: "Jorge Araya Rojas", category: "Fundadores" },
  { id: "7004", nro: 4, nroReg: 7004, name: "Leonardo Muñoz Carrasco", category: "Fundadores" },
  { id: "7005", nro: 5, nroReg: 7005, name: "Jorge Bertrand Román", category: "MHDG" },
  { id: "7006", nro: 6, nroReg: 7006, name: "Jorge Zavala Cornejo", category: "MHDG" },
  { id: "7007", nro: 7, nroReg: 7007, name: "Fernando Recio Palma", category: "MHDG" },
  { id: "7008", nro: 8, nroReg: 7008, name: "Marcelo Villalobos Leiva", category: "MHDG" },
  { id: "7009", nro: 9, nroReg: 7009, name: "Mauricio Arancibia Segovia", category: "MHDG" },
  { id: "7010", nro: 10, nroReg: 7010, name: "Carlos Tapia Vargas", category: "MHDG" },
  { id: "7011", nro: 11, nroReg: 7011, name: "Howard Meinhardt Hall", category: "MHDG" },
  { id: "7012", nro: 12, nroReg: 7012, name: "Cristian Vera Henriquez", category: "MHDG" },
  { id: "7013", nro: 13, nroReg: 7013, name: "Andrés Zavala Cornejo", category: "MHDG" },
  { id: "7014", nro: 14, nroReg: 7014, name: "Alejandro Tapia Vásquez", category: "MHDG" },
  { id: "7015", nro: 15, nroReg: 7015, name: "Rodrigo Villa Perez", category: "MHDG" },
  { id: "7016", nro: 16, nroReg: 7016, name: "Mario Camblor Concha", category: "Honorarios del Cuerpo" },
  { id: "7017", nro: 17, nroReg: 7017, name: "Fernando Lillo Acuña", category: "Honorarios del Cuerpo" },
  { id: "7018", nro: 18, nroReg: 7018, name: "Iñaki Narvarte Larrondo", category: "Honorarios del Cuerpo" },
  { id: "7019", nro: 19, nroReg: 7019, name: "Manuel Pérez Vilches", category: "Honorarios del Cuerpo" },
  { id: "7020", nro: 20, nroReg: 7020, name: "Ricardo Portus Ruiz", category: "Honorarios del Cuerpo" },
  { id: "7021", nro: 21, nroReg: 7021, name: "Marcelo Vera Valenzuela", category: "Honorarios del Cuerpo" },
  { id: "7022", nro: 22, nroReg: 7022, name: "Gonzalo Andrade Risso", category: "Honorarios del Cuerpo" },
  { id: "7023", nro: 23, nroReg: 7023, name: "Axel Biehl Cortes", category: "Honorarios del Cuerpo" },
  { id: "7024", nro: 24, nroReg: 7024, name: "Alejandro Madrid Montt", category: "Honorarios del Cuerpo" },
  { id: "7025", nro: 25, nroReg: 7025, name: "Ignacio Morales Barckhahn", category: "Honorarios del Cuerpo" },
  { id: "7026", nro: 26, nroReg: 7026, name: "Nicolás Marchant Riveros", category: "Honorarios del Cuerpo" },
  { id: "7027", nro: 27, nroReg: 7027, name: "José Pimentel Padilla", category: "Honorarios del Cuerpo" },
  { id: "7028", nro: 28, nroReg: 7028, name: "Francisco Navarro Salazar", category: "Honorarios del Cuerpo" },
  { id: "7029", nro: 29, nroReg: 7029, name: "Sergio Avendaño Orrego", category: "Honorarios del Cuerpo" },
  { id: "7030", nro: 30, nroReg: 7030, name: "Julio Gutiérrez Córdova", category: "Honorarios del Cuerpo" },
  { id: "7031", nro: 31, nroReg: 7031, name: "Joel Arenas Binet", category: "Honorarios del Cuerpo" },
  { id: "7032", nro: 32, nroReg: 7032, name: "Cristian Gómez Varas", category: "Honorarios del Cuerpo" },
  { id: "7033", nro: 33, nroReg: 7033, name: "Antonio Álvarez Quevedo", category: "Honorarios del Cuerpo" },
  { id: "7034", nro: 34, nroReg: 7034, name: "Juan Pablo Ruíz-Tagle Díaz", category: "Honorarios del Cuerpo" },
  { id: "7035", nro: 35, nroReg: 7035, name: "Mauricio Zenteno Rojas", category: "Honorarios del Cuerpo" },
  { id: "7036", nro: 36, nroReg: 7036, name: "Juan Enrique Zavala Aguilera", category: "Honorarios de Compañía" },
  { id: "7037", nro: 37, nroReg: 7037, name: "Diego Sobarzo Licandeo", category: "Honorarios de Compañía" },
  { id: "7038", nro: 38, nroReg: 7038, name: "Rodrigo Flamm Berríos", category: "Honorarios de Compañía" },
  { id: "7039", nro: 39, nroReg: 7039, name: "Joaquín Pérez Recio", category: "Honorarios de Compañía" },
  { id: "7040", nro: 40, nroReg: 7040, name: "Pablo Santibáñez Gallardo", category: "Honorarios de Compañía" },
  { id: "7041", nro: 41, nroReg: 7041, name: "Carlos Rivas Araya", category: "Honorarios de Compañía" },
  { id: "7042", nro: 42, nroReg: 7042, name: "Ignacio del Fierro Herrera", category: "Honorarios de Compañía" },
  { id: "7043", nro: 43, nroReg: 7043, name: "Rodrigo Olivares Arenas", category: "Honorarios de Compañía" },
  { id: "7044", nro: 44, nroReg: 7044, name: "Diego Moreno Ivani", category: "Honorarios de Compañía" },
  { id: "7045", nro: 45, nroReg: 7045, name: "Alexis Yáñez Osses", category: "Honorarios de Compañía" },
  { id: "7046", nro: 46, nroReg: 7046, name: "Diego Cea Valencia", category: "Honorarios de Compañía" },
  { id: "7047", nro: 47, nroReg: 7047, name: "Cristian Romero Godoy", category: "Honorarios de Compañía" },
  { id: "7048", nro: 48, nroReg: 7048, name: "Marco López Astorga", category: "Honorarios de Compañía" },
  { id: "7049", nro: 49, nroReg: 7049, name: "José Luis Pizarro Aceituno", category: "Honorarios de Compañía" },
  { id: "7050", nro: 50, nroReg: 7050, name: "Giampiero Arduini Girotti", category: "Honorarios de Compañía" },
  { id: "7051", nro: 51, nroReg: 7051, name: "Marcelo Tapia Carrera", category: "Honorarios de Compañía" },
  { id: "7052", nro: 52, nroReg: 7052, name: "Guillermo Catrón Swinburn", category: "Honorarios de Compañía" },
  { id: "7053", nro: 54, nroReg: 7053, name: "Felipe Airola de la Fuente", category: "Activos" },
  { id: "7054", nro: 55, nroReg: 7054, name: "Carlos Huerta Westwood", category: "Activos" },
  { id: "7055", nro: 56, nroReg: 7055, name: "Mario Suárez González", category: "Activos" },
  { id: "7056", nro: 57, nroReg: 7056, name: "Matías Paillamán Flores", category: "Activos" },
  { id: "7057", nro: 58, nroReg: 7057, name: "Hans Torres Cruz", category: "Activos" },
  { id: "7058", nro: 59, nroReg: 7058, name: "Matías Zambelli Corral", category: "Activos" },
  { id: "7059", nro: 60, nroReg: 7059, name: "Benjamín Espinoza Cortés", category: "Activos" },
  { id: "7060", nro: 61, nroReg: 7060, name: "Felipe Rubio Pérez", category: "Activos" },
  { id: "7061", nro: 62, nroReg: 7061, name: "Franco Olivares Mondaca", category: "Activos" },
  { id: "7062", nro: 63, nroReg: 7062, name: "Martín Bascur Muñoz", category: "Activos" },
  { id: "7063", nro: 64, nroReg: 7063, name: "Diego Torres Cerón", category: "Activos" },
  { id: "7064", nro: 65, nroReg: 7064, name: "Brayan Paredes Sasso", category: "Activos" },
  { id: "7065", nro: 66, nroReg: 7065, name: "Agustín Wolff Hoepke", category: "Activos" },
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
