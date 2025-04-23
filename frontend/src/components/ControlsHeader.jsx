import React from "react";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";

const ControlsHeader = ({ gameMode, isMinimized }) => {
  return (
    <div className={`controls-header-container`}>
      <div className="toggles-container">
        <ThemeToggle />
        <SoundToggle />
      </div>

      {gameMode && (
        <div className={`game-mode-indicator ${gameMode}`}>
          {gameMode === "easy" ? "Easy Mode" : "Hard Mode"}
        </div>
      )}
    </div>
  );
};

export default ControlsHeader;
