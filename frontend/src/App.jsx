import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <AppRoutes />
    </>
  );
};

export default App;
