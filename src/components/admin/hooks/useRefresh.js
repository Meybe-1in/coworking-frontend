import { useState } from "react";

export default function useRefresh(callback) {
  const [refreshing, setRefreshing] =
    useState(false);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await callback();
    } finally {
      setRefreshing(false);
    }
  };

  return {
    refreshing,
    refresh,
  };
}