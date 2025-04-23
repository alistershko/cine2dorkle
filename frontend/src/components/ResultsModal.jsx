import React, { useState, useEffect } from "react";
import PlayAgainButton from "./PlayAgainButton";
import LeaveGameButton from "./LeaveGameButton";
import "../css/ResultsModal.css";

const ResultsModal = ({ isOpen, playAgain, leaveGame, score }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Short delay to sync with drumroll
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay open-modal ${isVisible ? "visible" : ""}`}>
      <div className={`modal-container ${isVisible ? "visible" : ""}`}>
        <h2 className="modal-h2">Game Over</h2>
        <p className="modal-score">Your Score: {score}</p>
        <PlayAgainButton onClick={playAgain} />
        <LeaveGameButton onClick={leaveGame} />
        <button
          className="modal-close-button"
          onClick={() => setIsVisible(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ResultsModal;
