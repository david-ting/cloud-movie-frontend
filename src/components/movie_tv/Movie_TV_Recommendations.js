import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { useLocation, useParams } from "react-router-dom";
import Movie_TV_Card from "./Movie_TV_Card";
import { fetchRecommendationsFunc } from "../../customFunc/all";
import RecommendationPagination from "../pagination/RecommendationPagination";
import LoadingIndicator from "../LoadingIndicator";

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
      <IconContext.Provider value={{ size: "80px" }}>
        {list ? (
          <div className="mt-3 row row-cols-2 row-cols-md-4 row-cols-lg-5">
            {list.map((result) => (
              <Movie_TV_Card key={result.id} result={result} type={type} />
            ))}
          </div>
        ) : (
          <LoadingIndicator />
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
