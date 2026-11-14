import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import {
  homeAloneMovie,
  moreLikeThisHomeAlone,
  newReleases,
} from "../../data/newReleases";
import {
  FaPlay,
  FaPause,
  FaUndo,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaTimes,
  FaPlus,
  FaCheck,
  FaPaperPlane,
  FaFlag,
  FaDownload,
  FaClosedCaptioning,
  FaArrowLeft,
  FaMobileAlt,
  FaDesktop,
} from "react-icons/fa";

const Watch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Active movie: state movie if provided, or default to Home Alone (matching reference)
  const [movie, setMovie] = useState(() => {
    if (location.state?.movie) {
      const m = location.state.movie;
      return {
        title: m.title || m.name || homeAloneMovie.title,
        studio: m.studio || "JioHotstar",
        image: m.image || homeAloneMovie.image,
        year: m.year || "1990",
        rating: m.rating || "U/A 7+",
        duration: m.duration || m.detail || "1h 42m",
        quality: m.quality || "HD",
        languages: Array.isArray(m.languages)
          ? m.languages
          : typeof m.languages === "string"
          ? m.languages.split(",").map((s) => s.trim())
          : ["Thai", "Indonesian", "English"],
        description: m.description || homeAloneMovie.description,
        genres: Array.isArray(m.genres)
          ? m.genres
          : ["Adventure", "Kids", "Comedy", "Dramedy", "Drama"],
        director: m.director || "Chris Columbus",
        starring:
          m.starring ||
          "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard, Catherine O'Hara",
        advisory: m.advisory || "Slapstick Violence, Mild Comic Language",
      };
    }
    return homeAloneMovie;
  });

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Responsive view toggle: 'auto' (responsive across mobile/tablet/desktop) vs 'phone' (simulated phone frame)
  const [deviceMode, setDeviceMode] = useState("auto");

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState("English [Original]");
  const [selectedSubtitles, setSelectedSubtitles] = useState("Off");
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState("moreLikeThis");

  // Interaction states
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Sync when navigation state changes
  useEffect(() => {
    if (location.state?.movie) {
      const m = location.state.movie;
      const genres = Array.isArray(m.genres)
        ? m.genres
        : m.detail && typeof m.detail === "string"
        ? m.detail
            .split("·")
            .slice(1)
            .map((s) => s.trim())
        : ["Adventure", "Comedy"];

      setMovie({
        title: m.title || m.name || homeAloneMovie.title,
        studio: m.studio || "JioHotstar",
        image: m.image || homeAloneMovie.image,
        year: m.year || "1990",
        rating: m.rating || "U/A 7+",
        duration: m.duration || m.detail || "1h 42m",
        quality: m.quality || "HD",
        languages: Array.isArray(m.languages)
          ? m.languages
          : typeof m.languages === "string"
          ? m.languages.split(",").map((s) => s.trim())
          : ["Thai", "Indonesian", "English"],
        description: m.description || homeAloneMovie.description,
        genres: genres.length > 0 ? genres : ["Adventure", "Comedy"],
        director: m.director || "Chris Columbus",
        starring:
          m.starring ||
          "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard, Catherine O'Hara",
        advisory: m.advisory || "Slapstick Violence, Mild Comic Language",
      });

      if (location.state?.autoPlay && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.state]);

  // Video playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 120);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const skipSeconds = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration || 1000
      );
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Select movie from "More Like This"
  const handleSelectMovie = (newMovie) => {
    setMovie({
      title: newMovie.title,
      studio: newMovie.studio || "JioHotstar",
      image: newMovie.image,
      year: newMovie.year || "2024",
      rating: newMovie.rating || "U/A 13+",
      duration: newMovie.duration || newMovie.detail || "2h 00m",
      quality: newMovie.quality || "HD",
      languages: Array.isArray(newMovie.languages)
        ? newMovie.languages
        : ["Hindi", "English"],
      description: newMovie.description || homeAloneMovie.description,
      genres: newMovie.genres || ["Drama", "Action"],
      director: newMovie.director || "Director",
      starring: newMovie.starring || "Lead Cast",
      advisory: newMovie.advisory || "General Entertainment",
    });

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Action handlers
  const toggleWatchlist = () => {
    setIsWatchlisted((prev) => !prev);
    triggerToast(
      !isWatchlisted
        ? `Added "${movie.title}" to My List`
        : `Removed "${movie.title}" from My List`
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast("Link copied to clipboard!");
  };

  const handleDownload = () => {
    triggerToast(`Downloading "${movie.title}" in 1080p HD...`);
  };

  // Filter out the active movie from recommendations
  const recommendedMovies = newReleases.filter(
    (item) => item.title.toLowerCase() !== movie.title.toLowerCase()
  );

  const isHomeAlone = movie.title.toLowerCase().includes("home alone");

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20">
      <Navbar />

      <main className="relative min-w-0 flex-1 overflow-x-hidden pb-24 watch-page-enter">
        {/* Glass Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full glass-panel border border-sky-400/40 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xl backdrop-blur-2xl flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Liquid Glass Control Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between glass-header px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="glass-button inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-200 transition-colors hover:text-white cursor-pointer"
            >
              <FaArrowLeft aria-hidden="true" />
              <span>Back</span>
            </button>
            <div className="hidden h-4 w-px bg-white/20 sm:block" />
            <span className="hidden truncate text-sm font-bold text-white sm:inline-block max-w-xs drop-shadow">
              {movie.title}
            </span>
          </div>

          {/* Device View Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center rounded-xl glass-panel p-1 text-xs">
              <button
                type="button"
                onClick={() => setDeviceMode("auto")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                  deviceMode === "auto"
                    ? "glass-pill-active text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FaDesktop className="text-xs" />
                <span>Responsive</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("phone")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                  deviceMode === "phone"
                    ? "glass-pill-active text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FaMobileAlt className="text-xs" />
                <span>Mobile Frame</span>
              </button>
            </div>

            <span className="glass-pill rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
              {movie.rating}
            </span>
            <span className="glass-pill rounded-lg border-sky-400/40 text-sky-300 px-2.5 py-0.5 text-xs font-bold uppercase">
              {movie.quality}
            </span>
          </div>
        </header>

        {/* Outer Dynamic Responsive Layout */}
        <div
          className={`mx-auto w-full transition-all duration-300 ${
            deviceMode === "phone"
              ? "max-w-md px-3 pt-4 sm:pt-6"
              : "max-w-[1440px] px-3 sm:px-6 lg:px-10 pt-3 sm:pt-6"
          }`}
        >
          {/* Main Card Container */}
          <div
            className={
              deviceMode === "phone"
                ? "glass-panel rounded-3xl p-3 sm:p-5 shadow-2xl"
                : "w-full"
            }
          >
            {/* Top Video Player Frame */}
            <section className="relative w-full">
              <div
                ref={playerContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
                className={`group relative w-full overflow-hidden rounded-2xl glass-panel shadow-2xl shadow-black/80 ${
                  deviceMode === "phone"
                    ? "aspect-16/10"
                    : "aspect-16/9 sm:aspect-21/9 lg:aspect-video max-h-[70vh]"
                }`}
              >
                {/* Glass Close Button '✕' in Top-Right Corner */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Close"
                  className="glass-button absolute top-3 right-3 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white cursor-pointer shadow-lg"
                >
                  <FaTimes className="text-sm sm:text-base" />
                </button>

                {/* Video Element */}
                <video
                  ref={videoRef}
                  poster={movie.image}
                  className="h-full w-full object-cover cursor-pointer"
                  playsInline
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/navbar-reference.mp4" type="video/mp4" />
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>

                {/* Glass Play Overlay when video is paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all cursor-pointer hover:bg-black/45"
                  >
                    <button
                      type="button"
                      aria-label="Play"
                      className="glass-button flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95 shadow-2xl"
                    >
                      <FaPlay className="ml-1 text-xl sm:text-2xl text-white fill-current" />
                    </button>
                  </div>
                )}

                {/* Liquid Glass Video Controls Bar */}
                <div
                  className={`glass-panel absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-b-2xl p-3 sm:p-5 transition-opacity duration-300 ${
                    showControls && isPlaying
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {/* Progress Seekbar */}
                  <div className="relative mb-2 sm:mb-3 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-sky-400 transition-all hover:h-2.5"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="cursor-pointer text-base sm:text-lg hover:text-sky-400 transition-colors"
                      >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>

                      <button
                        type="button"
                        onClick={() => skipSeconds(-10)}
                        aria-label="Rewind 10 seconds"
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        <FaUndo />
                      </button>

                      <button
                        type="button"
                        onClick={() => skipSeconds(10)}
                        aria-label="Forward 10 seconds"
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        <FaRedo />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={isMuted ? "Unmute" : "Mute"}
                          className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <FaVolumeMute />
                          ) : (
                            <FaVolumeUp />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="hidden sm:block h-1 w-16 cursor-pointer appearance-none rounded bg-white/30 accent-sky-400"
                        />
                      </div>

                      <span className="text-[11px] sm:text-xs text-gray-300 font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <select
                        value={playbackSpeed}
                        onChange={(e) =>
                          changePlaybackSpeed(parseFloat(e.target.value))
                        }
                        className="glass-pill cursor-pointer rounded-lg px-2 py-0.5 text-xs text-white outline-none"
                      >
                        <option value="0.75" className="bg-gray-900">0.75x</option>
                        <option value="1" className="bg-gray-900">1x</option>
                        <option value="1.25" className="bg-gray-900">1.25x</option>
                        <option value="1.5" className="bg-gray-900">1.5x</option>
                        <option value="2" className="bg-gray-900">2x</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => setShowSettingsModal((prev) => !prev)}
                        aria-label="Audio & Subtitles"
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        <FaClosedCaptioning />
                      </button>

                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label="Toggle Fullscreen"
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Glass Audio & Subtitles Popup Modal */}
                {showSettingsModal && (
                  <div className="glass-panel absolute right-3 bottom-16 z-30 w-64 rounded-2xl p-4 text-xs shadow-2xl backdrop-blur-2xl">
                    <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-white text-xs">
                        Audio & Subtitles
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSettingsModal(false)}
                        className="text-gray-400 hover:text-white font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1.5 font-semibold text-gray-400 text-[10px] uppercase">
                        Audio
                      </p>
                      {["English [Original]", "Hindi", "Tamil", "Telugu"].map(
                        (lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setSelectedAudio(lang)}
                            className={`flex w-full items-center justify-between py-1 text-left ${
                              selectedAudio === lang
                                ? "font-bold text-sky-400"
                                : "text-gray-300 hover:text-white"
                            }`}
                          >
                            <span>{lang}</span>
                            {selectedAudio === lang && (
                              <FaCheck className="text-[10px]" />
                            )}
                          </button>
                        )
                      )}
                    </div>

                    <div>
                      <p className="mb-1.5 font-semibold text-gray-400 text-[10px] uppercase">
                        Subtitles
                      </p>
                      {["Off", "English", "Hindi"].map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSelectedSubtitles(sub)}
                          className={`flex w-full items-center justify-between py-1 text-left ${
                            selectedSubtitles === sub
                              ? "font-bold text-sky-400"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <span>{sub}</span>
                          {selectedSubtitles === sub && (
                            <FaCheck className="text-[10px]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Content Section */}
            <div
              className={`mt-5 sm:mt-8 ${
                deviceMode === "phone"
                  ? "flex flex-col"
                  : "grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start"
              }`}
            >
              {/* Primary Column */}
              <div
                className={
                  deviceMode === "phone" ? "w-full" : "lg:col-span-8 w-full"
                }
              >
                {/* Movie Title Logo Section */}
                <div
                  className={`flex flex-col ${
                    deviceMode === "phone"
                      ? "items-center text-center"
                      : "items-center text-center lg:items-start lg:text-left"
                  }`}
                >
                  {isHomeAlone ? (
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center justify-center gap-1.5 font-serif font-black tracking-wider text-3xl sm:text-5xl text-[#ffd200] drop-shadow-[0_2px_14px_rgba(255,210,0,0.4)]">
                        <span>HOME</span>
                        {/* The Iconic Red House Logo from reference */}
                        <div className="relative inline-flex items-center justify-center mx-1">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-8 w-8 sm:h-11 sm:w-11 text-red-600 fill-current drop-shadow-[0_2px_8px_rgba(220,38,38,0.5)]"
                          >
                            <path d="M12 3L2 12h3v9h14v-9h3L12 3zm-1 12h2v4h-2v-4z" />
                          </svg>
                        </div>
                        <span>ALONE</span>
                      </div>
                      <div className="h-0.5 w-44 sm:w-64 bg-red-600 mt-1 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                    </div>
                  ) : (
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide text-white drop-shadow-md">
                      {movie.title}
                    </h1>
                  )}

                  {/* Metadata Badges with Glass Pills */}
                  <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-semibold text-gray-300">
                    <span>{movie.year}</span>
                    <span className="text-gray-500">•</span>
                    <span className="glass-pill px-2.5 py-0.5 text-xs font-bold text-gray-300 rounded-md">
                      {movie.rating}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span>{movie.duration}</span>
                    <span className="text-gray-500">•</span>
                    <span className="glass-pill px-2 py-0.5 text-[11px] font-bold text-gray-400 uppercase rounded-md">
                      {movie.quality}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">Dolby 5.1</span>
                  </div>
                </div>

                {/* THE "▶ Watch Now" LIQUID GLASS GRADIENT BUTTON */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="glass-button-primary group relative flex flex-1 items-center justify-center gap-3 rounded-2xl py-3.5 sm:py-4 px-8 text-base sm:text-lg font-bold text-white cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <FaPause className="text-sm fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <FaPlay className="text-sm fill-current ml-0.5" />
                        <span>Watch Now</span>
                      </>
                    )}
                  </button>

                  {/* Desktop Quick Action Buttons Pill */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleWatchlist}
                      title="Add to My List"
                      className={`glass-button flex h-12 w-12 items-center justify-center rounded-2xl transition-all cursor-pointer ${
                        isWatchlisted
                          ? "border-sky-400 bg-sky-500/25 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {isWatchlisted ? <FaCheck /> : <FaPlus />}
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      title="Share Title"
                      className="glass-button flex h-12 w-12 items-center justify-center rounded-2xl text-gray-300 hover:text-white cursor-pointer"
                    >
                      <FaPaperPlane className="-rotate-12" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowReportModal(true)}
                      title="Report Problem"
                      className="glass-button flex h-12 w-12 items-center justify-center rounded-2xl text-gray-300 hover:text-white cursor-pointer"
                    >
                      <FaFlag />
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      title="Download Offline"
                      className="glass-button flex h-12 w-12 items-center justify-center rounded-2xl text-gray-300 hover:text-white cursor-pointer"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>

                {/* Genres Line */}
                <div
                  className={`mt-4 ${
                    deviceMode === "phone"
                      ? "text-center"
                      : "text-center lg:text-left"
                  }`}
                >
                  <p className="text-xs sm:text-sm text-gray-300 font-normal">
                    {movie.genres.map((genre, idx) => (
                      <span key={genre}>
                        <span>{genre}</span>
                        {idx < movie.genres.length - 1 && (
                          <span className="mx-2 text-gray-500">|</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Synopsis */}
                <div
                  className={`mt-3.5 ${
                    deviceMode === "phone"
                      ? "text-center"
                      : "text-center lg:text-left"
                  }`}
                >
                  <p className="text-xs sm:text-base leading-relaxed text-gray-300 max-w-3xl">
                    {movie.description}
                  </p>
                </div>

                {/* Mobile Glass Action Buttons Bar */}
                <div className="glass-panel mt-4 rounded-2xl p-3 sm:hidden">
                  <div className="grid grid-cols-4 items-center justify-items-center text-center">
                    {/* My List */}
                    <button
                      type="button"
                      onClick={toggleWatchlist}
                      className="group flex flex-col items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span
                        className={`text-xl transition-transform group-hover:scale-110 ${
                          isWatchlisted ? "text-sky-400" : ""
                        }`}
                      >
                        {isWatchlisted ? <FaCheck /> : <FaPlus />}
                      </span>
                      <span className="text-[11px] font-medium tracking-wide">
                        {isWatchlisted ? "In List" : "My List"}
                      </span>
                    </button>

                    {/* Share */}
                    <button
                      type="button"
                      onClick={handleShare}
                      className="group flex flex-col items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="text-xl transition-transform group-hover:scale-110">
                        <FaPaperPlane className="-rotate-12" />
                      </span>
                      <span className="text-[11px] font-medium tracking-wide">
                        Share
                      </span>
                    </button>

                    {/* Reports */}
                    <button
                      type="button"
                      onClick={() => setShowReportModal(true)}
                      className="group flex flex-col items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="text-xl transition-transform group-hover:scale-110">
                        <FaFlag />
                      </span>
                      <span className="text-[11px] font-medium tracking-wide">
                        Reports
                      </span>
                    </button>

                    {/* Download */}
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="group flex flex-col items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="text-xl transition-transform group-hover:scale-110">
                        <FaDownload />
                      </span>
                      <span className="text-[11px] font-medium tracking-wide">
                        Download
                      </span>
                    </button>
                  </div>
                </div>

                {/* Languages Availability Row */}
                <div
                  className={`mt-4 flex items-center gap-4 text-xs sm:text-sm font-semibold text-gray-400 tracking-wider ${
                    deviceMode === "phone"
                      ? "justify-center"
                      : "justify-center lg:justify-start"
                  }`}
                >
                  {movie.languages.map((lang) => (
                    <span key={lang}>{lang}</span>
                  ))}
                </div>
              </div>

              {/* Sidebar Column: Glass Title Information Panel */}
              {deviceMode !== "phone" && (
                <div className="glass-panel hidden lg:block lg:col-span-4 rounded-3xl p-6 text-xs sm:text-sm text-gray-200 space-y-4">
                  <h3 className="text-base font-bold text-white border-b border-white/10 pb-2.5">
                    Title Information
                  </h3>
                  <div>
                    <span className="block font-semibold text-gray-400 text-xs">
                      Director
                    </span>
                    <span className="text-white font-medium">
                      {movie.director}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-400 text-xs">
                      Starring
                    </span>
                    <span className="text-gray-200">{movie.starring}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-400 text-xs">
                      Studio
                    </span>
                    <span className="text-gray-200">{movie.studio}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-400 text-xs">
                      Content Advisory
                    </span>
                    <span className="text-gray-200">{movie.advisory}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-400 text-xs">
                      Audio Languages
                    </span>
                    <span className="text-gray-200">
                      {movie.languages.join(", ")} (Dolby Atmos)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs: More Like This | More Details */}
            <section className="mt-8">
              <div className="flex items-center border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("moreLikeThis")}
                  className={`relative pb-3 px-4 text-sm sm:text-base font-bold tracking-wide transition-colors cursor-pointer ${
                    activeTab === "moreLikeThis"
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  More Like This
                  {activeTab === "moreLikeThis" && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("moreDetails")}
                  className={`relative pb-3 px-4 text-sm sm:text-base font-bold tracking-wide transition-colors cursor-pointer ${
                    activeTab === "moreDetails"
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  More Details
                  {activeTab === "moreDetails" && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              </div>

              {/* Tab 1: More Like This Glass Cards Grid */}
              {activeTab === "moreLikeThis" && (
                <div
                  className={`mt-5 grid gap-3 sm:gap-4 ${
                    deviceMode === "phone"
                      ? "grid-cols-3"
                      : "grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6"
                  }`}
                >
                  {recommendedMovies.map((item) => (
                    <article
                      key={item.title}
                      onClick={() => handleSelectMovie(item)}
                      className="glass-card group relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
                    >
                      <div className="aspect-3/4 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="glass-panel absolute inset-0 flex flex-col justify-end p-2.5 sm:p-3 opacity-0 transition-opacity group-hover:opacity-100 rounded-xl">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-950 mb-1.5 shadow-xl">
                            <FaPlay className="ml-0.5 text-[10px]" />
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-gray-300">
                            {item.duration || item.detail}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Tab 2: More Details Glass Sheet */}
              {activeTab === "moreDetails" && (
                <div className="glass-panel mt-5 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-gray-200 space-y-4 max-w-4xl">
                  <div>
                    <span className="font-bold text-white">Audio Languages: </span>
                    <span>{movie.languages.join(", ")} (Dolby Atmos, 5.1)</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Subtitles: </span>
                    <span>English, Hindi, Thai, Indonesian</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Director: </span>
                    <span>{movie.director}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Starring: </span>
                    <span>{movie.starring}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Studio / Production: </span>
                    <span>{movie.studio}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Content Advisory: </span>
                    <span>{movie.advisory}</span>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Glass Report Issue Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="glass-panel w-full max-w-sm rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold">Report an Issue</h3>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="glass-button flex h-7 w-7 items-center justify-center rounded-full text-gray-300 hover:text-white font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-300">
                Experiencing a problem with this title? Let us know:
              </p>
              <div className="mt-4 space-y-2">
                {[
                  "Video playback buffering / quality issue",
                  "Audio out of sync or missing",
                  "Subtitle sync or translation error",
                  "Incorrect metadata or poster",
                  "Other technical issue",
                ].map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => {
                      setShowReportModal(false);
                      triggerToast("Thank you! Your report has been submitted.");
                    }}
                    className="glass-button flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-gray-200 transition-colors hover:text-white cursor-pointer"
                  >
                    <span>{issue}</span>
                    <span className="text-gray-400">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Watch;
