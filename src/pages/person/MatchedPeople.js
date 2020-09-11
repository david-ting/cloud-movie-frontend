import React from "react";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";
import PersonResults from "../../components/person/PersonResults";
import SearchPagination from "../../components/pagination/SearchPagination";

function MatchedPeople() {
  return (
    <SearchProvider>
      <SearchJumbotron type="person" />
      <PersonResults />
      <SearchPagination type="person" />
    </SearchProvider>
  );
}

export default MatchedPeople;
