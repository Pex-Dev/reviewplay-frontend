import { useEffect } from "react";
import UseFavorites from "../../hooks/UseFavorites";
import GameCard from "../../components/Games/GameCard";
import PaginationButton from "../../components/UI/PaginationButton";
import CardSkeleton from "../../components/UI/CardSkeleton";

export default function Favorites() {
  const { favorites, user, loading, handlePageChange, nextPage, prevPage } =
    UseFavorites();

  useEffect(() => {
    if (loading) return;
    document.title = `Favoritos de ` + user.name;
    ``;
  }, [loading]);

  return (
    <div>
      <h1 className="text-2xl text-white bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2">
        {loading ? "Cargando..." : `Favoritos de ${user.name}`}
      </h1>
      {loading ? (
        <div>
          <ul className="grid grid-auto-fill gap-3 mt-3">
            {Array.from({ length: 20 }, (_, index) => (
              <CardSkeleton key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {favorites.length === 0 ? (
            <p className="text-white">No tienes juegos favoritos</p>
          ) : (
            <>
              <ul className="grid grid-auto-fill gap-3 mt-3">
                {favorites.map((favorite) => (
                  <GameCard
                    key={favorite.id}
                    id={favorite.id}
                    title={favorite.name}
                    image={favorite.background_image}
                  />
                ))}
              </ul>
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
      )}
    </div>
  );
}
