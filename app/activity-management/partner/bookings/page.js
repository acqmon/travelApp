"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components";
import { useGetPartnerBookings } from "@/service/bookings/bookings.queries";

export default function PartnerBookingsPage() {
  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  // Fetch bookings
  const { data, isLoading } = useGetPartnerBookings({ page, limit });

  const bookings = data?.data || [];
  const pageCount = data?.pagination?.totalPages || 0;

  // Columns for DataTable
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      {
        accessorKey: "user.name",
        header: "Customer",
        cell: ({ row }) => row.original.user?.name || "-",
      },
      {
        accessorKey: "package.name",
        header: "Package",
        cell: ({ row }) => row.original.package?.name || "-",
      },
      {
        accessorKey: "bookingDate",
        header: "Booking Date",
        cell: ({ row }) =>
          new Date(row.original.bookingDate).toLocaleDateString(),
      },
      {
        accessorKey: "status.name",
        header: "Status",
        cell: ({ row }) => row.original.status?.name || "-",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const status = row.original.status?.name;

          return (
            <div className="flex gap-2">
              {status === "Pending" && (
                <>
                  <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    Confirm
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    Cancel
                  </button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Partner Bookings
      </h1>

      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow">
        <DataTable
          columns={columns}
          data={bookings}
          pagination={pagination}
          pageCount={pageCount}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
