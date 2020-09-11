import React, { useContext, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../context/search/SearchProvider";

function SearchJumbotron(props) {
  const { name } = useParams();
  const type = props.type;
  const { search, dispatch } = useContext(SearchContext);

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
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={type}
            aria-label="Movie"
            aria-describedby="searchBtn"
            value={search.query}
            onChange={changeHandler}
          />
          <div className="input-group-append">
            <Link to={toPath} className="btn btn-purple" id="searchBtn">
              <FaSearch />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchJumbotron;
