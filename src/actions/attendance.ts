"use server";

import { revalidatePath } from "next/cache";

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

export async function createAttendance(formData: FormData) {
  revalidatePath("/admin/asistencia");
  return { success: true, error: null };
}

export async function deleteAttendance(id: string) {
  revalidatePath("/admin/asistencia");
  return { success: true, error: null };
}
