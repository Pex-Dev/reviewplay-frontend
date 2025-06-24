import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";
import { useAlert } from "../context/AlertContext";

export default function useResetPassword() {
  const [errors, setErrors] = useState({});
  const [sendingRequest, setSendingRequest] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { showAlert } = useAlert();

  //Obtener parámetros de URL
  const { token } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    //Si no esta el token o el email se redirecciona al login
    if (!token || !email) {
      navigate("/login");
    }
  }, []);

  const handleResetPassword = async (password) => {
    if (sendingRequest) return;

    const data = {
      token,
      email,
      password,
    };

    try {
      const response = await axiosClient.post("/reset-password", data);
      if (response.data.success) {
        //Mostrar alerta y navigar al login
        showAlert("alert", "Listo", response.data.message);
        navigate("/login");
      }

      setSendingRequest(true);
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      setSendingRequest(false);
    }
  };

  return { errors, handleResetPassword };
}
