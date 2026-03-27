import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, details } = body;

    if (!to || !subject || !details) {
      return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🚒 BomberOS - Séptima Compañía</h1>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
          ${details}
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>Este es un mensaje automático de BomberOS - Séptima Compañía de Bomberos Viña del Mar</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "BomberOS <onboarding@resend.dev>",
      to: [to],
      subject: `🚒 ${subject}`,
      html,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}
