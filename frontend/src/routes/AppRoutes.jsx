import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import SignupPage from "../pages/SignupPage";

import HomePage from "../pages/HomePage";

import RoomPage from "../pages/RoomPage";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/room/:roomId"
        element={
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
