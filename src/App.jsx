import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/HomePage/HomePage";
import RoomList from "./components/RoomCard/RoomList";

import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function LayoutWrapper() {
  const location = useLocation();

  // rutas donde NO se mostrará el layout general (navbar, contenedor, etc.)
  const hideLayoutRoutes = ["/Login", "/register"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home maneja su propio Navbar y Footer */}
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations/new"
          />
          <Route path="/Login" element={<LoginPage />} />
          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard /> 
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
