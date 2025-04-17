import tmdbLogo from "../assets/tmdb.svg";
import "../css/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
        <img src={tmdbLogo} alt="TMDB Logo" className="tmdbLogo-image"></img>
      </p>
    </div>
  );
};

export default Footer;
