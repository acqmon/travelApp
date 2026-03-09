import { apiClient } from "../api.client";
import { API_ROUTES } from "@/constants/api.routes";

export const registerUser = (payload) =>
  apiClient(API_ROUTES.AUTH.REGISTER_USER, {
    method: "POST",
    body: payload,
  });

export const registerPartner = (payload) =>
  apiClient(API_ROUTES.AUTH.REGISTER_PARTNER, {
    method: "POST",
    body: payload,
  });

export const loginUser = (payload) =>
  apiClient(API_ROUTES.AUTH.LOGIN, {
    method: "POST",
    body: payload,
  });
