import React, { useState, useEffect } from 'react';
import { getSearchResult } from '../services/movies';

const InputBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce logic
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

  // Mock backend fetch
  const fetchSuggestions = (input) => {
    const searchResult = getSearchResult(input)
    const filtered = searchResult.map((item => item.title))
    // const filtered = mockData.filter(item =>
    //   item.toLowerCase().includes(input.toLowerCase())
    // );
    setSuggestions(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (item) => {
    setQuery(item);
    setShowDropdown(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="TEST search for a fruit"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && suggestions.length > 0 && setShowDropdown(true)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputBox;
