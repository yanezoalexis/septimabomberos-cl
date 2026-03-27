"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "teniente1septima@bomberosvinadelmar.cl";

export async function sendEmailNotification({
  subject,
  module,
  action,
  details,
  user,
}: {
  subject: string;
  module: string;
  action: "create" | "update" | "delete";
  details: string;
  user?: string;
}) {
  try {
    const actionText = action === "create" ? "creó" : action === "update" ? "actualizó" : "eliminó";
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🚒 BomberOS - Notificación</h1>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #333;">Módulo:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #C41E3A; font-weight: bold;">${module}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #333;">Acción:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <span style="background: ${action === "create" ? "#28a745" : action === "update" ? "#007bff" : "#dc3545"}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px;">
                  ${action.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #333;">Usuario:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user || "Sistema"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #333;">Fecha/Hora:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString("es-CL")}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333;">Detalles:</td>
              <td style="padding: 10px;">${details}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Resumen:</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">Se ${actionText} un registro en el módulo <strong>${module}</strong>.</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>Este es un mensaje automático de BomberOS - Séptima Compañía de Bomberos</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "BomberOS <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `🚒 ${subject}`,
      html,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error general:", error);
    return { success: false, error };
  }
}
