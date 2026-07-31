import API from "./axiosConfig";

export const getAdminStats = async () => {
  const response = await API.get("/admin/stats");
  return response.data;
};

export const getReservationsChart = async (period) => {
  if (period === "YEAR") {
    const response = await API.get(
      "/admin/dashboard/reservations/monthly"
    );
    return response.data;
  }

  const response = await API.get(
    "/admin/dashboard/reservations",
    {
      params: { period },
    }
  );

  return response.data;
};