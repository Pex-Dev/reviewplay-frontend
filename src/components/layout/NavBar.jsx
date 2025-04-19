import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const { user, isAuth, loadingAuth, unreadNotificationsCount } = useAuth();

  return (
    <header
      className={`container  mx-auto flex flex-col lg:flex-row justify-between md:justify-start gap-10 p-2 items-center overflow-hidden transition-all ${
        expanded ? "max-h-[310px]" : "max-h-[64px]"
      }`}
    >
      <div className="flex justify-between w-full lg:w-auto">
        <Link
          to="/"
          className="text-5xl font-bold text-white text-outline-white"
        >
          <p>ReviewPlay</p>
        </Link>
        <button
          className="relative text-white cursor-pointer lg:hidden"
          onClick={() => {
            setExpanded((prevExpanded) => !prevExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="35"
            height="35"
            strokeWidth="1.25"
          >
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
          {unreadNotificationsCount > 0 && (
            <div className="bg-amber-700 text-white absolute top-2 -left-0 w-[10px] h-[10px] overflow-hidden rounded-full text-xs text-center"></div>
          )}
        </button>
      </div>

      <nav className="flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col lg:flex-row">
          <Link
            to="/games"
            className="flex items-center gap-2 text-white font-semibold p-2 rounded hover:bg-gray-800"
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
              <path d="M5.636 5.636a9 9 0 0 1 13.397 .747l-5.619 5.617l5.619 5.617a9 9 0 1 1 -13.397 -11.981z"></path>
              <circle cx="11.5" cy="7.5" r="1" fill="currentColor"></circle>
            </svg>
            <span>Juegos</span>
          </Link>
          <Link
            to="/reviews?page=1"
            className="flex items-center gap-2 text-white font-semibold p-2 rounded hover:bg-gray-800"
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
              <path d="M17.286 21.09q -1.69 .001 -5.288 -2.615q -3.596 2.617 -5.288 2.616q -2.726 0 -.495 -6.8q -9.389 -6.775 2.135 -6.775h.076q 1.785 -5.516 3.574 -5.516q 1.785 0 3.574 5.516h.076q 11.525 0 2.133 6.774q 2.23 6.802 -.497 6.8"></path>
            </svg>
            <span>Reseñas</span>
          </Link>
          <Link
            to="/comunity"
            className="flex items-center gap-2 text-white font-semibold p-2 rounded hover:bg-gray-800"
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
              strokeWidth="1.5"
            >
              <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
              <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
              <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
            </svg>
            <span>Comunidad</span>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center ">
          {isAuth && (
            <Link
              className="text-white flex gap-1 rounded hover:bg-gray-800 relative p-2"
              aria-label="Notificaciones"
              to={`/notifications?page=1&order=desc`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                strokeWidth="1.2"
              >
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
              </svg>
              {unreadNotificationsCount > 0 && (
                <div className="bg-amber-700 text-white absolute top-2 left-2 w-[17px] h-[17px] overflow-hidden rounded-full text-xs text-center border border-white">
                  {unreadNotificationsCount}
                </div>
              )}
              <span className="text-white lg:hidden">Notificaciones</span>
            </Link>
          )}
          {!loadingAuth && (
            <Link
              className="flex items-center gap-2 text-white font-semibold p-2 rounded hover:bg-gray-800"
              to={user ? `/profile/${user.id}` : "/login"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="25"
                height="25"
              >
                <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path>
                <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"></path>
              </svg>
              <span> {isAuth ? user.name : "Iniciar Sesión"} </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
