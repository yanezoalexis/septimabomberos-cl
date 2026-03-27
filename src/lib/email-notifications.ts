import { sendEmailNotification } from "@/actions/notifications";

export async function notifyChange({
  module,
  action,
  details,
  recordName,
}: {
  module: string;
  action: "create" | "update" | "delete";
  details: string;
  recordName?: string;
}) {
  const subject = `${action === "create" ? "Nuevo" : action === "update" ? "Actualización" : "Eliminación"} en ${module}${recordName ? ` - ${recordName}` : ""}`;
  
  await sendEmailNotification({
    subject,
    module,
    action,
    details,
  });
}
