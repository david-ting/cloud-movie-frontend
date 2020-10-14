import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import DetailSubRoute from "../components/DetailSubRoute";
import Review from "../components/Review";
import { fetchSingleReview, scrapeSingleReview } from "../customFunc/all";
import DetailProvider from "../context/detail/DetailProvider";
import LoadingIndicator from "../components/LoadingIndicator";

function SingleReviewPage() {
  const { type } = useParams();
  const searchQuery = new URLSearchParams(useLocation().search);
  const reviewID = searchQuery.get("id");
  const [singleReview, setSingleReview] = useState();

  useEffect(() => {
    if (type === "movie") fetchSingleReview(reviewID, setSingleReview);
    else if (type === "tv") {
      scrapeSingleReview(reviewID, setSingleReview);
    }
  }, [reviewID, type]);

  return (
    <DetailProvider>
      <DetailSubRoute>
        {!singleReview && <LoadingIndicator />}
        {singleReview && (
          <div className="my-3">
            <Review type={type} review={singleReview} full={true} />
          </div>
        )}
      </DetailSubRoute>
    </DetailProvider>
  );
}

export default SingleReviewPage;
