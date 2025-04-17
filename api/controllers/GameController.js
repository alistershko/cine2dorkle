import GameModel from "../models/GameModel.js";
import { getRandomMovie } from "./tmdb.js";

const startNewGame = (req, res) => {
    const newGame = new GameModel();
    
    newGame.targetMovie = getRandomMovie();
    
    res.json({ message: "New game started", game: gameModel });
}


const gameController = {
    startNewGame: startNewGame,
};

module.exports = gameController;