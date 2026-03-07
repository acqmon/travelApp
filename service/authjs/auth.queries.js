// service/auth/auth.queries.js
import { useMutation } from "@tanstack/react-query";
import * as authService from "./auth.services";

/**
 * Hook to register a new user
 * Returns:
 *  - mutate: function to call register
 *  - isPending: loading state
 *  - isError: error state
 *  - error: error object
 *  - data: response data
 */
export const useRegisterUser = () =>
  useMutation({
    mutationFn: authService.registerUser,
    // optional: onSuccess/onError callbacks
    // onSuccess: (data) => console.log("Registered!", data),
    // onError: (err) => console.log("Register failed", err),
  });

/**
 * Hook to login a user
 */
export const useLoginUser = () =>
  useMutation({
    mutationFn: authService.loginUser,
  });
