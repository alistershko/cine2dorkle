// dependencies to import
import { useState, useEffect } from "react";

// services to import
import { getInitialMovie } from "../../services/movies";
import HowTo from "../../components/HowTo";

// components to import
import InitialFilmBox from "../../components/InitialFilmBox";
import Header from "../../components/header";
import Footer from "../../components/Footer";

const GamePage = () => {
  let [gameState, setGameState] = useState("idle");
  // let [gameTimer, setGameTimer] = useState(0);
  let [targetMovie, setTargetMovie] = useState();
  let [guessedMovie, setGuessedMovie] = useState();
  let [moviesPlayed, appendToMoviesPlayed] = useState([]);
  let [linksPlayed, setLinksPlayed] = useState([]);
  let [input, setInput] = useState("");

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchInitialMovie = async () => {
      try {
        const data = await getInitialMovie();
        if (isMounted) {
          if (data && data.id) {
            setTargetMovie(data);
            appendToMoviesPlayed((prev) => [...prev, data.id]);
          } else {
            console.error("Invalid movie data:", data);
          }
        }
      } catch (error) {
        console.error("Error setting target movie:", error);
      }
    };

    fetchInitialMovie();

    return () => {
      isMounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, []);

  return (
    <div>
      <Header />
      <h1>Enter your guess here</h1>
      <form>
        <input
          id="guessed_movie"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div className="film-box-container">
          <InitialFilmBox movie={targetMovie} />
        </div>
      </form>
      <Footer />
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
