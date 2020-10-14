import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsPersonSquare } from "react-icons/bs";
import CardImage from "../CardImage";
import { SearchContext } from "../../context/search/SearchProvider";
import { searchOneType } from "../../customFunc/all";
import LoadingIndicator from "../LoadingIndicator";

function PersonResults() {
  console.log("PersonResults");
  const { name, page } = useParams();
  const { search, dispatch } = useContext(SearchContext);
  const list = search.list;

  const cards = list.map((person) => (
    <div className="personCard" key={person.id}>
      <div className="personCardImageWrapper">
        <div>
          <Link to={`/person/detail/${person.id}`}>
            {person.profile_path ? (
              <CardImage image_path={person.profile_path} title={person.name} />
            ) : (
              <BsPersonSquare />
            )}
          </Link>
        </div>
      </div>
      <div className="personCardInfoWrapper">
        <h5>
          <Link to={`/person/detail/${person.id}`} className="themeColorText">
            {person.name}
          </Link>
        </h5>
        <p className="d-flex flex-wrap">
          <i className="mr-2 themeLigherColorText">
            {person.known_for_department}
          </i>
          <span className="d-flex flex-wrap">
            {person.known_for.map((a) => {
              if (a.title)
                return (
                  <Link
                    className="mr-2"
                    to={`/movie/detail/${a.id}`}
                    key={a.id}
                  >{`● ${a.title}`}</Link>
                );
              else if (a.name)
                return (
                  <Link
                    className="mr-2"
                    to={`/tv/detail/${a.id}`}
                    key={a.id}
                  >{`● ${a.name}`}</Link>
                );
            })}
          </span>
        </p>
      </div>
    </div>
  ));

  useEffect(() => {
    searchOneType("person", name, page, dispatch);
  }, [name, page, dispatch]);

  return (
    <div className="container">
      {list.length === 0 && <LoadingIndicator />}
      <IconContext.Provider value={{ color: "gray", size: "5rem" }}>
        <div className="mb-3">{cards}</div>
      </IconContext.Provider>
    </div>
  );
}

export default PersonResults;
