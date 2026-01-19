import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//agregar el token JWT si existe
API.interceptors.request.use((config) => {
  if (!config.url.includes("/contact")) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
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

  //obtener salas disponibles
export const getAvailableRooms = async (filters) => {
  try {
    const { date, start, end, people } = filters;
    
    const response = await API.get("/api/rooms/available",{
      params:{ date, start, end, people }
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo salas disponibles", error);
    throw error;
  }
}


export default API;

