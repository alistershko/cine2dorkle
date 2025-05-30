const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch all guessed movies from array so that users can't repeat guesses
export const getMovies = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const response = await fetch(`${BACKEND_URL}/movies`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data;
};

export const getInitialMovie = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/tmdb/initialMovie`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Non-200 response:", response.status, errorText);
      throw new Error(`Failed to fetch initial movie: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data; // Ensure poster_path is included in the response
  } catch (err) {
    console.error("Fetch error in getInitialMovie:", err);
    throw err;
  }
};

// Get request for the guessed movie to display to the user
export const getGuessedMovie = async (movie_title) => {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const response = await fetch(
    `${BACKEND_URL}/movie/${movie_title}`,
    requestOptions
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch guessed movie");
  }
  const data = await response.json();
  return data;
};

// Get request for the cast of the guessed movie
// This is used to display the cast of the guessed movie to the user
// and to compare the cast of the guessed movie to the cast of the target movie
export const getCastFromMovieId = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const response = await fetch(
    `${BACKEND_URL}/tmdb/cast/${id}`,
    requestOptions
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch cast");
  }
  const data = await response.json();
  return data;
};

// Get movie by search result
export const getSearchResults = async (movie_title) => {
  try {
    const response = await fetch(`${BACKEND_URL}/tmdb/search/${movie_title}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Non-200 response:", response.status, errorText);
      throw new Error(`Failed to fetch search result: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error in getSearchResult:", err);
    throw err;
  }
};
