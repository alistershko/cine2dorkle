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
  const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
  const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
  const [timerResetTrigger, setTimerResetTrigger] = useState(0); 
  const [input, setInput] = useState("");
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
              {index === moviesPlayed.length ||
                <div>
                  {(!overlappingActors || overlappingActors.length === 0) || overlappingActors.map((actorName) => (
                    <div className="link-box">
                      <div className="link-box-item">{actorName}</div>
                      <div className="link-box-item"><img src={slide} alt="slide" className="slide"></img></div>
                      <div className="link-box-item">PUT X X X HERE</div>
                    </div>
                  ))}
                </div>
              }
              <InitialFilmBox
                key={index}
                movie={movie}
                overlappingActors={overlappingActors}
                gameMode={gameMode}
                isInitialFilm={index === 0}
              />
              
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