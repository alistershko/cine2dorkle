import React from "react";
import "../css/PlayAgainButton.css";

const PlayAgainButton = ({ onClick }) => {
  return (
    <button className="playagain-btn" onClick={onClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;
