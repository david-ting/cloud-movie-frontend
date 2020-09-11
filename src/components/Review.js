import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Review({ type, review, full }) {
  const { id } = useParams();
  const reviewContainer = useRef();
  const whiteFilter = useRef();
  const readMore = useRef();

  useEffect(() => {
    if (!full) {
      if (
        reviewContainer.current.offsetHeight >=
        reviewContainer.current.scrollHeight
      ) {
        whiteFilter.current.style.visibility = "hidden";
        readMore.current.style.visibility = "hidden";
      }
    }
  }, [full]);

  return (
    <div
      className={`grayBorderWrapper ${full ? null : "reviewWrapper"}`}
      ref={reviewContainer}
    >
      <h6>{review.author}</h6>
      <p>{review.content}</p>
      {!full && (
        <>
          <Link
            to={`/${type}/detail/${id}/reviews?id=${review.id}`}
            ref={readMore}
            className="btn btn-primary"
          >
            read more
          </Link>
          <div className="whiteFilter" ref={whiteFilter}></div>
        </>
      )}
    </div>
  );
}

export default Review;
