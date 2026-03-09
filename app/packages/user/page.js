"use client";

import { useState } from "react";
import { useGetAllPackages } from "@/service/packages/packages.queries.js";
import { PAGE_ROUTES } from "@/navigation/page.navigation.routes";
import { DataTable } from "@/components";

export default function AvailablePackagesPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data, isLoading } = useGetAllPackages({ page, limit });
  const packages = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Package Name" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "price", header: "Price ($)" },
    { accessorKey: "partner.companyName", header: "Partner" },
    {
      accessorKey: "actions",
      header: "Book Now",
      cell: ({ row }) => (
        <a
          href={`${PAGE_ROUTES.USER_PAGES.BOOKING}/${row.original.id}`}
          className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Book
        </a>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Available Packages
      </h1>

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
