import React, { useEffect, useState } from "react";
import { getStartingFilm, getFilmByTitle } from "../services/filmService";
import "./FilmBox.css";

const FilmBox = ({ titleProp, index }) => {
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = titleProp
          ? await getFilmByTitle(titleProp)
          : await getStartingFilm();

        setFilm(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFilm();
  }, [titleProp]);

  if (error) return <div className="film-box error">Error: {error}</div>;
  if (!film) return <div className="film-box loading">Loading...</div>;

  return (
    <div className="film-box">
      <h3>{film.title}</h3>
      <p>Release Date: {film.releaseDate}</p>
      {index < 3 && film.actors && <p>Main Actors: {film.actors.join(", ")}</p>}
    </div>
  );
};

export default FilmBox;
