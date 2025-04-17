import { useEffect, useState } from "react";
import { getInitialMovie } from "../services/movies";
import "../css/FilmBox.css";

const InitialFilmBox = ({ movie }) => {
  const [targetMovie, setTargetMovie] = useState(null);
  const [gameState, setGameState] = useState("inactive");
  const [moviesPlayed, appendToMoviesPlayed] = useState([]);

  if (!movie) {
    return <div> No movie data available</div>;
  }

  return (
    <div className="FilmBox-Container">
      <h2 className="Film-Title">{movie.title}</h2>
      <p className="Film-Release-Year">Released: {movie.release_date}</p>
      <h3 className="Film-Cast">Cast:</h3>
      {/* <ul className="Film-Cast-List">
        {movie.cast.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default InitialFilmBox;
