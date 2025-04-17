Film Box - Frontend Implementation

Tech Stack:
Frontend: React
Backend: JavaScript

Environment Variable:

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

getGuessedMovie(movie_title) - After a user inputs a title of a film, fetches the information about that film to populate that FilmBox with the Film Title, Release Year, and an array of Actors.

Method: GET
Endpoint: ${BACKEND_URL}/movie/${movie_title}
headers:
{
'accept': 'application/json',
},
Body:

```json
{
  "title": "The Emperor's New Groove"
}
```

Response Status: 201

Returns: The title of the film, release year, and an array of actors in the given film.

Error Handling: "Unable to fetch guessed movie"

===============================================================

guessMovie(movie_title) - Post request for a correctly guessed movie

Method: POST
Endpoint: ${BACKEND_URL}/movie/${movie_title}
headers:
{
'accept': 'application/json',
},
Body:

```json
{
  "title": "The Emperor's New Groove"
}
```

Response Status: 201

Returns: If > 0 matches between target_movie cast array and guessed_movie cast array return success and add movie to array of guessed films

Error Handling: "Failed to guess movie"

===============================================================

getInitialMovie - fetches one of the top movies to set as a starting movie

Method: GET
Endpoint: ${BACKEND_URL}/game/initialMovie
Headers:

Response Status: 200

Returns: A random film and its Title, Release Year, and an Array of Actors

Error Handling: "Unable to fetch initial movie"

===============================================================

getMovies - fetches all guessed movies from an array so that users cannot repeat guesses

Method: GET
Endpoint: ${BACKEND_URL}/movies
Headers:
{
'accept': 'application/json',
},

Response Status: 200

Returns: An array of all guessed movies

Error Handling: "Failed to fecth movies"

===============================================================
