import React from "react";
import { Link } from "react-router-dom";

function NumberDropDown({ range, value, path, setValue }) {
  let numList = [];
  for (let i = 1; i < range + 1; i++) {
    numList.push(
      <Link
        key={i}
        className={`dropdown-item ${value === i ? "active" : null}`}
        to={`${path}/${i}/1`}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className="dropdown d-flex justify-content-end mt-2">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {value}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {numList}
      </div>
    </div>
  );
}

export default NumberDropDown;
