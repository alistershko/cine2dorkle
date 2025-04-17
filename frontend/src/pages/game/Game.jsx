// dependencies to import
import { useState, useEffect } from "react";

// services to import
import { getInitialMovie } from "../../services/movies";

// components to import

export const GamePage = () => {
  let [gameState, setGameState] = useState("idle");
  // let [gameTimer, setGameTimer] = useState(0);
  let [targetMovie, setTargetMovie] = useState();
  let [guessedMovie, setGuessedMovie] = useState();
  let [moviesPlayed, appendToMoviesPlayed] = useState([]);
  let [linksPlayed, setLinksPlayed] = useState([]);
  let [input, setInput] = useState("");

  useEffect(() => {

    // Fetch the popular movie to set as the target movie before starting the game
    // and append its id to the movies played list
    getInitialMovie()
      .then((data) => {
        setTargetMovie(data);
        appendToMoviesPlayed(data.id);
      })
      .catch((error) => {
        console.error("Error setting target movie:", error);
      });

    // Set the game state to "active"
    setGameState("active");

    // This next function will be called when the user submits a movie title as their guess


  }, []);
    
  return (
    <div>
      <h1>Enter your guess here</h1>
      <form>
        <input id="guessed_movie" value={input} onChange={(e) => setInput(e.target.value)}></input>
      </form>
      <h1>Played movies:</h1>
      <list>
        {moviesPlayed.map((movie, index) => (
          <li key={index}>
            {movie}
          </li>
        ))}
      </list>
    </div>
  );
};

export default GamePage;

// import Header from "../../components/header";
// import Footer from "../../components/Footer";
// import ResultsModal from "../../components/ResultsModal";
// import Timer from "../../components/Timer"
// import React, { useState } from "react";

// import "./Game.css";

// export const Game = () => {
//   const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
//   const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
  
//   // Function called when 'Play Again' button is clicked on ResultsModal
//   const playAgain = () => {
//     setIsGameOver(false); // Resets game-over state
//     setScore(0); // Resets score to 0 
//   }

//   const handleTimeUp = () => {
//     setIsGameOver(true); // Change to ResultsModal later
//   };
  
//   return (
//     <div className="game-page">
//       <Header />
//       <div className="game-content">
//         <h1>Welcome to the Game Page!</h1>
//         {!isGameOver && <Timer onTimeUp={handleTimeUp} />}
//         {isGameOver && (
//           <ResultsModal score={score} playAgain={playAgain} />
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };
