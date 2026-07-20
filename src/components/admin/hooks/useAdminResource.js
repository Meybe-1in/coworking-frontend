import {
  useEffect,
  useState,
  useCallback,
} from "react";

export default function
  useAdminResource(
    fetchFn,
    errorMessage
  ) {
  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const load =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await fetchFn();

        setData(result);
      } catch {
        setError(
          errorMessage
        );
      } finally {
        setLoading(false);
      }
    }, [fetchFn, errorMessage]);

  useEffect(() => {
      load();
  }, [load]);

  return {
    data,
    loading,
    error,
    reload: load,
  };
}