import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { defaultCatalog } from "../../data/defaultCatalog";
import { FaSearch, FaTimes } from "react-icons/fa";

const popularSearches = [
  "Deadpool & Wolverine",
  "Spider-Man",
  "Home Alone",
  "Avengers",
  "Mortal Kombat",
  "Godzilla",
  "Evil Dead",
  "Ballerina",
  "Shaadi Mein Zaroor Aana",
  "One Piece",
];

const filterTabs = ["All", "Movies", "Shows", "Action", "Comedy", "Animation"];

const Search = () => {
  const location = useLocation();
  const { movies: contextMovies } = useMovies();
  const allMovies = contextMovies && contextMovies.length > 0 ? contextMovies : defaultCatalog;
  const initialQuery = location.state?.query || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allMovies.filter((movie) => {
      const matchTitle = (movie.title || movie.name || "").toLowerCase().includes(q);
      const matchStudio = (movie.studio || "").toLowerCase().includes(q);
      const matchGenres = movie.genres?.some((g) => g.toLowerCase().includes(q));
      const matchLanguages = movie.languages?.some((l) => l.toLowerCase().includes(q));
      const matchStarring = (movie.starring || "").toLowerCase().includes(q);
      const matchDirector = (movie.director || "").toLowerCase().includes(q);
      return (
        matchTitle ||
        matchStudio ||
        matchGenres ||
        matchLanguages ||
        matchStarring ||
        matchDirector
      );
    });
  }, [allMovies, query]);

  const filteredResults = useMemo(() => {
    if (selectedFilter === "All") return searchResults;
    return searchResults.filter((m) =>
      m.genres?.some((g) =>
        g.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    );
  }, [searchResults, selectedFilter]);

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20 home-page-enter">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Glass Search Input Bar */}
          <div className="relative">
            <div className="glass-panel flex items-center rounded-2xl border border-white/20 p-2 sm:p-3 shadow-2xl focus-within:border-sky-400/80">
              <FaSearch className="ml-3 text-lg text-gray-400 sm:text-xl" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, shows, actors, genres..."
                className="w-full bg-transparent px-4 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="glass-button mr-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-300 hover:text-white cursor-pointer"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Glass Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filterTabs.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? "glass-pill-active shadow-md"
                      : "glass-pill text-gray-300 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* If Search Query is Entered -> Show Results */}
          {query.trim() ? (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow">
                  Results for &ldquo;{query}&rdquo;
                </h2>
                <span className="text-xs sm:text-sm text-gray-400 font-medium">
                  {filteredResults.length} title
                  {filteredResults.length === 1 ? "" : "s"} found
                </span>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {filteredResults.map((item) => (
                    <MovieCard
                      key={item.slug || item.title || item.name}
                      movie={item}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel mt-12 rounded-3xl py-16 text-center">
                  <p className="text-lg font-bold text-gray-300">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Try searching for actors, genres like &ldquo;Action&rdquo; or &ldquo;Marvel&rdquo;
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* If No Search Query -> Show Popular Searches & Trending */
            <div className="mt-10 space-y-10">
              {/* Popular Searches Tags */}
              <section>
                <h2 className="mb-3 text-base sm:text-lg font-bold text-white drop-shadow">
                  Popular Searches
                </h2>
                <div className="flex flex-wrap items-center gap-2.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="glass-pill rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-gray-200 transition-all hover:text-white cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </section>

              {/* Trending Titles Showcase */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-white drop-shadow">
                    Trending on JioHotstar
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {allMovies.slice(0, 6).map((movie) => (
                    <MovieCard
                      key={movie.slug || movie.title || movie.name}
                      movie={movie}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
