const getRandomMovieLogic = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  const movies = [];

  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`${url}${i}`, options);
    const data = await response.json();

    const moviesPartial = data.results;
    if (!moviesPartial || moviesPartial.length === 0) {
      throw new Error("No movies found on page " + i);
    }

    const englishMovies = moviesPartial.filter(
      (movie) => movie.original_language === "en"
    );
    movies.push(...englishMovies);
  }

  if (movies.length === 0) {
    throw new Error("No English movies found");
  }

  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  const { title, release_date, id, poster_path } = randomMovie; // Include poster_path

  return { title, release_date, id, poster_path };
};

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
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const cast = data.cast;

    if (!cast || cast.length === 0) {
      res.status(404).json({ error: "No cast found" });
    }

    console.log(cast.length);

    const sanitisedCast = [];
    for (const member of cast) {
      console.log(member);
      const { name, id } = member;
      sanitisedCast.push({ name, id });
    }

    res.json(sanitisedCast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};

const getSearchResults = async (req, res) => {
  const movieName = req.params.name;
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results;

    if (!movies || movies.length === 0) {
      res.status(404).json({ error: "No movies found" });
    }

    console.log(movies.length);

    const sanitisedMovieList = [];
    for (const index in movies) {
      if (index < 5) {
        const { title, release_date, id } = movies[index];
        sanitisedMovieList.push({ title, release_date, id });
      }
    }

    res.json(sanitisedMovieList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};

const TMDBController = {
  getRandomMovie: getRandomMovie,
  getRandomMovieLogic: getRandomMovieLogic,
  getCastFromMovieId: getCastFromMovieId,
  getSearchResults: getSearchResults,
};

module.exports = TMDBController;
