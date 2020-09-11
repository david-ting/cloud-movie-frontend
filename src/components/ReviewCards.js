import React from "react";
import Review from "./Review";
import Movie_TV_Results from "./movie_tv/Movie_TV_Results";

function ReviewCards({ type, reviews }) {
  return (
    <>
      {reviews &&
        reviews.results &&
        reviews.results.map((review) => (
          <div className="mt-3" key={review.id}>
            <Review type={type} review={review} />
          </div>
        ))}
    </>
  );
}

export default ReviewCards;
