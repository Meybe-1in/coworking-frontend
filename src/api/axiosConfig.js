import axios from "axios";
import {toUTC} from "../utils/dateUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor request
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token") || 
  sessionStorage.getItem("token");
  //endpoint
  const publicEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/resend-verification",
    "/contact",
  ];

  const isPublic = publicEndpoints.some((url) =>
    config.url?.includes(url)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => Promise.reject(error)

  );

  // interceptor response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/resend-verification",
      "/contact",
    ];

    const isPublic = publicEndpoints.some((u) =>
      url?.includes(u)
    );

    const token = 
    localStorage.getItem("token") || 
    sessionStorage.getItem("token");

    //redirigir si hay token o el endpoint publico o error 401/403
    if (
      token &&
      !isPublic &&
      (status === 401 || status === 403)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");

      //window.location.replace("/Login");
    }

    return Promise.reject(error);
  } 
);


export const getReservations = async () => {
  try {
    const res = await API.get("/api/reservations");
    return res.data; // Axios envuelve la respuesta en .data
  } catch (error) {
    console.error("Error en getReservations:", error);
    throw new Error("Error al obtener reservaciones");
  }
};

export const getRooms = async () => {
  try {
    const res = await API.get("/api/rooms");
    return res.data;
  } catch (error) {
    console.error("Error en getRooms:", error);
    throw new Error("Error al obtener las salas");
  }
};

//Obtener salas disponibles y no disponibles para un rango de fecha y hora
export const getRoomsAvailability = async (filters) => {
  try {
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

  } catch (error) {
    console.error("Error obteniendo disponibilidad", error);
    throw error;
  }
};

//crear calendario
export const getCalendar = async (from, to) => {

  const res = await API.get("/api/reservations/calendar", {
    params: { from, to }
  });

  return res.data;
};

//API para crear reserva 
export const createReservation = async (reservationData) => {
  try {
    const res = await API.post("/api/reservations", reservationData);
    return res.data;
  } catch (error) {
    console.error("AXIOS ERROR:", error);

    throw error; //relanzar el error para que pueda ser manejado en el componente
  }
};

//API para obtener sala por ID
export const getRoomById = async (id) => {
  try {
    const res = await API.get(`/api/rooms/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error obteniendo sala por ID:", error);
    throw new Error("Error al obtener la sala");
  }
};

export default API;

