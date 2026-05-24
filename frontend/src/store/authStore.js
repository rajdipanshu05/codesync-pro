import { create } from "zustand";

import toast from "react-hot-toast";

import { axiosInstance } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  isSigningUp: false,

  isLoggingIn: false,

  isCheckingAuth: true,

  // ================= CHECK AUTH =================

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  // ================= SIGNUP =================

  signup: async (formData, navigate) => {
    try {
      set({
        isSigningUp: true,
      });

      const response = await axiosInstance.post("/auth/signup", formData);

      set({
        user: response.data.user,
        isAuthenticated: true,
      });

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  // ================= LOGIN =================

  login: async (formData, navigate) => {
    try {
      set({
        isLoggingIn: true,
      });

      const response = await axiosInstance.post("/auth/login", formData);

      set({
        user: response.data.user,
        isAuthenticated: true,
      });

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },

  // ================= LOGOUT =================

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({
        user: null,
        isAuthenticated: false,
      });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },
}));
