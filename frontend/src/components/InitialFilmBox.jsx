import React from "react";
import { getCastFromMovieId } from "../services/movies";
import "../css/FilmBox.css";
import { useEffect, useState } from "react";

const InitialFilmBox = ({
  movie,
  overlappingActors,
  gameMode,
  isInitialFilm = false,
}) => {
  const [cast, setCast] = useState([]); // State to store the cast
  const isHardMode = gameMode === "hard";

  useEffect(() => {
    const fetchMovieCast = async () => {
      if (movie && movie.id) {
        try {
          const fetchedCast = await getCastFromMovieId(movie.id);
          setCast(fetchedCast.slice(0, 12)); // Limit to the first 12 actors
        } catch (error) {
          console.error("Error fetching movie cast:", error);
        }
      }
    };

    fetchMovieCast();
  }, [movie]);

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
        <p className="Film-Release-Year">{releaseYear}</p>

        {/* In Easy Mode or if it's the initial film in Hard Mode, show full cast */}
        {(!isHardMode || (isHardMode && isInitialFilm)) && (
          <>
            <h3 className="Film-Cast">Cast:</h3>
            <div className="Film-Cast-Grid">
              {cast.map((actor, index) => (
                <div key={index} className="Film-Cast-Card">
                  <div
                    className={[
                      overlappingActors?.includes(actor.name) &&
                        "matching-actor",
                      "Actor-Name",
                    ]
                      .filter((v) => v)
                      .join(" ")}
                  >
                    {actor.name}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* In Hard Mode for non-initial films, show only overlapping actors if they exist */}
        {isHardMode &&
          !isInitialFilm &&
          overlappingActors &&
          overlappingActors.length > 0 && (
            <>
              <h3 className="Film-Cast">Matching Cast:</h3>
              <div className="Film-Cast-Grid">
                {overlappingActors.map((actor, index) => (
                  <div key={index} className="Film-Cast-Card">
                    <div className="Actor-Name matching-actor">{actor.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* In Hard Mode with no matches for non-initial films, show a message */}
        {isHardMode &&
          !isInitialFilm &&
          (!overlappingActors || overlappingActors.length === 0) && (
            <p className="hard-mode-message">Cast hidden in Hard Mode</p>
          )}
      </div>
    </div>
  );
};

export default InitialFilmBox;
