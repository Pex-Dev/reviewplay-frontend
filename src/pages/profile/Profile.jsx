import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utilities/Utilities";
import DefaultIcon from "../../components/UI/DefaultIcon";
import ReviewCardWithGame from "../../components/Reviews/ReviewCardWithGame";
import { useEffect } from "react";

export default function Profile() {
  const { userProfile, loading, followUser, unfollowUser, followed } =
    useProfile();
  const { isAuth, user, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    document.title = `Perfil de ${userProfile.name}`;
  }, [loading]);

  return (
    <div className="p-2 md:p-6 w-full mx-auto">
      <title>{userProfile ? "Perfil de " + userProfile.name : " "}</title>
      <header className="mb-16 flex flex-col justify-between">
        <div className="flex justify-between flex-col-reverse md:flex-row gap-7">
          <div className="flex w-fit gap-3">
            {/* Mostrar imagen por defecto mientras carga */}
            {loading ? (
              <DefaultIcon styles={"w-[100px] h-[100px] "} />
            ) : (
              <>
                {/* Si el usuario tiene imagen mostrarla. Si no mostrar imagen por defecto */}
                {userProfile.image ? (
                  <img
                    className="w-[100px] h-[100px] rounded-full overflow-hidden"
                    src={`${import.meta.env.VITE_APP_URL}/uploads/${
                      userProfile.image
                    }`}
                    alt={userProfile.name}
                  />
                ) : (
                  <DefaultIcon styles={"w-[100px] h-[100px] "} />
                )}
              </>
            )}
            <div>
              {loading ? (
                <>
                  <div className="bg-gray-700 w-[200px] h-5 rounded-full animate-pulse mt-2"></div>
                  <div className="bg-gray-700 w-[170px] h-3 rounded-full animate-pulse mt-3"></div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl text-white text-outline-white">
                    {userProfile.name}
                  </h1>
                  <p className="text-gray-300 text-sm">
                    Miembro desde:
                    <span className="text-white">
                      {" " + formatDate(userProfile.created_at)}
                    </span>
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 space-x-4 mt-2">
                    <Link
                      className="text-gray-300 text-sm"
                      to={
                        userProfile.reviewsCount > 0
                          ? `/profile/${userProfile.id}/reviews`
                          : "#"
                      }
                    >
                      Reseñas:
                      <span className="text-white">
                        {" " + userProfile.reviewsCount}
                      </span>
                    </Link>
                    <Link
                      className="text-gray-300 text-sm"
                      to={
                        userProfile.favoritesCount > 0
                          ? `/profile/${userProfile.id}/favorites`
                          : "#"
                      }
                    >
                      Favoritos:
                      <span className="text-white">
                        {" " + userProfile.favoritesCount}
                      </span>
                    </Link>
                    <Link
                      className="text-gray-300 text-sm"
                      to={
                        userProfile.followersCount > 0
                          ? `/profile/${userProfile.id}/followers`
                          : "#"
                      }
                    >
                      Seguidores:
                      <span className="text-white">
                        {" " + userProfile.followersCount}
                      </span>
                    </Link>
                    <Link
                      className="text-gray-300 text-sm"
                      to={
                        userProfile.followedCount > 0
                          ? `/profile/${userProfile.id}/followed`
                          : "#"
                      }
                    >
                      Seguidos:
                      <span className="text-white">
                        {" " + userProfile.followedCount}
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Mostrar boton de cerrar sesión si el perfil es del usuario */}
          {isAuth && userProfile && userProfile.id == user.id && (
            <button
              className="flex items-center w-fit space-x-1 bg-gradient-to-b from-gray-700 to-gray-600 border-2 border-gray-600 rounded
                        p-2 font-medium uppercase text-sm cursor-pointer hover:text-gray-300 transition-colors h-fit"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="25"
                height="25"
                strokeWidth="1.6"
              >
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>{" "}
                <path d="M9 12h12l-3 -3"></path> <path d="M18 15l3 -3"></path>{" "}
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          )}
        </div>
        {/* Descripción del perfil */}
        {loading ? (
          <div className="bg-gray-800 w-full max-w-[600px] h-25 p-2 mt-3">
            <div className="bg-gray-700 w-full max-w-[300px] h-3  rounded-full"></div>
            <div className="bg-gray-700 w-full max-w-[300px] h-3  rounded-full mt-2"></div>
          </div>
        ) : (
          <>
            {userProfile.description && (
              <div className="flex w-full mt-3">
                <p className="text-gray-200 bg-gray-800 p-2 whitespace-pre-line w-fit">
                  {userProfile.description}
                </p>
                <div className="grow bg-gradient-to-r from-gray-800 to-gray-950"></div>
              </div>
            )}
          </>
        )}
        {/* Si es la cuenta del usuario se permite editar perfil */}
        {isAuth && userProfile && userProfile.id == user.id && (
          <div className="flex flex-row gap-2 mt-3">
            <Link
              to={`/profile/${user.id}/edit`}
              className="bg-white flex items-center gap-1 w-fit rounded p-1 font-medium text-gray-800 cursor-pointer hover:text-black text-sm md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="25"
                height="25"
                strokeWidth="1"
              >
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                <path d="M13.5 6.5l4 4"></path>
              </svg>
              <span>Modificar Perfil</span>
            </Link>
            {user.id != 1 && (
              <Link
                className="bg-white flex items-center gap-1 w-fit rounded p-1 font-medium text-gray-800 cursor-pointer hover:text-black text-sm md:text-base"
                to={`/profile/${user.id}/change-password`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="25"
                  height="25"
                  strokeWidth="1"
                >
                  <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                  <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                  <path d="M15 16h.01"></path> <path d="M12.01 16h.01"></path>
                  <path d="M9.02 16h.01"></path>
                </svg>
                <span>Cambiar contraseña</span>
              </Link>
            )}
          </div>
        )}
        {/* Seguir al usuario */}
        {!loading &&
          isAuth &&
          user.id != userProfile.id &&
          userProfile.id != 1 && (
            <button
              className="bg-white w-fit rounded py-1 px-3 font-medium mt-2 text-gray-800 cursor-pointer"
              onClick={() => {
                if (followed) {
                  unfollowUser(userProfile.id);
                } else {
                  followUser(userProfile.id);
                }
              }}
            >
              {followed ? "Dejar de seguir" : "Seguir"}
            </button>
          )}
      </header>

      {!loading && (
        <section className="mt-3">
          {/* Juegos favoritos del usuario */}
          {userProfile.latestFavorites && (
            <>
              <Link
                className="relative flex flex-col overflow-hidden rounded-lg bg-gray-800"
                to={`/profile/${userProfile.id}/favorites`}
              >
                <h2 className="bg-gray-700  text-xl text-white px-2 py-1">
                  Favoritos
                </h2>
                <div className="relative w-full md:w-fit  md:max-h-[200px] grid grid-cols-2 md:flex items-center overflow-hidden ">
                  {userProfile.latestFavorites.map((game) => (
                    <img
                      className=" md:max-w-[400px] h-full min-h-[74px] md:min-h-[200px] shadow-2xl"
                      src={game.background_image}
                      alt={game.name}
                      key={game.id}
                    />
                  ))}
                </div>
              </Link>
            </>
          )}
        </section>
      )}

      {/* Reseñas del usuario */}
      <section className="mt-10">
        <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900 to-gray-900 p-2 mb-2">
          <h1 className="text-white text-xl">Reseñas</h1>
          {!loading && userProfile.latestReviews && (
            <Link
              to={userProfile ? `/profile/${userProfile.id}/reviews` : ""}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Ver todas
            </Link>
          )}
        </div>
        {loading ? (
          <p className="ml-3 text-gray-300 text-xl">Cargando..</p>
        ) : (
          <>
            {userProfile.latestReviews ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {userProfile.latestReviews.map((review) => (
                  <li key={review.id}>
                    <ReviewCardWithGame review={review} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 text-lg uppercase text-center">
                El usuario no tiene reseñas
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
