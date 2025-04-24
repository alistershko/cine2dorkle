import React from "react";
import tmdbLogo from "../assets/tmdb.svg";
import "../css/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <img src={tmdbLogo} alt="TMDB Logo" className="tmdbLogo-image" />
      </div>
    </div>
  );
};

export default Footer;
