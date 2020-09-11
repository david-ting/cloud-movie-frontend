import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/search/SearchProvider";
import GeneralPagination from "./GeneralPagination";

function SearchPagination(props) {
  const { name, page } = useParams();
  const currentPage = parseInt(page);
  const type = props.type;
  const { search } = useContext(SearchContext);
  const totalPages = search.pageInfo.totalPages;

  const path = `/${type}/search/${name}`;

  return <GeneralPagination {...{ currentPage, totalPages, path }} />;
}

export default SearchPagination;
