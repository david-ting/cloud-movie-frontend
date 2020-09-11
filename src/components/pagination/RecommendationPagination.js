import React from "react";
import GeneralPagination from "./GeneralPagination";

function RecommendationPagination(props) {
  const { type, id, currentPage, totalPages } = props;
  const path = `/${type}/detail/${id}/recommendations`;

  return <GeneralPagination {...{ currentPage, totalPages, path }} />;
}

export default RecommendationPagination;
