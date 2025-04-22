// dependencies to import
import { useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import slideLight from "../../assets/slide-trans-light.png";
import slide from "../../assets/slide-trans.png";

// services to import
import { startNewGame } from "../../services/game";

// components to import
import InitialFilmBox from "../../components/InitialFilmBox";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import InputBox from "../../components/InputBox";
import Timer from "../../components/Timer";
import ResultsModal from "../../components/ResultsModal";

import "./Game.css";

const GamePage = () => {
  const navigate = useNavigate(); // Using to navigate from game to home with leave game button
  // let [moviesPlayed, appendToMoviesPlayed] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
  const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
  const [timerResetTrigger, setTimerResetTrigger] = useState(0); 
  const [input, setInput] = useState("");

//     // Function to fetch the initial movie
//     const fetchInitialMovie = async () => {
//       try {
//         const data = await getInitialMovie();
//         if (data && data.id) {
//           appendToMoviesPlayed((prev) => [...prev, { movie: data }]); // Add the movie to the state
//         } else {
//           console.error("Invalid movie data:", data);
//         }
//       } catch (error) {
//         console.error("Error setting target movie:", error);
//       }
//     };
  
// // Fetch initial movie when the game starts (runs only once)
// useEffect(() => {
//   fetchInitialMovie();
// }, []); // Only runs once when the component mounts
  let [gameID, setGameID] = useState(0);
  let [moviesPlayed, setMoviesPlayed] = useState([]);
  let [searchParams] = useSearchParams();
  const gameMode = searchParams.get("mode") || "easy";

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const startGame = async () => {
      try {
        const data = await startNewGame();
        const initialMovie = data.targetMovie
        if (isMounted) {
          if (data && data.id) {
            setGameID(data.id);
            setMoviesPlayed(prev => [...prev, { movie: initialMovie }]);
          } else {
            console.error("Invalid movie data:", data);
          }
        }
      } catch (error) {
        console.error("Error starting new game:", error);
      }
    };

    startGame();

    return () => {
      isMounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, []);

  const targetMovie = useMemo(() => {
    return moviesPlayed[moviesPlayed.length - 1]?.movie;
  }, [moviesPlayed]);

  const onSuccessfulGuess = (movie, overlappingActors) => {
    console.log("onSuccessfulGuess");
    setMoviesPlayed((prev) => [...prev, { movie, overlappingActors }]);
    setScore((prevScore) => prevScore + 1);
    console.log("score: " + (score + 1));
  };

  // Resets timer when guess is made
  const handleGuessMade = (guess) => {
    setInput(guess); // store the guess
    setTimerResetTrigger((prev) => prev + 1); // trigger timer reset
  };
  
  // Function called when 'Play Again' button is clicked on ResultsModal
  const playAgain = () => {
    console.log("play again button clicked");
    window.location.reload();
    // setIsGameOver(false); // Resets game-over state
    // setScore(0); // Resets score to 0
    // appendToMoviesPlayed([]); // Clears films
    // setTimerResetTrigger((prev) => prev + 1); // Triggers reset timer
    // fetchInitialMovie();
  }
    // Function called when 'Leave Game' button is clicked on ResultsModal
    const leaveGame = () => {
      navigate("/");
    }

  const handleTimeUp = () => {
    setIsGameOver(true); // Change to ResultsModal later
  };

  const slides = [];
  for (let i = 0; i < 2; i++) {
    slides.push(<img src={slide} alt="slide" className="slide"></img>);
  }

  return (
    <div className="page-container">
      <Header />
      <h1>Enter your guess here</h1>
      <Timer
          resetTrigger={timerResetTrigger}
          onTimeUp={handleTimeUp}
        />
      <Header gameMode={gameMode} />
      <div className="game-content">
        <InputBox
          targetMovie={targetMovie}
          onSuccessfulGuess={onSuccessfulGuess}
          onGuessMade={handleGuessMade}
        />
        <div className="film-box-container">
          {moviesPlayed.map(({ movie, overlappingActors }, index) => (
            <>
              <InitialFilmBox
                key={index}
                movie={movie}
                overlappingActors={overlappingActors}
                gameMode={gameMode}
                isInitialFilm={index === 0}
              />
              {index === moviesPlayed.length - 1 || <div>{slides}</div>}
            </>
          ))}
        </div>
      </div>
      <Footer />
      <ResultsModal 
          isOpen={isGameOver}
          playAgain={playAgain}
          leaveGame={leaveGame}
          score={score}
        />
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


// // dependencies to import
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// // services to import
// import { getInitialMovie } from "../../services/movies";

// // components to import
// import InitialFilmBox from "../../components/InitialFilmBox";
// import Header from "../../components/header";
// import Footer from "../../components/Footer";
// import InputBox from "../../components/InputBox";
// import Timer from "../../components/Timer";
// import ResultsModal from "../../components/ResultsModal";

// import "./Game.css";

// const GamePage = () => {
//   const navigate = useNavigate(); // Using to navigate from game to home with leave game button
//   const [moviesPlayed, appendToMoviesPlayed] = useState([]);
//   const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
//   const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
//   const [timerResetTrigger, setTimerResetTrigger] = useState(0); 
//   const [input, setInput] = useState("");

//   // Function to fetch the initial movie
//   const fetchInitialMovie = async () => {
//     try {
//       const data = await getInitialMovie();
//       if (data && data.id) {
//         appendToMoviesPlayed((prev) => [...prev, { movie: data }]); // Add the movie to the state
//       } else {
//         console.error("Invalid movie data:", data);
//       }
//     } catch (error) {
//       console.error("Error setting target movie:", error);
//     }
//   };

//   // Fetch initial movie when the game starts (runs only once when component mounts)
//   useEffect(() => {
//     if (moviesPlayed.length === 0) { 
//       fetchInitialMovie();
//     }
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   // Define onSuccessfulGuess function
//   const onSuccessfulGuess = (movie, overlappingActors) => {
//     // This will add a new movie and its overlapping actors to the state
//     appendToMoviesPlayed((prev) => [...prev, { movie, overlappingActors }]);
//     setScore((prevScore) => prevScore + 1); // Increase score when a correct guess is made
//   };

//   // Define handleGuessMade function
//   const handleGuessMade = (guess) => {
//     setInput(guess); // Store the guess in the input state
//     setTimerResetTrigger((prev) => prev + 1); // Trigger timer reset (by changing the resetTrigger value)
//   };

//   // Function called when 'Play Again' button is clicked on ResultsModal
//   const playAgain = () => {
//     console.log("play again button clicked");
//     setIsGameOver(false); // Resets game-over state
//     setScore(0); // Resets score to 0
//     appendToMoviesPlayed([]); // Clears films
//     setTimerResetTrigger((prev) => prev + 1); // Triggers reset timer
//     fetchInitialMovie(); // Re-fetch the initial movie to trigger the film box display
//   };

//   // Handle timer running out and showing the results modal
//   const handleTimeUp = () => {
//     setIsGameOver(true); // Change to ResultsModal later
//   };

//   // Safely define targetMovie, defaulting to undefined if no movie exists in the array
//   const targetMovie = useMemo(() => {
//     return moviesPlayed.length > 0 ? moviesPlayed[moviesPlayed.length - 1]?.movie : undefined;
//   }, [moviesPlayed]);

//   return (
//     <div className="page-container">
//       <Header />
//       <h1>Enter your guess here</h1>
//       <Timer resetTrigger={timerResetTrigger} onTimeUp={handleTimeUp} />
//       <div className="game-content">
//         {/* Only render InputBox if targetMovie is available */}
//         {targetMovie && (
//           <InputBox
//             targetMovie={targetMovie}
//             onSuccessfulGuess={onSuccessfulGuess} // Pass the function as a prop
//             onGuessMade={handleGuessMade} // Pass handleGuessMade as a prop
//           />
//         )}
//         <div className="film-box-container">
//           {moviesPlayed.map(({ movie, overlappingActors }, index) => (
//             <InitialFilmBox
//               key={index} // Use movie.id as the key if available
//               movie={movie}
//               overlappingActors={overlappingActors}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//       <ResultsModal 
//         isOpen={isGameOver}
//         playAgain={playAgain}
//         score={score}
//       />
//     </div>
//   );
// };

// export default GamePage;