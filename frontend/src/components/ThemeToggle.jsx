import React, { useState, useEffect } from "react";
import sunPath from "../assets/sun-red-gold-lrg.png";
import moonPath from "../assets/moon-red-gold-lrg.png";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.theme || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="toggle-btn"
    >
      {theme === "dark" ? <img src={moonPath}></img> : <img src={sunPath}></img>}
    </button>
  );
};

export default ThemeToggle;
