import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";
import Movie_TV_Results from "../../components/movie_tv/Movie_TV_Results";
import SearchPagination from "../../components/pagination/SearchPagination";

function MatchedTv() {
  const { name } = useParams();

  useEffect(() => {
    document.title = `${name ? `${name} -` : ""}  Search Tv | Cloud Movie`;
  }, [name]);

  return (
    <SearchProvider>
      <div className="container">
        <SearchJumbotron type="tv" />
        <Movie_TV_Results type="tv" />
        <SearchPagination type="tv" />
      </div>
    </SearchProvider>
  );
}

export default MatchedTv;
