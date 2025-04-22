import { useState, useEffect } from "react";
import "../css/ModeToggle.css";

const ModeToggle = () => {
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem("gameMode") === "hard"
  );

  useEffect(() => {
    // Update localStorage when mode changes
    localStorage.setItem("gameMode", isHardMode ? "hard" : "easy");
  }, [isHardMode]);

  return (
    <div className="mode-toggle-container">
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
