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
      className="bg-gray-100 dark:bg-gray-700 rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
    >
      {theme === "dark" ? <img src={sunPath}></img> : <img src={moonPath}></img>}
    </button>
  );
};

export default ThemeToggle;
