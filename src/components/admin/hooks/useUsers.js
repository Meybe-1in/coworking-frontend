import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../../../api/adminApi";

export default function useUsers(tab) {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadUsers =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getUsers();

        setUsers(data);
      } catch (err) {
        setError(
          "Error al cargar usuarios"
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    if (tab === "users") {
      loadUsers();
    }
  }, [tab, loadUsers]);

  return {
    users,
    loading,
    error,
    reloadUsers: loadUsers,
  };
}