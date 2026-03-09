"use client";

import { DataTable } from "@/components";
import { useMemo, useState } from "react";
import { useGetAllUsers } from "@/service/users/users.queries.js";

export default function UserDashboard() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data, isLoading } = useGetAllUsers({
    page,
    limit,
    role: "USER",
  });

  const users = data?.data ?? [];
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
      <h1 className="text-primary-light text-2xl">User Management</h1>
      <p className="text-text-muted">Manage all the users</p>

      <div className="w-[900px]">
        <DataTable
          columns={columns}
          data={users}
          pagination={pagination}
          pageCount={pageCount}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
