import { SidebarNew } from "@/components";
import { RoleConstants } from "@/constants/role.constants";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarNew role={RoleConstants.USER} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
