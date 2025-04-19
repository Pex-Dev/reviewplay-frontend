import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGame } from "../../context/GameContext";
import GameReviews from "../../components/Games/GameReviews";
import { getScoreColor, redondear } from "../../utilities/Utilities";

export default function Game() {
  const [expanded, setExpanded] = useState(false);
  const {
    game,
    favorite,
    loading,
    loadingFavorite,
    handleFavorite,
    followed,
    follow,
    unfollow,
  } = useGame();

  //Obtener si el usuario esta autenticado
  const { isAuth } = useAuth();

  const addFavoriteButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="35"
      height="35"
      strokeWidth="1"
    >
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
    </svg>
  );

  const removeFavotireButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="35"
      height="35"
    >
      <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"></path>
    </svg>
  );

  //Icono del botón favorito
  const [favoriteButton, setFavoriteButton] = useState(addFavoriteButtonIcon);

  //Cambiar icono del botón favorito dependiendo si
  useEffect(() => {
    favorite
      ? setFavoriteButton(removeFavotireButtonIcon)
      : setFavoriteButton(addFavoriteButtonIcon);
  }, [favorite]);

  return (
    <div className="max-w-[1000px] mx-auto ">
      <title>{game ? game.name : "Game"}</title>
      {/* Header o imagen de fondo del juego */}
      <header>
        <div className="max-h-[488px] relative overflow-hidden flex justify-center items-center">
          <img
            className="h-full min-w-full aspect-video "
            src={
              !loading
                ? game.background_image
                  ? game.background_image
                  : "/images/error.gif"
                : "/images/loading-image.gif"
            }
            alt={game.name}
          />
          <div className="absolute top-0 w-full h-full p-2 bg-linear-to-t from-gray-950 flex flex-col justify-end">
            <div>
              {loading ? (
                <>
                  <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28 animate-pulse mt-2"></div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-white text-2xl md:text-4xl text-outline-white">
                      {game.name}
                    </h2>
                    {game.averageScore && (
                      <div
                        className={`flex justify-center items-center rounded-full h-14 w-14 text-3xl text-white ${getScoreColor(
                          game.averageScore
                        )}`}
                      >
                        <p className="text-white overflow-hidden">
                          {redondear(game.averageScore)}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                      <p className="text-white text-sm">
                        {game.developers[0]
                          ? game.developers[0].name
                          : "Desarrollador no disponible"}
                      </p>
                      <p className="text-white text-sm">
                        Lanzado:
                        <span className="font-light">
                          {game.released
                            ? " " + game.released
                            : "Sin fecha de lanzamiento"}
                        </span>
                      </p>
                    </div>

                    {isAuth && (
                      <button
                        className={` cursor-pointer mr-2 ${
                          loadingFavorite ? "text-gray-500" : "text-white"
                        }`}
                        aria-label="Add game to favorites"
                        disabled={loadingFavorite}
                        onClick={() => {
                          handleFavorite(
                            favorite ? "removeFromFavorites" : "addToFavorites"
                          );
                        }}
                      >
                        {favoriteButton}
                      </button>
                    )}
                  </div>
                  {isAuth && (
                    <button
                      className="bg-white w-fit rounded py-1 px-3 font-medium mt-2 text-gray-800 cursor-pointer"
                      onClick={() => {
                        if (followed) {
                          unfollow(game.id);
                        } else {
                          follow(game.id);
                        }
                      }}
                    >
                      {followed ? "Dejar de seguir " : "Seguir"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col-reverse md:flex-row gap-3 mt-1 md:mt-5">
        <div className="w-full md:min-h-[300px] rounded-lg p-2">
          <section>
            {loading ? (
              <ul className="flex flex-col space-y-4">
                <li className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"></li>
                <li className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"></li>
                <li className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"></li>
                <li className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 animate-pulse"></li>
              </ul>
            ) : (
              <div
                className="text-white"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            )}
          </section>
          <GameReviews />
        </div>
        {/* Etiquetas */}
        <aside
          className={`w-full  md:w-[300px] bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2
           border-gray-900 border-t-2 border-t-gray-600 rounded p-2 overflow-hidden ${
             expanded ? "h-full " : "h-[50px] md:h-full"
           }`}
        >
          {/* Barra para expandir */}
          <div className="flex justify-between mb-3 pb-2 border-b border-gray-500 md:hidden">
            <h3 className="text-white font-medium text-lg">Etiquetas</h3>
            <button
              aria-label="Mostrar etiquetas del juego"
              className="text-white cursor-pointer"
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="36"
                height="36"
                strokeWidth="1.75"
              >
                <path d="M6 9l6 6l6 -6"></path>
              </svg>
            </button>
          </div>
          <div>
            <p className="text-white">Generos:</p>
            <ul className="flex gap-1 flex-wrap ">
              {game.genres?.map((genre, index) => (
                <li key={index}>
                  <Link
                    to={`/games?genres=${genre.slug}&tags=&search=&page=1`}
                    className="bg-gray-800 border border-gray-600 text-gray-200 px-2 rounded text-sm cursor-pointer hover:text-white hover:border-gray-500"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2.5">
            <p className="text-white">Plataformas:</p>
            <ul className="flex gap-1 flex-wrap ">
              {game.platforms?.map((plat, index) => (
                <li key={index}>
                  <Link
                    to={`/games?platforms=${plat.platform.id}&tags=&search=&page=1`}
                    className="bg-gray-800 border border-gray-600 text-gray-200 px-2 rounded text-sm cursor-pointer hover:text-white hover:border-gray-500"
                  >
                    {plat.platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
