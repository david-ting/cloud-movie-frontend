import React from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchProvider from "../../context/search/SearchProvider";

function SearchTv() {
  return (
    <SearchProvider>
      <SearchJumbotron type="tv" />
    </SearchProvider>
  );
}

export default SearchTv;
