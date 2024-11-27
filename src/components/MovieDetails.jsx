import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiStar, FiClock, FiPlay, FiX } from "react-icons/fi";
import { useState } from "react";

const TrailerModal = ({ isOpen, onClose, trailerURL, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
            <iframe
              src={trailerURL}
              title={`${title} Trailer`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Navigation Bar */}
      <div className="fixed top-0 w-full z-30 bg-gradient-to-b from-[#141414] to-transparent">
        <div className="container mx-auto px-6 py-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg 
                      hover:bg-white/20 transition-all duration-300"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Movies
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Poster and Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/3"
          >
            <div className="sticky top-24 space-y-6">
              <img
                src={movie.posterURL}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="flex items-center gap-4 justify-center">
                <span className="flex items-center gap-1 bg-[#E50914] px-4 py-2 rounded-lg">
                  <FiStar className="w-5 h-5" />
                  {movie.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-4 py-2 rounded-lg">
                  <FiClock className="w-5 h-5" />
                  2h 28m
                </span>
              </div>
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="w-full bg-[#E50914] hover:bg-[#f6121d] px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FiPlay className="w-5 h-5" />
                Watch Trailer
              </button>
            </div>
          </motion.div>

          {/* Right Column - Movie Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3 space-y-8"
          >
            <div>
              <h1 className="text-5xl font-bold mb-6">{movie.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About the Movie</h2>
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed">
                  {movie.longDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerURL={movie.trailerURL}
        title={movie.title}
      />
    </div>
  );
};

export default MovieDetails;
