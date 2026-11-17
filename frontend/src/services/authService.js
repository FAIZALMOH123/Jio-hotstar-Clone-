import { apiRequest } from "./api";

export const signup = async (userData) => apiRequest("/auth/sign-up", {
  method: "POST",
  body: JSON.stringify(userData),
});

export const signin = async (credentials) => apiRequest("/auth/sign-in", {
  method: "POST",
  body: JSON.stringify(credentials),
});

export const requestPasswordReset = async (email) => apiRequest("/auth/forgot-password", {
  method: "POST",
  body: JSON.stringify({ email }),
});

export const getCurrentUser = async () => apiRequest("/auth/me");
