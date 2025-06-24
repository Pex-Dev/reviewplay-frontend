import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useProfile from "./useProfile";
import axiosClient from "../utilities/AxiosClient";
import { useAlert } from "../context/AlertContext";

export default function useEditProfile() {
  const [errors, setErrors] = useState([]);

  const { loading, userProfile } = useProfile();
  const { isAuth, user, loadingAuth } = useAuth();

  const { showAlert } = useAlert();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth) {
      //Si no esta autenticado ir al login
      if (!isAuth) {
        return navigate("/login");
      }

      if (userProfile) {
        //Si el perfil tiene un id diferente al del usuario se envia al perfil
        if (userProfile.id != user.id) {
          return navigate(`/profile/${user.id}`);
        }
      }
      //De todas formas en el incluso si el usuario logra entrar acá terminaría modificando su propio perfil en en vez del de otro usuario
    }
  }, [isAuth, loadingAuth, userProfile]);

  //manejar el envio de datos
  const handleSave = async (croppedImage, description) => {
    try {
      const response = await axiosClient.post(
        `/api/profile/${userProfile.id}`,
        {
          _method: "PUT",
          image: croppedImage,
          description: description,
        }
      );
      if (response.data.success) {
        showAlert("alert", "Actualizado", response.data.message);
        navigate(`/profile/${userProfile.id}`);
      }
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
        return;
      }

      if (error.status == 403) {
        showAlert(
          "alert",
          "Error",
          "El perfil no pertenece al usuario",
          "error"
        );
      }

      if (error.status == 413) {
        showAlert(
          "alert",
          "Error",
          "El tamaño de la imagen no puede ser superior a 5MB",
          "error"
        );
      }

      if (error.status == 415) {
        showAlert(
          "alert",
          "Error",
          "El formato del archivo no es valido",
          "error"
        );
      }
      setErrors(error.response.data.errors);
    }
  };

  return { loading, userProfile, errors, handleSave };
}
