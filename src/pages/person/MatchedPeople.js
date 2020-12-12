import React from "react";
import SearchProvider from "../../context/search/SearchProvider";
import SearchJumbotron from "../../components/SearchJumbotron";
import PersonResults from "../../components/person/PersonResults";
import SearchPagination from "../../components/pagination/SearchPagination";

function MatchedPeople() {
  return (
    <SearchProvider>
      <div className="container">
        <SearchJumbotron type="person" />
        <PersonResults />
        <SearchPagination type="person" />
      </div>
    </SearchProvider>
  );
}

export default MatchedPeople;
