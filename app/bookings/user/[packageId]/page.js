"use client";

import { useState } from "react";
import { useCreateBooking } from "@/service/bookings/bookings.queries.js";
import { useRouter, useParams } from "next/navigation";

export default function BookingPage() {
  const { packageId } = useParams();
  const router = useRouter();
  const { mutate: createBooking, isLoading } = useCreateBooking();

  const [bookingDate, setBookingDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    createBooking(
      {
        packageId,
        bookingDate,
        totalPrice,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/user");
        },
      },
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book Package</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Total Price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          {isLoading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
