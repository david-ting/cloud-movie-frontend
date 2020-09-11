import React, { createContext, useReducer } from "react";
import searchReducer from "./searchReducer";

export const SearchContext = createContext();

function SearchProvider(props) {
  const initialState = {
    query: "",
    list: [],
    pageInfo: {
      totalPages: 0,
      page: 0,
      totalResults: 0,
    },
  };

  const [search, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={{ search, dispatch }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
