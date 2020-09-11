import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { useLocation, useParams } from "react-router-dom";
import Movie_TV_Cards from "./Movie_TV_Cards";
import { fetchRecommendationsFunc } from "../../customFunc/all";
import RecommendationPagination from "../pagination/RecommendationPagination";

function Movie_TV_Recommendations() {
  const { type, id, page } = useParams();
  const linkState = useLocation().state;
  const linkRecommendations = linkState ? linkState.recommendations : null;
  const [recommendations, setRecommendations] = useState(linkRecommendations);
  const list = recommendations ? recommendations.results : null;

  useEffect(() => {
    if (!linkRecommendations)
      fetchRecommendationsFunc(type, id, setRecommendations, page);
  }, [type, id, setRecommendations, page, linkRecommendations]);

  return (
    <>
      <IconContext.Provider value={{ size: "5rem" }}>
        {!list ? null : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 - row-cols-lg-5">
            <Movie_TV_Cards list={list} type={type} />
          </div>
        )}
        {recommendations && recommendations.pageInfo && (
          <RecommendationPagination
            {...{
              type,
              id,
              currentPage: recommendations.pageInfo.page,
              totalPages: recommendations.pageInfo.totalPages,
            }}
          />
        )}
      </IconContext.Provider>
    </>
  );
}

export default Movie_TV_Recommendations;
