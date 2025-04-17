import { useEffect, useState } from "react";
import { getInitialMovie } from "../services/movies";
import "../css/FilmBox.css";

const FilmBox = ({ movie }) => {
  const [targetMovie, setTargetMovie] = useState(null);
  const [gameState, setGameState] = useState("inactive");
  const [moviesPlayed, appendToMoviesPlayed] = useState([]);

  useEffect(() => {
    const fetchInitialMovie = async () => {
      try {
        const data = await getInitialMovie();
        console.log("Data received from getInitialMovie:", data);
        if (data && data.id) {
          setTargetMovie(data);
          appendToMoviesPlayed((prev) => [...prev, data.id]);
        } else {
          console.error("Invalid movie data:", data);
        }
      } catch (error) {
        console.error("Error setting target movie:", error);
      }
    };

    fetchInitialMovie();
    setGameState("active");
  }, []); // Dependency array ensures this runs only once

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

export default FilmBox;
