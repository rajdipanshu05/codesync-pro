import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  // ================= LOADING =================

  if (isCheckingAuth) {
    return <Loader />;
  }

  // ================= NOT AUTH =================

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // ================= AUTHORIZED =================

  return children;
};

export default ProtectedRoute;
