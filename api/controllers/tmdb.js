const {
  getRandomMovieLogic,
  fetchMoviesByNameAndReleaseYear,
  fetchCastFromMovieId,
} = require("../services/tmdb");

const getRandomMovie = async (req, res) => {
  try {
    const movie = await getRandomMovieLogic();
    res.json(movie);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch movie data" });
  }
};

const getCastFromMovieId = async (req, res) => {
  const movieId = req.params.id;

  try {
    const sanitisedCast = await fetchCastFromMovieId(movieId);

    if (sanitisedCast.length === 0) {
      return res.status(404).json({ error: "No cast found" });
    }

    res.json(sanitisedCast);
  } catch (err) {
    console.error(`Error in getCastFromMovieId controller:`, err);
    res.status(500).json({ error: "Failed to fetch movie cast" });
  }
};

const getSearchResults = async (req, res) => {
  const movieName = req.params.name;

  try {
    const movies = await fetchMoviesByNameAndReleaseYear(movieName); // Use the new method

    const sanitisedMovieList = movies
      .slice(0, 5)
      .map(({ title, release_date, id }) => ({
        title,
        release_date,
        id,
      }));

    res.json(sanitisedMovieList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch movie data" });
  }
};

const TMDBController = {
  getRandomMovie: getRandomMovie,
  getRandomMovieLogic: getRandomMovieLogic,
  getCastFromMovieId: getCastFromMovieId,
  getSearchResults: getSearchResults,
};

module.exports = TMDBController;
