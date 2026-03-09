"use client";

import { useState } from "react";
import { useGetUserBookings } from "@/service/bookings/bookings.queries.js";
import { DataTable } from "@/components";

export default function UserBookingsPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data, isLoading } = useGetUserBookings({ page, limit });

  const bookings = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const columns = [
    {
      accessorKey: "id",
      header: "Booking ID",
    },
    {
      accessorKey: "package.name",
      header: "Package Name",
    },
    {
      accessorKey: "package.type",
      header: "Type",
    },
    {
      accessorKey: "bookingDate",
      header: "Booking Date",
      cell: ({ row }) =>
        new Date(row.original.bookingDate).toLocaleDateString(),
    },
    {
      accessorKey: "totalPrice",
      header: "Price ($)",
      cell: ({ row }) => `$${row.original.totalPrice}`,
    },
    {
      accessorKey: "status.name",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status?.name || "Pending";

        const colors = {
          Pending: "bg-yellow-500",
          Confirmed: "bg-green-600",
          Cancelled: "bg-red-600",
        };

        return (
          <span
            className={`px-2 py-1 text-xs rounded text-white ${
              colors[status] || "bg-gray-500"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        My Bookings
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
