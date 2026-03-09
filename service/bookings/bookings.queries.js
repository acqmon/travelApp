"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookingsService from "./bookings.service.js";

// ---------------------------
// Hook: Get User Bookings
// ---------------------------
export const useGetUserBookings = ({ page = 1, limit = 10 }) =>
  useQuery({
    queryKey: ["user-bookings", page, limit],
    queryFn: () => bookingsService.getUserBookings({ page, limit }),
    keepPreviousData: true,
  });

// ---------------------------
// Hook: Get Partner Bookings
// ---------------------------
export const useGetPartnerBookings = ({ page = 1, limit = 10 }) =>
  useQuery({
    queryKey: ["partner-bookings", page, limit],
    queryFn: () => bookingsService.getPartnerBookings({ page, limit }),
    keepPreviousData: true,
  });

// ---------------------------
// Hook: Create Booking
// ---------------------------
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-bookings"] });
    },
  });
};
