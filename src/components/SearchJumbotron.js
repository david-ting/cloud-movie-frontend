import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../context/search/SearchProvider";
import { suggestOneType } from "../customFunc/all";
import AutoSuggestion from "./AutoSuggestion";
import useCancellableThrottle from "../customHook/useCancelableThrottle";

function SearchJumbotron(props) {
  const { name } = useParams();
  const type = props.type;
  const { search, dispatch } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [cursor, setCursor] = useState(-1);
  const history = useHistory();

  const {
    cancellableThrottle: throttledSuggestions,
    cancelRequest: cancelSuggestions,
  } = useCancellableThrottle(suggestOneType);

  // search page 1 by default
  const toPath =
    search.query === ""
      ? `/${type}/search/`
      : `/${type}/search/${encodeURIComponent(search.query)}/1`;

  const changeHandler = (event) => {
    dispatch({
      type: "SET_QUERY",
      payload: event.target.value,
    });
    if (event.target.value) {
      throttledSuggestions(
        type,
        encodeURIComponent(event.target.value),
        1,
        setSuggestions
      );
    } else {
      setSuggestions([]);
      cancelSuggestions();
    }
  };

  const keyDownHandler = (event) => {
    if (event.key === "ArrowDown" && showSuggestions && suggestions.length) {
      event.preventDefault();
    }

    if (event.key === "ArrowUp" && showSuggestions && suggestions.length) {
      event.preventDefault();
    }

    setShowSuggestions(true);

    if (
      event.key === "Enter" &&
      (suggestions.length === 0 || cursor === -1 || !showSuggestions)
    ) {
      setShowSuggestions(false);
      setSuggestions([]);
      history.push(toPath);
    }

    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "Enter"
    ) {
      setCursor(-1);
    }
  };

  const blurHandler = (event) => {
    if (
      (!event.relatedTarget ||
        !event.relatedTarget.classList.contains("autocomplete")) &&
      document.querySelector(".autocompleteWrapper")
    )
      setShowSuggestions(false);
  };

  useEffect(() => {
    if (name) {
      dispatch({
        type: "SET_QUERY",
        payload: decodeURIComponent(name),
      });
    }
  }, [name, dispatch]);

  useEffect(() => {
    if (search.query === "" && suggestions.length !== 0) {
      setSuggestions([]);
    }
  }, [suggestions, setSuggestions, search.query]);

  useEffect(() => {
    return () => cancelSuggestions();
  }, []);

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
            onKeyDown={keyDownHandler}
          />
          <div className="input-group-append">
            <Link to={toPath} className="btn theme-btn" id="searchBtn">
              <FaSearch />
            </Link>
          </div>
          {showSuggestions && suggestions.length >= 1 && (
            <AutoSuggestion
              suggestions={suggestions}
              type={type}
              cursor={cursor}
              setCursor={setCursor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchJumbotron;
