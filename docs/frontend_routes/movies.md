# Movies Service Documentation

Services for retrieving movie data and handling movie-related interactions with the backend.

# Tech Stack

Frontend: React
Backend: Express.js
API Integration: TMDB (The Movie Database)

# Environment

```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

==============================================================

# Services

# getMovies()

Fetch all guessed movies from an array so that users cannot repeat guesses once used

# Request

Method: GET
Endpoint: `${BACKEND_URL}/movies`
Headers:

```javascript
{
  'accept': 'application/json'
}
```

# Response

Status:
Returns: Game object containing:

```javascript
{
  "id": 1,                  // Game ID
  "gameStatus": "active",   // Current game state
  "time": 20,               // Timer value in seconds
  "targetMovie": {          // Initial movie object
    "title": "Movie Title",
    "release_date": "YYYY-MM-DD",
    "id": 12345,
    "poster_path": "/path/to/poster.jpg"
  },
  "movieIDsPlayed": [12345] // Array of played movie IDs
}
```

# Error Handling

- Throws error with message: "Fetch error in startNewGame"
- Logs detailed error information to console

==============================================================

# getInitialMovie()

Validates a user's guess by checking for shared cast members between films.

# Request

Method: GET
Endpoint: `${BACKEND_URL}/tmdb/initialMovie`
Headers:

```javascript
{
  'accept': 'application/json',
  'Content-Type': 'application/json'
}
```

# Successful Response

Status: 200 OK
Returns:

```javascript
{
  "guessedMovie": {
    "title": "Inception",
    "release_date": "2010-07-16",
    "id": 27205,
    "poster_path": "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  "matchingCast": [
    {
      "name": "Actor Name",
      "id": 123,
      "usageCount": 1
    }
  ]
}
```

# Error Responses

Status: 400 Bad Request

- "Failed to fetch initial movie"
- "Fetch error in getInitialMovie"

==============================================================

# getGuessedMovie

Get the guessed movie to be displayed to the user

# Request

Method: GET
Endpoint: `${BACKEND_URL}/${movie_title}`
Headers:

```javascript
{
  'accept': 'application/json'
}
```

# Successful Response

Status: 200 OK
Returns:

```javascript
{
  "guessedMovie": {
    "title": "Inception",
    "release_date": "2010-07-16",
    "id": 27205,
    "poster_path": "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  "matchingCast": [
    {
      "name": "Actor Name",
      "id": 123,
      "usageCount": 1
    }
  ]
}
```

# Error Responses

Status: 400 Bad Request

- "Failed to fetch initial movie"
- "Fetch error in getInitialMovie"

==============================================================

# getCastFromMovie()

Validates a user's guess by checking for shared cast members between films.

# Request

Method: GET
Endpoint: `${BACKEND_URL}/tmdb/cast/${id}`
Headers:

```javascript
{
  'accept': 'application/json'
}
```

# Successful Response

Status: 200 OK
Returns:

```javascript
[
  {
    name: "Leonardo DiCaprio",
    id: 6193,
  },
  {
    name: "Joseph Gordon-Levitt",
    id: 24045,
  },
  // Additional cast members...
];
```

# Error Responses

Status: 400 Bad Request

- "Failed to fetch cast"

==============================================================

# getSearchResults()

Get movie by search

# Request

Method: GET
Endpoint: `${BACKEND_URL}/tmdb/search/${movie_title}`
Headers:

```javascript
{
  'accept': 'application/json'
}
```

# Successful Response

Status: 200 OK
Returns:

```javascript
[
  {
    title: "Inception",
    release_date: "2010-07-16",
    id: 27205,
  },
  // Additional search results...
];
```

# Error Responses

Status: 400 Bad Request

- "Failed to search fetch results"

==============================================================

# Usage Example

```javascript
// Fetch initial movie to start the game
try {
  const initialMovie = await getInitialMovie();
  setCurrentMovie(initialMovie);
} catch (error) {
  console.error("Failed to get initial movie:", error);
}

// Search for movies by title
try {
  const searchResults = await getSearchResults("Inception");
  setSuggestions(searchResults);
} catch (error) {
  console.error("Search failed:", error);
}

// Get cast for a movie
try {
  const cast = await getCastFromMovieId(27205);
  setMovieCast(cast);
} catch (error) {
  console.error("Failed to fetch cast:", error);
}
```

# Error Handling Strategy

- All API errors are caught and logged to console
- Network failures throw appropriate exceptions
- Service methods validate response status before returning results
- Non-OK responses return error objects that can be handled by UI components
