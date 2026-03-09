import { SidebarNew } from "@/components";
import { RoleConstants } from "@/constants/role.constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarNew role={RoleConstants.ADMIN} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
