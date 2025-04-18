import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
