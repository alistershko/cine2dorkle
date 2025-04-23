const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Call the api to start a new game
export const startNewGame = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/game/gameStart`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error in startNewGame:", err);
    throw err;
  }
};

// Post request for a guessed movie
export const guessMovie = async (movie_title, movie_release_year, target_movie_id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie_title, movie_release_year, target_movie_id }),
  };
  const response = await fetch(`${BACKEND_URL}/game/guess`, requestOptions);
  if (!response.ok) {
    return response.json();
  }
  return response.json();
};
