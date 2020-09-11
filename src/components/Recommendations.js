import React from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "./Carousel";

function Recommendations({ type, recommendations }) {
  const { id } = useParams();
  return (
    <>
      <h5 className="mt-3">
        <i>{recommendations.pageInfo.totalResults}</i> recommendations
        {recommendations.pageInfo.totalResults > 10 && (
          <Link
            to={{
              pathname: `/${type}/detail/${id}/recommendations/1`,
              state: { recommendations },
            }}
            className="btn btn-outline-primary p-1 ml-2"
          >
            show more
          </Link>
        )}
      </h5>
      <div className="carouselWrapper">
        <Carousel type={type} slides={recommendations.results.slice(0, 10)} />
      </div>
    </>
  );
}

export default Recommendations;
