import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import useKeyPress from "../customHook/useKeyPress";

function AutoSuggestion({ suggestions, type, cursor, setCursor }) {
  const autocompleteWrapper = useRef(null);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [moveBy, setMoveBy] = useState("ArrowDown");
  const history = useHistory();

  useEffect(() => {
    if (suggestions && suggestions.length && downPress) {
      setCursor((prevState) =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      );
      setMoveBy("ArrowDown");
    }
  }, [downPress, suggestions, setCursor]);

  useEffect(() => {
    if (suggestions && suggestions.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
    setMoveBy("ArrowUp");
  }, [upPress, suggestions, setCursor]);

  useEffect(() => {
    if (moveBy === "Scroll" || cursor < 0) {
      return;
    }

    const scrollableYPos = autocompleteWrapper.current.getBoundingClientRect()
      .top;
    const selectedYPos = autocompleteWrapper.current.childNodes[
      cursor
    ].getBoundingClientRect().top;

    const selectedRelativeYPos =
      autocompleteWrapper.current.childNodes[cursor].offsetTop;

    if (moveBy === "ArrowDown") {
      if (selectedYPos - scrollableYPos > 160) {
        autocompleteWrapper.current.scrollTop = selectedRelativeYPos;
      }
    }
    if (moveBy === "ArrowUp") {
      if (selectedYPos - scrollableYPos < 24) {
        autocompleteWrapper.current.scrollTop = selectedRelativeYPos - 168;
      }
    }
  }, [cursor, moveBy]);

  useEffect(() => {
    if (suggestions && suggestions.length && enterPress && cursor >= 0) {
      history.push(`/${type}/detail/${suggestions[cursor].id}`);
    }
  }, [cursor, enterPress, suggestions, history, type]);

  return (
    <ul
      className="autocompleteWrapper"
      ref={autocompleteWrapper}
      onScroll={() => {
        setMoveBy("Scroll");
      }}
    >
      {suggestions.map((suggestion, i) => (
        <li key={suggestion.id}>
          <Link
            to={`/${type}/detail/${suggestion.id}`}
            className={`autocomplete ${i === cursor ? "active" : ""}`}
            onMouseEnter={() => setCursor(i)}
          >
            {type === "movie" && suggestion.title}
            {(type === "tv" || type === "person") && suggestion.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default AutoSuggestion;
