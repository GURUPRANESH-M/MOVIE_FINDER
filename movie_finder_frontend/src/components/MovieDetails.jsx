function MovieDetails({ movie, close }) {

  return (
    <div className="modal">

      <div className="modal-content">

        <button className="close-btn" onClick={close}>
          X
        </button>

        <img src={movie.Poster} alt={movie.Title} />

        <h2>{movie.Title}</h2>

        <p><b>Year:</b> {movie.Year}</p>

        <p><b>Genre:</b> {movie.Genre}</p>

        <p><b>IMDB:</b> {movie.imdbRating}</p>

        <p>{movie.Plot}</p>

      </div>

    </div>
  );
}

export default MovieDetails;