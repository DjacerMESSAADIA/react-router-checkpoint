import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./MovieCard";
import { FiPlus, FiFilter, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a1a] rounded-xl w-full max-w-2xl shadow-2xl border border-[#2a2a2a] my-8"
        >
          <div className="flex justify-between items-center p-6 border-b border-[#2a2a2a]">
            <h2 className="text-2xl font-bold text-[#E50914]">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MovieList = ({ movies, onAddMovie }) => {
  const [filter, setFilter] = useState({ title: "", rating: 0 });
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
    trailerURL: "",
    longDescription: "",
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Handler for updating filter values
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for adding a new movie
  const handleAddMovie = (e) => {
    e.preventDefault();

    const movieToAdd = {
      title: newMovie.title,
      description: newMovie.description,
      posterURL: newMovie.posterURL,
      rating: Number(newMovie.rating),
      trailerURL: newMovie.trailerURL,
      longDescription: newMovie.longDescription,
    };

    onAddMovie(movieToAdd);

    // Reset form
    setNewMovie({
      title: "",
      description: "",
      posterURL: "",
      rating: 0,
      trailerURL: "",
      longDescription: "",
    });

    // Close modal
    setIsAddModalOpen(false);
  };

  // Filter movies based on title and rating criteria
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      (!filter.rating || movie.rating >= Number(filter.rating))
    );
  });

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="container mx-auto p-6">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Flix Collection
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] rounded-lg hover:bg-[#333333] transition-colors"
            >
              <FiFilter className="w-5 h-5" />
              <span className="hidden md:inline">Filter</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#E50914] rounded-lg hover:bg-[#f6121d] transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              <span className="hidden md:inline">Add Movie</span>
            </button>
          </div>
        </div>

        {/* Filter Modal */}
        <Modal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          title="Filter Movies"
        >
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="title"
                placeholder="Search by title..."
                value={filter.title}
                onChange={handleFilterChange}
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">
                Minimum Rating
              </label>
              <input
                type="range"
                name="rating"
                min="0"
                max="5"
                step="0.5"
                value={filter.rating}
                onChange={handleFilterChange}
                className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#E50914]"
              />
              <div className="text-right text-sm text-gray-300">
                {filter.rating} ⭐
              </div>
            </div>
          </div>
        </Modal>

        {/* Add Movie Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Movie"
        >
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  placeholder="Movie title"
                  value={newMovie.title}
                  onChange={(e) =>
                    setNewMovie((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Rating</label>
                <input
                  type="number"
                  placeholder="0.0 - 5.0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newMovie.rating}
                  onChange={(e) =>
                    setNewMovie((prev) => ({
                      ...prev,
                      rating: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Poster URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={newMovie.posterURL}
                onChange={(e) =>
                  setNewMovie((prev) => ({
                    ...prev,
                    posterURL: e.target.value,
                  }))
                }
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Trailer URL (YouTube Embed)
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/embed/..."
                value={newMovie.trailerURL}
                onChange={(e) =>
                  setNewMovie((prev) => ({
                    ...prev,
                    trailerURL: e.target.value,
                  }))
                }
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Short Description</label>
              <textarea
                placeholder="Brief movie description..."
                value={newMovie.description}
                onChange={(e) =>
                  setNewMovie((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                required
                rows="2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Description</label>
              <textarea
                placeholder="Detailed movie description..."
                value={newMovie.longDescription}
                onChange={(e) =>
                  setNewMovie((prev) => ({
                    ...prev,
                    longDescription: e.target.value,
                  }))
                }
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-[#333333] focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914] transition-all"
                required
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-8 py-3 bg-[#E50914] text-white rounded-lg font-semibold hover:bg-[#f6121d] transition-all duration-200"
            >
              Add Movie
            </button>
          </form>
        </Modal>

        {/* Movies Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MovieList;
