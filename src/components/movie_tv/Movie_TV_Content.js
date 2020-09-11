import React from "react";
import ColorThief from "colorthief";
import { AiTwotoneHome } from "react-icons/ai";

const colorThief = new ColorThief();

function Movie_TV_Content({ type, result, setMainColor }) {
  return (
    <div id="movieTvContent">
      {result.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
          alt={result.title}
          onLoad={(e) => {
            try {
              setMainColor(colorThief.getColor(e.target));
            } catch (error) {
              console.error(error);
            }
          }}
          crossOrigin="anonymous"
        ></img>
      )}
      <div id="movieTvInfo">
        <h3>
          {type === "movie" && result.title}
          {type === "tv" && result.name}
        </h3>
        <p>
          <span className="mr-5">
            {type === "movie" && `● release: ${result.release_date}`}
            {type === "tv" && `● first air: ${result.first_air_date}`}
          </span>
          <span>
            {type === "movie" &&
              `● duration: ${Math.floor(result.runtime / 60)} h
            ${result.runtime % 60} m`}
            {type === "tv" &&
              `● runtime: ${Math.floor(result.episode_run_time[0] / 60)} h
            ${result.episode_run_time[0] % 60} m`}
          </span>
        </p>
        <p>
          {result.genres.reduce((string, genre) => {
            if (string === "") return genre.name;
            else {
              return `${string}, ${genre.name}`;
            }
          }, "")}
        </p>
        {result.tagline && (
          <p>
            <i>{result.tagline}</i>
          </p>
        )}
        {result.homepage && (
          <a href={result.homepage}>
            <AiTwotoneHome className="mr-2" /> {result.homepage}
          </a>
        )}
        <h5 className="mt-2">Overview</h5>
        <p>{result.overview}</p>
        {result.production_companies && (
          <>
            <h5 className="mt-2">Production Company</h5>
            <ul>
              {result.production_companies.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Movie_TV_Content;
