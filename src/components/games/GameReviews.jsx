import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGame } from "../../context/GameContext";
import useReviews from "../../hooks/useReviews";
import ReviewForm from "../forms/ReviewForm";
import ReviewCard from "../reviews/ReviewCard";

export default function GameReviews() {
  const [expandedForm, setExpandedForm] = useState(false);
  const [reviewAction, setReviewAction] = useState("addReview");
  const { game, userReview, loading, setUserReview } = useGame();

  //Obtener id desde la URL
  const { id } = useParams();

  //Obtener si el usuario esta autenticado
  const { isAuth, user } = useAuth();

  //Manejar review
  const { setErrors, handleDeleteReview } = useReviews();

  const handleTogleReviewForm = () => {
    setExpandedForm((prevVal) => !prevVal);
  };

  return (
    <section className="mt-10">
      <div className="flex justify-between items-end bg-gradient-to-r from-gray-800 to-cyan-900 px-2 py-1">
        <h2 className="text-2xl text-white">Reseñas</h2>
        {!loading && game.latestReviews.length > 0 && (
          <Link to={`/game/${game.id}/reviews`} className="text-white">
            Ver todas
          </Link>
        )}
      </div>
      {loading ? (
        "cargando"
      ) : (
        <>
          <div className="mt-2">
            {/* Reseña del usuario */}
            {userReview && !expandedForm && (
              <>
                <p className="text-gray-300 text-sm mb-2">Tu reseña</p>
                {isAuth && (
                  <ReviewCard
                    userId={userReview.user.id}
                    username={userReview.user.name}
                    userImage={userReview.user.image}
                    score={userReview.score}
                    date={userReview.created_at}
                    review={userReview.review}
                    styles={""}
                    footer={
                      <div className="flex mt-auto space-x-2 justify-between lg:justify-normal">
                        <button
                          className="bg-white rounded w-fit px-3 py-2 font-semibold uppercase mt-auto cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleTogleReviewForm(),
                              setReviewAction("updateReview");
                          }}
                        >
                          Actualizar
                        </button>
                        <button
                          className="space-x-1 bg-gradient-to-b w-fit text-center from-gray-700 to-gray-600 border-2 border-gray-600 rounded
                                p-2 font-medium uppercase text-sm cursor-pointer hover:text-gray-300 transition-colors"
                          onClick={async () => {
                            if (await handleDeleteReview(userReview.id)) {
                              setExpandedForm(false);
                              setUserReview(null);
                            }
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    }
                  />
                )}
              </>
            )}
            {/* Añadir reseña */}
            {isAuth && !loading && !expandedForm && !userReview && (
              <button
                className="rounded-3xl p-2 font-medium uppercase text-sm bg-white cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleTogleReviewForm(), setReviewAction("addReview");
                }}
              >
                Añadir reseña
              </button>
            )}
            <div
              className={`transition-all overflow-hidden ${
                expandedForm ? "max-h-[500px] " : "max-h-0"
              }`}
            >
              <ReviewForm
                action={reviewAction}
                gameId={id}
                reviewId={userReview ? userReview.id : null}
                onClose={() => {
                  setErrors([]);
                  handleTogleReviewForm();
                }}
              />
            </div>
          </div>
          {/* Ultimas reseñas */}
          {game.latestReviews.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 gap-3 mt-15">
                {game.latestReviews.map((review) => (
                  <li key={review.id}>
                    <ReviewCard
                      userId={review.user.id}
                      username={review.user.name}
                      userImage={review.user.image}
                      date={review.created_at}
                      score={review.score}
                      review={review.review}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-400 uppercase text-center text-lg mt-3">
              No hay reseñas
            </p>
          )}
        </>
      )}
    </section>
  );
}
