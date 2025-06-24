import { useParams } from "react-router-dom";
import useReviewsList from "../../hooks/useReviewsList";
import PaginationButton from "../../components/UI/PaginationButton";
import ReviewCardWithGame from "../../components/Reviews/ReviewCardWithGame";
import { useEffect } from "react";

export default function Reviews({ type = "all" }) {
  const { id } = useParams();
  const {
    reviews,
    loading,
    prevPage,
    nextPage,
    handlePageChange,
    handleOrderChange,
    order,
    game,
    user,
  } = useReviewsList(type, type != "all" ? id : null);

  useEffect(() => {
    if (loading) return;

    switch (type) {
      case "game":
        document.title = `Reseñas de ${game.name}`;
        break;
      case "user":
        document.title = `Reseñas de ${user.name}`;
        break;
      default:
        document.title = "Reseñas";
        break;
    }
  }, [loading]);

  return (
    <div className="">
      <div className=" flex flex-col md:flex-row justify-between text-white bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600  p-2 md:p-3 w-full">
        {loading ? (
          <h1 className="text-white text-2xl">Cargando..</h1>
        ) : (
          <h1 className="text-2xl">
            Reseñas {game && game.name} {user && user.name}
          </h1>
        )}

        <div>
          {/* Filtros */}
          <div className="flex items-center gap-3">
            {/* Filtro select para ordenar */}
            <label htmlFor="sort" className="text-white">
              Ordenar por:
            </label>
            <select
              id="sort"
              className={`bg-gray-900 w-fit text-white p-1 ${
                loading ? "opacity-50 text-gray-400" : ""
              }`}
              onChange={(event) => {
                handleOrderChange(event.target.value);
              }}
              disabled={loading}
            >
              <option value="newest" selected={order == "newest"}>
                Más recientes
              </option>
              <option value="oldest" selected={order == "oldest"}>
                Más antiguas
              </option>
              <option value="highest" selected={order == "highest"}>
                Mejores valoraciones
              </option>
              <option value="lowest" selected={order == "lowest"}>
                Peores valoraciones
              </option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 ">
          {Array.from({ length: 20 }, (_, index) => (
            <li
              key={index}
              className="bg-gray-900 h-[288px] p-3 rounded flex flex-col justify-end animate-pulse"
            >
              <div className="h-5 w-2/3 bg-gray-800 rounded-lg"></div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <section>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCardWithGame review={review} />
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-5 flex flex-row justify-between md:justify-start md:gap-3">
            <PaginationButton
              text={"Anterior"}
              page={prevPage}
              onClick={() => {
                handlePageChange(prevPage);
              }}
            />
            <PaginationButton
              text={"Siguiente"}
              page={nextPage}
              onClick={() => {
                handlePageChange(nextPage);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
