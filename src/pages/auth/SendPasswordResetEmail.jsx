import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Label from "../../components/UI/Label";

export default function SendPasswordResetEmail() {
  const {
    handleResetPasswordEmail,
    errors,
    setErrors,
    isAuth,
    loadingAuth,
    user,
  } = useAuth();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    document.title = `Reestablecer contraseña`;
  }, []);

  //Limpiar errores al entrar la página
  useEffect(() => {
    setErrors([]);
  }, []);

  useEffect(() => {
    if (!loadingAuth) {
      //Si esta autenticado ir al perfil
      if (isAuth) {
        return navigate(`/profile/${user.id}`);
      }
    }
  }, [isAuth, loadingAuth]);

  //Manejar el cambio en el email
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  return (
    <div className="bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20">
      <h1 className="text-3xl text-white text-center font-medium">
        Olvide mi contraseña
      </h1>
      <p className="text-white">
        Ingresa tu email para que te enviemos las instrucciones
      </p>
      {errors.message && (
        <p className="p-1 rounded text-white mt-2 bg-gradient-to-l from-red-700 to-red-600 border border-red-400">
          {errors.message}
        </p>
      )}
      <div className="flex flex-col space-y-3 mt-9">
        <Label
          inputId={"email"}
          value={"Email"}
          error={errors.email ? errors.email : null}
        >
          <Input
            inputId={"email"}
            type={"email"}
            placeholder={"Ingrese su correo"}
            name={"email"}
            onChange={handleUserEmailChange}
          />
        </Label>

        <Button
          text={"Enviar instrucciones"}
          onClick={() => {
            handleResetPasswordEmail({
              email: userEmail,
            });
          }}
        />
      </div>
      <div className="flex flex-col mt-5">
        <Link
          to={"/register"}
          className="text-blue-100 mt-2 hover:text-blue-300"
        >
          ¿No tienes una cuenta? Registrate aquí
        </Link>
      </div>
    </div>
  );
}
