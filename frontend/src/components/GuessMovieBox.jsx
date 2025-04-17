import "../css/FilmBox.css";

const GuessMovieBox = ({ movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <div className="FilmBox-Container">
      <h2 className="Film-Title">{movie.title}</h2>
      <p className="Film-Release-Year">Released: {movie.release_date}</p>
      <h3 className="Film-Cast">Cast:</h3>
      <ul className="Film-Cast-List">
        {cast.map((actor, index) => (
          <div key={index} className="Film-Cast-Card">
            <div className="Actor-Name">{actor.name}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GuessMovieBox;
