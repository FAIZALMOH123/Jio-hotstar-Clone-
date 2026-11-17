import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { defaultCatalog } from "../../data/defaultCatalog";
import {
  FaLaughSquint,
  FaMask,
  FaFire,
  FaChild,
  FaRocket,
  FaGhost,
  FaHeart,
  FaRunning,
  FaDragon,
} from "react-icons/fa";

const categoryList = [
  {
    name: "Comedy",
    icon: FaLaughSquint,
    gradient: "from-amber-500/80 via-orange-600/70 to-rose-600/80",
    description: "Laugh-out-loud hits, family comedies & slapstick classics",
  },
  {
    name: "Super Heroes",
    icon: FaMask,
    gradient: "from-red-600/80 via-rose-700/70 to-indigo-800/80",
    description: "Marvel & DC cinematic universes, vigilantes & defenders",
  },
  {
    name: "Action",
    icon: FaFire,
    gradient: "from-blue-600/80 via-indigo-600/70 to-cyan-500/80",
    description: "High-octane blockbusters, adrenaline & epic chases",
  },
  {
    name: "Kids & Family",
    icon: FaChild,
    gradient: "from-emerald-500/80 via-teal-600/70 to-cyan-600/80",
    description: "Heartwarming adventures for the whole family to enjoy together",
  },
  {
    name: "Sci-Fi & Fantasy",
    icon: FaRocket,
    gradient: "from-purple-600/80 via-violet-700/70 to-pink-600/80",
    description: "Futuristic worlds, time travel, space sagas & mythical beasts",
  },
  {
    name: "Horror & Thriller",
    icon: FaGhost,
    gradient: "from-zinc-800/90 via-stone-900/85 to-red-950/90",
    description: "Chilling suspense, supernatural legends & pulse-pounding scares",
  },
  {
    name: "Romance & Drama",
    icon: FaHeart,
    gradient: "from-pink-600/80 via-rose-600/70 to-red-500/80",
    description: "Passionate love stories, emotional journeys & relatable tales",
  },
  {
    name: "Sports",
    icon: FaRunning,
    gradient: "from-blue-700/80 via-sky-600/70 to-cyan-500/80",
    description: "Live cricket, football tournaments & inspiring sports sagas",
  },
  {
    name: "Anime",
    icon: FaDragon,
    gradient: "from-fuchsia-600/80 via-purple-700/70 to-indigo-700/80",
    description: "Epic anime series, grand line journeys & timeless animation",
  },
];

const languageHubs = [
  { name: "Hindi", count: "500+ Movies" },
  { name: "English", count: "400+ Movies" },
  { name: "Tamil", count: "300+ Movies" },
  { name: "Telugu", count: "350+ Movies" },
  { name: "Malayalam", count: "150+ Movies" },
  { name: "Bengali", count: "100+ Movies" },
  { name: "Marathi", count: "120+ Movies" },
  { name: "Kannada", count: "140+ Movies" },
];

const Categories = () => {
  const navigate = useNavigate();
  const { movies: contextMovies } = useMovies();
  const allMovies = contextMovies && contextMovies.length > 0 ? contextMovies : defaultCatalog;
  const [selectedCat, setSelectedCat] = useState(null);

  const handleOpenCategory = (cat) => {
    setSelectedCat(cat);
  };

  const matchingMovies = selectedCat
    ? allMovies.filter(
        (m) =>
          m.genres?.some((g) =>
            g.toLowerCase().includes(selectedCat.name.toLowerCase())
          ) ||
          m.description
            ?.toLowerCase()
            .includes(selectedCat.name.toLowerCase())
      )
    : [];

  const displayMatching = matchingMovies.length > 0 ? matchingMovies : allMovies.slice(0, 6);

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20 home-page-enter">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow">
              Explore by Categories
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Browse by genres, themes, and regional languages.
            </p>
          </div>

          {/* Selected Category Drill-down */}
          {selectedCat && (
            <div className="glass-panel mb-10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  <span className="glass-button flex h-12 w-12 items-center justify-center rounded-2xl text-sky-400">
                    <selectedCat.icon className="text-2xl" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedCat.name}
                    </h2>
                    <p className="text-xs text-gray-300">
                      {selectedCat.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/newjio?category=${encodeURIComponent(selectedCat.name)}`
                      )
                    }
                    className="glass-button-primary rounded-xl px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                  >
                    View in Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCat(null)}
                    className="glass-button rounded-xl px-4 py-2 text-xs font-semibold text-gray-200 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Matching Titles Grid with MovieCard format */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {displayMatching.map((m) => (
                  <MovieCard key={m.slug || m.title || m.name} movie={m} />
                ))}
              </div>
            </div>
          )}

          {/* Categories Grid with Liquid Glass Aesthetic */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryList.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => handleOpenCategory(cat)}
                  className={`glass-panel group relative cursor-pointer overflow-hidden rounded-3xl bg-linear-to-br ${cat.gradient} p-7 shadow-2xl transition-all duration-300 hover:scale-[1.03]`}
                >
                  <div className="relative z-10 flex flex-col justify-between h-36">
                    <div className="flex items-center justify-between">
                      <span className="glass-button flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform">
                        <Icon className="text-2xl" />
                      </span>
                      <span className="glass-pill rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Explore →
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wide text-white drop-shadow-md">
                        {cat.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/90 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Languages Hub with Glass Cards */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
              Browse by Language
            </h2>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
              {languageHubs.map((lang) => (
                <div
                  key={lang.name}
                  onClick={() =>
                    navigate("/search", { state: { query: lang.name } })
                  }
                  className="glass-card group cursor-pointer rounded-2xl p-4 text-center shadow-lg movie-card-lift"
                >
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {lang.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-400">{lang.count}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Categories;
