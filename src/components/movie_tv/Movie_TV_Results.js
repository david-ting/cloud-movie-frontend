import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { SearchContext } from "../../context/search/SearchProvider";
import { searchOneType } from "../../customFunc/all";
import Movie_TV_Card from "./Movie_TV_Card";
import LoadingIndicator from "../LoadingIndicator";

function Movie_TV_Results(props) {
  const { name, page } = useParams();
  const type = props.type;
  const { search, dispatch } = useContext(SearchContext);
  const list = search.list;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchOneType(type, name, page, dispatch).then(() => {
      setLoading(false);
    });
  }, [type, name, page, dispatch]);

  return (
    <IconContext.Provider value={{ size: "80px" }}>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          {list.length === 0 ? (
            <div>
              <p>
                No results for <b>{decodeURIComponent(name)}</b>.
              </p>
              <p>Please try another words or check your spelling.</p>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-5">
              {list.map((result) => (
                <Movie_TV_Card key={result.id} result={result} type={type} />
              ))}
            </div>
          )}
        </>
      )}
    </IconContext.Provider>
  );
}

export default Movie_TV_Results;
