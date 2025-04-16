import Header from "../../components/header";
import Footer from "../../components/Footer";
import ResultsModal from "../../components/ResultsModal";
import Timer from "../../components/Timer"
import React, { useState } from "react";

import "./Game.css";

export const Game = () => {
  const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
  const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
  
  // Function called when 'Play Again' button is clicked on ResultsModal
  const playAgain = () => {
    setIsGameOver(false); // Resets game-over state
    setScore(0); // Resets score to 0 
  }

  const handleTimeUp = () => {
    setIsGameOver(true); // Change to ResultsModal later
  };
  
  return (
    <div className="game-page">
      <Header />
      <div className="game-content">
        <h1>Welcome to the Game Page!</h1>
        {!isGameOver && <Timer onTimeUp={handleTimeUp} />}
        {isGameOver && (
          <ResultsModal score={score} playAgain={playAgain} />
        )}
      </div>
      <Footer />
    </div>
  );
};
