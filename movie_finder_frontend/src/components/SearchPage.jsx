import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const API_KEY = "d3cc23fe";

const TMDB_API = "fa64628f463f6f121e1f0b075fcdbfb8";

const TMDB_TOP =
`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API}&language=en-US&page=2`;

const TMDB_TRENDING =
`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API}`;

function SearchPage() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  /* SEARCH MOVIES */

  const searchMovies = async () => {

    if (!query) return;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
    );

    const data = await res.json();

    if (data.Response === "True") setMovies(data.Search);
    else setMovies([]);

  };

  /* FETCH TOP RATED MOVIES */

  const fetchTopMovies = async () => {

    const res = await fetch(TMDB_TOP);
    const data = await res.json();

    setTopMovies(data.results.slice(0, 10));

  };

  /* FETCH TRENDING MOVIES */

  const fetchTrendingMovies = async () => {

    const res = await fetch(TMDB_TRENDING);
    const data = await res.json();

    setTrendingMovies(data.results.slice(0, 10));

  };

  useEffect(() => {

    fetchTopMovies();
    fetchTrendingMovies();

  }, []);

  /* OPEN OMDB DETAILS */

  const openDetails = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  /* OPEN TMDB MOVIE DETAILS */

  const openTopMovieDetails = async (tmdbId) => {

    try {

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${TMDB_API}`
      );

      const data = await res.json();

      if (data.imdb_id) {
        navigate(`/movie/${data.imdb_id}`);
      }

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div>

      {/* SEARCH BAR */}

      <div className="search-container">

        <input
          className="search-input"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies();
          }}
        />

        <button className="search-btn" onClick={searchMovies}>
          Search
        </button>

      </div>

      {/* HOME CONTENT */}

      {movies.length === 0 && (

        <>

          {/* TOP RATED MOVIES */}

          <div className="top-section">

            <h2>Top Rated Movies</h2>

            <div className="top-row">

              {topMovies.map((movie) => (

                <div
                  className="top-card"
                  key={movie.id}
                  onClick={() => openTopMovieDetails(movie.id)}
                >

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <p>{movie.title}</p>

                </div>

              ))}

            </div>

          </div>

          {/* TRENDING MOVIES */}

          <div className="top-section">

            <h2>Trending This Week</h2>

            <div className="top-row">

              {trendingMovies.map((movie) => (

                <div
                  className="top-card"
                  key={movie.id}
                  onClick={() => openTopMovieDetails(movie.id)}
                >

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <p>{movie.title}</p>

                </div>

              ))}

            </div>

          </div>

        </>

      )}

      {/* SEARCH RESULTS */}

      <div className="movie-grid">

        {movies.map((movie) => (

          <MovieCard
            key={movie.imdbID}
            movie={movie}
            showAdd
            onClick={() => openDetails(movie.imdbID)}
          />

        ))}

      </div>

    </div>

  );

}

export default SearchPage;