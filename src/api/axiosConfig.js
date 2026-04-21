import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor request
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
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

    if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const { code, message } = data || {};

    let userMessage = message || "Ocurrió un error inesperado";

    switch (code) {
      case "RESERVATION_OVERLAP":
        userMessage = "Esta sala ya está ocupada.";
        break;
      case "DUPLICATE_RESERVATION":
        userMessage = "Ya tienes esta reserva.";
        break;
      case "INVALID_TIME_RANGE":
        userMessage = "Horario inválido.";
        break;
      case "INVALID_DURATION":
        userMessage = "Máximo 8 horas.";
        break;
    }

    // limpiar sesión (sin lógica extra)
    if (status === 401 || status === 403) {
      localStorage.clear();
      sessionStorage.clear();
    }

    Swal.fire({
      icon: "error",
      title: `Error ${status}`,
      text: userMessage,
    });

    return Promise.reject(error);
  }
);
export default API;
