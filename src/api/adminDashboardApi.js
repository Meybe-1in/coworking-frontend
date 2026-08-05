import API from "./axiosConfig";

// Stats Section
export const getAdminStats = async () => {
  const response = await API.get("/admin/stats");
  return response.data;
};

// Reservations Chart
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

// Revenue Chart
export const getRevenueChart = async (period) => {
  const response = await API.get("/admin/dashboard/revenue", {
    params: { period },
  });
  return response.data;
};

// Room occupancy Chart
export const getRoomOccupancyChart = async () => {
  const response = await API.get("/admin/dashboard/room-occupancy");
  return response.data;
};

// Recent activities
export const getRecentActivities = async () => {
  const response = await API.get("/admin/dashboard/recent-activities");
  return response.data;
};