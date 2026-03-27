import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateResetToken } from "@/lib/auth-utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Demo users para verificación
    const DEMO_USERS = [
      { email: "admin@7ciabomberos.cl", name: "Administrador" },
      { email: "bombero@7ciabomberos.cl", name: "Bombero Demo" },
    ];

    const user = DEMO_USERS.find((u) => u.email === email);

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return NextResponse.json({ success: true });
    }

    // Generar token de recuperación
    const resetToken = generateResetToken(email);
    const resetUrl = `https://septimabomberos-cl.vercel.app/auth/reset-password?token=${resetToken}`;

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "BomberOS <onboarding@resend.dev>",
      to: [email],
      subject: "Recuperar Contraseña - BomberOS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚒 BomberOS - Recuperar Contraseña</h1>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p style="color: #333; line-height: 1.6;">
              Hola <strong>${user.name}</strong>,
            </p>
            <p style="color: #333; line-height: 1.6;">
              Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en BomberOS.
            </p>
            <p style="color: #333; line-height: 1.6;">
              Para continuar con el proceso, haz clic en el siguiente botón:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: #C41E3A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Restablecer Contraseña
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              O copia y pega este enlace en tu navegador:<br>
              <a href="${resetUrl}" style="color: #C41E3A; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; margin-top: 20px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⚠️ <strong>Importante:</strong> Este enlace expira en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>Este es un mensaje automático de BomberOS - Séptima Compañía de Bomberos Viña del Mar</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
