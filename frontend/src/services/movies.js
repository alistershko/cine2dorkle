const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getMovies = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
export const getpopularMovie = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(`${BACKEND_URL}/movie/popular`, requestOptions);
    if (response.status !== 200) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data;
}

