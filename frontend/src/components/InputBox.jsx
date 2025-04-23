import React, { useState, useEffect } from "react";
import { getSearchResults } from "../services/movies";
import { guessMovie } from "../services/game";
import "../css/InputBox.css";

const InputBox = ({ onGuessMade, targetMovie, onSuccessfulGuess }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the currently selected suggestion

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

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  const fetchSuggestions = async (input) => {
    try {
      const searchResult = await getSearchResults(input);
      console.log("Search result:", searchResult);
      setSuggestions(searchResult);
      console.log("Suggestions:", suggestions);
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

    const movieReleaseYear = movie.release_date.slice(0, 4); // Extract year from release date
    const result = await guessMovie(movie.title, movieReleaseYear, targetMovie.id);
    if (result.error) {
      setError(result.error);
      setQuery("");
      setShowDropdown(false);
      return;
    }

    const { guessedMovie, matchingCast } = result;

    onGuessMade(movie.title);

    onSuccessfulGuess(
      guessedMovie,
      matchingCast.map((actor) => ({
        name: actor.name,
        usageCount: actor.usageCount,
      }))
    );

    setQuery("");
    setShowDropdown(false);
    setError("");
  };

  // Format the date of the movie's release to only show the year
  const formatReleaseYear = (dateString) => {
    if (!dateString) return "Unknown year";
    return new Date(dateString).getFullYear();
  };

  // Enhanced keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Prevent scrolling
        setSelectedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        e.preventDefault(); // Prevent scrolling
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const selectedMovie = suggestions[selectedIndex];
          handleSelect(selectedMovie);
          handleMovieSelect(selectedMovie);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        break;
      default:
        break;
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
        className="w-full bg-white text-gray-900 rounded p-4 dark:bg-gray-500 dark:text-gray-50 border border-gray-400 outline-red-700 placeholder:font-limelight"
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md top-full left-0 right-0 max-h-60 overflow-y-auto">
          <ul>
            {suggestions.map((movie, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(movie);
                  handleMovieSelect(movie);
                }}
                className={`text-gray-900 cursor-pointer hover:bg-gray-200 p-2 flex justify-between ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }`}
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
