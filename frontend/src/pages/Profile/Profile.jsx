import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { homeAloneMovie, newReleases } from "../../data/newReleases";
import {
  FaUserCircle,
  FaCrown,
  FaPlay,
  FaTrashAlt,
  FaDownload,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("watchlist");

  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@jiohotstar.com",
    plan: "Super Plan · Annual",
    status: "Active · Renews Oct 2027",
    devices: "Up to 2 Devices (Full HD 1080p)",
  };

  const [watchlist, setWatchlist] = useState([
    homeAloneMovie,
    newReleases[1],
    newReleases[2],
    newReleases[3],
  ]);

  const continueWatching = [
    {
      movie: homeAloneMovie,
      progress: 68,
      timeLeft: "32m left",
    },
    {
      movie: newReleases[4] || homeAloneMovie,
      progress: 42,
      timeLeft: "1h 12m left",
    },
    {
      movie: newReleases[0] || homeAloneMovie,
      progress: 85,
      timeLeft: "18m left",
    },
  ];

  const handleRemoveFromWatchlist = (e, title) => {
    e.stopPropagation();
    setWatchlist((prev) => prev.filter((m) => m.title !== title));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          {/* User Profile Card with Liquid Glass Panel */}
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <div className="flex h-18 w-18 sm:h-22 sm:w-22 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-indigo-600 text-white shadow-2xl shadow-sky-500/30">
                    <FaUserCircle className="text-5xl sm:text-6xl" />
                  </div>
                  <span className="absolute bottom-0 right-0 rounded-full bg-amber-400 p-1.5 text-gray-950 shadow-md">
                    <FaCrown className="text-xs" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow">
                      {user.name}
                    </h1>
                    <span className="glass-pill-active rounded-full px-3 py-0.5 text-[11px] font-bold uppercase">
                      Subscribed
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs sm:text-sm text-gray-300">
                    {user.email}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-amber-300 drop-shadow">
                    ★ {user.plan} ({user.status})
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="glass-button inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-300 hover:text-white cursor-pointer"
                >
                  <FaSignOutAlt />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex items-center border-b border-white/10 overflow-x-auto pb-0.5 hide-scrollbar">
            {[
              { id: "watchlist", label: `My Watchlist (${watchlist.length})` },
              { id: "continue", label: "Continue Watching" },
              { id: "downloads", label: "Downloads" },
              { id: "settings", label: "Account Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Watchlist */}
          {activeTab === "watchlist" && (
            <div className="mt-6">
              {watchlist.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {watchlist.map((m) => (
                    <article
                      key={m.title}
                      onClick={() => navigate("/watch", { state: { movie: m } })}
                      className="glass-card group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                    >
                      <div className="aspect-3/4 w-full overflow-hidden">
                        <img
                          src={m.image}
                          alt={m.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="glass-panel absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-950 mb-1.5 shadow-xl">
                            <FaPlay className="text-[10px] ml-0.5" />
                          </span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {m.title}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveFromWatchlist(e, m.title)}
                            className="mt-2 flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300"
                          >
                            <FaTrashAlt />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-3xl py-14 text-center">
                  <p className="text-base font-bold text-gray-300">
                    Your Watchlist is empty
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Tap the &quot;+ My List&quot; button on any movie to save it here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Continue Watching */}
          {activeTab === "continue" && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {continueWatching.map((item) => (
                <div
                  key={item.movie.title}
                  onClick={() =>
                    navigate("/watch", {
                      state: { movie: item.movie, autoPlay: true },
                    })
                  }
                  className="glass-card group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={item.movie.image}
                      alt={item.movie.title}
                      className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <span className="glass-button flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl">
                        <FaPlay className="ml-0.5 text-sm" />
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20">
                      <div
                        className="h-full bg-linear-to-r from-sky-400 to-blue-500 shadow-[0_0_8px_#38bdf8]"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                        {item.movie.title}
                      </h3>
                      <p className="text-xs text-gray-300">{item.timeLeft}</p>
                    </div>
                    <span className="glass-pill rounded-lg px-3 py-1 text-xs font-semibold text-gray-200">
                      Resume
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Downloads */}
          {activeTab === "downloads" && (
            <div className="glass-panel mt-6 rounded-3xl p-8 text-center">
              <FaDownload className="mx-auto text-3xl text-sky-400 mb-3 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <h3 className="text-base font-bold text-white">
                No active downloads
              </h3>
              <p className="mt-1 text-xs text-gray-300 max-w-sm mx-auto">
                Download movies and series over Wi-Fi to watch them offline anytime without internet connection.
              </p>
            </div>
          )}

          {/* Tab 4: Account Settings */}
          {activeTab === "settings" && (
            <div className="glass-panel mt-6 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-gray-200 space-y-4 max-w-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-bold text-white">Streaming Quality</h4>
                  <p className="text-xs text-gray-300">
                    Currently set to Auto (Up to 4K UHD 60fps)
                  </p>
                </div>
                <button
                  type="button"
                  className="glass-pill rounded-lg px-3 py-1.5 text-xs text-sky-400 hover:text-white cursor-pointer"
                >
                  Manage
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-bold text-white">Default Audio & Subs</h4>
                  <p className="text-xs text-gray-300">
                    Audio: English [Original] · Subtitles: Off
                  </p>
                </div>
                <button
                  type="button"
                  className="glass-pill rounded-lg px-3 py-1.5 text-xs text-sky-400 hover:text-white cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-bold text-white">Parental Controls</h4>
                  <p className="text-xs text-gray-300">
                    Restricted content rating PIN: Not configured
                  </p>
                </div>
                <button
                  type="button"
                  className="glass-pill rounded-lg px-3 py-1.5 text-xs text-sky-400 hover:text-white cursor-pointer"
                >
                  Set PIN
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="glass-button flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-bold text-rose-300 hover:text-white cursor-pointer"
                >
                  <FaSignOutAlt />
                  <span>Sign Out of All Devices</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
