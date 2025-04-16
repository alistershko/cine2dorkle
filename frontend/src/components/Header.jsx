import "../css/Header.css";
import logo from "../assets/example-logo.png";
import title from "../assets/Double-Feature.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Double Feature Logo" className="logo" />
        <img
          src={title}
          alt="Double Feature title"
          className="title-image"
        ></img>
      </div>
    </header>
  );
};

export default Header;
