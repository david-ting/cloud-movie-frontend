import React, { useEffect, useMemo } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchWrapper from "../../components/SearchWrapper";

function SearchTv() {
  const bgChoices = useMemo(
    () => [
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607604978/cloud%20movie/tv_bg_2_jws6xh.jpg")`,
        backgroundPosition: "50% 20px",
      },
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607491505/cloud%20movie/tv_bg_anpkpl.jpg")`,
        backgroundPosition: "50% 80%",
      },
      {
        backgroundImage: `url(" https://res.cloudinary.com/dmskcaysu/image/upload/v1607605826/cloud%20movie/tv_bg_3_allirs.jpg")`,
        backgroundPosition: "50% 20%",
      },
    ],
    []
  );
  useEffect(() => {
    document.title = "Search Tv | Cloud Movie";
  }, []);
  return (
    <SearchWrapper bgChoices={bgChoices}>
      <SearchJumbotron type="tv" />
    </SearchWrapper>
  );
}

export default SearchTv;
