import sunPath from "../assets/sun-red-gold-lrg.png";
import moonPath from "../assets/moon-red-gold-lrg.png";
import React, { useState, useEffect, useCallback } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Use useCallback to prevent unnecessary re-creation
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

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
