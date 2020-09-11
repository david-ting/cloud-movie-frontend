import React from "react";
import { MdLocalMovies } from "react-icons/md";
import CardImage from "../CardImage";
import { Link } from "react-router-dom";

function Movie_TV_Cards({ list, type }) {
  return (
    <>
      {list.map((result) => (
        <div className="col mb-4" key={result.id}>
          <div className="card h-100">
            {!result.poster_path ? (
              <div
                className="card-img-top"
                style={{
                  backgroundColor: "gray",
                  height: "300px",
                  color: "white",
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <div>
                  <MdLocalMovies />
                </div>
              </div>
            ) : (
              <CardImage image_path={result.poster_path} title={result.title} />
            )}
            <div className="card-body">
              <h5 className="card-title">
                {type === "movie" && result.title}
                {type === "tv" && result.name}
              </h5>
              <p className="card-text">
                {type === "movie" &&
                  result.release_date &&
                  `Release date:${result.release_date}`}
                {type === "tv" &&
                  result.first_air_date &&
                  `First air date:${result.first_air_date}`}
              </p>
              <Link
                to={`/${type}/detail/${result.id}`}
                className="btn btn-outline-primary"
              >
                Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Movie_TV_Cards;
