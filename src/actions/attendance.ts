"use server";

import { revalidatePath } from "next/cache";
import { sendEmailNotification } from "./notifications";

export async function getAttendanceStats() {
  return {
    todayCount: 0,
    monthCount: 0,
    byType: [],
    recentAttendances: [],
    error: null,
  };
}

export async function getAttendances() {
  return [];
}

export async function createAttendance(data: {
  date: string;
  clave: string;
  type: string;
  description: string;
  horaSalida: string;
  horaLlegada: string;
  lugar: string;
}) {
  revalidatePath("/admin/asistencia");
  
  await sendEmailNotification({
    subject: `Nueva Salida - ${data.clave}`,
    module: "Asistencia - Salidas",
    action: "create",
    details: `
      <strong>Fecha:</strong> ${data.date}<br>
      <strong>Clave:</strong> ${data.clave}<br>
      <strong>Tipo:</strong> ${data.type}<br>
      <strong>Lugar:</strong> ${data.lugar}<br>
      <strong>Hora Salida:</strong> ${data.horaSalida}<br>
      <strong>Hora Llegada:</strong> ${data.horaLlegada || "En curso"}<br>
      <strong>Descripción:</strong> ${data.description}
    `,
  });
  
  return { success: true, error: null };
}

export async function updateAttendance(data: {
  date: string;
  clave: string;
  type: string;
  description: string;
  horaSalida: string;
  horaLlegada: string;
  lugar: string;
}) {
  revalidatePath("/admin/asistencia");
  
  await sendEmailNotification({
    subject: `Actualización Salida - ${data.clave}`,
    module: "Asistencia - Salidas",
    action: "update",
    details: `
      <strong>Fecha:</strong> ${data.date}<br>
      <strong>Clave:</strong> ${data.clave}<br>
      <strong>Tipo:</strong> ${data.type}<br>
      <strong>Lugar:</strong> ${data.lugar}<br>
      <strong>Hora Salida:</strong> ${data.horaSalida}<br>
      <strong>Hora Llegada:</strong> ${data.horaLlegada || "En curso"}
    `,
  });
  
  return { success: true, error: null };
}

export async function deleteAttendance(id: string) {
  revalidatePath("/admin/asistencia");
  return { success: true, error: null };
}

export async function recordAttendance(data: {
  bomberName: string;
  bomberNro: number;
  incidentDate: string;
  incidentClave: string;
  code: string;
  notes?: string;
}) {
  revalidatePath("/admin/asistencia");
  
  const codeLabels: Record<string, string> = {
    P: "Presente",
    PA: "Presente Ausente",
    A: "Ausente",
    L: "Licencia",
  };
  
  await sendEmailNotification({
    subject: `Asistencia Registrada - ${data.bomberName}`,
    module: "Asistencia - Control",
    action: "create",
    details: `
      <strong>Bombero:</strong> ${data.bomberNro} - ${data.bomberName}<br>
      <strong>Fecha Incidente:</strong> ${data.incidentDate}<br>
      <strong>Clave:</strong> ${data.incidentClave}<br>
      <strong>Código:</strong> ${data.code} (${codeLabels[data.code] || data.code})<br>
      <strong>Observaciones:</strong> ${data.notes || "-"}
    `,
  });
  
  return { success: true, error: null };
}
