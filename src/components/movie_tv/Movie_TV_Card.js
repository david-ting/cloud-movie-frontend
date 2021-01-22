import React, { useState } from "react";
import { MdLocalMovies } from "react-icons/md";
import CardImage from "../CardImage";
import { Link, useHistory } from "react-router-dom";
import { formatDate } from "../../customFunc/all";

function Movie_TV_Card({ result, type }) {
  // spinning for the movie or tv images
  const [spin, setSpin] = useState(!result.poster_path ? false : true);
  const history = useHistory();

  return (
    <>
      <div
        className="col mb-4 px-2"
        key={result.id}
        style={{ minHeight: "200px" }}
      >
        <div className="card h-100 position-relative">
          {!result.poster_path ? (
            <div
              className="card-img-top defaultMovieTvImgWrapper"
              onClick={() => {
                history.push(`/${type}/detail/${result.id}`);
              }}
            >
              <div>
                <MdLocalMovies />
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                history.push(`/${type}/detail/${result.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <CardImage
                image_path={result.poster_path}
                title={result.title}
                spin={spin}
                setSpin={setSpin}
              />
            </div>
          )}
          {!spin && (
            <div className="card-body" style={{ padding: "10px" }}>
              <h5 className="card-title">
                {type === "movie" && result.title}
                {type === "tv" && result.name}
              </h5>
              <p className="card-text">
                {type === "movie" && result.release_date && (
                  <span className="d-flex flex-wrap">
                    <span className="mr-2">Release date: </span>
                    <span>{formatDate(result.release_date)}</span>
                  </span>
                )}
                {type === "tv" && result.first_air_date && (
                  <span className="d-flex flex-wrap">
                    <span className="mr-2">First air date: </span>
                    <span>{formatDate(result.first_air_date)}</span>
                  </span>
                )}
              </p>
              <Link
                to={`/${type}/detail/${result.id}`}
                className="btn btn-outline-primary"
              >
                Detail
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Movie_TV_Card;
