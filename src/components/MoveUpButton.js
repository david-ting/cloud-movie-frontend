import React, { useEffect, useRef } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

function MoveUpButton(props) {
  const after = props.after;
  const ref = useRef(null);

  const enterHandler = () => {
    ref.current.style.opacity = 1;
    ref.current.style.borderColor = "rgb(33, 99, 214)";
  };
  const leaveHandler = () => {
    ref.current.style.opacity = 0.8;
    ref.current.style.borderColor = "rgb(224, 219, 219)";
  };

  useEffect(() => {
    let visibilityTimer;
    let scrollTimer;
    const showHide = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (
          document.body.scrollTop > after ||
          document.documentElement.scrollTop > after
        ) {
          clearTimeout(visibilityTimer);
          ref.current.style.visibility = "visible";
          ref.current.style.opacity = 0.8;
        } else {
          visibilityTimer = setTimeout(() => {
            ref.current.style.visibility = "hidden";
          }, 1000);
          ref.current.style.opacity = 0;
        }
      }, 300);
    };
    window.addEventListener("scroll", showHide);
    return () => {
      window.removeEventListener("scroll", showHide);
      clearTimeout(visibilityTimer);
      clearTimeout(scrollTimer);
    };
  }, [after]);

  return (
    <div
      className="moveUpButton"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
      ref={ref}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      <FaArrowCircleUp size={28} color={"rgb(33, 99, 214)"}></FaArrowCircleUp>{" "}
      Move to the top
    </div>
  );
}

export default MoveUpButton;
