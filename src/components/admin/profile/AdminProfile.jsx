import useAdminProfile from "../hooks/useAdminProfile";

import Loader from "../ui/Loader";
import Err from "../ui/Err";

import "./AdminProfile.css";

export default function AdminProfile() {
  const {
    profile,
    loading,
    error,
  } = useAdminProfile();

  if (loading) return <Loader />;

  if (error) return <Err msg={error} />;

  const role =
    profile.roles?.includes("ROLE_ADMIN")
      ? "Administrador"
      : "Usuario";

  return (
    <div className="admin-profile">
      <div className="admin-profile__header">
        <h1>Mi Perfil</h1>

        <p>
          Información de la cuenta
          administrativa.
        </p>
      </div>

      <div className="admin-profile__card">
        <div className="admin-profile__field">
          <label>Nombre</label>
          <span>{profile.username}</span>
        </div>

        <div className="admin-profile__field">
          <label>Correo</label>
          <span>{profile.email}</span>
        </div>

        <div className="admin-profile__field">
          <label>Rol</label>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}