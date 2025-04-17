// Create a game model to create objects from
class GameModel {
  constructor(id, players, currentPlayer, status, time, targetMovie, movieInput, guessedMovie, moviesPlayed, linksPlayed) {
    // Initialize the game model with default values
    this.id = 1;
    this.players = [];
    this.currentPlayer = "";
    this.status = "waiting";
    this.time = 0;
    this.targetMovie = [];
    this.movieInput = "";
    this.guessedMovie = [];
    this.moviesPlayed = [];
    this.linksPlayed = [];
  }
};

// Initialize the game model with default values
// GameModel.id = 1;
// GameModel.players = [];
// GameModel.currentPlayer = "";
// GameModel.status = "waiting";
// GameModel.time = 0;
// GameModel.targetMovie = null;
// GameModel.guessedMovie = null;
// GameModel.moviesPlayed = [];
// GameModel.linksPlayed = [];
// GameModel.movieInput = "";

export default GameModel;
