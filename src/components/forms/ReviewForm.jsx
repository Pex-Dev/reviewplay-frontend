import { useEffect, useState } from "react";
import Label from "../UI/Label";
import ConfirmationButton from "../UI/Button";
import TextArea from "../UI/TextArea";
import { useGame } from "../../context/GameContext";
import useReviews from "../../hooks/useReviews";

export default function ReviewForm({ action, gameId, reviewId, onClose }) {
  const [score, setScore] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { setUserReview, userReview } = useGame();
  const {
    getReview,
    errors,
    setErrors,
    handleAddReview,
    handleUpdateReview,
    sendingRequest,
  } = useReviews();

  const handleScoreChange = (event) => {
    setScore(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  useEffect(() => {
    setReviewText(userReview ? userReview.review : "");
    setScore(userReview ? Math.round(userReview.score) : 5);
  }, [userReview]);

  const getScoreColor = () => {
    const color = {
      1: "bg-red-900",
      2: "bg-red-800",
      3: "bg-red-700",
      4: "bg-orange-700",
      5: "bg-orange-600",
      6: "bg-yellow-600",
      7: "bg-yellow-600",
      8: "bg-green-600",
      9: "bg-green-600",
      10: "bg-green-500",
    };
    return color[score];
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        //Añadir reseña
        if (action === "addReview") {
          const review = await handleAddReview(gameId, score, reviewText);
          if (review) {
            //Si se salio todo bien añadir nueva reseña userReview para mostrarla
            setUserReview(review);
            setErrors({});
            setReviewText("");
            setScore(5);
            onClose();
          }
        }
        //Actualizar reseña
        if (action === "updateReview") {
          const resultado = await handleUpdateReview(
            reviewId,
            score,
            reviewText
          );
          if (resultado) {
            //Si se salio todo bien actualizar reseña
            setUserReview(await getReview(reviewId));
            setErrors({});
            setReviewText("");
            setScore(5);
            onClose();
          }
        }
      }}
      className="flex flex-col gap-2 bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-3 w-full  mx-auto"
    >
      {errors.message && (
        <p className="p-1 rounded text-white mt-2 bg-gradient-to-l from-red-700 to-red-600 border border-red-400">
          {errors.message}
        </p>
      )}
      <div className="flex gap-5 w-full">
        <div className="w-full md:w-1/2">
          <Label value={"Calificación"} inputId={"range"}>
            <input
              className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer "
              type="range"
              name="score"
              id="range"
              min={1}
              max={10}
              onChange={handleScoreChange}
              value={score}
            />
          </Label>
        </div>
        <div
          className={`flex justify-center items-center rounded-full min-w-[70px] w-[70px] h-[70px] text-3xl overflow-hidden ${getScoreColor()}`}
        >
          <p className="text-white"> {score} </p>
        </div>
      </div>
      <div className="h-full ">
        <Label
          value={"Reseña"}
          inputId={"review"}
          error={errors.review ? errors.review : null}
        >
          <TextArea
            id={"review"}
            name={"review"}
            placeholder={"Escribte tu reseña aquí"}
            initialValue={reviewText}
            onChange={handleReviewChange}
            charLimit={700}
          />
        </Label>
      </div>
      <div className="flex gap-2 md:w-1/2 md:gap-3">
        <ConfirmationButton text={"Enviar"} disabled={sendingRequest} />
        <button
          type="button"
          className="space-x-1 bg-gradient-to-b w-full text-center from-gray-700 to-gray-600 border-2 border-gray-600 rounded
           p-2 font-medium uppercase text-sm cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => {
            onClose();
            //Si se estaba agregando una review y se cancelo limpiar
            if (action === "addReview") {
              setScore(5);
              setReviewText("");
            }
            //Si se estaba actualizando una review y se cancelo reestablecer los valores
            if (action === "updateReview") {
              setReviewText(userReview ? userReview.review : "");
              setScore(userReview ? Math.round(userReview.score) : 5);
            }
          }}
        >
          <span>Cancelar</span>
        </button>
      </div>
    </form>
  );
}
