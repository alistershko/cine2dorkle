import React from "react";
import "../css/Modal.css";

const ResultsModal = ({ isOpen, playAgain, score }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay open-modal">
            <div className="modal-container">
                <h2>Game Over</h2>
                <p>Your Score: {score}</p>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
};

export default ResultsModal;

// Code to add to GamePage.jsx

// const [showResults, setShowResults] = useState(false);

// when game ends:
// setShowResults(true);

// in render:
// <ResultsModal isOpen={showResults} score={score} playAgain={restartGameFunction} />
