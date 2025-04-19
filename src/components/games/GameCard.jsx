import React from "react";
import { Link } from "react-router-dom";
import { getScoreColor } from "../../utilities/Utilities";

export default function GameCard({ id, title, image, score }) {
  //Formatear el score para que se vea bien
  const formatScore = (score) => {
    if (score % 1 === 0) {
      return score.toString(); //Devuelve como string sin decimales
    } else {
      return score.toFixed(1); //Si no es entero lo formateamos a 1 decimal
    }
  };

  return (
    <li className="w-full bg-gray-900 border-b-2 border-r-2 border-b-black rounded-lg overflow-hidden shadow-xl  relative self-center cursor-pointer">
      <Link to={"/game/" + id}>
        <div className="relative flex flex-col justify-center items-center">
          <img
            loading="lazy"
            className="h-[192px] w-full object-cover mb-1 rounded"
            src={image != null ? image : "/images/error.gif"}
            alt={title}
          />
          <div className=" absolute w-full h-full bg-gradient-to-t from-gray-900"></div>
        </div>

        <div className="flex justify-between px-2 py-1">
          <h3 className="text-white">{title}</h3>
          {/* Calificación */}
          {score && (
            <div
              className={` flex justify-center items-center rounded-full h-8 w-8  text-white ${getScoreColor(
                score
              )}`}
            >
              <p className="text-white overflow-hidden text-lg font-medium">
                {formatScore(parseFloat(score))}
              </p>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
