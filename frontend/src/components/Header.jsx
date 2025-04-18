// import "../css/Header.css";
// import logo from "../assets/example-logo.png";
// import title from "../assets/Double-Feature.png";

// export const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo-container">
//         <img src={logo} alt="Double Feature Logo" className="logo" />
//         <img
//           src={title}
//           alt="Double Feature title"
//           className="title-image"
//         ></img>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { useState, useEffect } from "react";
import { DoubleFeatureLogo } from "./DoubleFeatureLogo";
import "../css/Header.css";

function Header() {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsMinimized(true);
        document.body.style.paddingTop = "var(--navbar-minimized-height)";
      } else {
        setIsMinimized(false);
        document.body.style.paddingTop = "var(--navbar-height)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.paddingTop = "var(--navbar-height)";
    };
  }, []);

  return (
    <div data-testid="header" className={`header ${isMinimized ? "minimized" : ""}`}>
      <DoubleFeatureLogo />
    </div>
  );
}

export default Header;
