import { useNavigate } from "react-router-dom";

function MovieCard({ movie, showAdd, showRemove, refreshFavs }) {

  const navigate = useNavigate();

  const addFavorite = async () => {
    await fetch("http://localhost:8080/movapi/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      })
    });

    alert("Added to favorites");
  };

  const removeFavorite = async () => {
    await fetch(`http://localhost:8080/movapi/${movie.imdbID}`, {
      method: "DELETE"
    });

    if (refreshFavs) {
      refreshFavs();
    }
  };

  const openMovieDetails = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="movie-card" onClick={openMovieDetails}>

      <img className="poster" src={movie.Poster} alt={movie.Title} />

      <div className="card-body">

        <div className="title">{movie.Title}</div>

        <div className="year">{movie.Year}</div>

        {showAdd && (
          <button
            className="btn add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addFavorite();
            }}
          >
            Add Fav
          </button>
        )}

        {showRemove && (
          <button
            className="btn remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              removeFavorite();
            }}
          >
            Remove
          </button>
        )}

      </div>
    </div>
  );
}

export default MovieCard;