import API from "./axiosConfig";

export const login = (credentials) =>
  API.post("/auth/login", credentials);

export const register = (data) =>
  API.post("/auth/register", data);

export const resendVerification = (email) =>
  API.post("/auth/resend-verification", { email });

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);