"use server";

import { revalidatePath } from "next/cache";

export async function getBitacoraSalidas() {
  return [];
}

export async function createBitacoraSalida(formData: FormData) {
  revalidatePath("/admin/bitacora");
  return { success: true, error: null };
}

export async function deleteBitacoraSalida(id: string) {
  revalidatePath("/admin/bitacora");
  return { success: true, error: null };
}
