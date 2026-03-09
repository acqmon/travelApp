"use client";

import { DataTable } from "@/components";
import { useMemo, useState } from "react";

export default function PartnerDashboard() {
  // Pagination state for bookings table
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  // Dummy data for now
  const dummyBookings = [
    {
      customer: "John Doe",
      package: "Kayaking Trip",
      date: "2026-03-05",
      status: "Confirmed",
    },
    {
      customer: "Alice Smith",
      package: "Mountain Trek",
      date: "2026-03-06",
      status: "Pending",
    },
    {
      customer: "Bob Lee",
      package: "Resort Weekend",
      date: "2026-03-07",
      status: "Cancelled",
    },
    {
      customer: "Sara Khan",
      package: "Kayaking Trip",
      date: "2026-03-08",
      status: "Confirmed",
    },
    {
      customer: "Mike Ross",
      package: "Mountain Trek",
      date: "2026-03-09",
      status: "Pending",
    },
    {
      customer: "Emma Watson",
      package: "Resort Weekend",
      date: "2026-03-10",
      status: "Confirmed",
    },
  ];

  // Pagination logic (dummy)
  const start = pagination.pageIndex * pagination.pageSize;
  const end = start + pagination.pageSize;
  const pagedBookings = dummyBookings.slice(start, end);
  const pageCount = Math.ceil(dummyBookings.length / pagination.pageSize);

  // Columns definition for DataTable
  const columns = useMemo(
    () => [
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "package", header: "Package" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "status", header: "Status" },
    ],
    [],
  );

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Partner Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-white p-6 rounded-xl shadow">
          <p className="text-sm font-medium">Total Packages</p>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>
        <div className="bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-white p-6 rounded-xl shadow">
          <p className="text-sm font-medium">Active Bookings</p>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-white p-6 rounded-xl shadow">
          <p className="text-sm font-medium">Upcoming Activities</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Kayaking Trip - 2026-03-15</li>
            <li>Mountain Trek - 2026-03-17</li>
            <li>Resort Weekend - 2026-03-20</li>
          </ul>
        </div>
      </div>

      {/* Recent Bookings Table with Pagination */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
          Recent Bookings
        </h2>
        <DataTable
          columns={columns}
          data={pagedBookings}
          pagination={pagination}
          pageCount={pageCount}
          setPagination={setPagination}
          isLoading={false} // replace with real loading state once API connected
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow">
          Add New Package
        </button>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow">
          View All Bookings
        </button>
      </div>
    </div>
  );
}
