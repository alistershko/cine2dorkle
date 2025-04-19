import React from "react";
import "../css/FilmBox.css";

const GuessMovieBox = ({ movie }) => {
  if (!movie) {
    return <div>No movie data available</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  return (
    <div className="FilmBox-Container">
      <img
        src={posterUrl}
        alt={`${movie.title} Poster`}
        className="Film-Poster"
      />
      <div className="Film-Details">
        <h2 className="Film-Title">{movie.title}</h2>
        <p className="Film-Release-Year">Released: {releaseYear}</p>
      </div>
    </div>
  );
};

export default GuessMovieBox;
