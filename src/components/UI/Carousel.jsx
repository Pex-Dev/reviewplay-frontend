import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Botones personalizados
const CustomArrow = ({ orientation, onClick }) => (
  <div
    className={`custom-arrow ${
      orientation == "left" ? "custom-prev" : "custom-next"
    } h-full absolute  w-14 flex flex-col justify-center items-center cursor-pointer
      ${
        orientation == "left"
          ? "bg-gradient-to-r left-0"
          : "bg-gradient-to-l right-0"
      } from-gray-950  top-0 z-10 text-white`}
    onClick={onClick}
  >
    {orientation == "left" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="36"
        height="36"
        strokeWidth="1.5"
      >
        <path d="M13 20l-3 -8l3 -8"></path>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="36"
        height="36"
        strokeWidth="1.5"
      >
        <path d="M11 4l3 8l-3 8"></path>
      </svg>
    )}
  </div>
);

export default function Carousel({ children, autoplay = true }) {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <CustomArrow orientation={"right"} />,
    prevArrow: <CustomArrow orientation={"left"} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
