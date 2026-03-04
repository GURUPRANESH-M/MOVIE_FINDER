import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const OMDB_API_KEY = "d3cc23fe";
const YT_API_KEY = "AIzaSyAavUECKMQL92vNUDo_s39y5wGByUuwgRc";
const ITUNES_API = "https://itunes.apple.com/search?entity=song&limit=8&term=";

function MovieDetailsPage() {

  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [soundtracks, setSoundtracks] = useState([]);

  // Fetch movie details
  const fetchMovieDetails = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
    );

    const data = await res.json();
    setMovie(data);

    if (data && data.Title) {
      fetchTrailer(data.Title);
      fetchSoundtracks(data.Title);
    }
  };

  // Fetch trailer
  const fetchTrailer = async (title) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          title + " official trailer"
        )}&type=video&maxResults=1&key=${YT_API_KEY}`
      );

      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setTrailerId(data.items[0].id.videoId);
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
    }
  };

  // Fetch soundtracks
  const fetchSoundtracks = async (title) => {
    try {
      const res = await fetch(
        `${ITUNES_API}${encodeURIComponent(title + " soundtrack")}`
      );

      const data = await res.json();

      if (data.results) {
        setSoundtracks(data.results);
      }
    } catch (err) {
      console.error("Soundtrack fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) {
    return <p style={{ padding: "40px" }}>Loading movie details...</p>;
  }

  return (
    <div className="details-page">

      <div className="details-container">

        {/* Poster */}
        <div className="poster-section">
          <img src={movie.Poster} alt={movie.Title} />
        </div>

        {/* Movie Info */}
        <div className="details-info">

          <h1>{movie.Title}</h1>

          <p className="rating">
            ⭐ IMDb {movie.imdbRating} / 10
          </p>

          <p><b>Year:</b> {movie.Year}</p>
          <p><b>Runtime:</b> {movie.Runtime}</p>
          <p><b>Genre:</b> {movie.Genre}</p>
          <p><b>Director:</b> {movie.Director}</p>
          <p><b>Writer:</b> {movie.Writer}</p>
          <p><b>Actors:</b> {movie.Actors}</p>
          <p><b>Language:</b> {movie.Language}</p>
          <p><b>Country:</b> {movie.Country}</p>
          <p><b>Awards:</b> {movie.Awards}</p>
          <p><b>Box Office:</b> {movie.BoxOffice}</p>
          <p><b>IMDB Votes:</b> {movie.imdbVotes}</p>

          {/* Plot */}
          <div className="plot">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>

          {/* Trailer */}
          <div className="trailer">

            <h3>Trailer</h3>

            {trailerId ? (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}

          </div>

          {/* Soundtracks */}
          <div className="soundtracks">

            <h3>Soundtracks</h3>

            {soundtracks.length > 0 ? (

              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

                {soundtracks.map((track) => (

                  <div
                    key={track.trackId}
                    style={{
                      width: "140px",
                      textAlign: "center",
                      background: "#111",
                      padding: "10px",
                      borderRadius: "8px"
                    }}
                  >

                    <img
                      src={track.artworkUrl100}
                      alt={track.trackName}
                      style={{ width: "100%", borderRadius: "6px" }}
                    />

                    <p style={{ fontSize: "13px", marginTop: "8px" }}>
                      {track.trackName}
                    </p>

                    <p style={{ fontSize: "11px", color: "#aaa" }}>
                      {track.artistName}
                    </p>

                  </div>

                ))}

              </div>

            ) : (
              <p>No soundtracks found</p>
            )}

          </div>

          {/* Ratings */}
          <div className="ratings">

            <h3>Ratings</h3>

            {movie.Ratings &&
              movie.Ratings.map((r, index) => (
                <p key={index}>
                  <b>{r.Source}:</b> {r.Value}
                </p>
              ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetailsPage;