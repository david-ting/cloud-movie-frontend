import React, { useMemo, useEffect } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchWrapper from "../../components/SearchWrapper";

function SearchMovie() {
  const bgChoices = useMemo(
    () => [
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607491491/cloud%20movie/movie_bg_qlefad.jpg")`,
        backgroundPosition: "0 50px",
      },
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607507762/cloud%20movie/movie_bg_2_rbarvt.jpg")`,
        backgroundPosition: "50% 20px",
      },
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607603010/cloud%20movie/movie_bg_3_bkvvka.jpg")`,
        backgroundPosition: "right 20px",
      },
    ],
    []
  );

  useEffect(() => {
    document.title = "Search Movie | Cloud Movie";
  }, []);

  return (
    <SearchWrapper bgChoices={bgChoices}>
      <SearchJumbotron type="movie" />
    </SearchWrapper>
  );
}

export default SearchMovie;
