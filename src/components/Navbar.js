import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdCloud } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
      <>
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">
            <MdCloud className="mr-2" />
            Cloud Movie
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "2px solid white",
            }}
          >
            <GiHamburgerMenu />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item`}>
                <Link
                  className={`nav-link ${
                    /^\/movie\//.test(pathname) ? "active" : null
                  }`}
                  to="/movie/search"
                >
                  Movies
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link
                  className={`nav-link ${
                    /^\/tv\//.test(pathname) ? "active" : null
                  }`}
                  to="/tv/search"
                >
                  TV
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link
                  className={`nav-link ${
                    /^\/person\//.test(pathname) ? "active" : null
                  }`}
                  to="/person/search"
                >
                  People
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    </IconContext.Provider>
  );
}

export default Navbar;
