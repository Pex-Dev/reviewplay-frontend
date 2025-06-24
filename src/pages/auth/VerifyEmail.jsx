import { useEffect } from "react";
import useRegister from "../../hooks/useRegister";

export default function VerifyEmail() {
  const { sendVerificationEmail } = useRegister();

  useEffect(() => {
    document.title = `Verifica tu email`;
  }, []);

  //Obtener email
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get("email");

  return (
    <div className="bg-gray-800 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-700 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20">
      <h1 className="text-2xl text-white text-center font-medium">
        ¡Verifica tu correo electrónico!
      </h1>
      <p className="text-gray-200 mt-5">
        Para completar tu registro, por favor, revisa tu bandeja de entrada y
        haz clic en el enlace de verificación que hemos enviado a tu dirección
        de correo electrónico. Si no ves el correo en tu bandeja principal, no
        olvides revisar la carpeta de spam. Si no has recibido el correo, puedes
        solicitar uno nuevo haciendo clic en el siguiente enlace:
      </p>
      <button
        className="bg-blue-600 text-white p-2 mt-5 w-full rounded transition-colors hover:bg-blue-500 cursor-pointer"
        onClick={() => {
          if (!email) return;
          sendVerificationEmail(email);
        }}
      >
        Enviar correo de verificación
      </button>
    </div>
  );
}
