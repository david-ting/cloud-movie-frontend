import React, { useEffect, useRef, useContext } from "react";

import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaLink } from "react-icons/fa";
import { fetchDetailFunc } from "../../customFunc/all";
import { DetailContext } from "../../context/detail/DetailProvider";

function PersonDetailPage() {
  const { id } = useParams();
  const { detail, dispatch } = useContext(DetailContext);
  const result = detail.result;
  const biographyContainer = useRef(null);
  const readMoreBtn = useRef(null);
  const whiteFilter = useRef(null);

  const readMore = (e) => {
    biographyContainer.current.style.overflow = "visible";
    biographyContainer.current.style.maxHeight = "none";
    readMoreBtn.current.style.visibility = "hidden";
    whiteFilter.current.style.visibility = "hidden";
  };

  useEffect(() => {
    dispatch({
      type: "SET_TARGET_ID",
      payload: id,
    });
    fetchDetailFunc("person", id, dispatch);
  }, [dispatch, id]);

  useEffect(() => {
    if (
      biographyContainer.current.offsetHeight >=
      biographyContainer.current.scrollHeight
    ) {
      readMoreBtn.current.style.visibility = "hidden";
      whiteFilter.current.style.visibility = "hidden";
    } else {
      readMoreBtn.current.style.visibility = "visible";
      whiteFilter.current.style.visibility = "visible";
    }
  }, [detail]);

  return (
    <IconContext.Provider value={{ color: "gray", size: "1.5rem" }}>
      <div className="container" id="personWrapper">
        {result.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`}
            alt={result.name}
          ></img>
        )}
        <div id="personInfo">
          <h3>{result.name}</h3>
          {result.also_known_as && result.also_known_as.length !== 0 && (
            <p className="text-secondary">
              <i>Also known as: {result.also_known_as.join(", ")}</i>
            </p>
          )}
          {result.homepage && (
            <a href={result.homepage} className="mt-2 mb-2">
              <FaLink className="mr-2" />
              {result.homepage}
            </a>
          )}
          {result.known_for_department && (
            <p>Profession: {result.known_for_department}</p>
          )}
          {detail.place_of_birth && <p>Birth Place: {result.place_of_birth}</p>}
          <div className="d-flex">
            {result.birthday && <p className="mr-3">Born: {result.birthday}</p>}
            {result.deathday && <p>Died: {result.deathday}</p>}
          </div>
          <div id="biographyContainer" ref={biographyContainer}>
            <h4>Biography</h4>
            <p>{result.biography}</p>
            {
              <>
                <button
                  ref={readMoreBtn}
                  className="btn btn-primary"
                  htmlFor="expanded"
                  onClick={readMore}
                >
                  read more
                </button>
                <div className="whiteFilter" ref={whiteFilter}></div>
              </>
            }
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default PersonDetailPage;
