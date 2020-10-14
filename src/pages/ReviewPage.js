import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchReviewsFunc } from "../customFunc/all";
import VideoCards from "../components/VideoCards";
import DetailSubRoute from "../components/DetailSubRoute";
import DetailProvider from "../context/detail/DetailProvider";
import Review from "../components/Review";
import ReviewCards from "../components/ReviewCards";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import ReviewPagination from "../components/pagination/ReviewPagination";

function ReviewPage() {
  const { type, id, page } = useParams();
  const linkState = useLocation().state;
  const linkReviews = linkState ? linkState.reviews : null;
  const [reviews, setReviews] = useState(linkReviews);

  useEffect(() => {
    if (!linkReviews) fetchReviewsFunc(type, id, setReviews, page);
  }, [type, id, page, setReviews, linkReviews]);

  return (
    <DetailProvider>
      <DetailSubRoute>
        <div className="mb-3">{reviews && <ReviewCards type={type} reviews={reviews} />}</div>
        {reviews && reviews.pageInfo && (
          <ReviewPagination
            {...{
              totalPages: reviews.pageInfo.totalPages,
              currentPage: reviews.pageInfo.page,
              type,
              id,
            }}
          />
        )}
      </DetailSubRoute>
    </DetailProvider>
  );
}

export default ReviewPage;
