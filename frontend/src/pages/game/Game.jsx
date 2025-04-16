// dependencies to import
import { useState, useEffect } from "react";

// services to import
// components to import

export const GamePage = () => {
  let [gameState, setGameState] = useState(["idle"])
  let [gameTimer, setGetTimer] = useState(0)
  let [targetMovie, setTargetMovie] = useState([])
  let [guessedMovie, setGuessedMovie] = useState([])
  let [moviesPlayed, setMoviesPlayed] = useState([])
  let [linksPlayed, setLinksPlayed] = useState([])
  let [input, setInput] = useState("")

  useEffect(() => {
    if (gameState === "active") {
      setGetTimer()
    }
  }, [gameState]);
    
  return (
    <h1>Hello</h1>
  );
};

export default GamePage;
