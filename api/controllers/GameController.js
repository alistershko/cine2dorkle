const { getRandomMovieLogic } = require( "./tmdb.js");

const startNewGame = async (req, res) => {
    // Logic to start a new game
    class Game {
        constructor() {
            this.currentMovie = null;
        }
    }
    const newGame = new Game();
    newGame.currentMovie = await getRandomMovieLogic();

    try{
        res.json({ message: "New game started", startingMovie: newGame.currentMovie });
    }
    catch (error) {
        console.error("Error starting new game:", error);
        res.status(500).json({ error: "Failed to start new game" });
    }
};


const gameController = {
    startNewGame: startNewGame,
};

module.exports = gameController;