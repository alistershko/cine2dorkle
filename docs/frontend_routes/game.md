# Game Service Documentation

Services for handling game logic and interactions with the backend.

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

# startNewGame()

Initializes a new game session by requesting a random starting movie from the backend.

# Request

Method: GET
Endpoint: `${BACKEND_URL}/game/gameStart`
Headers:

```javascript
{
  'accept': 'application/json'
}
```

# Response

Status: 200 OK
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

# guessMovie(movie_title, movie_release_year, target_movie_id)

Validates a user's guess by checking for shared cast members between films.

# Parameters

- `movie_title` (string): Title of the guessed movie
- `movie_release_year` (string): Release year of the guessed movie
- `target_movie_id` (number): ID of the target movie to compare against

# Request

Method: POST
Endpoint: `${BACKEND_URL}/game/guess`
Headers:

```javascript
{
  'accept': 'application/json',
  'Content-Type': 'application/json'
}
```

Body:

```json
{
  "movie_title": "The Emperor's New Groove",
  "movie_release_year": "2000",
  "target_movie_id": 12345
}
```

# Successful Response

Status: 200 OK
Returns:

```javascript
{
  "guessedMovie": {
    "title": "The Emperor's New Groove",
    "release_date": "2000-12-15",
    "id": 11688,
    "poster_path": "/wwbgkXQBEKtnyHBFgecNrnxnR9u.jpg"
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

- "Movie has already been played"
- "No matching cast members found"
- "Cast member [name] has already been used 3 times"
  Status: 404 Not Found
- "Movie not found"
  Status: 500 Internal Server Error
- "Failed to process guess"

==============================================================

# Usage Example

```javascript
// Start a new game
try {
  const gameData = await startNewGame();
  console.log(`Game started with ID: ${gameData.id}`);
  setInitialMovie(gameData.targetMovie);
} catch (error) {
  console.error("Failed to start game:", error);
}

// Make a guess
try {
  const result = await guessMovie("Inception", "2010", 11688);
  if (result.guessedMovie) {
    console.log("Successful guess!");
    updateGameState(result);
  }
} catch (error) {
  console.error("Guess failed:", error);
}
```

# Error Handling Strategy

- All API errors are caught and logged to console
- Network failures throw appropriate exceptions
- Service methods validate response status before returning results
- Non-OK responses return error objects that can be handled by UI components
