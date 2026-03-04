function MovieCard({ movie, showAdd, showRemove, refreshFavs }) {

  const addFavorite = async () => {
    try {
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

      alert("Added to Favorites!");
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async () => {
    try {
      await fetch(`http://localhost:8080/movapi/${movie.imdbID}`, {
        method: "DELETE"
      });

      refreshFavs();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div style={{
      width: "200px",
      margin: "10px",
      padding: "10px",
      background: "#1e293b",
      color: "white",
      borderRadius: "8px"
    }}>
      <img src={movie.Poster} alt={movie.Title} width="100%" />
      <h4>{movie.Title}</h4>
      <p>{movie.Year}</p>

      {showAdd && <button onClick={addFavorite}>Add Fav</button>}
      {showRemove && <button onClick={removeFavorite}>Remove</button>}
    </div>
  );
}

export default MovieCard;
