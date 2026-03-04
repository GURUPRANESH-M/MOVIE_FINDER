import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function FavoritesPage() {

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {

    try {

      const response = await fetch("http://localhost:8080/movapi");

      const data = await response.json();

      // ensure favorites is always an array
      if (Array.isArray(data)) {
        setFavorites(data);
      } else {
        setFavorites([]);
      }

    } catch (error) {

      console.error("Error fetching favorites:", error);

      setFavorites([]);

    }

  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (

    <div>

      <h2 style={{ padding: "20px 40px" }}>My Favorites</h2>

      <div className="movie-grid">

        {favorites.length === 0 && (
          <p style={{ padding: "40px", color: "#aaa" }}>
            No favorite movies yet.
          </p>
        )}

        {favorites.map((movie) => (

          <MovieCard
            key={movie.imdbID}
            movie={{
              imdbID: movie.imdbID,
              Title: movie.title,
              Year: movie.year,
              Poster: movie.poster
            }}
            showRemove
            refreshFavs={fetchFavorites}
          />

        ))}

      </div>

    </div>

  );

}

export default FavoritesPage;