import AdminLayoutClient from "./admin/layout-client";

export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
