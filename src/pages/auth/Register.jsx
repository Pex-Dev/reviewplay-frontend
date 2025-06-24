import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import Input from "../../components/UI/Input";
import InputPassword from "../../components/UI/InputPassword";
import Label from "../../components/UI/Label";

export default function Register() {
  const { register, errors } = useRegister();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");

  useEffect(() => {
    document.title = `Registrar`;
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  //Manejar el cambio en el email
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  //Manejar el cambio en la contraseña
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserPasswordConfirmationChange = (event) => {
    setUserPasswordConfirmation(event.target.value);
  };

  return (
    <div className="bg-gray-800 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-700 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20">
      <h1 className="text-3xl text-white text-center font-medium">Registrar</h1>
      {errors.message && (
        <p className="p-1 rounded text-white mt-2 bg-red-600">
          {errors.message}
        </p>
      )}
      <div className="flex flex-col space-y-3 mt-9">
        <Label
          inputId={"name"}
          value={"Nombre"}
          error={errors.name ? errors.name : null}
        >
          <Input
            inputId={"name"}
            type={"name"}
            name={"name"}
            onChange={handleUserNameChange}
            placeholder={"Ingrese su nombre de usuario"}
          />
        </Label>
        <Label
          inputId={"email"}
          value={"Email"}
          error={errors.email ? errors.email : null}
        >
          <Input
            inputId={"email"}
            type={"email"}
            name={"email"}
            onChange={handleUserEmailChange}
            placeholder={"Ingrese su correo"}
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
        <Label
          inputId={"password2"}
          value={"Confirme contraseña"}
          error={
            errors.password_confirmation ? errors.password_confirmation : null
          }
        >
          <InputPassword
            inputId={"password2"}
            name={"password_confirmation"}
            onChange={handleUserPasswordConfirmationChange}
          />
        </Label>
        <button
          className="bg-blue-700 p-2 rounded text-white mt-4 border-b-2 border-b-blue-900 hover:bg-blue-600 transition-colors cursor-pointer text-lg"
          onClick={() => {
            register({
              name: userName,
              email: userEmail,
              password: userPassword,
              password_confirmation: userPasswordConfirmation,
            });
          }}
        >
          Registrar
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <Link to={"/login"} className="text-blue-100 mt-2 hover:text-blue-300">
          ¿Ya tienes una cuenta? Iniciar sesión
        </Link>
        <Link
          to={"/send-password-reset"}
          className="text-blue-100 mt-2 hover:text-blue-300"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}
