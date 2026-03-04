import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">MovieFinder</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;