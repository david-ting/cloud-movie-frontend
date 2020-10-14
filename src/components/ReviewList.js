import React from "react";
import { Link, useParams } from "react-router-dom";
import Review from "./Review";

function ReviewList({ type, reviews, detail }) {
  const { id } = useParams();
  return (
    <>
      <h5 className="mt-3">
        <i>{reviews.results.length}</i> reviews
        {reviews.results.length > 1 && (
          <Link
            to={{
              pathname: `/${type}/detail/${id}/reviews/1`,
              state: { reviews, detail },
            }}
            className="btn btn-outline-primary p-1 ml-2"
          >
            show more
          </Link>
        )}
      </h5>
      <Review type={type} review={reviews.results[0]} full={false} />
    </>
  );
}

export default ReviewList;
