import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { newReleases, homeAloneMovie } from "../../data/newReleases";
import { FaSearch, FaTimes, FaPlay, FaFire } from "react-icons/fa";

const popularSearches = [
  "Home Alone",
  "Deadpool & Wolverine",
  "Godzilla Minus Zero",
  "Avengers",
  "Cricket",
  "Shaadi Mein Zaroor Aana",
  "Hum Do Hamare Do",
  "One Piece",
  "Action",
  "Comedy",
];

const allSearchData = [
  homeAloneMovie,
  ...newReleases,
  {
    title: "Deadpool & Wolverine",
    detail: "2024 · Super Heroes · Action",
    year: "2024",
    rating: "U/A 16+",
    duration: "2h 7m",
    quality: "HD",
    image: newReleases[4]?.image || homeAloneMovie.image,
    description:
      "Wade is pulled out of his quiet life and into an unlikely mission with Wolverine.",
    genres: ["Super Heroes", "Action", "Adventure", "Comedy"],
    languages: ["Hindi", "English", "Tamil"],
  },
  {
    title: "Spider-Man: Brand New Day",
    detail: "2026 · Super Heroes · Action",
    year: "2026",
    rating: "U/A 13+",
    duration: "2h 15m",
    quality: "HD",
    image: newReleases[3]?.image || homeAloneMovie.image,
    description:
      "A new day begins for Peter Parker across New York City.",
    genres: ["Super Heroes", "Action", "Adventure"],
    languages: ["English", "Hindi"],
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterTabs = ["All", "Movies", "TV Shows", "Trending"];

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allSearchData.filter((item) => {
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchGenres = item.genres?.some((g) => g.toLowerCase().includes(q));
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchLang = Array.isArray(item.languages)
        ? item.languages.some((l) => l.toLowerCase().includes(q))
        : typeof item.languages === "string" && item.languages.toLowerCase().includes(q);

      return matchTitle || matchGenres || matchDesc || matchLang;
    });
  }, [query]);

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Liquid Glass Search Bar */}
          <div className="relative mx-auto max-w-3xl">
            <div className="glass-input relative flex items-center rounded-3xl p-1 shadow-2xl transition-all">
              <FaSearch className="ml-5 text-lg text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Movies, shows, sports and more..."
                className="w-full bg-transparent px-4 py-4 text-base sm:text-lg text-white placeholder-gray-400 outline-none"
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
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {filteredResults.map((item, idx) => (
                    <article
                      key={`${item.title}-${idx}`}
                      onClick={() =>
                        navigate("/watch", { state: { movie: item } })
                      }
                      className="glass-card group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                    >
                      <div className="aspect-3/4 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="glass-panel absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-950 mb-2 shadow-xl">
                            <FaPlay className="ml-0.5 text-xs" />
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-gray-300">
                            {item.detail || item.duration}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="glass-panel mt-12 rounded-3xl py-16 text-center">
                  <p className="text-lg font-bold text-gray-300">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Try searching for &quot;Home Alone&quot;, &quot;Deadpool&quot;, &quot;Godzilla&quot;, or &quot;Action&quot;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* If No Query -> Show Popular Searches & Explore Section */
            <div className="mt-12 max-w-4xl mx-auto space-y-12">
              {/* Popular Searches */}
              <section className="glass-panel rounded-3xl p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <FaFire className="text-amber-400 text-lg drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    Popular Searches
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
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
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {newReleases.slice(0, 6).map((movie) => (
                    <article
                      key={movie.title}
                      onClick={() =>
                        navigate("/watch", { state: { movie } })
                      }
                      className="glass-card group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                    >
                      <div className="aspect-3/4 w-full overflow-hidden">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="glass-panel absolute inset-0 flex flex-col justify-end p-2.5 opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-950 mb-1 shadow-lg">
                            <FaPlay className="ml-0.5 text-[9px]" />
                          </span>
                          <h3 className="text-xs font-bold text-white line-clamp-1">
                            {movie.title}
                          </h3>
                        </div>
                      </div>
                    </article>
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
