import { apiClient } from "../api.client";
import { API_ROUTES } from "@/constants/api.routes";

export const getAllUsers = ({ page, limit, role }) =>
  apiClient(
    `${API_ROUTES.USERS.GET_ALL_USERS}?page=${page}&limit=${limit}&role=${role}`,
    {
      method: "GET",
    },
  );
