const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch all guessed movies from array so that users can't repeat guesses
export const getMovies = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    };
    const response = await fetch(`${BACKEND_URL}/movies`, requestOptions);
    if (response.status !== 200) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data;
};

// Fetch one of the popular movies to set as starting movie
export const getPopularMovie = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    };
    const response = await fetch(`${BACKEND_URL}/movie/popular`, requestOptions);
    if (response.status !== 200) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data;
}



// Post request for a correctly guessed movie
export const guessMovie = async (movie_title) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
        },
        body: JSON.stringify({ movie_title }),
    };
    const response = await fetch(`${BACKEND_URL}/movie/${movie_title}`, requestOptions);
    if (response.status !== 201) {
        throw new Error('Failed to guess movie');
    }
    // Returns: If >0 matches between target_movie cast array and guessed_Movie cast array return success and add movie to array of guessed films
    return response.json();
}

// Get request for the guessed movie to display to the user
export const getGuessedMovie = async (movie_title) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    };
    const response = await fetch(`${BACKEND_URL}/movie/${movie_title}`, requestOptions);
    if (response.status !== 200) {
        throw new Error('Failed to fetch guessed movie');
    }
    const data = await response.json();
    return data;
}

