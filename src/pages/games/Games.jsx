import GameCard from "../../components/games/GameCard";
import CardSkeleton from "../../components/UI/CardSkeleton";
import PaginationButton from "../../components/UI/PaginationButton";
import useGames from "../../hooks/UseGames";
import SearchBar from "../../components/Filters/SearchBar";
import FilterBar from "../../components/filters/FilterBar";

export default function Games() {
  const {
    games,
    loading,
    handlePageChange,
    prevPage,
    nextPage,
    selectedGenres,
    selectedTags,
    selectedPlatforms,
    searchValue,
    handleFilterChange,
    handleOrderChange,
    order,
  } = useGames(1);

  //Contenido principal de la página
  const content = () => {
    //Mostrar loading skeleton mientras se esta cargando
    if (loading) {
      return (
        <ul className="grid grid-auto-fill gap-3">
          {Array.from({ length: 20 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </ul>
      );
    }

    //Mostrar aviso si no hay resultados
    if (games.length === 0) {
      return (
        <p className="bg-gray-800 p-4 rounded-lg text-white text-lg text-center">
          No hay resultados
        </p>
      );
    }

    //Mostrar lista con los juegos
    return (
      <ul className="grid grid-auto-fill gap-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.name}
            image={game.background_image}
            score={game.reviews_avg_score}
          />
        ))}
      </ul>
    );
  };

  return (
    <>
      <title>Juegos</title>
      <div className="flex flex-col">
        <div className="flex flex-col flex-1 gap-2.5 relative">
          <SearchBar
            handleSearch={handleFilterChange}
            searchValue={searchValue}
            placeholder={"Ingresa el nombre de un juego"}
            styles={"md:pl-[258px]"}
          />
          <FilterBar
            handleFilterChange={handleFilterChange}
            handleOrderChange={handleOrderChange}
            order={order}
            selectedGenres={selectedGenres}
            selectedTags={selectedTags}
            selectedPlatforms={selectedPlatforms}
            loading={loading}
            styles={"md:absolute left-0 top-0"}
          />
          <div className="md:ml-[258px]">
            {content()}
            <div className="mt-5 flex flex-row justify-between md:justify-start md:gap-3">
              <PaginationButton
                text={"Anterior"}
                page={loading ? null : prevPage}
                onClick={() => {
                  handlePageChange(prevPage);
                }}
              />
              <PaginationButton
                text={"Siguiente"}
                page={loading ? null : nextPage}
                onClick={() => {
                  handlePageChange(nextPage);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
