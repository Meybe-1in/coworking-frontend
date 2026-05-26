import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const role =
    localStorage.getItem("role") ||
    sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (adminOnly && role !== "ROLE_ADMIN") {
    return <Navigate to="/userdashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
