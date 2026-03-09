"use client";

import { DataTable } from "@/components";
import { useMemo, useState } from "react";
import { useGetAllUsers } from "@/service/users/users.queries.js";
import { RoleConstants } from "@/constants/role.constants.js";

export default function PartnerDashboard() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data, isLoading } = useGetAllUsers({
    page,
    limit,
    role: RoleConstants.PARTNER,
  });

  const partners = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role.name", header: "Role" },
      { accessorKey: "status.name", header: "Status" },
    ],
    [],
  );

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-primary-light text-2xl">Partner Management</h1>
      <p className="text-text-muted">Manage all partners</p>

      <div className="w-[900px]">
        <DataTable
          columns={columns}
          data={partners}
          pagination={pagination}
          pageCount={pageCount}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
