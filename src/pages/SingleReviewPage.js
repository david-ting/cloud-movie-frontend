import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import DetailSubRoute from "../components/DetailSubRoute";
import Review from "../components/Review";
import { fetchSingleReview } from "../customFunc/all";
import DetailProvider from "../context/detail/DetailProvider";

function SingleReviewPage() {
  const { type } = useParams();
  const searchQuery = new URLSearchParams(useLocation().search);
  const reviewID = searchQuery.get("id");
  const [singleReview, setSingleReview] = useState();

  useEffect(() => {
    fetchSingleReview(reviewID, setSingleReview);
  }, [reviewID]);

  return (
    <DetailProvider>
      <DetailSubRoute>
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
