import { Link } from "react-router-dom";
import useFollows from "../../hooks/useFollows";
import DefaultIcon from "../../components/UI/DefaultIcon";

export default function Followed({ type }) {
  const { loading, user, followers, followedGames, followedUsers } =
    useFollows(type);

  return (
    <div className="max-w-[1000px] mx-auto">
      <header className=" flex flex-col md:flex-row justify-between text-white bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600  p-2 md:p-3 w-full">
        {loading ? (
          <h1 className="text-white text-2xl">Cargando..</h1>
        ) : (
          <h1 className="text-xl">
            Seguidos de
            <Link to={`/profile/${user.id}`} className="font-semibold">
              {" " + user.name}
            </Link>
          </h1>
        )}
      </header>
      {loading ? (
        <p className="text-white text-lg px-2">Cargando..</p>
      ) : (
        <>
          {type === "followers" ? (
            <div className="bg-gray-700 mt-3 rounded md:rounded-md p-2">
              <ul className="grid grid-cols-2 gap-2">
                {followers.length <= 0 ? (
                  <p className="text-white text-lg px-2 uppercase">
                    El usuario no tiene seguidores
                  </p>
                ) : (
                  <>
                    {followers.map((user) => (
                      <li
                        key={user.id}
                        className="bg-gray-800 p-2 rounded flex gap-2"
                      >
                        {user.image ? (
                          <Link to={`/profile/${user.id}`}>
                            <img
                              loading="lazy"
                              className="w-[35px] min-w-[35px] h-[35px] rounded-full overflow-hidden"
                              src={`${import.meta.env.VITE_APP_URL}/uploads/${
                                user.image
                              }`}
                              alt={user.name}
                            />
                          </Link>
                        ) : (
                          <Link to={`/profile/${user.id}`}>
                            <DefaultIcon
                              styles={"w-[35px] min-w-[35px] h-[35px] "}
                            />
                          </Link>
                        )}
                        <Link
                          to={`/profile/${user.id}`}
                          className="text-gray-300 hover:text-white"
                        >
                          {user.name}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          ) : (
            <div className="bg-gray-700 grid grid-cols-2 gap-2 mt-3 rounded md:rounded-md p-2">
              <div>
                <h2 className="text-white text-xl mb-2">Usuarios seguidos</h2>
                <ul className="flex flex-col gap-2">
                  {followedUsers.map((user) => (
                    <li
                      key={user.id}
                      className="bg-gray-800 p-2 rounded flex gap-2"
                    >
                      {user.image ? (
                        <Link to={`/profile/${user.id}`}>
                          <img
                            loading="lazy"
                            className="w-[35px] min-w-[35px] h-[35px] rounded-full overflow-hidden"
                            src={`${import.meta.env.VITE_APP_URL}/uploads/${
                              user.image
                            }`}
                            alt={user.name}
                          />
                        </Link>
                      ) : (
                        <Link to={`/profile/${user.id}`}>
                          <DefaultIcon
                            styles={"w-[35px] min-w-[35px] h-[35px] "}
                          />
                        </Link>
                      )}
                      <Link
                        to={`/profile/${user.id}`}
                        className="text-gray-300 hover:text-white"
                      >
                        {user.name}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-white text-xl mb-2">Juegos seguidos</h2>
                <ul className="flex flex-col gap-2">
                  {followedGames.map((game) => (
                    <li
                      key={game.id}
                      className="bg-gray-800 p-2 rounded flex gap-2 h-[51px] "
                    >
                      <Link
                        to={`/game/${game.id}`}
                        className="text-gray-300 hover:text-white"
                      >
                        {game.name}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
