import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useNotifications from "../../hooks/useNotifications";
import NotificationCard from "../../components/notifications/NotificationCard";
import PaginationButton from "../../components/UI/PaginationButton";

export default function notifications() {
  const { isAuth, user, loadingAuth } = useAuth();
  const {
    loading,
    getNotifications,
    notifications,
    users,
    nextPage,
    prevPage,
    handlePageChange,
    handleOrderChange,
  } = useNotifications();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Notificaciones`;
    if (!loadingAuth) {
      //Si no esta autenticado ir al dashboard
      if (!isAuth) {
        return navigate("/");
      }
      getNotifications();
    }
  }, [isAuth, loadingAuth]);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className=" flex flex-col md:flex-row justify-between text-white bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600  p-2 md:p-3 w-full">
        <h1 className="text-2xl">Notificaciones</h1>
        <div className="mt-3 md:mt-0">
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
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguas</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <p className="text-white">Cargando..</p>
      ) : (
        <div>
          {notifications.length === 0 ? (
            <p className="text-white uppercase text-center mt-4">
              No tienes notificaciones
            </p>
          ) : (
            <>
              <ul className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-3">
                {notifications.map((notification) => {
                  const userId = notification.data.user_id;
                  const user = users[userId];
                  return (
                    <NotificationCard
                      notification={notification}
                      user={user}
                      key={notification.id}
                    />
                  );
                })}
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
