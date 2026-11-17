import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
const heroGodzilla = "/images/godzilla-minus-zero-3840x2160-27257.jpg";
import { FaPlay, FaCircle, FaCalendarAlt, FaTrophy } from "react-icons/fa";

const sportsCategories = [
  "All",
  "Cricket",
  "Football",
  "Formula 1",
  "Tennis",
  "Kabaddi",
  "Badminton",
  "Martial Arts",
];

const liveMatches = [
  {
    title: "India vs Australia - 2nd ODI",
    tournament: "Australia Tour of India 2026",
    sport: "Cricket",
    status: "LIVE",
    score: "IND 284/4 (42.3 ov) · AUS yet to bat",
    venue: "Wankhede Stadium, Mumbai",
    image: heroGodzilla,
    description:
      "Watch live coverage of the 2nd ODI between India and Australia with multi-camera angles, expert analysis, and Hindi/English commentary.",
  },
  {
    title: "Arsenal vs Chelsea",
    tournament: "Premier League 2026",
    sport: "Football",
    status: "LIVE 64'",
    score: "ARS 2 - 1 CHE",
    venue: "Emirates Stadium, London",
    image: heroGodzilla,
    description:
      "London Derby live stream. Arsenal takes on Chelsea in a high-stakes title race showdown.",
  },
];

const highlights = [
  {
    title: "Virat Kohli's Masterclass 112 (98)",
    match: "India vs Australia - 1st ODI Highlights",
    duration: "14m",
    views: "2.4M views",
  },
  {
    title: "Top 10 Goals of Matchweek 28",
    match: "Premier League Highlights",
    duration: "9m",
    views: "890K views",
  },
  {
    title: "Monaco GP: Final Lap Drama",
    match: "Formula 1 2026 Highlights",
    duration: "12m",
    views: "1.1M views",
  },
  {
    title: "All Boundaries & Sixes Recap",
    match: "IPL 2026 Season Teaser",
    duration: "8m",
    views: "3.7M views",
  },
];

const upcomingMatches = [
  {
    teams: "India vs England",
    event: "ICC World Cup Semi-Final",
    date: "Tomorrow · 2:00 PM IST",
    sport: "Cricket",
  },
  {
    teams: "Real Madrid vs Manchester City",
    event: "UEFA Champions League Quarter-Final",
    date: "Wednesday · 12:30 AM IST",
    sport: "Football",
  },
  {
    teams: "Bahrain Grand Prix - Qualifying",
    event: "Formula 1 2026",
    date: "Friday · 6:30 PM IST",
    sport: "Formula 1",
  },
];

const Sports = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState("All");

  const activeLive = liveMatches[0];

  const handleWatchLive = (match) => {
    navigate("/watch", {
      state: {
        movie: {
          title: match.title,
          studio: match.tournament,
          year: "2026",
          rating: "U",
          duration: "Live",
          quality: "4K 60FPS",
          languages: ["Hindi", "English", "Tamil", "Telugu", "Kannada"],
          genres: ["Sports", match.sport, "Live Stream"],
          description: match.description,
          image: match.image,
        },
        autoPlay: true,
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden pb-24">
        {/* Live Sports Featured Banner */}
        <section className="relative h-[65vh] min-h-120 w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={activeLive.image}
              alt={activeLive.title}
              className="h-full w-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050811] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 sm:px-12 lg:px-16">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-pulse">
                <FaCircle className="text-[8px]" />
                LIVE
              </span>
              <span className="glass-pill rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
                {activeLive.tournament}
              </span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white drop-shadow-xl">
              {activeLive.title}
            </h1>

            <div className="glass-panel mt-4 rounded-2xl px-5 py-4 max-w-lg">
              <p className="text-base sm:text-xl font-bold text-amber-300 drop-shadow">
                {activeLive.score}
              </p>
              <p className="mt-1 text-xs text-gray-300">{activeLive.venue}</p>
            </div>

            <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-2">
              {activeLive.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleWatchLive(activeLive)}
                className="glass-button-primary inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl cursor-pointer"
              >
                <FaPlay className="text-xs" />
                <span>Watch Live in 4K</span>
              </button>

              <button
                type="button"
                onClick={() => handleWatchLive(liveMatches[1])}
                className="glass-button inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-semibold text-white cursor-pointer"
              >
                <span>Football: Arsenal vs Chelsea</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sports Category Pills */}
        <div className="px-4 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {sportsCategories.map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => setSelectedSport(sport)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedSport === sport
                    ? "glass-pill-active shadow-md"
                    : "glass-pill text-gray-300 hover:text-white"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Live & Upcoming Matches Grid */}
        <section className="px-4 pt-8 sm:px-8 lg:px-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 drop-shadow">
              <FaTrophy className="text-amber-400 text-lg drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              Live & Upcoming Action
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map((m) => (
              <div
                key={m.title}
                onClick={() => handleWatchLive(m)}
                className="glass-card group relative cursor-pointer rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    <FaCircle className="text-[6px] animate-pulse" />
                    {m.status}
                  </span>
                  <span className="glass-pill rounded-full px-2.5 py-0.5 text-xs text-gray-300 font-medium">
                    {m.sport}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-sm font-semibold text-amber-300">
                  {m.score}
                </p>
                <p className="mt-2 text-xs text-gray-300">{m.venue}</p>

                <button
                  type="button"
                  className="glass-button-primary mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
                >
                  <FaPlay className="text-[10px]" />
                  <span>Stream Now</span>
                </button>
              </div>
            ))}

            {upcomingMatches.map((up) => (
              <div
                key={up.teams}
                className="glass-panel rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-400">
                    <FaCalendarAlt className="text-[10px]" />
                    Upcoming
                  </span>
                  <span className="glass-pill rounded-full px-2.5 py-0.5 text-xs text-gray-300 font-medium">
                    {up.sport}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">
                  {up.teams}
                </h3>
                <p className="mt-1 text-xs text-gray-300">{up.event}</p>
                <p className="mt-3 text-xs font-semibold text-amber-400">
                  {up.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Match Highlights */}
        <section className="px-4 pt-10 sm:px-8 lg:px-12">
          <h2 className="mb-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
            Top Highlights & Replays
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((hl) => (
              <div
                key={hl.title}
                onClick={() =>
                  navigate("/watch", {
                    state: {
                      movie: {
                        title: hl.title,
                        detail: hl.match,
                        duration: hl.duration,
                        rating: "U",
                        quality: "HD",
                        languages: ["Hindi", "English"],
                        genres: ["Sports", "Highlights"],
                        description: `Relive the best action from ${hl.match}.`,
                        image: heroGodzilla,
                      },
                      autoPlay: true,
                    },
                  })
                }
                className="glass-card group relative cursor-pointer rounded-2xl p-4 shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900">
                  <img
                    src={heroGodzilla}
                    alt={hl.title}
                    className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-950 shadow-xl">
                      <FaPlay className="ml-0.5 text-xs" />
                    </span>
                  </div>
                  <span className="glass-pill absolute bottom-2 right-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white">
                    {hl.duration}
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                  {hl.title}
                </h4>
                <p className="mt-1 text-xs text-gray-400">{hl.match}</p>
                <p className="mt-1 text-[11px] text-gray-500">{hl.views}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sports;
