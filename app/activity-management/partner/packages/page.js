"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components";
import { useGetPartnerPackages } from "@/service/packages/packages.queries.js";

export default function PartnerPackagesPage() {
  const partnerId = "adf45398-6d84-4ab7-a389-f9f6c08fb6c5"; // get logged-in partner
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  // Fetch packages via React Query
  const { data, isLoading } = useGetPartnerPackages({
    partnerId,
    page,
    limit,
  });

  const packages = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  // Columns for DataTable
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Package Name" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "price", header: "Price ($)" },
      { accessorKey: "status.name", header: "Status" },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Edit
            </button>
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Manage Packages
      </h1>

      {/* Create Package Button */}
      <div className="mb-4 flex justify-end">
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow">
          + Add New Package
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow">
        <DataTable
          columns={columns}
          data={packages}
          pagination={pagination}
          pageCount={pageCount}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
