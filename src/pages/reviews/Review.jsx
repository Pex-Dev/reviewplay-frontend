import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DefaultIcon from "../../components/UI/DefaultIcon";
import UseReviews from "../../hooks/UseReviews";
import Label from "../../components/UI/Label";
import TextArea from "../../components/UI/TextArea";
import ConfirmationButton from "../../components/UI/Button";
import {
  getScoreColor,
  redondear,
  formatDate,
} from "../../utilities/Utilities";

export default function Review() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [score, setScore] = useState(5);

  const navigate = useNavigate();
  const { getReview, errors, handleUpdateReview, handleDeleteReview } =
    UseReviews();

  const { isAuth, user } = useAuth();

  //Obtener id
  const { id } = useParams();

  //manejar el cambio de score
  const handleScoreChange = (event) => {
    setScore(parseInt(event.target.value));
  };

  //manejar el cambio del texto de la reseña
  const handleReviewTextChante = (event) => {
    setReviewText(event.target.value);
  };

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReview(id);
      setReview(review);
      if (!review) {
        navigate("/reviews");
      }
      setScore(review.score);
      setLoading(false);
      document.title = `Reseña de ${review.game.name}`;
    };

    fetchReview();
  }, [id]);
  return (
    <div className="max-w-[1000px] mx-auto">
      <header>
        <div className="max-h-[488px] relative overflow-hidden flex justify-center items-center">
          <img
            className="h-full min-w-full aspect-video "
            src={
              !loading
                ? review.game.background_image
                  ? review.game.background_image
                  : "/images/error.gif"
                : "/images/loading-image.gif"
            }
            alt={"review.game.name"}
          />
          <div className="absolute top-0 w-full h-full p-2 bg-linear-to-t from-gray-950 flex flex-col justify-end">
            <div className="flex justify-between">
              {loading ? (
                <>
                  <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28 animate-pulse mt-2"></div>
                </>
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-center">
                      <Link
                        className="text-gray-200 text-2xl md:text-4xl text-outline-white hover:text-white"
                        to={`/game/${review.game.id}`}
                      >
                        {review.game.name}
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col space-y-1">
                        <p className="text-white text-sm">
                          {review.game.developers[0]
                            ? review.game.developers[0].name
                            : "Desarrollador no disponible"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {review.score && (
                    <div
                      className={`flex justify-center items-center rounded-full h-14 w-14 text-3xl text-white ${getScoreColor(
                        review.score
                      )}`}
                    >
                      <p className="text-white overflow-hidden">
                        {redondear(review.score)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="p-2">
        {loading ? (
          ""
        ) : (
          <div className="flex gap-2">
            {review.user.image ? (
              <Link
                className="font-medium text-white"
                to={`/profile/${review.user.id}`}
              >
                <img
                  loading="lazy"
                  className="w-[46px] h-[46px] min-w-[46px] rounded-full overflow-hidden"
                  src={`${import.meta.env.VITE_APP_URL}/uploads/${
                    review.user.image
                  }`}
                  alt={review.user.name}
                />
              </Link>
            ) : (
              <DefaultIcon styles={"w-[46px] h-[46px] "} iconSize={25} />
            )}
            <div className="flex flex-col">
              <Link className="text-white" to={`/profile/${review.user.id}`}>
                {review.user.name}
              </Link>
              <p className="text-gray-400 text-xs">
                {formatDate(review.created_at)}
              </p>
            </div>
          </div>
        )}
        {loading ? (
          ""
        ) : (
          <section className="mt-3">
            {!editForm ? (
              <>
                <p className="bg-gray-900 p-1 md:p-2 rounded  whitespace-pre-line  text-white">
                  {review.review}
                </p>
                {isAuth && review.user_id == user.id && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-white uppercase rounded p-2 font-semibold"
                      onClick={() => setEditForm(true)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="space-x-1 bg-gradient-to-b w-fit text-center from-gray-700 to-gray-600 border-2 border-gray-600 rounded
                                p-2 font-medium uppercase text-sm cursor-pointer hover:text-gray-300 transition-colors"
                      onClick={async () => {
                        if (await handleDeleteReview(review.id)) {
                          navigate(`/profile/${review.user_id}/reviews`);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </>
            ) : (
              ///Formulario para editar la reseña (Ya se que habia hecho esto antes, pero de la forma en que lo cree esta difícil reutilizarlo)
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  //Actualizar reseña
                  const resultado = await handleUpdateReview(
                    review.id,
                    score,
                    reviewText
                  );
                  if (resultado) {
                    setEditForm(false);
                    const reviewActualizada = await getReview(review.id);
                    setReview(reviewActualizada);
                  }
                }}
                className="bg-gray-900 border-t border-gray-700 p-2 rounded md:rounded-lg"
              >
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
                    className={`flex justify-center items-center rounded-full min-w-[70px] w-[70px] h-[70px] text-3xl overflow-hidden ${getScoreColor(
                      score
                    )}`}
                  >
                    <p className="text-white"> {redondear(score)} </p>
                  </div>
                </div>
                <Label
                  inputId={"review"}
                  value={"Reseña"}
                  error={errors.review ? errors.review : null}
                />
                <TextArea
                  charLimit={700}
                  id={"review"}
                  name={"review"}
                  initialValue={review.review}
                  onChange={handleReviewTextChante}
                  error={errors.review ? errors.review : null}
                />
                <div className="flex gap-2 md:w-1/2">
                  <ConfirmationButton
                    text={"Enviar"}
                    disabled={false}
                    type={"submit"}
                  />
                  <button
                    type="button"
                    className="space-x-1 bg-gradient-to-b w-full text-center from-gray-700 to-gray-600 border-2 border-gray-600 rounded
                             p-2 font-medium uppercase text-sm cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={() => {
                      setEditForm(false);
                    }}
                  >
                    <span>Cancelar</span>
                  </button>
                </div>
              </form>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
