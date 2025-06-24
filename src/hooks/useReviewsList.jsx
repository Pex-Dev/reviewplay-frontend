import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";

export default function useReviewsList(type, id = null) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true); //Se usa para saber si ya cargaron los datos y asi mostrar ciertos contenidos
  const [sendingRequest, setSendingRequest] = useState(false); //Se usa para evitar hacer multiples solicitudes antes de que la anterior se complete

  const navigate = useNavigate();

  //Leer parámetros de la URL
  const page = parseInt(searchParams.get("page")) || 1;
  const order = searchParams.get("order") || "newest";

  const setPages = (page, type) => {
    if (page === null) {
      if (type === "next") {
        setNextPage(null);
      }
      if (type === "prev") {
        setPrevPage(null);
      }
      return;
    }

    // Usar URLSearchParams para obtener el parámetro 'page' que viene desde el backend
    const urlParams = new URLSearchParams(new URL(page).search);
    const pageNumber = urlParams.get("page");

    if (type === "next") {
      setNextPage(parseInt(pageNumber));
    }
    if (type === "prev") {
      setPrevPage(parseInt(pageNumber));
    }
  };

  const getData = async () => {
    if (sendingRequest) return;

    let url = `/api/`;

    //Para obtener las reseñas correspondientes a un juego o un usuario
    if (type == "all") {
      url += `reviews`;
    }
    if (type == "game") {
      url += `games/${id}/reviews`;
    }
    if (type == "user") {
      url += `users/${id}/reviews`;
    }

    try {
      setSendingRequest(true);
      setLoading(true);
      const response = await axiosClient(`${url}?page=${page}&order=${order}`);

      if (response.data.success) {
        setReviews(response.data.reviews.data);
        setPages(response.data.reviews.next_page_url, "next");
        setPages(response.data.reviews.prev_page_url, "prev");

        //Obtener el juego si es que se quiere obtener las reseñas para un juego en especifico
        if (type == "game" && response.data.game) {
          setGame(response.data.game);
        }
        //Obtener el usuario si es que se quiere obtener las reseñas que hizo un usuario
        if (type == "user" && response.data.user) {
          setUser(response.data.user);
          //Redireccionar al perfil del usuario si no tiene reseñas
          if (response.data.reviews.data.length === 0) {
            setLoading(false);
            navigate(`/profile/${response.data.user.id}`);
          }
        }
      }
      setLoading(false);
      setSendingRequest(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSendingRequest(false);
      if (error.status == 404) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, order });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ page: 1, order: newOrder });
  };

  return {
    loading,
    user,
    game,
    reviews,
    page,
    prevPage,
    nextPage,
    handlePageChange,
    handleOrderChange,
    order,
  };
}
