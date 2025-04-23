import { useState, useEffect } from "react";
import { DoubleFeatureLogo } from "./DoubleFeatureLogo";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import "../css/Header.css";

function Header({ gameMode }) {
  // Add gameMode as a prop
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

      <div className="header-right">
        <ThemeToggle />
        <SoundToggle />
        <br />
        {gameMode && (
          <div className={`game-mode-indicator ${gameMode}`}>
            {gameMode === "easy" ? "Easy Mode" : "Hard Mode"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
