import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
const lanternsImage = "/images/lanterns-tv-series-3840x2160-27196.jpg";
const onePieceImage = "/images/one-piece-season-2-1080x1920-23673.jpg";
const avatarImage = "/images/avatar-aang-the-3840x2160-27059.jpg";
import { useMovies } from "../../hooks/useMovies";
import { FaPlay } from "react-icons/fa";

const featuredShows = [
  {
    title: "Lanterns",
    studio: "DC Studios · HBO",
    image: lanternsImage,
    year: "2026",
    rating: "U/A 16+",
    duration: "Season 1 · 8 Episodes",
    detail: "Mystery · Sci-Fi · Super Heroes",
    genres: ["Mystery", "Sci-Fi", "Super Heroes", "Drama"],
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    description:
      "Two intergalactic cops, Hal Jordan and John Stewart, are drawn into a dark, earth-bound mystery while investigating a murder in the American heartland.",
    quality: "4K HDR",
  },
  {
    title: "One Piece: Season 2",
    studio: "Tomorrow Studios",
    image: onePieceImage,
    year: "2026",
    rating: "U/A 13+",
    duration: "Season 2 · 8 Episodes",
    detail: "Adventure · Fantasy · Action",
    genres: ["Adventure", "Fantasy", "Action"],
    languages: ["English", "Japanese", "Hindi"],
    description:
      "Monkey D. Luffy and the Straw Hat Pirates set sail for the legendary Grand Line, confronting dangerous foes, ancient secrets, and unexpected allies.",
    quality: "HD",
  },
  {
    title: "Avatar: The Last Airbender",
    studio: "Nickelodeon Studios",
    image: avatarImage,
    year: "2025",
    rating: "U/A 13+",
    duration: "Season 1 · 8 Episodes",
    detail: "Fantasy · Adventure · Action",
    genres: ["Fantasy", "Adventure", "Action", "Drama"],
    languages: ["English", "Hindi", "Tamil"],
    description:
      "A young boy known as the Avatar must master the four elemental powers to save a world at war and fight a ruthless enemy bent on stopping him.",
    quality: "4K UHD",
  },
];

const getBingeWorthyShows = (newReleases) => [
  ...featuredShows,
  {
    title: "Special OPS",
    studio: "Hotstar Specials",
    image: newReleases[2]?.image || lanternsImage,
    year: "2024",
    rating: "U/A 16+",
    duration: "2 Seasons",
    detail: "Espionage · Action Thriller",
    genres: ["Action", "Thriller", "Crime"],
    languages: ["Hindi", "English", "Tamil", "Telugu"],
    description:
      "Himmat Singh of Research and Analysis Wing draws similarities in nineteen years of terror attacks, leading a hunt for the single mastermind.",
    quality: "HD",
  },
  {
    title: "Aarya",
    studio: "Hotstar Specials",
    image: newReleases[1]?.image || lanternsImage,
    year: "2024",
    rating: "A",
    duration: "3 Seasons",
    detail: "Crime · Drama · Suspense",
    genres: ["Crime", "Drama", "Thriller"],
    languages: ["Hindi", "Bengali", "Marathi"],
    description:
      "When her world is suddenly turned upside down, Aarya takes the reins to protect her family from a dangerous criminal syndicate.",
    quality: "HD",
  },
  {
    title: "Loki: The Multiverse Saga",
    studio: "Marvel Studios",
    image: newReleases[3]?.image || lanternsImage,
    year: "2023",
    rating: "U/A 13+",
    duration: "2 Seasons · 12 Episodes",
    detail: "Sci-Fi · Fantasy · Super Heroes",
    genres: ["Super Heroes", "Sci-Fi", "Adventure"],
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    description:
      "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.",
    quality: "4K HDR",
  },
];

const categories = [
  "All",
  "Drama",
  "Thriller",
  "Comedy",
  "Sci-Fi",
  "Anime",
  "Action",
  "Documentary",
];

const Shows = () => {
  const navigate = useNavigate();
  const { movies: newReleases } = useMovies();
  const bingeWorthyShows = getBingeWorthyShows(newReleases);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeShowIdx, setActiveShowIdx] = useState(0);

  const currentHero = featuredShows[activeShowIdx] || featuredShows[0];

  const animeSeries = [newReleases[5], newReleases[7], featuredShows[1], featuredShows[2]].filter(Boolean);

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20 home-page-enter">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden pb-24">
        {/* Shows Hero Showcase */}
        <section className="relative h-[65vh] min-h-120 w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={currentHero.image}
              alt={currentHero.title}
              className="h-full w-full object-cover object-center transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050811] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 sm:px-12 lg:px-16">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 drop-shadow">
              {currentHero.studio}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white drop-shadow-xl">
              {currentHero.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-300">
              <span className="glass-pill rounded-lg px-2.5 py-0.5 text-xs font-bold text-gray-200">
                {currentHero.rating}
              </span>
              <span>{currentHero.year}</span>
              <span className="text-gray-500">•</span>
              <span>{currentHero.duration}</span>
              <span className="text-gray-500">•</span>
              <span className="glass-pill rounded-lg border-sky-400/50 text-sky-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                {currentHero.quality}
              </span>
            </div>

            <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-3">
              {currentHero.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate("/watch", {
                    state: { movie: currentHero, autoPlay: true },
                  })
                }
                className="glass-button-primary inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl cursor-pointer"
              >
                <FaPlay className="text-xs" />
                <span>Watch Trailer</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/watch", { state: { movie: currentHero, autoPlay: true } })
                }
                className="glass-button inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-semibold text-white cursor-pointer"
              >
                <span>Show Details</span>
              </button>
            </div>
          </div>

          {/* Hero Indicator Tabs */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            {featuredShows.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActiveShowIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeShowIdx === idx ? "w-8 bg-sky-400 shadow-[0_0_8px_#38bdf8]" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Categories Bar */}
        <div className="px-4 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "glass-pill-active shadow-md"
                    : "glass-pill text-gray-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Binge-Worthy TV Shows */}
        <section className="px-4 pt-8 sm:px-8 lg:px-12">
          <h2 className="mb-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
            Binge-Worthy TV Shows
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {bingeWorthyShows.map((show) => (
              <MovieCard
                key={show.slug || show.title}
                movie={show}
              />
            ))}
          </div>
        </section>

        {/* Anime & Animation Showcase */}
        {animeSeries.length > 0 && (
          <section className="px-4 pt-10 sm:px-8 lg:px-12">
            <h2 className="mb-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
              Anime & International Series
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {animeSeries.map((item) => (
                <MovieCard
                  key={item.slug || item.title}
                  movie={item}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Shows;
