import React from "react";

const ResultsModal = ({ playAgain, score }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Game Over</h2>
                <p>Your Score: {score}</p>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
};

export default ResultsModal;