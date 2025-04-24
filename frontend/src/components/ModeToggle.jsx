import React, { useState, useEffect, useRef } from "react";
import "../css/ModeToggle.css";

const ModeToggle = ({ onModeChange }) => {
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem("gameMode") === "hard"
  );

  // Use a ref to track if this is the first render
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Update localStorage when mode changes
    localStorage.setItem("gameMode", isHardMode ? "hard" : "easy");

    // Call the callback if provided, but not on the initial render
    if (onModeChange && !isInitialRender.current) {
      onModeChange(isHardMode ? "hard" : "easy");
    }

    // After the first render, set isInitialRender to false
    isInitialRender.current = false;
  }, [isHardMode, onModeChange]);

  return (
    <div className="mode-toggle-container" data-testid="mode-toggle-container">
      <span className={`mode-label ${!isHardMode ? "active" : ""}`}>
        Easy Mode
      </span>
      <label className="switch">
        <input
          type="checkbox"
          checked={isHardMode}
          onChange={() => setIsHardMode(!isHardMode)}
        />
        <span className="slider round"></span>
      </label>
      <span className={`mode-label ${isHardMode ? "active" : ""}`}>
        Hard Mode
      </span>
    </div>
  );
};

export default ModeToggle;
