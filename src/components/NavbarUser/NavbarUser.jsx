import { useEffect, useState } from "react";
import { getAuthItem, clearAuth } from '../../utils/authStorage';

export default function NavbarUser() {

  const [username, setUsername] = useState("Usuario");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = getAuthItem("username");

    if (storedUsername) {
     setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    clearAuth();
    
    navigate("/login");
  };

  return (
    <nav className="navbar-user">
      <div className="navbar-container">
         <div className="navbar-logo">
                  <span className="logo-bold">Co</span>
                      <span className="logo-light">Working</span>
                </div>
        <div className="navbar-links">
          <span onClick={() => navigate("/calendar")}>Calendario</span>
          <span className="navbar-link link-reserve">Reservar Sala</span>
        </div>

        {/* DERECHA - USUARIO + LOGOUT */}
        <div className="hidden md:flex w-1/4 justify-end items-center gap-5">

          {/* usuario alineado */}
          <div className="flex items-center gap-2 text-gray-700">
            <span className="leading-none">{username}</span>
          </div>

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
              navigate("/");
              setOpen(false);
            }}
            className={isActive("/")}
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