
import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints que no necesitan el JWT de la aplicación.
const publicEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/google",
  "/auth/resend-verification",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/contact",
];

const isPublicEndpoint = (url = "") =>
  publicEndpoints.some((endpoint) => url.includes(endpoint));

// Elimina solamente los datos relacionados con la autenticación.
const clearAuthentication = () => {
  ["token", "username", "role"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

// Interceptor de peticiones.
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    const isPublic = isPublicEndpoint(config.url);

    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      !isPublic
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Error de red: no se recibió una respuesta HTTP.
    if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });

      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const { code, message } = data || {};

    let userMessage = message || "Ocurrió un error inesperado.";

    // Mensajes específicos de las reservas.
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

      default:
        break;
    }

    const requestUrl = error.config?.url || "";
    const isPublic = isPublicEndpoint(requestUrl);
    const authorization = error.config?.headers?.Authorization;
    const hadAuthorization = Boolean(authorization);

    // Un 401 en una petición privada que envió un JWT
    // indica que ese token ya no es válido para la petición.
    if (status === 401 && !isPublic && hadAuthorization) {
      clearAuthentication();

      userMessage =
        "Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.";
    }

    // Un 403 es un problema de permisos; no cerrar la sesión.
    if (status === 403) {
      userMessage = "No tienes permisos para realizar esta acción.";
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
