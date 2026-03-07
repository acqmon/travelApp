import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import PartnerLayout from "./PartnerLayout";
import { RoleConstants } from "../constants/role.constants";

import { cookies } from "next/headers";

export default async function LayoutSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value; // example

  if (!role) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  if (role === RoleConstants.ADMIN) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (role === RoleConstants.USER) {
    return <UserLayout>{children}</UserLayout>;
  }

  if (role === RoleConstants.PARTNER) {
    return <PartnerLayout>{children}</PartnerLayout>;
  }

  return <PublicLayout>{children}</PublicLayout>;
}
