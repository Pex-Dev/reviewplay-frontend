import { Link } from "react-router-dom";
import DefaultIcon from "../UI/DefaultIcon";
export default function UserCardTop({ user, index, type = "reviews" }) {
  const getStarColor = (index) => {
    if (index == 0) {
      return "text-yellow-500";
    }
    if (index == 1) {
      return "text-gray-300";
    }
    if (index == 2) {
      return "text-amber-800";
    }
  };

  return (
    <li
      className="bg-gray-800 border-t border-gray-700  p-3 lg:p-5 rounded flex gap-3"
      key={user.id}
    >
      <div className="flex gap-3 items-center w-full">
        {/* Si el usuario tiene imagen mostrarla. Si no mostrar imagen por defecto */}
        {user.image ? (
          <Link to={`/profile/${user.id}`}>
            <img
              loading="lazy"
              className="w-[40px] min-w-[40px] h-[40px] md:w-[60px] md:min-w-[60px] md:h-[60px] rounded-full overflow-hidden"
              src={`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`}
              alt={user.name}
            />
          </Link>
        ) : (
          <Link to={`/profile/${user.id}`}>
            <DefaultIcon
              styles={
                "w-[40px] min-w-[40px] h-[40px] md:w-[60px] md:min-w-[60px] md:h-[60px] "
              }
            />
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
            <p className="text-gray-300 text-sm md:text-base">
              {type === "reviews" ? "Reseñas " : "Seguidores "}
              <span className="text-white font-bold">
                {type === "reviews" ? user.reviews_count : user.followers_count}
              </span>
            </p>
          </div>
        </div>
      </div>
      {index < 3 && (
        <p
          className={`flex justify-center items-center ${getStarColor(index)}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="36"
            height="36"
          >
            <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
          </svg>
        </p>
      )}
    </li>
  );
}
