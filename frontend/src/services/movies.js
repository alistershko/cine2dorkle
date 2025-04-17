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

// Fetch one of the top movies to set as starting movie
// export const getInitialMovie = async () => {
//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             'accept': 'application/json',
//         },
//     };
//     const response = await fetch(`${BACKEND_URL}/game/initialMovie`, requestOptions);
//     if (response.status !== 200) {
//         throw new Error('Failed to fetch initial movie');
//     }
//     const data = await response.json();
//     return data;
// }

export const getInitialMovie = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/TMDB/initialMovie`, {
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
    return data;
  } catch (err) {
    console.error("Fetch error in getInitialMovie:", err);
    throw err;
  }
};

// Post request for a correctly guessed movie
export const guessMovie = async (movie_title) => {
  const requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: JSON.stringify({ movie_title }),
  };
  const response = await fetch(
    `${BACKEND_URL}/movie/${movie_title}`,
    requestOptions
  );
  if (response.status !== 201) {
    throw new Error("Failed to guess movie");
  }
  // Returns: If >0 matches between target_movie cast array and guessed_Movie cast array return success and add movie to array of guessed films
  return response.json();
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
    console.log("Fetched data:", data);
    return data;
  } catch (err) {
    console.error("Fetch error in getSearchResult:", err);
    throw err;
  }
};