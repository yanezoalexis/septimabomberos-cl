"use server";

import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  return { error: null };
}

export async function registerUser(formData: FormData) {
  return { success: true, error: null };
}

export async function updateUser(formData: FormData) {
  return { success: true, error: null };
}

export async function deleteUser(id: string) {
  return { success: true, error: null };
}
