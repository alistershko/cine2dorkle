Film Box - Frontend Implementation

Tech Stack:
Frontend: React
Backend: JavaScript

Environment Variable:

```jsx
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

===============================================================

getFilmByTitle(title) - After a user inputs a title of a film, fetches the information about that film to populate that FilmBox with the Film Title, Release Year, and an array of Actors.

Method: GET
Endpoint: ${BACKEND_URL}/film/${title}

Body:

```json
{
  "title": "The Emperor's New Groove"
}
```

Response Status: 200

Returns: The title of the film, release year, and an array of actors in the given film.

Error Handling: "Unable to fetch film"

# ===============================================================

getStartingFilm() - fetches a random film

Method: GET
Endpoint: ${BACKEND_URL}/film
Headers:

Response Status: 200

Returns: A random film and its Title, Release Year, and an Array of Actors

Error Handling: "Unable to fetch film"

===============================================================
