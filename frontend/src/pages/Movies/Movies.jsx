import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { FaPlay } from "react-icons/fa";

const heroDeadpool = "/images/deadpool-wolverine-3840x2160-17300.jpg";

const movieCategories = [
  "All",
  "Action",
  "Comedy",
  "Super Heroes",
  "Family",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Hindi",
  "English",
];

const Movies = () => {
  const navigate = useNavigate();
  const { movies: newReleases } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState("All");

  const heroMovie = {
    title: "Deadpool & Wolverine",
    studio: "Marvel Studios",
    image: heroDeadpool,
    year: "2024",
    rating: "U/A 16+",
    duration: "2h 7m",
    quality: "4K UHD",
    languages: ["Hindi", "English", "Tamil", "Telugu"],
    description:
      "Wade Wilson is pulled out of his quiet civilian life by the Time Variance Authority and recruits a reluctant variant of Wolverine to save his universe.",
    genres: ["Super Heroes", "Action", "Adventure", "Comedy"],
  };

  const filteredMovies =
    selectedGenre === "All"
      ? newReleases
      : newReleases.filter(
          (m) =>
            m.genres?.some((g) =>
              g.toLowerCase().includes(selectedGenre.toLowerCase())
            ) ||
            m.languages?.some((l) =>
              l.toLowerCase().includes(selectedGenre.toLowerCase())
            )
        );

  const familyFavorites = newReleases.filter((m) =>
    m.genres?.some((g) =>
      ["Comedy", "Family", "Kids", "Animation"].includes(g)
    )
  );

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20 home-page-enter">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden pb-24">
        {/* Movies Hero Banner */}
        <section className="relative h-[65vh] min-h-120 w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroMovie.image}
              alt={heroMovie.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050811] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 sm:px-12 lg:px-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 drop-shadow">
              {heroMovie.studio}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white drop-shadow-xl">
              {heroMovie.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-300">
              <span className="glass-pill rounded-lg px-2.5 py-0.5 text-xs font-bold text-gray-200">
                {heroMovie.rating}
              </span>
              <span>{heroMovie.year}</span>
              <span className="text-gray-500">•</span>
              <span>{heroMovie.duration}</span>
              <span className="text-gray-500">•</span>
              <span className="glass-pill rounded-lg border-red-500/40 text-red-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                {heroMovie.quality}
              </span>
            </div>

            <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-3">
              {heroMovie.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate("/watch", {
                    state: { movie: heroMovie, autoPlay: true },
                  })
                }
                className="glass-button-primary inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl cursor-pointer"
              >
                <FaPlay className="text-xs" />
                <span>Watch Trailer</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/watch", { state: { movie: heroMovie, autoPlay: true } })
                }
                className="glass-button inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-semibold text-white cursor-pointer"
              >
                <span>Movie Info</span>
              </button>
            </div>
          </div>
        </section>

        {/* Genre & Category Pills */}
        <div className="px-4 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {movieCategories.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedGenre === genre
                    ? "glass-pill-active shadow-md"
                    : "glass-pill text-gray-300 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Blockbuster Movies Showcase */}
        <section className="px-4 pt-8 sm:px-8 lg:px-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow">
              {selectedGenre === "All" ? "Top Movies on JioHotstar" : `${selectedGenre} Movies`}
            </h2>
            <span className="text-xs sm:text-sm text-gray-400">
              {filteredMovies.length} movies
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.slug || movie.title || movie.name}
                movie={movie}
              />
            ))}
          </div>
        </section>

        {/* Family & Comedy Section */}
        {familyFavorites.length > 0 && (
          <section className="px-4 pt-10 sm:px-8 lg:px-12">
            <h2 className="mb-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
              Family & Comedy Favorites
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {familyFavorites.map((movie) => (
                <MovieCard
                  key={movie.slug || movie.title || movie.name}
                  movie={movie}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Movies;
