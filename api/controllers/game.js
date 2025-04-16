


const getRandomMovie = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
    };

    try {
        const popularMovies = [];
        for (let i = 1; i < 5; i++) {
            const response = await fetch(`${url}${i}`, options);
            const data = await response.json();
    
            const popularMoviesPage = data.results;
            if (!popularMoviesPage || popularMoviesPage.length === 0) {
                res.status(404).json({ error: 'No movies found' });
            }
            popularMovies.push(...popularMoviesPage);
        }
        
        console.log(popularMovies);
        const randomIndex = Math.floor(Math.random() * popularMovies.length);
        const randomMovie = popularMovies[randomIndex];
        const { title, release_date, id} = randomMovie;

        res.json({ title, release_date, id});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
}

const GameController = {
    getRandomMovie: getRandomMovie,
};

module.exports = GameController;