import UseComunity from "../../hooks/UseComunity";
import SearchBar from "../../components/filters/SearchBar";
import UserCardVertical from "../../components/users/UserCardVertical";
import UserCardHorizontal from "../../components/users/UserCardHorizontal";
import UserCardTop from "../../components/users/UserCardTop";
import PaginationButton from "../../components/UI/PaginationButton";

export default function Comunity() {
  const {
    loading,
    topUsers,
    topFollowers,
    topReviews,
    page,
    loadingResults,
    results,
    nextPage,
    prevPage,
    handlePageChange,
    handleSearch,
  } = UseComunity();

  return (
    <div>
      <div className="mt-2">
        <label htmlFor="search" className="text-white text-lg font-medium">
          Buscar usuario
        </label>
        <SearchBar
          handleSearch={handleSearch}
          placeholder={"Ingresa el nombre de un usuario"}
        />
        {/* Resultados de busqueda */}
        {page && (
          <>
            {loadingResults ? (
              <p className="text-white text-xl uppercase text-center">
                Cargando..
              </p>
            ) : (
              <>
                {results.length > 0 ? (
                  <div className="mt-3 p-1 md:p-0">
                    <h3 className="text-white text-lg">Resultados:</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-2">
                      {results.map((user) => (
                        <UserCardVertical user={user} key={user.id} />
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
                  </div>
                ) : (
                  <p className="text-white uppercase text-center my-5">
                    No hay resultados
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
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
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2  ">
            {topUsers.map((user) => (
              <UserCardHorizontal user={user} key={user.id} />
            ))}
          </ul>
        )}
      </section>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-700 rounded-t md:rounded-t-lg overflow-hidden p-2">
        <div>
          <h2 className="text-white uppercase font-medium mb-2 w-fit">
            Usuarios con mas reseñas
          </h2>
          {loading ? (
            <ul className="flex flex-col gap-2 ">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  className="bg-gray-800 animate-pulse  h-[85px] p-3 ml-2 rounded"
                  key={index}
                >
                  <div className="w-[40px] min-w-[40px] h-[40px] md:w-[60px] md:min-w-[60px] md:h-[60px] rounded-full overflow-hidden bg-gray-600"></div>
                </div>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-2 ">
              {topReviews.map((user, index) => (
                <UserCardTop
                  user={user}
                  key={user.id}
                  index={index}
                  type="reviews"
                />
              ))}
            </ul>
          )}
        </div>
        <div className="mt-5 md:mt-0">
          <h2 className="text-white uppercase font-medium mb-2 w-fit">
            Usuarios con mas seguidores
          </h2>
          {loading ? (
            <ul className="flex flex-col gap-2 ">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  className="bg-gray-800 animate-pulse  h-[85px] p-3 ml-2 rounded"
                  key={index}
                >
                  <div className="w-[40px] min-w-[40px] h-[40px] md:w-[60px] md:min-w-[60px] md:h-[60px] rounded-full overflow-hidden bg-gray-600"></div>
                </div>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-2 ">
              {topFollowers.map((user, index) => (
                <UserCardTop
                  user={user}
                  key={user.id}
                  index={index}
                  type="followers"
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
