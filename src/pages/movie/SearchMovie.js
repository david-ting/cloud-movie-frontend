import React, { useEffect } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchProvider from "../../context/search/SearchProvider";
import movie_bg from "../../image/movie_bg.jpeg";

function SearchMovie() {
  useEffect(() => {
    document.title = "Search Movie | Cloud Movie";
  }, []);
  return (
    <SearchProvider>
      <div
        style={{
          backgroundImage: `url(${movie_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top 50px",
          backgroundSize: "cover",
          height: "calc(100vh - 55px - 40px - 5px)",
        }}
      >
        <div
          className="container d-flex align-items-center"
          style={{
            height: "100%",
          }}
        >
          <SearchJumbotron type="movie" />
        </div>
      </div>
    </SearchProvider>
  );
}

export default SearchMovie;
