import {
  useEffect,
  useState,
} from "react";

export default function
  useAdminResource(
    tab,
    currentTab,
    fetchFn,
    errorMessage
  ) {
  const [data, setData] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const load =
    async () => {
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
    };

  useEffect(() => {
    if (tab === currentTab) {
      load();
    }
  }, [tab, currentTab]);

  return {
    data,
    loading,
    error,
    reload: load,
  };
}