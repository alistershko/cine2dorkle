import { getCastFromMovieId } from "../services/movies";
import "../css/FilmBox.css";
import { useEffect, useState } from "react";

const InitialFilmBox = ({ movie }) => {
  const [cast, setCast] = useState([]); // State to store the cast

  useEffect(() => {
    const fetchMovieCast = async () => {
      if (movie && movie.id) {
        try {
          const fetchedCast = await getCastFromMovieId(movie.id);
          console.log("Fetched cast:", fetchedCast);
          setCast(fetchedCast.slice(0, 12)); // Limit to the first 10 actors
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

  return (
    <div className="FilmBox-Container">
      <h2 className="Film-Title">{movie.title}</h2>
      <p className="Film-Release-Year">Released: {movie.release_date}</p>
      <h3 className="Film-Cast">Cast:</h3>
      <div className="Film-Cast-Grid">
        {cast.map((actor, index) => (
          <div key={index} className="Film-Cast-Card">
            <div className="Actor-Name">{actor.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InitialFilmBox;
