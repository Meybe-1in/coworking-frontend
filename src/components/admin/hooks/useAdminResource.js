import { useEffect, useState, useCallback, } from "react";

export default function
  useAdminResource(
    fetchFn,
    errorMessage
  ) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(0);

  const [size, setSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);

  const load =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await fetchFn(page, size);

        setData(result.content);
        setTotalPages(result.totalPages);
        setTotalElements(result.totalElements);
      } catch {
        setError(
          errorMessage
        );
      } finally {
        setLoading(false);
      }
    }, [fetchFn, errorMessage, page, size]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reload: load,
  };
}