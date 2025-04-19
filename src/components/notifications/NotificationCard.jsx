import { Link } from "react-router-dom";
import { formatDate } from "../../utilities/Utilities";
import ReviewCardWithGame from "../reviews/ReviewCardWithGame";

import DefaultIcon from "../../components/UI/DefaultIcon";

export default function NotificationCard({ notification, user }) {
  const type = notification.type.split("\\")[2];
  if (type === "NewFollowerNotification") {
    return (
      <li className="bg-gray-800 rounded md:rounded-md p-3">
        <div className="flex gap-2">
          {user.image ? (
            <Link className="font-medium text-white" to={`/profile/${user.id}`}>
              <img
                loading="lazy"
                className="w-[37px] h-[37px] min-w-[37px] rounded-full overflow-hidden"
                src={`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`}
                alt={user.name}
              />
            </Link>
          ) : (
            <DefaultIcon styles={"w-[37px] h-[37px] "} iconSize={25} />
          )}
          <div className="flex flex-col">
            <p className="text-gray-300">
              <Link
                className="font-medium text-white"
                to={`/profile/${user.id}`}
              >
                {user.name}
              </Link>
              <span> ha comenzado a seguirte</span>
              {!notification.read_at && (
                <span className="inline-block ml-2 bg-amber-600 w-2.5 h-2.5 rounded-full"></span>
              )}
            </p>
            <p className="text-gray-400 text-xs">
              {formatDate(notification.created_at)}
            </p>
          </div>
        </div>
      </li>
    );
  }
  if (type === "NewReviewNotification") {
    return (
      <li>
        <div className="bg-gray-800 rounded-t md:rounded-t-md p-3 ">
          <div className="flex gap-2">
            {user.image ? (
              <Link
                className="font-medium text-white"
                to={`/profile/${user.id}`}
              >
                <img
                  loading="lazy"
                  className="w-[37px] h-[37px] min-w-[37px] rounded-full overflow-hidden"
                  src={`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`}
                  alt={user.name}
                />
              </Link>
            ) : (
              <DefaultIcon styles={"w-[37px] h-[37px] "} iconSize={25} />
            )}
            <div className="flex flex-col">
              <p className="text-gray-300">
                <Link
                  className="font-medium text-white"
                  to={`/profile/${user.id}`}
                >
                  {user.name}
                </Link>
                <span> ha hecho una reseña de </span>
                <Link
                  className="font-medium text-white"
                  to={`/game/${notification.data.game_id}`}
                >
                  {notification.data.game_name}
                </Link>
                {!notification.read_at && (
                  <span className="inline-block ml-2 bg-amber-600 w-2.5 h-2.5 rounded-full"></span>
                )}
              </p>
              <p className="text-gray-400 text-xs">
                {formatDate(notification.created_at)}
              </p>
            </div>
          </div>
        </div>
        <ReviewCardWithGame
          review={{
            id: notification.data.review_id,
            score: notification.data.review_score,
            review: notification.data.review_text,
            created_at: notification.created_at,
            game: {
              id: notification.data.game_id,
              name: notification.data.game_name,
              background_image: notification.data.game_background_image,
            },
            user: {
              id: user.id,
              name: user.name,
              image: user.image,
            },
          }}
          styles={"rounded-t-none"}
        />
      </li>
    );
  }
}
