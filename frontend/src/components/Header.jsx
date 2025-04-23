import { useState, useEffect } from "react";
import { DoubleFeatureLogo } from "./DoubleFeatureLogo";
import "../css/Header.css";

function Header({ gameMode }) {
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
    <div
      data-testid="header"
      className={`header ${isMinimized ? "minimized" : ""}`}
    >
      <DoubleFeatureLogo />
    </div>
  );
}

export default Header;
