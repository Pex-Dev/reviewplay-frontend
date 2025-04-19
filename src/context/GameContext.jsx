import { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import axiosClient from "../utilities/AxiosClient";

//crear el context
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [sendingRequest, setSendingRequest] = useState(false);

  const { showAlert } = useAlert();

  const navigate = useNavigate();

  //Obtener id desde la URL
  const { id } = useParams();

  //Obtener detalles de el juego
  const getData = async () => {
    setLoading(true);
    try {
      const respuesta = await axiosClient(`/api/games/${id}`);
      setGame(respuesta.data.game);

      setFavorite(respuesta.data.inFavorites);
      if (respuesta.data.userReview) {
        setUserReview(respuesta.data.userReview);
      }
      setFollowed(respuesta.data.game.followed);

      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.status == 404) {
        navigate("/games");
      }
    }
  };

  //Cargar datos cuando cambia el ID del juego
  useEffect(() => {
    getData();
  }, [id]);

  //Manejar favoritos
  const handleFavorite = async (type = "addToFavorites") => {
    try {
      setLoadingFavorite(true);
      const respuesta =
        type == "addToFavorites"
          ? await axiosClient.post("/api/favorites", { id })
          : await axiosClient.post("/api/favorites", { _method: "DELETE", id });
      if (respuesta.data.success) {
        if (type === "addToFavorites") {
          setFavorite(true);
          showAlert(
            "notification",
            "¡Agregado!",
            "El elemento ha sido añadido a favoritos.",
            "success"
          );
        } else {
          setFavorite(false);
          showAlert(
            "notification",
            "¡Eliminado!",
            "El elemento ha sido eliminado de favoritos.",
            "info"
          );
        }
      }
      setLoadingFavorite(false);
    } catch (error) {
      console.log(error);
      setLoadingFavorite(false);
      if (error.response.data.message) {
        showAlert("alert", "Error", error.response.data.message, "error");
      }
    }
  };

  const follow = async (id) => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient.post(`/api/games/${id}/follow`);
      setFollowed(response.data.success);
      console.log(response);

      setSendingRequest(false);
    } catch (error) {
      if (error.status == 403) {
        showAlert("alert", "Error", error.response.data.message, "error");
      }
      setSendingRequest(false);
      console.log(error);
    }
  };

  const unfollow = async (id) => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient.post(`/api/games/${id}/unfollow`, {
        _method: "DELETE",
      });
      setFollowed(false);
      console.log(response);

      setSendingRequest(false);
    } catch (error) {
      setSendingRequest(false);
    }
  };

  return (
    //proveer el contexto al children
    <GameContext.Provider
      value={{
        game,
        favorite,
        handleFavorite,
        loading,
        loadingFavorite,
        userReview,
        setUserReview,
        followed,
        follow,
        unfollow,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

//Exportar context para usarlo facilmente
export const useGame = () => useContext(GameContext);
