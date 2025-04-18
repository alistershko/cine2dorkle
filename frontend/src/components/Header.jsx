import React, { useState, useEffect } from "react";
import { DoubleFeatureLogo } from "./DoubleFeatureLogo";
import ThemeToggle from "./ThemeToggle";
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
    <div className={`header ${isMinimized ? "minimized" : ""}`}>
      <DoubleFeatureLogo />
      <ThemeToggle />
    </div>
  );
}

export default Header;
