import crypto from "crypto";

const RESET_TOKENS = new Map<string, { email: string; expires: number }>();

export function generateResetToken(email: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 60 * 60 * 1000; // 1 hora
  
  RESET_TOKENS.set(token, { email, expires });
  
  // Limpiar tokens expirados
  for (const [key, value] of RESET_TOKENS.entries()) {
    if (value.expires < Date.now()) {
      RESET_TOKENS.delete(key);
    }
  }
  
  return token;
}

export function verifyResetToken(token: string): string | null {
  const data = RESET_TOKENS.get(token);
  
  if (!data) {
    return null;
  }
  
  if (data.expires < Date.now()) {
    RESET_TOKENS.delete(token);
    return null;
  }
  
  return data.email;
}

export function invalidateResetToken(token: string): void {
  RESET_TOKENS.delete(token);
}
