import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { IconContext } from "react-icons";
import CardImage from "../CardImage";
import { SearchContext } from "../../context/search/SearchProvider";
import { searchOneType } from "../../customFunc/all";
import Movie_TV_Cards from "./Movie_TV_Cards";

function Movie_TV_Results(props) {
  const { name, page } = useParams();
  const type = props.type;
  const { search, dispatch } = useContext(SearchContext);
  const list = search.list;

  useEffect(() => {
    searchOneType(type, name, page, dispatch);
  }, [type, name, page, dispatch]);

  return (
    <IconContext.Provider value={{ size: "5rem" }}>
      {!list ? null : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 - row-cols-lg-5">
          <Movie_TV_Cards list={list} type={type} />
        </div>
      )}
    </IconContext.Provider>
  );
}

export default Movie_TV_Results;
