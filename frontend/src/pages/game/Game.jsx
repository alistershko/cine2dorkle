// dependencies to import
import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import slideLight from "../../assets/slide-trans-light.png";
import slide from "../../assets/slide-trans.png";

// services to import
import { startNewGame } from "../../services/game";
import { playSound, isSoundEnabled } from "../../services/sound";
import drumroll from "../../assets/Audio/drumroll.mp3";
import quirkyJazz from "../../assets/Audio/QuirkyJazz.mp3"; // Import the jazz audio

// components to import
import InitialFilmBox from "../../components/InitialFilmBox";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import InputBox from "../../components/InputBox";
import Timer from "../../components/Timer";
import ResultsModal from "../../components/ResultsModal";
import ControlsHeader from "../../components/ControlsHeader";
import tempHeaderPath from "../../assets/temp-header.png";

import "./Game.css";

const GamePage = () => {
  const navigate = useNavigate(); // Using to navigate from game to home with leave game button
  const [isGameOver, setIsGameOver] = useState(false); // Tracks timer state
  const [score, setScore] = useState(0); // Example score (need to reset this once we have score logic)
  const [timerResetTrigger, setTimerResetTrigger] = useState(0);
  const [input, setInput] = useState("");
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  let [gameID, setGameID] = useState(0);
  let [moviesPlayed, setMoviesPlayed] = useState([]);
  let [searchParams] = useSearchParams();
  const gameMode = searchParams.get("mode") || "easy";
  const backgroundMusicRef = useRef(null);
  const [seconds, setSeconds] = useState(gameMode === "easy" ? 30 : 20); // Track time for fading music

  // Initialize background music when component mounts
  useEffect(() => {
    if (isSoundEnabled()) {
      backgroundMusicRef.current = new Audio(quirkyJazz);
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.4; // Start at 40% volume
      backgroundMusicRef.current
        .play()
        .catch((e) => console.log("Background music autoplay prevented:", e));
    }

    // Event listener for sound toggle changes
    const handleSoundToggle = (event) => {
      const soundEnabled = event.detail?.soundEnabled ?? isSoundEnabled();

      if (soundEnabled && backgroundMusicRef.current) {
        backgroundMusicRef.current
          .play()
          .catch((e) => console.log("Play prevented:", e));
      } else if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };

    document.addEventListener("soundSettingChanged", handleSoundToggle);

    // Clean up when component unmounts
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      document.removeEventListener("soundSettingChanged", handleSoundToggle);
    };
  }, []);

  // Handle timer updates for fading music
  const handleTimerUpdate = (currentSeconds) => {
    setSeconds(currentSeconds);

    // When countdown reaches 5 seconds, reduce volume to 50%
    if (currentSeconds === 5 && backgroundMusicRef.current) {
      // Reduce volume to 50% instead of gradually fading out
      backgroundMusicRef.current.volume = 0.2; // Half of your initial 0.4 volume
    }

    // For 8-6 seconds, maintain normal volume
    else if (
      currentSeconds <= 8 &&
      currentSeconds > 5 &&
      backgroundMusicRef.current
    ) {
      // Keep normal volume
      backgroundMusicRef.current.volume = 0.4;
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const startGame = async () => {
      try {
        const data = await startNewGame();
        const initialMovie = data.targetMovie;
        if (isMounted) {
          if (data && data.id) {
            setGameID(data.id);
            setMoviesPlayed((prev) => [...prev, { movie: initialMovie }]);
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
    setMoviesPlayed((prev) => [...prev, { movie, overlappingActors }]);
    setScore((prevScore) => prevScore + 1);
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
  };
  // Function called when 'Leave Game' button is clicked on ResultsModal
  const leaveGame = () => {
    navigate("/");
  };

  const handleTimeUp = () => {
    if (!soundPlayed) {
      // First, set timer as finished to disable input
      setTimerFinished(true);

      // Temporarily pause background music
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();

        // Play drumroll sound when game ends
        const drumrollSound = new Audio(drumroll);

        // Play the drumroll if sound is enabled
        if (isSoundEnabled()) {
          drumrollSound
            .play()
            .catch((e) => console.log("Drumroll play prevented:", e));
        }

        setSoundPlayed(true);

        // Short delay to let drumroll play before showing results
        setTimeout(() => {
          setIsGameOver(true);

          // Restart background music immediately when results modal appears
          if (isSoundEnabled() && backgroundMusicRef.current) {
            // Reset to beginning of track
            backgroundMusicRef.current.currentTime = 0;
            backgroundMusicRef.current.volume = 0.3; // Lower volume for results screen
            backgroundMusicRef.current
              .play()
              .catch((e) => console.log("Restart music prevented:", e));
          }
        }, 2000); // 2 second delay for the drumroll
      }
    }
  };

  const slides = [];
  for (let i = 0; i < 2; i++) {
    slides.push(<img src={slide} alt="slide" className="slide"></img>);
  }

  return (
    <div className="page-container">
      <div className="temp-header">
        <img
          src={tempHeaderPath}
          alt="Double Feature Logo"
          className="temp-header-img"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ControlsHeader gameMode={gameMode} />
      <Timer
        resetTrigger={timerResetTrigger}
        onTimeUp={handleTimeUp}
        onTimerUpdate={handleTimerUpdate}
        gameMode={gameMode} // Pass the game mode to Timer
      />
      <div className="game-content">
        {/* Only show InputBox if game is not over AND timer is not finished */}
        {!isGameOver && !timerFinished && (
          <InputBox
            targetMovie={targetMovie}
            onSuccessfulGuess={onSuccessfulGuess}
            onGuessMade={handleGuessMade}
          />
        )}
        {/* Show a message when timer is finished but results aren't shown yet */}
        {timerFinished && !isGameOver}
        <div className="film-box-container">
          {moviesPlayed.map(({ movie, overlappingActors }, index) => (
            <React.Fragment key={index}>
              {index === moviesPlayed.length || (
                <div>
                  {!overlappingActors ||
                    overlappingActors.length === 0 ||
                    [...overlappingActors]
                      .sort((a, b) => b.usageCount - a.usageCount) // Sort in descending order
                      .map((actor, actorIndex) => (
                        <div className="link-box" key={actorIndex}>
                          <div className="link-box-item left">{actor.name}</div>
                          <div className="link-box-item middle">
                            <img src={slide} alt="slide" className="slide" />
                          </div>
                          <div className="link-box-item right">
                            {"x".repeat(actor.usageCount)}
                          </div>
                        </div>
                      ))}
                </div>
              )}
              <InitialFilmBox
                key={index}
                movie={movie}
                overlappingActors={overlappingActors}
                gameMode={gameMode}
                isInitialFilm={index === 0}
              />
            </React.Fragment>
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
