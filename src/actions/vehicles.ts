"use server";

import { revalidatePath } from "next/cache";

export async function getVehicles() {
  return [];
}

export async function createVehicle(formData: FormData) {
  revalidatePath("/admin/vehiculos");
  return { success: true, error: null };
}

export async function updateVehicle(formData: FormData) {
  revalidatePath("/admin/vehiculos");
  return { success: true, error: null };
}

export async function deleteVehicle(id: string) {
  revalidatePath("/admin/vehiculos");
  return { success: true, error: null };
}
