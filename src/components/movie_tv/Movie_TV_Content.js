import React from "react";
import ColorThief from "colorthief";
import { AiTwotoneHome } from "react-icons/ai";
import { formatDate } from "../../customFunc/all";

const colorThief = new ColorThief();

function Movie_TV_Content({ type, result, setMainColor }) {
  let duration;
  switch (type) {
    case "movie":
      duration = result.runtime;
      break;
    case "tv":
      duration = result.episode_run_time[0];
      break;
    default:
      break;
  }

  const hour = Math.floor(duration / 60);
  const minute = duration % 60;

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
      <div
        id="movieTvInfo"
        style={
          result.poster_path
            ? null
            : {
                gridColumn: "1/3",
              }
        }
      >
        {(result.title || result.name) && (
          <h3>{result.title || result.name}</h3>
        )}
        <p className="d-flex flex-wrap">
          {(result.release_date || result.first_air_date) && (
            <span className="mr-5">
              {type === "movie" &&
                `● release: ${formatDate(result.release_date)}`}
              {type === "tv" &&
                `● first air: ${formatDate(result.first_air_date)}`}
            </span>
          )}
          {duration !== 0 && duration !== undefined && duration !== null && (
            <span>
              ● duration:{hour !== 0 && ` ${hour} h`}
              {minute !== 0 && ` ${minute} m`}
            </span>
          )}
        </p>
        {result.genres && result.genres.length >= 1 && (
          <p>
            {result.genres.reduce((string, genre) => {
              if (string === "") return genre.name;
              else {
                return `${string}, ${genre.name}`;
              }
            }, "")}
          </p>
        )}
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
        {result.overview && (
          <>
            <h5 className="mt-2">Overview</h5>
            <p>{result.overview}</p>
          </>
        )}
        {result.production_companies.length > 0 && (
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
