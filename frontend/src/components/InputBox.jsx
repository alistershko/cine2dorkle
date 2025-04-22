import React, { useState, useEffect } from "react";
import { getSearchResults } from "../services/movies";
import { guessMovie } from "../services/game";

const InputBox = ({ targetMovie, onSuccessfulGuess }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(""); // Add state for error message

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
    try {
      const searchResult = await getSearchResults(input);
      const filtered = searchResult.map((item) => item.title);
      setSuggestions(filtered);
      setShowDropdown(true);
      // Clear any previous errors when new suggestions are loaded
      setError("");
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError("Failed to fetch movie suggestions");
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    setShowDropdown(false);
  };

  const handleMovieSelect = async (movieTitle) => {
    if (!targetMovie || !targetMovie.id) {
      setError("Unable to process guess: No target movie set");
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

      // Clear the input field after successful guess
      setQuery("");
      setShowDropdown(false);
      setError("");
    } catch (error) {
      console.error("Error guessing movie:", error);
      // Display appropriate error message based on error status
      if (error.message.includes("400")) {
        setError("No matching cast members found between these films");
      } else if (error.message.includes("404")) {
        setError("Movie not found");
      } else {
        setError("No matching cast members found between these films.");
      }

      // Also clear the input field after an unsuccessful guess
      setQuery("");
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-96 mx-auto mt-4">
      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && suggestions.length > 0 && setShowDropdown(true)}
        className="w-full bg-white text-gray-900 rounded p-4 dark:bg-gray-500 dark:text-gray-50 border border-gray-400 outline-red-700"
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md top-full left-0 right-0">
          <ul>
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(item);
                  handleMovieSelect(item);
                }}
                className="text-gray-900 cursor-pointer hover:bg-gray-200 p-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputBox;
