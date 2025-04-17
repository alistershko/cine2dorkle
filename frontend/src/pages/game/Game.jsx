// dependencies to import
import { useState, useEffect } from "react";

// services to import
import { getInitialMovie } from "../../services/movies";

// components to import
import FilmBox from "../../components/FilmBox";

const GamePage = () => {
  let [gameState, setGameState] = useState("idle");
  // let [gameTimer, setGameTimer] = useState(0);
  let [targetMovie, setTargetMovie] = useState();
  let [guessedMovie, setGuessedMovie] = useState();
  let [moviesPlayed, appendToMoviesPlayed] = useState([]);
  let [linksPlayed, setLinksPlayed] = useState([]);
  let [input, setInput] = useState("");

  useEffect(() => {
    const fetchInitialMovie = async () => {
      try {
        const data = await getInitialMovie(); // Wait for the movie data
        console.log("Data received from getInitialMovie:", data); // Debugging log
        if (data && data.id) {
          setTargetMovie(data); // Set the target movie
          appendToMoviesPlayed((prev) => [...prev, data.id]);
          // Append the movie ID to the played list
        } else {
          console.error("Invalid movie data:", data);
        }
      } catch (error) {
        console.error("Error setting target movie:", error);
      }
    };

    fetchInitialMovie(); // Call the async function

    setGameState("active"); // Set the game state to active
  }, []);

  return (
    <div>
      <h1>Enter your guess here</h1>
      <form>
        <input
          id="guessed_movie"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div>
          <FilmBox movie={targetMovie} />
        </div>
      </form>
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
