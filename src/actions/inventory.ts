"use server";

import { revalidatePath } from "next/cache";

export async function getInventoryItems() {
  return [];
}

export async function getInventoryItem(id: string) {
  return null;
}

export async function createInventoryItem(formData: FormData) {
  revalidatePath("/admin/inventario");
  return { success: true, error: null };
}

export async function updateInventoryItem(formData: FormData) {
  revalidatePath("/admin/inventario");
  return { success: true, error: null };
}

export async function deleteInventoryItem(id: string) {
  revalidatePath("/admin/inventario");
  return { success: true, error: null };
}
