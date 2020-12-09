import React, { useEffect } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchProvider from "../../context/search/SearchProvider";
import tv_bg from "../../image/tv_bg-min.jpg";

function SearchTv() {
  useEffect(() => {
    document.title = "Search Tv | Cloud Movie";
  }, []);
  return (
    <SearchProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dmskcaysu/image/upload/v1607491505/cloud%20movie/tv_bg_anpkpl.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
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
          <SearchJumbotron type="tv" />
        </div>
      </div>
    </SearchProvider>
  );
}

export default SearchTv;
