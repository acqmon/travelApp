import { apiClient } from "../api.client.js";
import { API_ROUTES } from "@/constants/api.routes.js";

// Get bookings for a user
export const getUserBookings = ({ userId, page = 1, limit = 10 }) =>
  apiClient(
    `${API_ROUTES.BOOKINGS.USER_BOOKINGS}?userId=${userId}&page=${page}&limit=${limit}`,
    { method: "GET" },
  );

// ---------------------------
// Get Partner Bookings
// ---------------------------
export const getPartnerBookings = ({ page = 1, limit = 10 }) =>
  apiClient(
    `${API_ROUTES.BOOKINGS.PARTNER_BOOKINGS_LIST}?page=${page}&limit=${limit}`,
    { method: "GET" },
  );

// Create booking
export const createBooking = (payload) =>
  apiClient(API_ROUTES.BOOKINGS.CREATE_BOOKING, {
    method: "POST",
    body: payload,
  });
