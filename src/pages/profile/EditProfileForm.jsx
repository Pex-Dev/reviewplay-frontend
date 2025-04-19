import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Label from "../../components/UI/Label";
import TextArea from "../../components/UI/TextArea";
import Button from "../../components/UI/Button";
import DefaultIcon from "../../components/UI/DefaultIcon";
import { useAlert } from "../../context/AlertContext";

import UseEditProfile from "../../hooks/UseEditProfile";

const EditProfileForm = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [description, setDescription] = useState("");
  const { loading, userProfile, errors, handleSave } = UseEditProfile();

  const { showAlert } = useAlert();

  useEffect(() => {
    if (loading) return;
    document.title = `Editar perfil`;
  }, [loading]);

  //Formatos de imagen permitidos
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/avif",
  ];

  //Estilos para ventana modal de review
  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
    content: {
      backgroundColor: "transparent",
      border: "none",
      padding: "15px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  //Verificar el formato del archivo seleccionado
  const isValidType = (formato) => {
    return allowedTypes.includes(formato);
  };

  //Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //validar formato del archivo
      if (!isValidType(file.type)) {
        showAlert(
          "alert",
          "Error",
          "El archivo seleccionado no es valido",
          "warning"
        );
        return;
      }

      setImage(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const handleTextChange = (event) => {
    setDescription(event.target.value);
  };

  let cropper;

  return (
    <form
      className="bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="text-white text-2xl text-center font-medium">
        Editar Perfil
      </h1>
      {loading ? (
        <div className="flex justify-center items-center w-full mt-5">
          <DefaultIcon styles="w-[160px] h-[160px] animate-pulse" />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-5">
          <div className="relative">
            {croppedImage ? (
              <img
                className="w-[160px] h-[160px] rounded-full overflow-hidden"
                src={croppedImage}
                alt="Nueva Imagen"
              />
            ) : (
              <>
                {userProfile.image ? (
                  <img
                    className="w-[160px] h-[160px] rounded-full overflow-hidden"
                    src={`${import.meta.env.VITE_APP_URL}/uploads/${
                      userProfile.image
                    }`}
                    alt={userProfile.name}
                  />
                ) : (
                  <DefaultIcon styles="w-[160px] h-[160px] " />
                )}
              </>
            )}

            {/* Cambiar imagen */}
            <label
              className="absolute bg-white right-0 bottom-0 rounded cursor-pointer"
              aria-label="Cambiar Imagen de perfil"
              htmlFor="fileImage"
              type="button"
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
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                <path d="M13.5 6.5l4 4"></path>
              </svg>
            </label>
            <input
              className="absolute w-0 top"
              id="fileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}

      <Label
        inputId={"description"}
        value={"Descripción"}
        error={errors.description ? errors.description : null}
      >
        {loading ? (
          <div className="bg-gray-900 animate-pulse  h-[180px] w-full p-2 mb-[40px] ">
            <p className="text-gray-500">Cargando..</p>
          </div>
        ) : (
          <TextArea
            id={"description"}
            name={"description"}
            placeholder={"Ingresa una descripción para tu perfil"}
            initialValue={
              userProfile.description ? userProfile.description : ""
            }
            onChange={handleTextChange}
          />
        )}
      </Label>
      <div className="mt-3">
        <Button
          text={"Confirmar"}
          onClick={() => {
            handleSave(croppedImage, description);
          }}
          disabled={loading}
        />
      </div>
      {/* Ventana modal para recortar la imagen */}
      <ReactModal isOpen={image} style={customStyles}>
        <div className="bg-gray-800 rounded-2xl overflow-hidden">
          <Cropper
            src={image}
            background={false}
            style={{
              minHeight: 350,
              minWidth: 350,
              maxWidth: 700,
              maxHeight: "100dvh",
            }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            minCropBoxHeight={150}
            minCropBoxWidth={150}
            cropmove={false}
            viewMode={1}
            crop={(e) => (cropper = e.target.cropper)}
          />
          <div className="flex">
            <button
              className="bg-gray-200 p-2 w-full text-gray-800 font-semibold hover:text-black hover:bg-white cursor-pointer"
              onClick={() => {
                if (cropper) {
                  setCroppedImage(cropper.getCroppedCanvas().toDataURL());
                  setImage(null);
                }
              }}
            >
              Aceptar
            </button>
            <button
              className="bg-gray-600 p-2 w-full font-semibold text-gray-200 hover:text-white hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                setImage(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ReactModal>
    </form>
  );
};

export default EditProfileForm;
