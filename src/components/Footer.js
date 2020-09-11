import React from "react";
import { FaReact } from "react-icons/fa";

function Footer() {
  return (
    <div id="footer">
      <span>Powered by</span>
      <a href="https://www.themoviedb.org/documentation/api">
        <i>TMDB API</i>
      </a>
      <span>&</span>
      <a href="https://reactjs.org/">
        <i>React</i> <FaReact />
      </a>
    </div>
  );
}

export default Footer;
