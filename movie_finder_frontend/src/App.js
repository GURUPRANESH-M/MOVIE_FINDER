import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavouritesPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "15px", background: "#0f172a", color: "white" }}>
        <Link to="/" style={{ marginRight: "20px", color: "white" }}>Home</Link>
        <Link to="/favorites" style={{ color: "white" }}>Favorites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
