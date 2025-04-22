import React from "react";

const PlayAgainButton = ({ onClick }) => {
  return (
    <button className="modal-btn" onClick={onClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;
