"use server";

import { revalidatePath } from "next/cache";

export async function getCalendarEvents() {
  return [];
}

export async function createCalendarEvent(formData: FormData) {
  revalidatePath("/admin/calendario");
  return { success: true, error: null };
}

export async function deleteCalendarEvent(id: string) {
  revalidatePath("/admin/calendario");
  return { success: true, error: null };
}
