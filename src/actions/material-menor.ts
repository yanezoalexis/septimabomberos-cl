"use server";

import { revalidatePath } from "next/cache";

export async function getMaterialMenor() {
  return [];
}

export async function createMaterialMenor(formData: FormData) {
  revalidatePath("/admin/material-menor");
  return { success: true, error: null };
}

export async function updateMaterialMenor(formData: FormData) {
  revalidatePath("/admin/material-menor");
  return { success: true, error: null };
}

export async function deleteMaterialMenor(id: string) {
  revalidatePath("/admin/material-menor");
  return { success: true, error: null };
}
