import React from "react";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";

function SearchPerson() {
  return (
    <SearchProvider>
      <SearchJumbotron type="person" />
    </SearchProvider>
  );
}

export default SearchPerson;
