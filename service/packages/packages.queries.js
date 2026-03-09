"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as packagesService from "./packages.service.js";

// ---------------------------
// Hook: Get Partner Packages
// ---------------------------
export const useGetPartnerPackages = ({ partnerId, page, limit }) =>
  useQuery({
    queryKey: ["partner-packages", partnerId, page, limit],
    queryFn: () =>
      packagesService.getPartnerPackages({ partnerId, page, limit }),
    enabled: !!partnerId, // only run if partnerId exists
    keepPreviousData: true,
  });

// ---------------------------
// Hook: Get All Packages
// ---------------------------
export const useGetAllPackages = ({ page, limit }) =>
  useQuery({
    queryKey: ["all-packages", page, limit],
    queryFn: () => packagesService.getAllPackages({ page, limit }),
    keepPreviousData: true,
  });

// ---------------------------
// Hook: Create Package
// ---------------------------
export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: packagesService.createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partner-packages"] });
    },
  });
};
