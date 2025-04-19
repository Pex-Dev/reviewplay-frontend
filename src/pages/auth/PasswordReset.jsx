import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputPassword from "../../components/UI/InputPassword";
import UseResetPassword from "../../hooks/UseResetPassword";
import Label from "../../components/UI/Label";

export default function PasswordReset() {
  const { handleResetPassword, errors } = UseResetPassword();

  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    document.title = `Reestablecer contraseña`;
  }, []);

  //Manejar el cambio en la contraseña
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <div className="bg-gray-800 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-700 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20">
      <h1 className="text-3xl text-white text-center font-medium">
        Restablecer Contraseña
      </h1>
      {errors.email && (
        <p className="p-1 rounded text-white mt-2 bg-red-600">{errors.email}</p>
      )}
      <div className="flex flex-col space-y-3 mt-9">
        <Label
          inputId={"password"}
          value={"Nueva Contraseña"}
          error={errors.password ? errors.password : null}
        >
          <InputPassword
            inputId={"password"}
            name={"password"}
            onChange={handleUserPasswordChange}
          />
        </Label>
        <button
          className="bg-blue-700 p-2 rounded text-white mt-4 border-b-2 border-b-blue-900 hover:bg-blue-600 transition-colors cursor-pointer text-lg"
          onClick={() => {
            handleResetPassword(userPassword);
          }}
        >
          Restablecer Contraseña
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <Link to={"/login"} className="text-blue-100 mt-2 hover:text-blue-300">
          ¿Ya tienes una cuenta? Iniciar sesión
        </Link>
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
