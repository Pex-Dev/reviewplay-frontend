import { useState } from "react";
import Swal from "sweetalert2";
import { useAlert } from "../context/AlertContext";
import axiosClient from "../utilities/AxiosClient";

export default function useReviews() {
  const [errors, setErrors] = useState({});
  const [sendingRequest, setSendingRequest] = useState(false);

  const { showAlert } = useAlert();

  const getReview = async (id) => {
    if (!id) return false;
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient(`/api/reviews/${id}`);
      if (response.data.success) {
        setSendingRequest(false);
        return response.data.review;
      }
      setSendingRequest(false);
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //Añadir reseña
  const handleAddReview = async (gameId, score, reviewText) => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const data = { id: gameId, score: score, review: reviewText };

      const response = await axiosClient.post(`/api/reviews`, data);

      if (response.data.success) {
        showAlert("alert", "¡Agregado!", response.data.message);
        setSendingRequest(false);
        return response.data.review;
      }
      setSendingRequest(false);
      return false;
    } catch (error) {
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }
      setSendingRequest(false);
      return false;
    }
  };

  //Actualizar review
  const handleUpdateReview = async (id, score, reviewText) => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const data = { id: id, score: score, review: reviewText };

      const response = await axiosClient.post(`/api/reviews`, {
        ...data,
        _method: "PUT",
      });

      if (response.data.success) {
        showAlert("alert", "¡Actualizado!", response.data.message);
        setSendingRequest(false);
        return true;
      }
      setSendingRequest(false);
      return false;
    } catch (error) {
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }
      setSendingRequest(false);
      return false;
    }
  };

  //Actualizar review
  const handleDeleteReview = async (id) => {
    if (sendingRequest) return;

    //Consultar si quiere realmente eliminar la reseña
    const result = await showAlert(
      "confirmation",
      "¿Estás seguro?",
      "¡No podrás deshacer esto!",
      "warning",
      "Sí, eliminar",
      "Eliminado",
      "Reseña eliminada con exito"
    );
    if (!result) {
      return false;
    }

    try {
      setSendingRequest(true);
      const data = { id };
      const response = await axiosClient.post(`/api/reviews`, {
        ...data,
        _method: "DELETE",
      });

      if (response.data.success) {
        setSendingRequest(false);
        return true;
      }
      setSendingRequest(false);
      return false;
    } catch (error) {
      console.log(error);

      const responseErrors = error.response.data.errors;
      if (responseErrors) {
        setErrors(responseErrors);
      }
      setSendingRequest(false);
      return false;
    }
  };

  return {
    getReview,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    errors,
    setErrors,
    sendingRequest,
  };
}
