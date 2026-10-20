
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import API from "../../api/axiosConfig";
import Button from "./Button";
import googleLogo from "../../assets/google.svg";

export default function GoogleLoginButton({
  redirectTo = "/dashboard",
  rememberMe = false,
  text = "Continue with Google",
}) {
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",

    onSuccess: async (tokenResponse) => {
      try {
        const res = await API.post("/auth/google", {
          accessToken: tokenResponse.access_token,
          rememberMe,
        });

        const authData = res.data.data;

        if (
          !authData?.token ||
          !authData?.role ||
          !authData?.username
        ) {
          throw new Error(
            "La respuesta del backend no contiene los datos de autenticación necesarios."
          );
        }

        const { token, username, role } = authData;

        // Elimina solamente los datos de autenticación anteriores.
        const authKeys = ["token", "username", "role"];

        authKeys.forEach((key) => {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        });

        // Recordarme: localStorage.
        // No recordar sesión: sessionStorage.
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("token", token);
        storage.setItem("username", username);
        storage.setItem("role", role);

        // Redirigir según el rol devuelto por el backend.
        if (role === "ROLE_ADMIN") {
          navigate("/admin", { replace: true });
        } else {
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        console.error(
          "Error en login con Google:",
          error.response?.data || error.message
        );

        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text:
            error.response?.data?.message ||
            "No se pudo completar el inicio de sesión con Google.",
        });
      }
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La autenticación con Google falló.",
      });
    },
  });

  return (
    <Button
      text={text}
      variant="google"
      type="button"
      icon={<img src={googleLogo} alt="Google" />}
      onClick={() => loginWithGoogle()}
    />
  );
}
