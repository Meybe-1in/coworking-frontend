import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/HomePage/HomePage";
import RoomList from "./components/RoomCard/RoomList";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import VerifyError from "./components/ui/VerifyError";
import VerifySuccess from "./components/ui/VerifySuccess";
import ForgotPassword from "./pages/Password/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import UserCalendar from "./pages/UserCalendar/UserCalendar";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import RoomDetailsPage from "./pages/Checkout/RoomDetailsPage";
import AuthWatcher from "./components/Auth/AuthWatcher";
import PaymentPage from "./pages/payment/PaymentPage";
import MyReservations from "./components/User/MyReservation";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function LayoutWrapper() {
  const location = useLocation();

  // rutas donde NO se mostrará el layout general (navbar, contenedor, etc.)
  const hideLayoutRoutes = ["/Login", "/register"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50">
        <Routes>

          {/* publico con navbar + footer*/}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* sin layout */}
          <Route path="/" element={<Home />} /> {/* Home maneja su propio Navbar y Footer */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-error" element={<VerifyError />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/rooms/:id" element={<RoomDetailsPage />} />

          {/* protegidas */}
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
          <Route
            path="/Login"
            element={
              <LoginPage />
            }
          />
          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <UserCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" 
          element={
          <ProtectedRoute>
          <PaymentPage />
          </ProtectedRoute>
          } 
          />
          <Route
            path="/my-reservations"
            element={
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
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
      <AuthWatcher />
      <LayoutWrapper />
    </Router>
  );
}
