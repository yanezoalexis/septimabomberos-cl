import { NextResponse } from "next/server";
import { verifyResetToken, invalidateResetToken } from "@/lib/auth-utils";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token y contraseña requeridos" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
    }

    const email = verifyResetToken(token);

    if (!email) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
    }

    invalidateResetToken(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
