import { useEffect, useState } from "react";
import { getAdminProfile } from "../../../api/adminApi";

export default function useAdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const data = await getAdminProfile();

        setProfile(data);
      } catch {
        setError("Error al cargar perfil");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
  };
}