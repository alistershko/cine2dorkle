const { getRandomMovieLogic } = require("./tmdb.js");
const { fetchMoviesByNameAndReleaseYear, fetchCastFromMovieId } = require("../services/tmdb");

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
    this.linkIDsPlayed = {}; // Cast member IDs that have been played, and how many times they have been played
  }
}

const startNewGame = async (req, res) => {
  // Create initialise a new game instance
  const newGame = new Game();

  // Set the new game state properties
  newGame.id = 1; // This will be set to a unique random value using uuid later, right now it's just 1 for development
  newGame.gameStatus = "active";
  newGame.time = 20;
  newGame.targetMovie = await getRandomMovieLogic();
  newGame.movieIDsPlayed.push(newGame.targetMovie.id);

  // Store the game in our map
  activeGames.set(newGame.id, newGame);

  try {
    res.json(newGame);
  } catch (error) {
    console.error("Error starting new game:", error);
    res.status(500).json({ error: "Failed to start new game" });
  }
};

// Helper function to get a specific game
const getGameObject = (req, res) => {
  const gameId = req.params.id;
  // console.log(`Looking for game with ID: ${gameId}`);
  // console.log(`Available games: ${Array.from(activeGames.keys())}`);

  const game = activeGames.get(Number(gameId));

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  res.json(game);
};

const processGuess = async (req, res) => {
  const { movie_title, movie_release_year, target_movie_id } = req.body;

  try {
    const searchResults = await fetchMoviesByNameAndReleaseYear(movie_title, movie_release_year);

    if (searchResults.length === 0) {
      console.error("Movie not found:", movie_title);
      return res.status(404).json({ error: "Movie not found" });
    }

    const targetCast = await fetchCastFromMovieId(target_movie_id);
    const targetCastIds = new Set(targetCast.map((actor) => actor.id));

    for (const guessedMovie of searchResults) {
      // Use the service function directly
      const guessedMovieId = guessedMovie.id;
      const guessedCast = await fetchCastFromMovieId(guessedMovie.id);
      const matchingCast = guessedCast.filter((actor) =>
        targetCastIds.has(actor.id)
      );

      // Check if guessed movie has been played already
      const game = activeGames.get(1);
      if (game && game.movieIDsPlayed.includes(guessedMovieId)) {
        console.log("Movie has already been played:", guessedMovie.title);
        return res.status(400).json({ error: "Movie has already been played" });
      }

      // Check if any cast member has been used too many times
      const maxCastUsageLimit = 3;
      const overusedCastMember = matchingCast.find(
        (cast) => (game.linkIDsPlayed[cast.id] || 0) >= maxCastUsageLimit
      );

      if (overusedCastMember) {
        return res.status(400).json({
          error: `Cast member ${overusedCastMember.name} has already been used ${maxCastUsageLimit} times`,
        });
      }

      // On a successful guess
      if (matchingCast.length > 0) {
        const game = activeGames.get(1);
        if (game) {
          game.targetMovie = guessedMovie;
          game.movieIDsPlayed.push(guessedMovie.id);

          // Update cast member usage counts
          matchingCast.forEach((cast) => {
            // Add cast member to the played list if not already existing, then increment the count
            game.linkIDsPlayed[cast.id] = (game.linkIDsPlayed[cast.id] || 0) + 1;
          });
        }

        // Create a response object with the guessed movie, matching cast members and their usage counts
        const response = {
          guessedMovie: {
            title: guessedMovie.title,
            release_date: guessedMovie.release_date,
            id: guessedMovie.id,
            poster_path: guessedMovie.poster_path,
          },
          matchingCast: matchingCast.map((actor) => ({
            name: actor.name,
            id: actor.id,
            usageCount: game.linkIDsPlayed[actor.id],
          })),
        };

        return res.status(200).json(response);
      }
    }

    console.log("No matching cast members found");
    return res.status(400).json({ error: "No matching cast members found" });
  } catch (error) {
    console.error("Error processing guess:", error.message, error.stack);
    res.status(500).json({ error: "Failed to process guess" });
  }
};

const gameController = {
  activeGames,
  processGuess,
  startNewGame: startNewGame,
  getGameObject: getGameObject,
};

module.exports = gameController;
