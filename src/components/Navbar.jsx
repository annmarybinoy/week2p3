import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  return (
    <nav className="navbar navbar-custom sticky-top">
      <Link className="navbar-brand" to="/">
        <i className="bi bi-music-note-list"></i>Spotify Like
      </Link>
      <div className="navbar-search">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={handleKeyPress}
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          onClick={fetchMusicData}
          className="btn btn-outline-success"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;