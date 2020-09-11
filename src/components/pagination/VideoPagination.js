import React from "react";
import GeneralPagination from "./GeneralPagination";

function VideoPagination(props) {
  const { total, numberPerPage, currentPage, type, id } = props;
  const totalPages = Math.ceil(total / numberPerPage);

  const path = `/${type}/detail/${id}/videos/${numberPerPage}`;

  return <GeneralPagination {...{ currentPage, totalPages, path }} />;
}

export default VideoPagination;
