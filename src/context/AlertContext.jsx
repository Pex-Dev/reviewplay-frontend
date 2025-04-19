import { createContext, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//Crear context
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  //Crear instancia de sweetalert para mostrar alertas
  const MySwal = withReactContent(Swal);

  // Mostrar alerta
  const showAlert = (
    type,
    title,
    text,
    icon = "success",
    confirmationText = "Si eliminar",
    confirmationSuccessTitle = "Exito",
    confirmationSuccessText = "Operación completada con exito"
  ) => {
    if (type === "alert") {
      MySwal.fire({
        title: <p>{title}</p>,
        text: text,
        icon: icon,
        confirmButtonText: "Ok",
      });
    }

    if (type === "notification") {
      MySwal.fire({
        title: <p>{title}</p>,
        text: text,
        icon: icon,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }

    if (type === "confirmation") {
      return MySwal.fire({
        title: <p>{title}</p>,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmationText,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: confirmationSuccessTitle,
            text: confirmationSuccessText,
            icon: "success",
          });
          return true; // Devuelve true si se confirma
        }
        return false; // Devuelve false si se cancela
      });
    }

    return Promise.resolve(false); // Por defecto, no hace nada
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
