import React from "react";
import { useLocation } from "react-router-dom";
import DetailProvider from "../context/detail/DetailProvider";
import DetailSubRoute from "../components/DetailSubRoute";
import Movie_TV_Recommendations from "../components/movie_tv/Movie_TV_Recommendations";

function RecommendationPage() {
  return (
    <DetailProvider>
      <DetailSubRoute>
        <Movie_TV_Recommendations />
      </DetailSubRoute>
    </DetailProvider>
  );
}

export default RecommendationPage;
