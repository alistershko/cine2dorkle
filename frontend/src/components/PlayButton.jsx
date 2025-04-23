import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/PlayButton.css";

const PlayButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const gameMode = localStorage.getItem("gameMode") || "easy";
    navigate(`/game?mode=${gameMode}`);
  };

  return (
    <button onClick={handleClick} className="playButton">
      Play
    </button>
  );
};

export default PlayButton;
