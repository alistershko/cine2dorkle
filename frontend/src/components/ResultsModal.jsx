import PlayAgainButton from "./PlayAgainButton";
import LeaveGameButton from "./LeaveGameButton";
import "../css/ResultsModal.css";
import React, { useState, useEffect } from "react";

const ResultsModal = ({ isOpen, playAgain, leaveGame, score }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => setIsModalOpen(false); 

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay open-modal">
          <div className="modal-container">
            <h2>Game Over</h2>
            <p>Your Score: {score}</p>
            <PlayAgainButton onClick={playAgain} />
            <LeaveGameButton onClick={leaveGame} />
            <button className="modal-close-button" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsModal;
