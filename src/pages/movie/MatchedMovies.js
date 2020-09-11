import React from "react";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";
import Movie_TV_Results from "../../components/movie_tv/Movie_TV_Results";
import SearchPagination from "../../components/pagination/SearchPagination";

function MatchedMovies() {
  return (
    <SearchProvider>
      <div className="container">
        <SearchJumbotron type="movie" />
        <Movie_TV_Results type="movie" />
        <SearchPagination type="movie" />
      </div>
    </SearchProvider>
  );
}

export default MatchedMovies;
