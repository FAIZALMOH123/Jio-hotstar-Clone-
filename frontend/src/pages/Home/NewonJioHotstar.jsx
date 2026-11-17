import { useMemo, useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { defaultCatalog } from "../../data/defaultCatalog";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CATEGORY_TABS = [
  { id: "all", label: "All Movies" },
  { id: "top10", label: "Top 10", match: "top 10" },
  { id: "action", label: "Action & Sci-Fi", match: "action" },
  { id: "crime", label: "Crime & Thriller", match: "crime" },
  { id: "feelgood", label: "Feel-Good Comedy", match: "feel-good" },
  { id: "romance", label: "Romance & Drama", match: "romance" },
  { id: "adventure", label: "Adventure & Fantasy", match: "adventure" },
];

const NewonJioHotstar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies: contextMovies, error, reloadMovies } = useMovies();

  const allMovies = useMemo(() => {
    return contextMovies && contextMovies.length > 0 ? contextMovies : defaultCatalog;
  }, [contextMovies]);

  const initialCategory = searchParams.get("category") || location.state?.category || "All Movies";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const param = searchParams.get("category") || location.state?.category;
    if (param) {
      setSelectedCategory(param);
    }
  }, [searchParams, location.state]);

  const displayMovies = useMemo(() => {
    const cat = selectedCategory.toLowerCase();

    if (cat.includes("top 10") || cat === "top10") {
      return allMovies.slice(0, 10);
    }

    if (cat.includes("action") || cat.includes("sci-fi") || cat === "action") {
      const filtered = allMovies.filter((m) =>
        m.genres?.some((g) =>
          ["Action", "Sci-Fi", "Science Fiction", "Super Heroes", "Kaiju", "Martial Arts"].includes(g)
        )
      );
      return filtered.length > 0 ? filtered : allMovies;
    }

    if (cat.includes("crime") || cat.includes("thriller") || cat.includes("psychological") || cat === "crime") {
      const filtered = allMovies.filter((m) =>
        m.genres?.some((g) =>
          ["Thriller", "Horror", "Mystery", "Crime", "Supernatural"].includes(g)
        )
      );
      return filtered.length > 0 ? filtered : allMovies;
    }

    if (cat.includes("feel-good") || cat.includes("comedy") || cat.includes("family") || cat === "feelgood") {
      const filtered = allMovies.filter((m) =>
        m.genres?.some((g) =>
          ["Comedy", "Family", "Kids", "Animation", "Children", "Dramedy"].includes(g)
        )
      );
      return filtered.length > 0 ? filtered : allMovies;
    }

    if (cat.includes("romance") || cat.includes("emotional") || cat.includes("drama") || cat === "romance") {
      const filtered = allMovies.filter((m) =>
        m.genres?.some((g) => ["Romance", "Drama"].includes(g))
      );
      return filtered.length > 0 ? filtered : allMovies;
    }

    if (cat.includes("adventure") || cat.includes("fantasy") || cat === "adventure") {
      const filtered = allMovies.filter((m) =>
        m.genres?.some((g) =>
          ["Adventure", "Fantasy", "Epic", "Super Heroes"].includes(g)
        )
      );
      return filtered.length > 0 ? filtered : allMovies;
    }

    return allMovies;
  }, [allMovies, selectedCategory]);

  const handleTabClick = (tab) => {
    setSelectedCategory(tab.label);
    setSearchParams({ category: tab.label });
  };

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent pl-0 text-white md:pl-20 home-page-enter">
      <Navbar />
      <main className="min-h-screen min-w-0 flex-1 px-4 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center justify-between">
            <Link
              to="/home"
              className="glass-button inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-200 transition-colors hover:text-white cursor-pointer"
            >
              <FaArrowLeft aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="mb-5 mt-6 text-center sm:mb-8 sm:mt-10">
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl drop-shadow">
              {selectedCategory}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-300">
              Showing {displayMovies.length} blockbusters in 4K UHD & Dolby Audio
            </p>
          </div>

          {/* Interactive Category Chips */}
          <div className="mb-6 sm:mb-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 hide-scrollbar smooth-scroll-x px-1">
            {CATEGORY_TABS.map((tab) => {
              const isActive =
                selectedCategory.toLowerCase().includes(tab.match || "_____") ||
                selectedCategory.toLowerCase() === tab.label.toLowerCase() ||
                (tab.id === "all" &&
                  (selectedCategory === "All Movies" ||
                    selectedCategory === "New on JioHotstar" ||
                    !CATEGORY_TABS.some(
                      (t) =>
                        t.match &&
                        selectedCategory.toLowerCase().includes(t.match)
                    )));
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "glass-pill-active shadow-md"
                      : "glass-pill text-gray-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {error && (
            <div role="alert" className="glass-panel mb-6 rounded-xl p-4 text-sm text-rose-200">
              {error}{" "}
              <button type="button" onClick={reloadMovies} className="ml-2 underline font-semibold">
                Retry
              </button>
            </div>
          )}

          {/* Full Grid of Movie Cards */}
          <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {displayMovies.map((movie, index) => (
              <MovieCard
                key={movie.slug || movie.title || movie.name}
                movie={movie}
                rank={selectedCategory.toLowerCase().includes("top 10") ? index + 1 : undefined}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewonJioHotstar;
