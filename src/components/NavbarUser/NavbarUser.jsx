import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuthItem, clearAuth } from "../../utils/authStorage";

export default function NavbarUser() {
  //const [username, setUsername] = useState(null);
  const [username, setUsername] = useState(() => getAuthItem("username"));
   const [dropdownOpen, setDropdownOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuth();
    navigate("/Login");
  };

  // botton sin estilo
  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-800 font-semibold"
      : "text-gray-400 hover:text-blue-800";

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-blue-800/20">
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center">

        {/* LOGO */}
        <div
          className="text-2xl font-bold cursor-pointer w-1/4"
          onClick={() => navigate("/userdashboard")}
        >
          <span className="text-blue-800">Co</span>
          <span className="text-black">Working</span>
        </div>

        {/* MENÚ CENTRADO */}
        <div className="hidden md:flex w-2/4 justify-center gap-12 text-lg">

          <span
            onClick={() => navigate("/calendar")}
            className={`cursor-pointer ${isActive("/calendar")}`}
          >
            Calendario
          </span>

          <span
            onClick={() => navigate("/userdashboard", { state: { reset: true } })}
            className={`cursor-pointer ${isActive("/userdashboard")}`}
          >
            Reservar Sala
          </span>

        </div>

        {/* DERECHA - USUARIO */}
<div className="hidden md:flex w-1/4 justify-end items-center relative">

  {username && (
    <div className="relative">

      {/* USER MINI MENU */}
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 cursor-pointer group"
      >

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
          {username.charAt(0).toUpperCase()}
        </div>

        {/* Username */}
        <span className="text-sm text-gray-700 group-hover:text-blue-800 transition">
          {username}
        </span>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* DROPDOWN */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-4 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2">

          <div
            onClick={() => {
              navigate("/my-reservations");
              setDropdownOpen(false);
            }}
            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition"
          >
            Mis reservaciones
          </div>

          <div
            onClick={() => {
              navigate("/my-payments");
              setDropdownOpen(false);
            }}
            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition"
          >
            Mis pagos
          </div>

          <div className="border-t border-gray-100 my-1"></div>

          <div
            onClick={handleLogout}
            className="px-4 py-3 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition"
          >
            Logout
          </div>

        </div>
      )}
    </div>
  )}
</div>

        {/* MOBILE ICON MENU */}
        <button
          className="md:hidden ml-auto text-2xl leading-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-blue-800/20 px-6 py-4 flex flex-col gap-4">

          <div className="flex items-center gap-2 font-medium">
            {username}
          </div>

          <span
            onClick={() => {
              navigate("/calendar");
              setOpen(false);
            }}
            className={isActive("/calendar")}
          >
            Calendario
          </span>

          <span
            onClick={() => {
              navigate("/userdashboard", { state: { reset: true } });
              setOpen(false);
            }}
            className={isActive("/userdashboard")}
          >
            Reservar Sala
          </span>

          <span
            onClick={() => {
              navigate("/my-reservations");
              setOpen(false);
            }}
            className={isActive("/my-reservations")}
          >
            Mis reservaciones
          </span>

          <span
            onClick={() => {
              navigate("/my-payments");
              setOpen(false);
            }}
            className={isActive("/my-payments")}
          >
            Mis pagos
          </span>

          <span
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </span>
        </div>
      )}
    </nav>
  );
}