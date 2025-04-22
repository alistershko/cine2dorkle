// dependencies to import
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// services to import
import { getInitialMovie } from "../../services/movies";

// components to import
import InitialFilmBox from "../../components/InitialFilmBox";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import InputBox from "../../components/InputBox";
import Timer from "../../components/Timer";

import "./Game.css";

const GamePage = () => {
  let [moviesPlayed, appendToMoviesPlayed] = useState([]);
  let [searchParams] = useSearchParams();
  const gameMode = searchParams.get("mode") || "easy";

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted
    const fetchInitialMovie = async () => {
      try {
        const data = await getInitialMovie();
        if (isMounted) {
          if (data && data.id) {
            appendToMoviesPlayed((prev) => [...prev, { movie: data }]);
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
      isMounted = false; // Cleanup to prevent setting state on unmounted component - This prevents a weird glitch in development mode
    };
  }, []);

  const targetMovie = useMemo(() => {
    return moviesPlayed[moviesPlayed.length - 1]?.movie;
  }, [moviesPlayed]);

  const onSuccessfulGuess = (movie, overlappingActors) => {
    appendToMoviesPlayed((prev) => [...prev, { movie, overlappingActors }]);
  };

  return (
    <div className="page-container">
      <Header gameMode={gameMode} />
      <div className="game-content">
        <InputBox
          targetMovie={targetMovie}
          onSuccessfulGuess={onSuccessfulGuess}
        />
        <div className="film-box-container">
          {moviesPlayed.map(({ movie, overlappingActors }, index) => (
            <InitialFilmBox
              key={index}
              movie={movie}
              overlappingActors={overlappingActors}
              gameMode={gameMode}
              isInitialFilm={index === 0} // The first film (index 0) is the initial film
            />
          ))}
        </div>
      </div>
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
