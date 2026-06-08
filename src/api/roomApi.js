import API from "./axiosConfig";
import { toUTC } from "../utils/dateUtils";

export const getRooms = async () => {
  const res = await API.get("/api/rooms");

  return res.data.data || res.data;
};

export const getRoomById = async (id) => {
  const res = await API.get(`/api/rooms/${id}`);
  return res.data.data || res.data;
};

export const getAllRooms = async () => {
  const res = await API.get("/api/rooms");
  return res.data.data || res.data;
};

export const getRoomsAvailability = async (filters) => {
    const { date, start, end, people } = filters;

    const startDateTime = toUTC(date, start);
    const endDateTime = toUTC(date, end);

    const response = await API.get("/api/rooms/availability", {
      params: {
        start: startDateTime,
        end: endDateTime,
        people
      }
    });

    return response.data;
  }