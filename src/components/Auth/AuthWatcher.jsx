import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthWatcher() {
  const navigate = useNavigate();

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/terms",
    "/privacy",
    "/forgot-password",
    "/reset-password"
  ];

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");



    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}