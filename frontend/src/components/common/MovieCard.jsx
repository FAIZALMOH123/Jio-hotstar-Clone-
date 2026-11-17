import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const MovieCard = ({ movie, rank, className = "" }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const movieTitle = movie.title || movie.name || "Untitled";
  const movieImage = movie.image || movie.posterPath || "/images/background.png";
  const movieDetail = movie.detail || movie.duration || movie.year || "";
  const movieDesc = movie.description || "";

  const handleOpenWatch = (e) => {
    if (e) e.stopPropagation();
    navigate("/watch", {
      state: {
        movie,
        autoPlay: true,
      },
    });
  };

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={handleOpenWatch}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenWatch();
        }
      }}
      aria-label={`Watch ${movieTitle}`}
      className={`group relative min-w-0 cursor-pointer outline-none movie-card-lift transition-all duration-300 ease-out select-none ${
        rank ? "pl-5 sm:pl-7" : ""
      } ${className}`}
    >
      {/* Optional Top 10 Rank Counter */}
      {rank && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 sm:bottom-10 left-0 z-10 select-none text-[6rem] sm:text-[8rem] lg:text-[9rem] font-black leading-[0.78] text-gray-950 [-webkit-text-stroke:2px_rgba(255,255,255,0.85)] [text-shadow:2px_3px_12px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105"
        >
          {rank}
        </span>
      )}

      {/* Main Glass Poster Frame */}
      <div className="glass-card relative aspect-3/4 w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-white/10 bg-gray-900/40">
        <img
          src={movieImage}
          alt={movieTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/background.png";
          }}
        />

        {/* Hover Details Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent p-2.5 sm:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xs sm:text-base font-bold leading-tight text-white line-clamp-1 drop-shadow">
            {movieTitle}
          </h3>
          {movieDetail && (
            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-sky-400">
              {movieDetail}
            </p>
          )}
          {movieDesc && (
            <p className="mt-1 line-clamp-2 text-[10px] sm:text-xs leading-4 sm:leading-5 text-gray-300 hidden sm:block">
              {movieDesc}
            </p>
          )}

          <div className="mt-2 sm:mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenWatch}
              className="glass-button-primary inline-flex min-h-8 sm:min-h-9 flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-2.5 sm:px-3 text-[11px] sm:text-xs font-bold text-white shadow-lg cursor-pointer"
            >
              <FaPlay aria-hidden="true" className="text-[9px] sm:text-[10px]" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Movie Title Label Below Card */}
      <h4 className="mt-1.5 sm:mt-2.5 truncate text-xs sm:text-sm font-semibold text-gray-200 transition-colors group-hover:text-sky-400">
        {movieTitle}
      </h4>
    </article>
  );
};

export default MovieCard;
