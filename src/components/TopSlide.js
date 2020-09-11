import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function TopSlide({ type, detail, id }) {
  return (
    <div id="topPicture">
      <img
        src={`https://image.tmdb.org/t/p/w500/${detail.result.poster_path}`}
      ></img>
      <div className="ml-3">
        <h2>
          {type === "movie" && detail.result.title}
          {type === "tv" && detail.result.name}{" "}
          <i style={{ color: "rgb(208,208,208)" }}>
            {type === "movie" && detail.result.release_date.split("-")[0]}
            {type === "tv" && detail.result.first_air_date.split("-")[0]}
          </i>
        </h2>
        <p>
          <i>{detail.result.tagline}</i>
        </p>
        <Link to={{ pathname: `/${type}/detail/${id}/`, state: { detail } }}>
          <IoMdArrowRoundBack /> Back
        </Link>
      </div>
    </div>
  );
}

export default TopSlide;
