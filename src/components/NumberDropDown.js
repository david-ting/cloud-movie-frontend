import React from "react";
import { Link } from "react-router-dom";

function NumberDropDown({
  range,
  value,
  path,
  direction = "dropdown",
  postfix = "",
}) {
  let numList = [];
  for (let i = 1; i < range + 1; i++) {
    numList.push(
      <Link
        key={i}
        className={`dropdown-item ${value === i ? "active" : null}`}
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
        to={`${path}/${i}${postfix ? `/${postfix}` : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className={`${direction}`}>
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
      <div
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={{ minWidth: "30px", maxHeight: "200px", overflow: "auto" }}
      >
        {numList}
      </div>
    </div>
  );
}

export default NumberDropDown;
