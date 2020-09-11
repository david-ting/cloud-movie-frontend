import React, { useRef } from "react";

function TwoWayToggle({ current, setCurrent, selections, callBack }) {
  const slideOver = useRef();
  return (
    <div className="slideButtonGroup">
      <button
        className={`slideButton ${
          current === selections[0] && "slideButton-active"
        }`}
        onClick={() => {
          if (current !== selections[0]) {
            setCurrent(selections[0]);
            slideOver.current.classList.toggle("slideOver-clicked");
            callBack();
          }
        }}
      >
        {selections[0]}
      </button>
      <button
        className={`slideButton ${
          current === selections[1] && "slideButton-active"
        }`}
        onClick={() => {
          if (current !== selections[1]) {
            setCurrent(selections[1]);
            slideOver.current.classList.toggle("slideOver-clicked");
            callBack();
          }
        }}
      >
        {selections[1]}
      </button>
      <button className="slideOver" ref={slideOver}></button>
    </div>
  );
}

export default TwoWayToggle;
