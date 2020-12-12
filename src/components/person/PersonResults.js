import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { SearchContext } from "../../context/search/SearchProvider";
import { searchOneType } from "../../customFunc/all";
import LoadingIndicator from "../LoadingIndicator";
import PersonCard from "./PersonCard";

function PersonResults() {
  const { name, page } = useParams();
  const { search, dispatch } = useContext(SearchContext);
  const list = search.list;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchOneType("person", name, page, dispatch).then(() => {
      setLoading(false);
    });
  }, [name, page, dispatch]);

  return (
    <>
      <IconContext.Provider value={{ color: "gray", size: "5rem" }}>
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
              <div className="mb-3">
                {list.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            )}
          </>
        )}
      </IconContext.Provider>
    </>
  );
}

export default PersonResults;
