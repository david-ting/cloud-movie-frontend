import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function TwoWayToggle({ current, path, selections, callBack }) {
  const slideOver = useRef();

  useEffect(() => {
    if (current === selections[0]) {
      slideOver.current.style.left = "0px";
    } else if (current === selections[1]) {
      slideOver.current.style.left = "70px";
    }
  }, [current, selections]);

  return (
    <div className="slideButtonGroup">
      <Link
        to={`${path}/${selections[0]}`}
        className={`slideButton ${
          current === selections[0] && "slideButton-active"
        }`}
        onClick={() => {
          if (current !== selections[0]) {
            callBack();
          }
        }}
      >
        {selections[0]}
      </Link>
      <Link
        to={`${path}/${selections[1]}`}
        className={`slideButton ${
          current === selections[1] && "slideButton-active"
        }`}
        onClick={() => {
          if (current !== selections[1]) {
            callBack();
          }
        }}
      >
        {selections[1]}
      </Link>
      <button className="slideOver" ref={slideOver}></button>
    </div>
  );
}

export default TwoWayToggle;
