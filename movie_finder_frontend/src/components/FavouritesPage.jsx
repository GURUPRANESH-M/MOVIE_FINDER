import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:8080/movapi");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Favorites</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
