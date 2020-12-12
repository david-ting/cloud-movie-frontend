import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardImage from "../CardImage";
import { BsPersonSquare } from "react-icons/bs";

function PersonCard({ person }) {
  const [spin, setSpin] = useState(!person.profile_path ? false : true);

  return (
    <div className="personCard">
      <div className="personCardImageWrapper">
        <div>
          <Link
            to={`/person/detail/${person.id}`}
            className="position-relative"
          >
            {person.profile_path ? (
              <CardImage
                spin={spin}
                setSpin={setSpin}
                image_path={person.profile_path}
                title={person.name}
              />
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
  );
}

export default PersonCard;
