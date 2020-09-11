import React, { useEffect } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchProvider from "../../context/search/SearchProvider";

function SearchMovie() {
  return (
    <SearchProvider>
      <div>
        <SearchJumbotron type="movie" />
      </div>
    </SearchProvider>
  );
}

export default SearchMovie;
