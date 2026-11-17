import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export default ProtectedRoute;
