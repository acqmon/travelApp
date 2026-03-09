// service/packages/packages.service.js
import { apiClient } from "../api.client.js";
import { API_ROUTES } from "@/constants/api.routes.js";

// Fetch packages for a partner
export const getPartnerPackages = ({ partnerId, page = 1, limit = 10 }) =>
  apiClient(
    `${API_ROUTES.PACKAGES.PACKAGE_LIST}?partnerId=${partnerId}&page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

// Fetch all packages (for users)
export const getAllPackages = ({ page = 1, limit = 10 }) =>
  apiClient(
    `${API_ROUTES.PACKAGES.PACKAGE_LIST_USER}?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

// Create a new package
export const createPackage = (payload) =>
  apiClient(API_ROUTES.PACKAGES.CREATE_PACKAGE, {
    method: "POST",
    body: payload,
  });
