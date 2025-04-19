import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/UI/Input";
import InputPassword from "../../components/UI/InputPassword";
import Button from "../../components/UI/Button";
import Label from "../../components/UI/Label";

export default function Login() {
  const { login, loginAsGuest, errors, setErrors } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  useEffect(() => {
    document.title = `Iniciar sesión`;
  }, []);

  //Limpiar errores al entrar la página de login
  useEffect(() => {
    setErrors([]);
  }, []);

  //Manejar el cambio en el email
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  //Manejar el cambio en la contraseña
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  //Manejar el cambio de remember
  const handleRemember = (event) => {
    setRememberUser(event.target.checked);
  };

  return (
    <form
      className="bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault();
        login({
          email: userEmail,
          password: userPassword,
          remember: rememberUser,
        });
      }}
    >
      <h1 className="text-3xl text-white text-center font-medium">
        Iniciar Sesión
      </h1>
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
        <Label
          inputId={"password"}
          value={"Contraseña"}
          error={errors.password ? errors.password : null}
        >
          <InputPassword
            inputId={"password"}
            name={"password"}
            onChange={handleUserPasswordChange}
          />
        </Label>
        <div className="flex gap-1 items-center">
          <label htmlFor="remember" className="px-1 text-gray-200 text-lg">
            Mantener sesión iniciada
          </label>
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={rememberUser}
            onChange={handleRemember}
          />
        </div>
        <Button text={"Iniciar Sesión"} />
      </div>
      <div className="flex flex-col mt-5 mb-2">
        <button
          className="flex justify-center items-center space-x-3 bg-white text-gray-700 border border-gray-500 rounded p-1 cursor-pointer"
          type="button"
          onClick={() => {
            loginAsGuest();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="32"
            height="32"
            strokeWidth="1"
          >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
            <path d="M19 22v.01"></path>
            <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"></path>
          </svg>
          <span>Iniciar como invitado</span>
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <Link
          to={"/register"}
          className="text-blue-100 mt-2 hover:text-blue-300"
        >
          ¿No tienes una cuenta? Registrate aquí
        </Link>
        <Link
          to={"/send-password-reset"}
          className="text-blue-100 mt-2 hover:text-blue-300"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
}
