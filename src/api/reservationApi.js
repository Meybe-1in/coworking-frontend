import API from "./axiosConfig";

export const getReservations = async () => {
  const res = await API.get("/api/reservations");

  return res.data.data || res.data;
};

export const getMyReservations = async () => {
  const response = await API.get("api/reservations/my");
  return response.data;
};

export const getCalendar = async (start, end) => {
  const res = await API.get(
    `/api/reservations/calendar?from=${start}&to=${end}`
  );

  return res.data.data || res.data;
};

export const createReservation = async (data) => {
  return await API.post("/api/reservations", data);
};