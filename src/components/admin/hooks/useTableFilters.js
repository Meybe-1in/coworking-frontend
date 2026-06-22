import { useState } from "react";

export default function useTableFilters() {
  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  };
}