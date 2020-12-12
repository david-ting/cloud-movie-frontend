import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import VideoList from "../components/VideoList";
import ReviewList from "../components/ReviewList";
import Recommendations from "../components/Recommendations";
import { DetailContext } from "../context/detail/DetailProvider";
import {
  fetchDetailFunc,
  fetchVideosFunc,
  fetchReviewsFunc,
  fetchRecommendationsFunc,
} from "../customFunc/all";
import Movie_TV_Content from "../components/movie_tv/Movie_TV_Content";
import LoadingPage from "../components/LoadingPage";
import { capitalizeFirstChar } from "../customFunc/all";

const DetailContainer = styled.div`
  &::before {
    background-image: ${(props) => `url(${props.bgPath})`};
  }
  &::after {
    background-color: ${(props) => {
      return `rgba(${props.mainColor[0]}, ${props.mainColor[1]}, ${props.mainColor[2]}, 0.8)`;
    }};
  }
`;
function MovieTvDetailPage({ type }) {
  const { id } = useParams();
  const { detail, dispatch } = useContext(DetailContext);
  const result = detail.result;

  // default background color is gray
  const [mainColor, setMainColor] = useState([80, 80, 80]);
  const [videos, setVideos] = useState();
  const [reviews, setReviews] = useState();
  const [recommendations, setRecommendations] = useState();

  useEffect(() => {
    setMainColor([80, 80, 80]);
    dispatch({
      type: "SET_TARGET_ID",
      payload: id,
    });
    fetchDetailFunc(type, id, dispatch);
    fetchVideosFunc(type, id, setVideos);
    fetchReviewsFunc(type, id, setReviews);
    fetchRecommendationsFunc(type, id, setRecommendations);
  }, [id, dispatch, type]);

  useEffect(() => {
    let display;
    switch (type) {
      case "movie":
        display = result.title;
        break;
      case "tv":
        display = result.name;
        break;
      default:
        break;
    }
    if (!display) display = "";
    document.title = `${display} - ${capitalizeFirstChar(type)} | Cloud Movie`;
  }, [type, result]);

  return (
    <>
      {(Object.keys(result).length === 0 ||
        !videos ||
        !reviews ||
        !recommendations) && <LoadingPage />}
      <IconContext.Provider value={{ size: "24px" }}>
        {Object.keys(result).length === 0 ? null : (
          <DetailContainer
            bgPath={
              result.backdrop_path &&
              `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`
            }
            mainColor={mainColor}
            id="movieTvDetailContainer"
          >
            {result.backdrop_path ? <div id="blackFilter"></div> : null}
            <Movie_TV_Content {...{ type, result, setMainColor }} />
          </DetailContainer>
        )}

        <div id="movieTvRelatedInfo">
          {videos && videos.length > 0 && (
            <VideoList
              type={type}
              videos={videos}
              noPerPage={Math.min(3, videos.length)}
              detail={detail}
            />
          )}
          {reviews && reviews.results.length > 0 && (
            <ReviewList type={type} reviews={reviews} detail={detail} />
          )}
          {recommendations && recommendations.results.length > 0 && (
            <Recommendations type={type} recommendations={recommendations} />
          )}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default MovieTvDetailPage;
