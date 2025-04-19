import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { getScoreColor, formatDate } from "../../utilities/Utilities";
import DefaultIcon from "../UI/DefaultIcon";

export default function ReviewCard({
  userId,
  username,
  userImage,
  score,
  review,
  date,
  footer = false,
  styles = "",
}) {
  const [isTooLong, setIsTooLong] = useState(false); //376
  const [showModal, setShowModal] = useState(false);

  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.77)" },
    content: {
      backgroundColor: "transparent",
      border: "none",
      padding: "15px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    if (review.length > 376) {
      setIsTooLong(true);
    }
  }, [review]);

  return (
    <div
      className={`flex flex-col gap-2 bg-gray-800 border-t border-t-gray-600 p-2 md:p-3 h-full min-h-[200px]  ${styles}`}
    >
      <header className="flex justify-between items-center">
        <div>
          <Link to={`/profile/${userId}`} className="flex gap-2 items-center ">
            {/* Icono usuario */}
            {userImage ? (
              <img
                className="w-[37px] h-[37px] rounded-full overflow-hidden"
                src={`${import.meta.env.VITE_APP_URL}/uploads/${userImage}`}
                alt={userImage}
              />
            ) : (
              <DefaultIcon styles={"w-[37px] h-[37px] "} iconSize={25} />
            )}
            <div>
              <h3 className="text-white">{username}</h3>
              <p className="text-gray-400 text-sm"> {formatDate(date)} </p>
            </div>
          </Link>
        </div>
        {/* Calificación */}
        <div
          className={`flex justify-center items-center rounded-full h-14 w-14 text-3xl text-white ${getScoreColor(
            score
          )}`}
        >
          <p className="text-whiteoverflow-hidden">{Math.round(score)}</p>
        </div>
      </header>
      <p className="text-white  max-h-[170px] overflow-hidden whitespace-pre-line">
        {review}
      </p>
      {isTooLong && (
        <button
          className="text-gray-300 hover:text-white cursor-pointer font-medium"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Ver completo
        </button>
      )}
      {footer && footer}
      <ReactModal isOpen={showModal} style={customStyles}>
        <div
          className="bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2
          border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-3 w-full lg:w-1/2 mx-auto"
        >
          <header className="flex justify-between items-center">
            <div>
              <div className="flex gap-2 items-center ">
                {/* Icono usuario */}
                {userImage ? (
                  <img
                    className="w-[37px] h-[37px] rounded-full overflow-hidden"
                    src={`${import.meta.env.VITE_APP_URL}/uploads/${userImage}`}
                    alt={userImage}
                  />
                ) : (
                  <DefaultIcon styles={"w-[37px] h-[37px] "} iconSize={25} />
                )}
                <div>
                  <h3 className="text-white">{username}</h3>
                  <p className="text-gray-300 text-sm"> {formatDate(date)} </p>
                </div>
              </div>
            </div>
            {/* Calificación */}
            <div
              className={`flex justify-center items-center rounded-full h-14 w-14 text-3xl text-white ${getScoreColor(
                score
              )}`}
            >
              <p className="text-whiteoverflow-hidden">{Math.round(score)}</p>
            </div>
          </header>
          <p className="text-white whitespace-pre-line">{review}</p>
          <button
            className="text-gray-400 uppercase font-medium mt-4 hover:text-white cursor-pointer"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cerrar
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
