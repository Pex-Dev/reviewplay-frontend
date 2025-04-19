import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../utilities/AxiosClient";
import { useAlert } from "../context/AlertContext";

const useRegister = () => {
  const [errors, setErrors] = useState({});
  const [sendingRequest, setSendingRequest] = useState(false);

  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const register = async (userData) => {
    //Validar
    if (!validateRegister(userData)) {
      return;
    }

    try {
      const respuesta = await axiosClient.post("/register", userData);
      const responseData = respuesta.data;
      if (responseData.success) {
        //Mostrar mensaje de éxito y navegar al login
        showAlert("alert", "¡Registrado!", responseData.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      setErrors(error.response.data.errors);
    }
  };

  //Se que esto se puede mejorar mucho, pero funciona asi que lo dejo así
  const validateRegister = (userData) => {
    let ok = true;
    let errores = {};

    if (!userData.name) {
      errores.name = ["El campo nombre es requerido"];
      ok = false;
    }
    if (!userData.email) {
      errores.email = ["El campo email es requerido"];
      ok = false;
    }
    if (!userData.password) {
      errores.password = ["El campo contraseña es requerido"];
      ok = false;
    }
    if (!userData.password_confirmation) {
      errores.password_confirmation = ["Debe repetir su contraseña"];
      ok = false;
    }
    if (!ok) {
      setErrors(errores);
    }

    return ok;
  };

  const sendVerificationEmail = async (email) => {
    if (sendingRequest) return;
    try {
      setSendingRequest(true);
      const response = await axiosClient.post(
        "/email/verification-notification",
        { email }
      );
      if (response.data.success) {
        showAlert("alert", "Enviado", response.data.message);
      }
      setSendingRequest(false);
    } catch (error) {
      console.log(error);
      setSendingRequest(false);
    }
  };

  return {
    register,
    errors,
    sendVerificationEmail,
  };
};

export default useRegister;
