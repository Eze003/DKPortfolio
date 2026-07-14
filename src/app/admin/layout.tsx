import AdminProviders from "@/components/admin/AdminProviders";
import AdminLayoutContent from "@/components/admin/AdminLayoutContent";

export const metadata = {
  title: "MotionsGaad Admin Studio",
  description: "Management dashboard for MotionsGaad Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminProviders>
  );
}
