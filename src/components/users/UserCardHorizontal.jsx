import { Link } from "react-router-dom";
import { formatDate } from "../../utilities/Utilities";
import DefaultIcon from "../UI/DefaultIcon";
export default function UserCardHorizontal({ user }) {
  return (
    <li
      className="bg-gray-800 border-t border-gray-700  p-3 lg:p-5 rounded flex gap-3"
      key={user.id}
    >
      {/* Si el usuario tiene imagen mostrarla. Si no mostrar imagen por defecto */}
      {user.image ? (
        <Link to={`/profile/${user.id}`}>
          <img
            loading="lazy"
            className="w-[80px] md:w-[90px]  rounded-full overflow-hidden"
            src={`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`}
            alt={user.name}
          />
        </Link>
      ) : (
        <Link to={`/profile/${user.id}`}>
          <DefaultIcon styles={"w-[80px] md:w-[90px]  "} />
        </Link>
      )}
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <div>
          <Link
            to={`/profile/${user.id}`}
            className="text-lg md:text-xl text-white"
          >
            {user.name}
          </Link>
          <p className="text-gray-300 text-sm">
            Miembro desde:
            <span className="text-white">
              {" " + formatDate(user.created_at)}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 bg-gray-900 p-2 rounded">
          <p className="text-gray-300 ">
            Reseñas:
            <span className="text-white font-bold">
              {" " + user.reviews_count}
            </span>
          </p>
          <p className="text-gray-300 ">
            Favoritos:
            <span className="text-white font-bold">
              {" " + user.favorite_games_count}
            </span>
          </p>
          <p className="text-gray-300 ">
            Seguidores:
            <span className="text-white font-bold">
              {" " + user.followers_count}
            </span>
          </p>
          <p className="text-gray-300 ">
            Juegos seguidos:
            <span className="text-white font-bold">
              {" " + user.followed_games_count}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}
