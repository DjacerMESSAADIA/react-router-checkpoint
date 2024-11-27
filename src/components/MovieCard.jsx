import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -10 }}
      className="relative group bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-[#E50914]/25 cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity z-10" />

      {/* Gradient Overlay so white Text is readable if the poster is white */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      <img
        src={movie.posterURL}
        alt={movie.title}
        className="w-full h-96 object-cover transform transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/400x600?text=Movie+Poster";
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform z-20">
        <div className="flex justify-between items-center gap-4 mb-2">
          <h3 className="text-xl font-bold text-white drop-shadow-lg truncate">
            {movie.title}
          </h3>
          <span className="flex items-center bg-[#E50914] text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0">
            ⭐ {movie.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
          {movie.description}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
