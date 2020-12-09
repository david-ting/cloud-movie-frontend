import React, { useEffect } from "react";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";
import person_bg from "../../image/person_bg-min.jpg";

function SearchPerson() {
  useEffect(() => {
    document.title = "Search Person | Cloud Movie";
  }, []);
  return (
    <SearchProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dmskcaysu/image/upload/v1607491496/cloud%20movie/person_bg_ipcqdx.jpg)`,
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
          <SearchJumbotron type="person" />
        </div>
      </div>
    </SearchProvider>
  );
}

export default SearchPerson;
