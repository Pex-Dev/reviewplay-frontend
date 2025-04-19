import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosClient from "../utilities/AxiosClient";

//Crear context
const AuthContext = createContext();

//Crear provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const navigate = useNavigate();

  //Crear instancia de sweetalert para mostrar alertas
  const MySwal = withReactContent(Swal);

  // Mostrar alerta
  const showAlert = (title, text) => {
    MySwal.fire({
      title: <p>{title}</p>,
      text: text,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  //Verificar si el usuario esta autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const user = await checkAuth();
      if (user) {
        setUser(user);
        setIsAuth(true);
      }
      setLoadingAuth(false);
    };

    fetchUser();
  }, []);

  const getSrfcCookie = async () => {
    try {
      const response = await axiosClient("/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //Verificar si esta autenticado
  const checkAuth = async () => {
    //Obtener token csrf
    await getSrfcCookie();
    try {
      const response = await axiosClient("/api/users");
      if (response.status != 200) {
        return null;
      }
      setUnreadNotificationsCount(response.data.unreadNotifications);
      return response.data.user;
    } catch (error) {
      return null;
    }
  };

  //Iniciar Sesión
  const login = async (credentials) => {
    if (sendingRequest) return;

    await getSrfcCookie(); //Obtener token csrf

    //Validar
    if (!validateLogin(credentials)) {
      return;
    }

    try {
      setSendingRequest(true);
      const respuesta = await axiosClient.post("/login", credentials, {
        withCredentials: true,
      });

      const responseData = respuesta.data;

      if (responseData.success) {
        //Almacenar información del usuario
        setUser(responseData.user);
        localStorage.setItem("user", JSON.stringify(responseData.user));

        //Establer usuario como autenticado
        setIsAuth(true);

        setSendingRequest(false);

        setUnreadNotificationsCount(responseData.unreadNotifications);

        //Navegara al perfil del usuario
        return navigate(`/profile/${responseData.user.id}`);
      }
      setSendingRequest(false);
    } catch (error) {
      setSendingRequest(false);
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }

      //Si no esta verificado enviar a pagina de notificación de verificación
      if (!error.response.data.verified) {
        return navigate(
          `/verification-notification?email=${credentials.email}`
        );
      }
    }
  };

  //Iniciar sesión como invitado
  const loginAsGuest = async () => {
    if (sendingRequest) return;

    await getSrfcCookie(); //Obtener token csrf

    try {
      setSendingRequest(true);
      const respuesta = await axiosClient.post("/login-guest");

      const responseData = respuesta.data;
      if (responseData.success) {
        //Almacenar información del usuario
        setUser(responseData.user);
        localStorage.setItem("user", JSON.stringify(responseData.user));

        //Establer usuario como autenticado
        setIsAuth(true);

        setSendingRequest(false);

        //Navegara al perfil del usuario
        navigate(`/profile/${responseData.user.id}`);
      }
      setSendingRequest(false);
    } catch (error) {
      setSendingRequest(false);
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }

      //Si no esta verificado enviar a pagina de notificación de verificación
      if (!error.response.data.verified) {
        return navigate(
          `/verification-notification?email=${credentials.email}`
        );
      }
    }
  };

  //Se que esto se puede mejorar mucho, pero funciona asi que lo dejo así
  const validateLogin = (credentials) => {
    let ok = true;
    let errores = {};

    if (!credentials.email) {
      errores.email = ["El campo email es requerido"];
      ok = false;
    }
    if (!credentials.password) {
      errores.password = ["El campo contraseña es requerido"];
      ok = false;
    }
    if (!ok) {
      setErrors(errores);
    }

    return ok;
  };

  //Cerrar Sesión
  const logout = async () => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const respuesta = await axiosClient.post("/logout");
      if (respuesta.status == 200) {
        //Eliminar usuario del cliente
        localStorage.removeItem("user");
        setUser(null);

        //Establer usuario como no autenticado
        setIsAuth(false);

        //Establecer notificaciones sin leer como 0
        setUnreadNotificationsCount(0);

        setSendingRequest(false);
        //redireccionar
        return navigate("/login");
      }
      setSendingRequest(false);
    } catch (error) {
      console.log(error);
      setSendingRequest(false);
    }
  };

  const handleResetPasswordEmail = async (data) => {
    if (sendingRequest) return;
    //Hacer solicitud
    try {
      setSendingRequest(true);
      const response = await axiosClient.post("/forgot-password", data);
      console.log(response);

      if (response.data.success) {
        //Mostrar alerta
        showAlert("Enviado!", response.data.message);
      }
      setSendingRequest(false);
    } catch (error) {
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }
      setSendingRequest(false);
    }
  };

  return (
    //proveer el contexto al childre
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        setUser,
        login,
        logout,
        errors,
        setErrors,
        handleResetPasswordEmail,
        loadingAuth,
        loginAsGuest,
        getSrfcCookie,
        unreadNotificationsCount,
        setUnreadNotificationsCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//exportar hook para usar el context mas facilmente
export const useAuth = () => useContext(AuthContext);
