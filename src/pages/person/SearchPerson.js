import React, { useEffect, useMemo } from "react";
import SearchJumbotron from "../../components/SearchJumbotron";
import SearchWrapper from "../../components/SearchWrapper";

function SearchPerson() {
  const bgChoices = useMemo(
    () => [
      {
        backgroundImage: `url(https://res.cloudinary.com/dmskcaysu/image/upload/v1607491496/cloud%20movie/person_bg_ipcqdx.jpg)`,
        backgroundPosition: "right 20px"
      },
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607603794/cloud%20movie/person_bg_2_eznbc1.jpg")`,
        backgroundPosition: "left 20px"
      },
      {
        backgroundImage: `url("https://res.cloudinary.com/dmskcaysu/image/upload/v1607604354/cloud%20movie/person_bg_3_gfwrjm.jpg")`,
        backgroundPosition: "right 20px"
      },
    ],
    []
  );

  useEffect(() => {
    document.title = "Search Person | Cloud Movie";
  }, []);
  return (
    <SearchWrapper bgChoices={bgChoices}>
      <SearchJumbotron type="person" />
    </SearchWrapper>
  );
}

export default SearchPerson;
