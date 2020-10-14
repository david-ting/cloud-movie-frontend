import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ type, slides, autoplay }) {
  console.log("autoplay");
  console.log(autoplay);
  const slider = useRef();

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: Math.min(slides.length, 5),
    slidesToScroll: Math.min(slides.length, 5),
    autoplay: true,
    autoplaySpeed: 4000,
    pauseHover: true,
    speed: 3000,
    //cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slides.length, 3),
          slidesToScroll: Math.min(slides.length, 3),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(slides.length, 2),
          slidesToScroll: Math.min(slides.length, 2),
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (slider.current) {
      if (autoplay) slider.current.slickPlay();
      else {
        if (slider.current && slider.current.style)
          slider.current.style.transition = "none";
        slider.current.slickPause();
      }
    }
  }, [autoplay]);

  // useEffect(() => {
  //   function removeFadeClasses() {
  //     const images = document.querySelectorAll("img");
  //     images.forEach((image) => {
  //       image.classList.toggle("img-fadeIn");
  //       image.classList.toggle("img-fadeOutIn");
  //     });
  //   }
  //   setTimeout(removeFadeClasses, 5000);
  // }, [slides]);

  return (
    <div className="mt-2">
      <Slider ref={slider} {...settings}>
        {slides.map((slide) => {
          let path = null;
          if (slide.poster_path) {
            path = slide.poster_path;
          } else if (slide.profile_path) {
            path = slide.profile_path;
          }
          const imgPath = path
            ? `https://image.tmdb.org/t/p/w500/${path}`
            : null;

          return (
            <div className="slick-slide" key={slide.id}>
              <Link to={`/${type}/detail/${slide.id}`}>
                {imgPath ? (
                  <img className={`img-fadeIn img-${type}`} src={imgPath}></img>
                ) : (
                  <span className="slickPlaceholder">
                    <span>
                      {type === "movie" && slide.title}
                      {(type === "tv" || type === "person") && slide.name}
                    </span>
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.slides.length !== nextProps.slides.length) {
    console.log("1");
    return false;
  }

  if (prevProps.autoplay !== nextProps.autoplay) {
    return false;
  }

  const equal = prevProps.slides.every((prevSlide, index) => {
    const nextSlide = nextProps.slides[index];
    return prevSlide.id === nextSlide.id;
  });

  if (equal) {
    console.log("2");
    return true;
  }

  console.log("3");
  return false;
}

export default React.memo(Carousel, areEqual);
