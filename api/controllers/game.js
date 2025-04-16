


const getRandomMovie = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const popularMovies = data.results;
        if (!popularMovies || popularMovies.length === 0) {
            res.status(404).json({ error: 'No movies found' });
        }

        const randomIndex = Math.floor(Math.random() * popularMovies.length);
        const randomMovie = popularMovies[randomIndex];

        res.json(randomMovie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
}

const GameController = {
    getRandomMovie: getRandomMovie,
};

module.exports = GameController;