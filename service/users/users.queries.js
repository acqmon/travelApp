import { useQuery } from "@tanstack/react-query";
import * as userService from "./users.services.js";

export const useGetAllUsers = ({ page, limit, role }) =>
  useQuery({
    queryKey: ["users", page, limit, role],
    queryFn: () => userService.getAllUsers({ page, limit, role }),
    placeholderData: (prev) => prev,
  });
