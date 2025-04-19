import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseProfile from "./UseProfile";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../utilities/AxiosClient";
import { useAlert } from "../context/AlertContext";

export default function UseUpdatePassword() {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [errors, setErrors] = useState([]);

  const { loading, userProfile } = UseProfile();
  const { isAuth, user, loadingAuth } = useAuth();

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  //Verificar si el usuario está autenticado y si el perfil es el correcto
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

        //Si el perfil es el correcto y el id es 1 es invitado y no puede cambiar contraseña
        if (user.id == 1) {
          return navigate(`/profile/${user.id}`);
        }
      }
    }
  }, [isAuth, loadingAuth, userProfile]);

  const handleUpdatePassword = async (
    currentPassword,
    newPassword,
    newPasswordConfirmation
  ) => {
    if (sendingRequest) return;
    try {
      setSendingRequest(true);
      const response = await axiosClient.post(
        `/api/profile/${user.id}/updatePassword`,
        {
          _method: "PUT",
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        }
      );
      if (response.data.success) {
        setSendingRequest(false);
        setErrors([]);
        showAlert("alert", "Éxito", response.data.message);
        navigate(`/profile/${user.id}`);
      }
    } catch (error) {
      console.log(error.response.data.errors);
      setSendingRequest(false);
      setErrors(error.response.data.errors);
    }
  };
  return { loading, sendingRequest, handleUpdatePassword, errors };
}
