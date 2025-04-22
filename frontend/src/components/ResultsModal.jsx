// import React from "react";
import PlayAgainButton from "./PlayAgainButton";
import LeaveGameButton from "./LeaveGameButton";
import "../css/ResultsModal.css";
import React, { useState } from "react";
// import "../css/Modal.css";

const ResultsModal = ({ isOpen, playAgain, leaveGame, score }) => {

    return (
        <div>
        {isOpen && (
            <div className="modal-overlay open-modal">
            <div className="modal-container">
                <h2>Game Over</h2>
                <p>Your Score: {score}</p>
                <PlayAgainButton onClick={playAgain} />
                <LeaveGameButton onClick={leaveGame} />
            </div>
            </div>
        )}
        </div>
    );
};

export default ResultsModal;
