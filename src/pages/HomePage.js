import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Carousel from "../components/Carousel";
import TwoWayToggle from "../components/TwoWayToggle";
import { fetchTrending } from "../customFunc/all";
import SwitchButton from "../components/SwitchButton";
import LoadingPage from "../components/LoadingPage";
import { capitalizeFirstChar } from "../customFunc/all";

function HomePage() {
  const { time } = useParams();
  const [timeWindow, setTimeWindow] = useState(time);

  const [movieSlide, setMovieSlide] = useState();
  const [movieAutoplay, setMovieAutoplay] = useState(false);

  const [tvSlide, setTvSlide] = useState();
  const [tvAutoplay, setTvAutoplay] = useState(false);

  const [personSlide, setPersonSlide] = useState();
  const [personAutoplay, setPersonAutoplay] = useState(false);

  function toggleCallback() {
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.classList.remove("img-fadeIn");
      setTimeout(function () {
        image.classList.add("img-fadeIn");
      }, 10);
    });
  }

  useEffect(() => {
    fetchTrending("movie", timeWindow, setMovieSlide);
    fetchTrending("tv", timeWindow, setTvSlide);
    fetchTrending("person", timeWindow, setPersonSlide);
  }, [timeWindow]);

  useEffect(() => {
    setTimeWindow(time);
    document.title = `${capitalizeFirstChar(time)} Trending | Cloud Movie`;
  }, [time]);

  return (
    <>
      {(!movieSlide || !tvSlide || !personSlide) && <LoadingPage />}
      <div className="cloudBackground">
        <div className="container carouselWrapper">
          <h3 className="text-center mt-2">What&#39;s Trending</h3>
          <div className="d-flex justify-content-center mb-3">
            <TwoWayToggle
              current={timeWindow}
              path="/trending"
              selections={["week", "day"]}
              callBack={toggleCallback}
            />
          </div>

          {movieSlide && (
            <>
              <div className="d-flex">
                <h4 className="mr-3">
                  <i>Movies</i>
                </h4>
                <SwitchButton
                  setChecked={setMovieAutoplay}
                  checked={movieAutoplay}
                />
              </div>
              <Carousel
                type="movie"
                slides={movieSlide}
                autoplay={movieAutoplay}
              />
            </>
          )}

          {tvSlide && (
            <>
              <div className="d-flex">
                <h4 className="mr-3">
                  <i>TV</i>
                </h4>
                <SwitchButton setChecked={setTvAutoplay} checked={tvAutoplay} />
              </div>
              <Carousel type="tv" slides={tvSlide} autoplay={tvAutoplay} />
            </>
          )}
          {personSlide && (
            <>
              <div className="d-flex">
                <h4 className="mr-3">
                  <i>People</i>
                </h4>
                <SwitchButton
                  setChecked={setPersonAutoplay}
                  checked={personAutoplay}
                />
              </div>
              <Carousel
                type="person"
                slides={personSlide}
                autoplay={personAutoplay}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
