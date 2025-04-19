import { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/UI/Carousel";
import ReviewCardWithGame from "../../components/Reviews/ReviewCardWithGame";
import UseDashboard from "../../hooks/UseDashboard";
import UserCardHorizontal from "../../components/users/UserCardHorizontal";
import { getScoreColor } from "../../utilities/Utilities";
import { useState } from "react";

export default function Dashboard() {
  const [expandedReviews, setExpandedReviews] = useState(false);

  const { highestScoreGames, latestReviews, topUsers, loading } =
    UseDashboard();
  const formatScore = (score) => {
    if (score % 1 === 0) {
      return score.toString(); //Devuelve como string sin decimales
    } else {
      return score.toFixed(1); //Si no es entero lo formateamos a 1 decimal
    }
  };

  useEffect(() => {
    document.title = `ReviewPlay`;
  }, []);
  return (
    <>
      <section>
        <h2 className="bg-gradient-to-r from-cyan-900 to-gray-900 p-2 text-white uppercase font-medium mb-2">
          Juegos mejor calificados
        </h2>
        <Carousel>
          {loading
            ? Array.from({ length: 6 }, (_, index) => (
                <div
                  className="bg-gray-700 animate-pulse  h-[200px] lg:h-[260px] p-3 ml-2 border-l-8 border-gray-950"
                  key={index}
                ></div>
              ))
            : highestScoreGames.map((game) => (
                <Link to={`/game/${game.id}`} className="px-1" key={game.id}>
                  <div className="relative h-[230px] lg:h-[260px] ">
                    <img
                      loading="lazy"
                      className="h-full  w-full "
                      src={game.background_image}
                      alt={game.name}
                    />
                    <div className="absolute bottom-0 left-0 flex items-end w-full h-full bg-gradient-to-t from-black p-2">
                      <div className="flex items-center justify-between w-full px-8 md:px-0 ">
                        <h3 className=" text-white">{game.name}</h3>
                        <div
                          className={` flex justify-center items-center rounded-full h-8 w-8  text-white ${getScoreColor(
                            game.reviews_avg_score
                          )}`}
                        >
                          <p className="text-white overflow-hidden text-lg font-medium">
                            {formatScore(parseFloat(game.reviews_avg_score))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </Carousel>
      </section>
      <section className="mt-4 md:mt-8">
        <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900 to-gray-900 p-2 mb-2">
          <h2 className="text-white uppercase font-medium ">Ultimas reseñas</h2>
          <Link
            to={"/reviews"}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Ver todas
          </Link>
        </div>
        {loading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[800px] md:max-h-[2000px] overflow-hidden">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                className="bg-gray-700 animate-pulse  h-[200px] lg:h-[260px] p-3 flex flex-col justify-end"
                key={index}
              >
                <div className="bg-gray-600 w-full h-4 rounded-full"></div>
              </div>
            ))}
          </ul>
        ) : (
          <ul
            className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden  ${
              !expandedReviews ? "max-h-[800px] md:max-h-[2000px] " : ""
            }`}
          >
            {latestReviews.map((review) => (
              <ReviewCardWithGame review={review} key={review.id} />
            ))}
            <button
              className={` w-full flex flex-col justify-end items-center text-white  md:hidden cursor-pointer ${
                !expandedReviews
                  ? "absolute bottom-0 left-0 h-1/2 bg-gradient-to-t  from-gray-950"
                  : ""
              }`}
              onClick={() => {
                setExpandedReviews((prev) => !prev);
              }}
            >
              {expandedReviews ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="32"
                  height="32"
                  stroke-width="1"
                >
                  <path d="M4 13l8 -3l8 3"></path>
                </svg>
              ) : (
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
              )}
            </button>
          </ul>
        )}
      </section>
      <section className="mt-10">
        <h2 className="bg-gradient-to-r from-cyan-900 to-gray-900 p-2 text-white uppercase font-medium mb-2">
          Usuarios destacados
        </h2>
        {loading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2  pt-3 md:pt-0">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                className="bg-gray-700 animate-pulse  h-[128px] p-3 ml-2 rounded"
                key={index}
              >
                <div className="w-[100px] h-[100px] rounded-full bg-gray-600"></div>
              </div>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2  pt-3 md:pt-0">
            {topUsers.map((user) => (
              <UserCardHorizontal user={user} key={user.id} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
