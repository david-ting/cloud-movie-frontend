import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsPersonSquare } from "react-icons/bs";
import CardImage from "../CardImage";
import { SearchContext } from "../../context/search/SearchProvider";
import { searchOneType } from "../../customFunc/all";

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
          <Link to={`/person/detail/${person.id}`}>{person.name}</Link>
        </h5>
        <p>
          <i>{person.known_for_department}</i>
          {person.known_for.map((a) => {
            if (a.title)
              return (
                <Link
                  to={`/movie/detail/${a.id}`}
                  key={a.id}
                >{`● ${a.title}`}</Link>
              );
            else if (a.name)
              return (
                <Link
                  to={`/tv/detail/${a.id}`}
                  key={a.id}
                >{`● ${a.name}`}</Link>
              );
          })}
        </p>
      </div>
    </div>
  ));

  useEffect(() => {
    searchOneType("person", name, page, dispatch);
  }, [name, page, dispatch]);

  return (
    <div className="container">
      <IconContext.Provider value={{ color: "gray", size: "5rem" }}>
        {cards}
      </IconContext.Provider>
    </div>
  );
}

export default PersonResults;
