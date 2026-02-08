import { useGoogleLogin } from "@react-oauth/google";
import API from "../../api/axiosConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import googleLogo from "../../assets/google.svg";

export default function GoogleLoginButton({ 
  redirectTo = "/dashboard",
  rememberMe ,
  text = "Continue with Google"
}) {
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await API.post("/auth/google", {
          accessToken: tokenResponse.access_token,
          rememberMe
        });

        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("token", res.data.token);
        storage.setItem("username", res.data.username);
        storage.setItem("role", res.data.role);
        navigate(redirectTo);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo autenticar con Google",
        });
      }
    },
    onError: () => {
      Swal.fire("Error", "Autenticación con Google falló", "error");
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
