import React, { useState, useEffect } from "react";
import { getSearchResults, guessMovie } from "../services/movies";

const InputBox = ({ targetMovie, onSuccessfulGuess }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (input) => {
    const searchResult = await getSearchResults(input);
    const filtered = searchResult.map((item) => item.title);
    setSuggestions(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (item) => {
    setQuery(item);
    setShowDropdown(false);
  };

  const handleMovieSelect = async (movieTitle) => {
    if (!targetMovie || !targetMovie.id) {
      console.error("Target movie is not set or invalid");
      return;
    }

    try {
      const { guessedMovie, matchingCast } = await guessMovie(
        movieTitle,
        targetMovie.id
      );

      onSuccessfulGuess(
        guessedMovie,
        matchingCast.map((actor) => actor.name)
      );

      console.log("Guess result:", response);
    } catch (error) {
      console.error("Error guessing movie:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && suggestions.length > 0 && setShowDropdown(true)}
      />

      <div className="suggestions">
        {showDropdown && suggestions.length > 0 && (
          <ul>
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(item);
                  handleMovieSelect(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputBox;
