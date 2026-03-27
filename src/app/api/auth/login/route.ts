import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, storedUsers } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    const hardcodedUsers = [
      {
        id: "1",
        email: "admin@7ciabomberos.cl",
        password: "admin123",
        name: "Administrador",
        role: "ADMIN",
        isActive: true,
      },
      {
        id: "2",
        email: "bombero@7ciabomberos.cl",
        password: "bombero123",
        name: "Bombero Demo",
        role: "BOMBERO",
        isActive: true,
      },
    ];

    const customUsers = storedUsers || [];
    const allUsers = [...hardcodedUsers, ...customUsers];

    const user = allUsers.find(
      (u: any) => u.email?.toLowerCase() === email?.toLowerCase() && u.password === password && u.isActive !== false
    );

    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
    });

    response.cookies.set("bomberos_session", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
