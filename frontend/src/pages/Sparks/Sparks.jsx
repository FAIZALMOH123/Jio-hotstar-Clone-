import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { homeAloneMovie, newReleases } from "../../data/newReleases";
import {
  FaHeart,
  FaShare,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const sparksClips = [
  {
    id: 1,
    title: "Kevin's Paint Can Trap",
    movie: homeAloneMovie,
    channel: "20th Century Classics",
    likes: "142K",
    caption:
      "Marv and Harry definitely didn't see that swinging paint can coming! 😂 Watch Kevin's genius traps unfold in Home Alone.",
    music: "Home Alone Original Soundtrack · John Williams",
  },
  {
    id: 2,
    title: "Godzilla's Atomic Breath Unleashed",
    movie: newReleases[4] || homeAloneMovie,
    channel: "Kaiju Universe",
    likes: "289K",
    caption:
      "The cinematic spectacle of the atomic breath in IMAX 4K! Pure chills. 🦖🔥",
    music: "Godzilla Minus Zero Theme · Toho Studios",
  },
  {
    id: 3,
    title: "Luffy's Grand Line Speech",
    movie: newReleases[9] || homeAloneMovie,
    channel: "Straw Hat Club",
    likes: "95K",
    caption:
      "Setting sail into the most treacherous waters in the world! Are you ready for Season 2? 🏴‍☠️🍖",
    music: "We Are! · One Piece Official",
  },
  {
    id: 4,
    title: "Deadpool Meets Wolverine in the Void",
    movie: {
      title: "Deadpool & Wolverine",
      image: homeAloneMovie.image,
      year: "2024",
      rating: "U/A 16+",
      duration: "2h 7m",
      genres: ["Action", "Comedy", "Super Heroes"],
      description:
        "Wade and Logan clash in the void in one of the most anticipated team-ups in cinematic history.",
    },
    channel: "Marvel Studios",
    likes: "420K",
    caption:
      "The roast battles between Wade and Logan are on another level! Watch now in 4K HDR. ⚔️💀",
    music: "Bye Bye Bye · NSYNC",
  },
];

const Sparks = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedClips, setLikedClips] = useState({});
  const [toast, setToast] = useState("");
  const videoRef = useRef(null);

  const activeClip = sparksClips[currentIdx];

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleLike = (id) => {
    setLikedClips((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % sparksClips.length);
  };

  const handlePrev = () => {
    setCurrentIdx(
      (prev) => (prev - 1 + sparksClips.length) % sparksClips.length
    );
  };

  const handleWatchFullMovie = () => {
    navigate("/watch", {
      state: { movie: activeClip.movie, autoPlay: true },
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent text-white pl-0 md:pl-20">
      <Navbar />

      <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-6 sm:px-6 pb-24 sm:pb-8">
        {toast && (
          <div className="glass-panel fixed top-8 z-50 rounded-full border border-sky-400/40 px-6 py-2.5 text-xs font-semibold text-white shadow-xl">
            {toast}
          </div>
        )}

        {/* Vertical Liquid Glass Sparks Player */}
        <div className="glass-panel relative mx-auto flex h-[82vh] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl shadow-2xl">
          {/* Background Video */}
          <video
            ref={videoRef}
            src="/navbar-reference.mp4"
            poster={activeClip.movie.image}
            className="h-full w-full object-cover cursor-pointer"
            loop
            autoPlay
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          />

          {/* Top Controls Overlay */}
          <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between text-white">
            <span className="glass-pill rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              ✨ Sparks
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className="glass-button flex h-10 w-10 items-center justify-center rounded-full text-white cursor-pointer"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>

          {/* Pause Indicator Overlay */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-10"
            >
              <div className="glass-button flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl">
                <FaPlay className="ml-1 text-2xl" />
              </div>
            </div>
          )}

          {/* Right Action Buttons Sidebar */}
          <div className="absolute bottom-24 right-3 z-20 flex flex-col items-center gap-4 text-white">
            {/* Like */}
            <button
              type="button"
              onClick={() => toggleLike(activeClip.id)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`glass-button flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                  likedClips[activeClip.id]
                    ? "text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-110"
                    : "text-white"
                }`}
              >
                <FaHeart className="text-xl" />
              </div>
              <span className="text-[11px] font-bold drop-shadow">
                {likedClips[activeClip.id] ? "Liked" : activeClip.likes}
              </span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                triggerToast("Clip link copied!");
              }}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="glass-button flex h-12 w-12 items-center justify-center rounded-full text-white">
                <FaShare className="text-lg" />
              </div>
              <span className="text-[11px] font-bold drop-shadow">Share</span>
            </button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="glass-panel absolute bottom-0 inset-x-0 z-20 flex flex-col rounded-b-3xl p-4 text-white">
            <span className="text-xs font-bold text-sky-300 drop-shadow">
              @{activeClip.channel}
            </span>
            <h3 className="mt-1 text-base font-bold drop-shadow">
              {activeClip.title}
            </h3>
            <p className="mt-1 text-xs text-gray-200 line-clamp-2">
              {activeClip.caption}
            </p>
            <p className="mt-2 text-[10px] text-gray-400">
              🎵 {activeClip.music}
            </p>

            {/* Watch Full Title Glass Button */}
            <button
              type="button"
              onClick={handleWatchFullMovie}
              className="glass-button-primary mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-lg cursor-pointer"
            >
              <FaPlay className="text-[10px]" />
              <span>Watch Full Title: {activeClip.movie.title}</span>
            </button>
          </div>
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Clip"
            className="glass-button flex h-11 w-11 items-center justify-center rounded-full text-white cursor-pointer"
          >
            <FaChevronUp />
          </button>
          <span className="glass-pill rounded-full px-3 py-1 text-xs font-bold text-gray-300">
            {currentIdx + 1} / {sparksClips.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Clip"
            className="glass-button flex h-11 w-11 items-center justify-center rounded-full text-white cursor-pointer"
          >
            <FaChevronDown />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Sparks;
