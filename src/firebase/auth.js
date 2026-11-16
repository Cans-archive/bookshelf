import { signInAnonymously } from "firebase/auth";
import { auth } from "./config";

// Iniciar sesión anónima en Firebase
export const iniciarSesionAnonima = () => {
  return signInAnonymously(auth);
};