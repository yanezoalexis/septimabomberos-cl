import { NextResponse } from "next/server";
import { sendEmailNotification } from "@/actions/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, module, action, details } = body;

    const result = await sendEmailNotification({
      subject,
      module,
      action,
      details,
    });

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error en API de notificaciones:", error);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}
