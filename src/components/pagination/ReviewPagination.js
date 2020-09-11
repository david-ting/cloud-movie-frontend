import React from "react";
import GeneralPagination from "./GeneralPagination";

function ReviewPagination(props) {
  const { totalPages, currentPage, type, id } = props;
  const path = `${type}/detail/${id}/reviews`;

  return <GeneralPagination {...{ totalPages, currentPage, path }} />;
}

export default ReviewPagination;
