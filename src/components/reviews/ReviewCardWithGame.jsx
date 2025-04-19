import { useState } from "react";
import { Link } from "react-router-dom";
import { getScoreColor, formatDate } from "../../utilities/Utilities";
import DefaultIcon from "../UI/DefaultIcon";

export default function ReviewCardWithGame({ review, styles }) {
  return (
    <Link
      to={`/review/${review.id}`}
      className={`bg-gray-900 w-full h-full rounded text-white overflow-hidden shadow-2xl cursor-pointer flex flex-col ${styles}`}
    >
      <header className="relative max-h-[200px] overflow-hidden flex justify-center items-center">
        <img
          className="h-full min-w-full aspect-video"
          src={review.game.background_image}
          alt={review.game.name}
        />
        <div className=" absolute top-0 w-full h-full p-2 bg-linear-to-t from-gray-900 flex flex-col justify-end">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-2 items-center ">
                {/* Icono usuario */}
                {review.user.image ? (
                  <img
                    loading="lazy"
                    className="w-[37px] h-[37px] rounded-full overflow-hidden"
                    src={`${import.meta.env.VITE_APP_URL}/uploads/${
                      review.user.image
                    }`}
                    alt={review.user.name}
                  />
                ) : (
                  <DefaultIcon styles={"w-[37px] h-[37px] "} iconSize={25} />
                )}
                <div>
                  <h3 className="text-white">{review.user.name}</h3>
                  <p className="text-gray-400 text-xs">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>
            </div>
            {/* Calificación */}
            <div
              className={`flex justify-center items-center rounded-full h-12 w-12 text-2xl text-white ${getScoreColor(
                review.score
              )}`}
            >
              <p className="text-whiteoverflow-hidden">
                {Math.round(review.score)}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="p-2">
        <p className="max-h-[93px] whitespace-pre-line"> "{review.review}" </p>
      </div>
    </Link>
  );
}
