import { Link } from "react-router-dom";
import { formatDate } from "../../utilities/Utilities";
import DefaultIcon from "../UI/DefaultIcon";
export default function UserCardVertical({ user }) {
  return (
    <li className="bg-gray-800 rounded p-2 border-t border-t-gray-600">
      <Link to={`/profile/${user.id}`}>
        <div className="flex justify-center items-center">
          {user.image ? (
            <img
              loading="lazy"
              className="w-[80px] md:w-[100px]  rounded-full overflow-hidden"
              src={`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`}
              alt={user.name}
            />
          ) : (
            <DefaultIcon
              styles={"w-[80px] md:w-[100px] h-[80px] md:h-[100px] "}
            />
          )}
        </div>
        <p className="text-white text-center font-medium">{user.name}</p>
        <p className="text-gray-300 text-center text-sm">
          Miembro desde:
          <span className="text-white">
            {" " + formatDate(user.created_at)}
          </span>
        </p>
        <div className="grid grid-cols-2 bg-gray-900 rounded p-1 md:p-2 mt-2">
          <p className="flex flex-col  text-gray-300 text-sm md:text-base">
            Reseñas:
            <span className="text-white font-semibold">
              {" " + user.reviews_count}
            </span>
          </p>
          <p className="flex flex-col  text-gray-300 text-sm md:text-base">
            Favoritos:
            <span className="text-white font-semibold">
              {" " + user.favorite_games_count}
            </span>
          </p>
          <p className="flex flex-col  text-gray-300 text-sm md:text-base">
            Seguidores:
            <span className="text-white font-semibold">
              {" " + user.followers_count}
            </span>
          </p>
          <p className="flex flex-col  text-gray-300 text-sm md:text-base">
            Juegos seguidos:
            <span className="text-white font-semibold">
              {" " + user.followed_games_count}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
