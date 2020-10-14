import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../context/search/SearchProvider";
import { searchOneType } from "../customFunc/all";

function SearchJumbotron(props) {
  const { name } = useParams();
  const type = props.type;
  const { search, dispatch } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState();

  // search page 1 by default
  const toPath =
    search.query === ""
      ? `/${type}/search/`
      : `/${type}/search/${search.query}/1`;

  const changeHandler = (event) => {
    dispatch({
      type: "SET_QUERY",
      payload: event.target.value,
    });
    if (event.target.value) {
      searchOneType(type, event.target.value, 1, false, setSuggestions);
    } else {
      setSuggestions();
    }
  };

  const blurHandler = (event) => {
    console.log(event.relatedTarget);
    if (
      (!event.relatedTarget ||
        !event.relatedTarget.classList.contains("autocomplete")) &&
      document.querySelector(".autocompleteWrapper")
    )
      document.querySelector(".autocompleteWrapper").style.visibility =
        "hidden";
  };
  const focusHandler = () => {
    if (document.querySelector(".autocompleteWrapper"))
      document.querySelector(".autocompleteWrapper").style.visibility =
        "visible";
  };

  useEffect(() => {
    if (name) {
      dispatch({
        type: "SET_QUERY",
        payload: name,
      });
    }
  }, [name, dispatch]);

  return (
    <div className="jumbotron jumbotron-fluid searchJumbotron">
      <div className="container">
        <div className="input-group mb-3 searchGroup">
          <input
            type="text"
            className="form-control"
            placeholder={type}
            aria-label="Movie"
            aria-describedby="searchBtn"
            value={search.query}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
          />
          <div className="input-group-append">
            <Link to={toPath} className="btn btn-purple" id="searchBtn">
              <FaSearch />
            </Link>
          </div>
          {suggestions && suggestions.length >= 1 && (
            <ul className="autocompleteWrapper">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <Link
                    to={`/${type}/detail/${suggestion.id}`}
                    className="autocomplete"
                  >
                    {type === "movie" && suggestion.title}
                    {(type === "tv" || type === "person") && suggestion.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchJumbotron;
