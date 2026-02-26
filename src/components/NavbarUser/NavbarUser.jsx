import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuthItem, clearAuth } from "../../utils/authStorage";

export default function NavbarUser() {
  //const [username, setUsername] = useState(null);
  const [username] = useState(() => getAuthItem("username"));
  
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUsername = getAuthItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

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
            onClick={() => navigate("/userdashboard")}
            className={`cursor-pointer ${isActive("/userdashboard")}`}
          >
            Reservar Sala
          </span>

        </div>

        {/* DERECHA - USUARIO + LOGOUT */}
        <div className="hidden md:flex w-1/4 justify-end items-center gap-5">

          {/* usuario alineado */}
          {username && (
            <div className="flex items-center gap-2 text-gray-700">
              <span className="leading-none">{username}</span>
            </div>
          )}

          <span
            onClick={handleLogout}
            className="cursor-pointer text-blue-800 hover:text-blue-700"
          >
            Logout
          </span>

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

          <div className="flex items-center gap-2">
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
              navigate("/userdashboard");
              setOpen(false);
            }}
            className={isActive("/userdashboard")}
          >
            Reservar Sala
          </span>

          <span
            onClick={handleLogout}
            className="text-blue-800 hover:text-blue-700"
          >
            Logout
          </span>
        </div>
      )}
    </nav>
  );
}
