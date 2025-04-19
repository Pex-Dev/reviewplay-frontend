import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function EmailVerified() {
  //Obtener parametros de la URL
  const location = useLocation();

  useEffect(() => {
    document.title = `Verificar email`;
  }, []);

  const getContent = () => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    return (
      <>
        <div
          className={`flex justify-center items-center  
              ${
                status == "verified" || status == "already-verified"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
        >
          {status == "verified" || status == "already-verified" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="120"
              height="120"
              strokeWidth="1.5"
            >
              <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95"></path>
              <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44"></path>
              <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
              <path d="M8.56 20.31a9 9 0 0 0 3.44 .69"></path>
              <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95"></path>
              <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44"></path>
              <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92"></path>
              <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69"></path>
              <path d="M9 12l2 2l4 -4"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="120"
              height="120"
              strokeWidth="1.5"
            >
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              <path d="M12 9v4"></path>
              <path d="M12 16v.01"></path>
            </svg>
          )}
        </div>
        <h1 className="text-white text-xl uppercase text-center">
          {status == "verified" &&
            "Tu correo electrónico ha sido verificado correctamente"}
          {status == "already-verified" && "Correo ya verificado"}
          {status == "invalid" && "Token de verificación inválido"}
        </h1>
        <p className=" text-white mt-8">
          {status == "verified" &&
            "Ahora puedes acceder a todas las funciones de nuestra plataforma. Gracias por confirmar tu cuenta!"}
          {status == "already-verified" &&
            "Tu correo electrónico ya ha sido verificado anteriormente. No es necesario realizar esta acción nuevamente."}
          {status == "invalid" &&
            "El enlace de verificación no es válido o ha expirado. Solicita un nuevo correo de verificación e intenta nuevamente."}
        </p>
        {(status == "verified" || status == "already-verified") && (
          <Link
            to={"/login"}
            className="mt-7 block text-center w-full space-x-1 bg-linear-to-r  rounded py-2.5 text-white font-medium
                uppercase text-sm  transition-colors from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-800
                p-2"
          >
            Iniciar Sesión
          </Link>
        )}
      </>
    );
  };

  return (
    <div className="max-w-[500px] mx-auto mt-10 bg-gray-800 border-t border-t-gray-700 rounded p-2 lg:p-3">
      {getContent()}
    </div>
  );
}
