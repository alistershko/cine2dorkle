const { getRandomMovieLogic } = require( "./tmdb.js");

const activeGames = new Map(); // Store active games in memory

// Game class definition
class Game {
  constructor() {
    this.id = null; // Will eventually set this using a unique random value using uuid, right now it's just 1 for development
    this.players = []; // Need to append playerIDs when that feature is implemented
    this.currentPlayer = null; // Need to set this to a random playerID from players when that feature is implemented
    this.gameStatus = "waiting"; // Will change to active when a game starts, and to ended when time runs out
    this.time = 0; // Will be set to 20 seconds when a game starts
    this.targetMovie = null; // Need to set this to a random movie from the API
    this.movieInput = null; // Where an input movie will be stored when a player sends a movie title from the frontend
    this.movieIDsPlayed = []; // Movie IDs that have been played
    this.linkIDsPlayed = []; // Cast member IDs that have been played
    }
}

const startNewGame = async (req, res) => {
  // Create initialise a new game instance
  const newGame = new Game();

  // Set the new game state properties
  newGame.id = 1 // This will be set to a unique random value using uuid later, right now it's just 1 for development
  newGame.gameStatus = "active";
  newGame.time = 20;
  newGame.targetMovie = await getRandomMovieLogic();
  newGame.movieIDsPlayed.push(newGame.targetMovie.id);
  
  // Store the game in our map
  activeGames.set(newGame.id, newGame);

  try{
      res.json(newGame);
  }
  catch (error) {
      console.error("Error starting new game:", error);
      res.status(500).json({ error: "Failed to start new game" });
  }
};

// Helper function to get a specific game
const getGameObject = (req, res) => {
  const gameId = req.params.id;
  console.log(`Looking for game with ID: ${gameId}`);
  console.log(`Available games: ${Array.from(activeGames.keys())}`);

  const game = activeGames.get(Number(gameId));
  
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  
  res.json(game);
};

const gameController = {
  activeGames,
  startNewGame: startNewGame,
  getGameObject: getGameObject,
};

module.exports = gameController;