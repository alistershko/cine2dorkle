import React, { useState, useEffect } from "react";
import { getSearchResults } from "../services/movies";
import { guessMovie } from "../services/game";
import "../css/InputBox.css";

const InputBox = ({ onGuessMade, targetMovie, onSuccessfulGuess }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

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
      setSuggestions(searchResult);
      setShowDropdown(true);
      setError("");
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError("Failed to fetch movie suggestions");
    }
  };

  const handleSelect = (movie) => {
    setQuery(movie.title);
    setShowDropdown(false);
  };

  const handleMovieSelect = async (movie) => {
    if (!targetMovie || !targetMovie.id) {
      setError("Unable to process guess: No target movie set");
      return;
    }

    const result = await guessMovie(movie.title, targetMovie.id);
    if (result.error) {
      setError(result.error);
      setQuery("");
      setShowDropdown(false);
      return;
    }

    const { guessedMovie, matchingCast } = result;

    onGuessMade(movie.title);

    onSuccessfulGuess(
      // console.log(guessedMovie),
      // console.log(matchingCast),
      guessedMovie,
      matchingCast.map((actor) => ({ name: actor.name, usageCount: actor.usageCount }))
    );

    setQuery("");
    setShowDropdown(false);
    setError("");
  };
  //This formats the date of the movie's release to only show the year
  const formatReleaseYear = (dateString) => {
    if (!dateString) return "Unknown year";
    return new Date(dateString).getFullYear();
  };
  //This adds the ability to select a guess by pressing enter - but only does the first guess
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      handleSelect(firstSuggestion);
      handleMovieSelect(firstSuggestion);
    }
  };

  return (
    <div className="relative w-96 mx-auto mt-4">
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && suggestions.length > 0 && setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        className="w-full bg-white text-gray-900 rounded p-4 dark:bg-gray-500 dark:text-gray-50 border border-gray-400 outline-red-700"
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md top-full left-0 right-0">
          <ul>
            {suggestions.map((movie, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(movie);
                  handleMovieSelect(movie);
                }}
                className="text-gray-900 cursor-pointer hover:bg-gray-200 p-2 flex justify-between"
              >
                <span className="movie-title">{movie.title}</span>
                <span className="movie-year text-gray-500">
                  {formatReleaseYear(movie.release_date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputBox;
