// Create a game model to create objects from
const GameModel = {};

// Initialize the game model with default values
GameModel.id = 1;
GameModel.players = [];
GameModel.currentPlayer = "";
GameModel.status = "waiting";
GameModel.time = 0;
GameModel.targetMovie = [];
GameModel.movieInput = "";
GameModel.guessedMovie = [];
GameModel.moviesPlayed = [];
GameModel.linksPlayed = [];

export default GameModel;
