"use client";

import { useState } from "react";
import { useGetUserBookings } from "@/service/bookings/bookings.queries.js";

export default function UserBookingsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetUserBookings({
    page,
    limit,
  });

  const bookings = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-white">
        My Bookings
      </h1>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-200 dark:bg-zinc-700">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Booking Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700"
                >
                  <td className="p-3">{booking.package?.name || "Package"}</td>

                  <td className="p-3">{booking.package?.type || "-"}</td>

                  <td className="p-3">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">${booking.totalPrice}</td>

                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-yellow-500 text-white">
                      {booking.status?.name || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 dark:bg-zinc-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-zinc-800 dark:text-white">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 dark:bg-zinc-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
