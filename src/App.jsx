import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Inception",
      description:
        "A thief who enters the dreams of others to steal secrets from their subconscious during the dream state.",
      posterURL:
        "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
      rating: 4.8,
      trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
      longDescription: `Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he loves.`,
    },
    {
      id: "2",
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL:
        "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      rating: 4.9,
      trailerURL: "https://www.youtube.com/embed/NmzuHjWmXOc",
      longDescription: `Andy Dufresne is a young and successful banker whose life changes drastically when he is convicted and sentenced to life imprisonment for the murder of his wife and her lover. Set in the 1940s, the film shows how Andy, with the help of his friend Red, the prison contraband smuggler, turns out to be a most unconventional prisoner.`,
    },
    {
      id: "3",
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterURL:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 4.7,
      trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
      longDescription: `In the near future, Earth's resources have been depleted, and humanity is on the brink of extinction. As the dust cloud from a disappearing sun threatens to extinguish all life on Earth, a group of astronauts is sent on a mission to find a new home for humanity.`,
    },
    {
      id: "4",
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 4.9,
      trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
      longDescription: `Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept him as a partner in his fight to stop the chaos.`,
    },
  ]);

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [
      ...prevMovies,
      { ...newMovie, id: Date.now().toString() },
    ]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MovieList movies={movies} onAddMovie={handleAddMovie} />}
        />
        <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </Router>
  );
};

export default App;
