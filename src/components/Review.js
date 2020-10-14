import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiLink2 } from "react-icons/fi";
import { IconContext } from "react-icons";

function Review({ type, review, full }) {
  const { id } = useParams();
  const reviewContainer = useRef();
  const whiteFilter = useRef();
  const readMore = useRef();

  useEffect(() => {
    console.log(reviewContainer.current.offsetHeight);
    console.log(reviewContainer.current.scrollHeight);
    if (!full) {
      if (
        reviewContainer.current.offsetHeight >=
        reviewContainer.current.scrollHeight
      ) {
        whiteFilter.current.style.visibility = "hidden";
        readMore.current.style.visibility = "hidden";
      } else {
        whiteFilter.current.style.visibility = "visible";
        readMore.current.style.visibility = "visible";
      }
    }
  });

  return (
    <div
      className={`grayBorderWrapper ${full ? null : "reviewWrapper"}`}
      ref={reviewContainer}
    >
      <h6>
        <a
          className="reviewAuthor"
          href={`https://www.themoviedb.org/review/${review.id}`}
        >
          <span className="mr-2">{review.author}</span>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <FiLink2 />
          </IconContext.Provider>
        </a>
      </h6>
      {Array.isArray(review.content) ? (
        review.content.map((p, i) => <p key={i}>{p}</p>)
      ) : (
        <p>{review.content}</p>
      )}
      {!full && (
        <>
          <Link
            to={`/${type}/detail/${id}/reviews?id=${review.id}`}
            ref={readMore}
            className="btn btn-primary readMore"
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
