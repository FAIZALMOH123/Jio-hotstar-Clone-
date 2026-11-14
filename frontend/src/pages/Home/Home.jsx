import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import heroImage from "../../assets/images/deadpool-wolverine-3840x2160-17300.jpg";
import spiderManImage from "../../assets/images/spider-man-brand-3840x2160-26612.jpg";
import godzillaImage from "../../assets/images/godzilla-minus-zero-3840x2160-27257.jpg";
import evilDeadImage from "../../assets/images/evil-dead-burn-2026-3840x2160-27067.jpg";
import { newReleases } from "../../data/newReleases";
import { FaPlay, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const movies = [
  {
    name: "Deadpool and Wolverine",
    image: heroImage,
    imageAlt: "Deadpool and Wolverine standing together",
    studio: "Marvel Studios",
    title: "Deadpool & Wolverine",
    titleColor: "#ff3548",
    titleShadow: "0 3px 26px rgba(255, 53, 72, 0.4), 2px 3px 0 #61101a",
    year: "2024",
    detail: "2h 7m",
    languages: "4 Languages",
    description:
      "Wade is pulled out of his quiet life and into an unlikely mission. With Wolverine at his side, the two clash, team up, and take on a threat neither can handle alone.",
    genres: ["Super Heroes", "Action", "Adventure", "Science Fiction"],
    action: "Watch Now",
  },
  {
    name: "Spider-Man: Brand New Day",
    image: spiderManImage,
    imageAlt: "Spider-Man and masked heroes above the city",
    studio: "Marvel Studios",
    title: "Spider-Man: Brand New Day",
    titleColor: "#ff3a45",
    titleShadow: "0 3px 26px rgba(255, 58, 69, 0.38), 2px 3px 0 #123d81",
    year: "2026",
    detail: "Coming Soon",
    languages: "Marvel Original",
    description:
      "A new day begins for Peter Parker. Spider-Man returns for a fresh chapter filled with danger, unexpected allies, and action across New York City.",
    genres: ["Super Heroes", "Action", "Adventure", "Science Fiction"],
    action: "Coming Soon",
  },
  {
    name: "Godzilla Minus Zero",
    image: godzillaImage,
    imageAlt: "Godzilla looming over a city",
    studio: "Toho",
    title: "Godzilla Minus Zero",
    titleColor: "#e9f5ff",
    titleShadow: "0 0 14px rgba(71, 174, 255, 0.85), 0 4px 28px #071d3b",
    year: "2026",
    detail: "Coming Soon",
    languages: "Japanese",
    description:
      "The King of the Monsters returns in a new cinematic chapter. As Godzilla rises once more, humanity faces a fight for survival on an unimaginable scale.",
    genres: ["Kaiju", "Action", "Adventure", "Science Fiction"],
    action: "Coming Soon",
  },
  {
    name: "Evil Dead Burn",
    image: evilDeadImage,
    imageAlt: "Evil Dead Burn film artwork",
    studio: "Evil Dead",
    title: "Evil Dead Burn",
    titleColor: "#f52232",
    titleShadow: "0 0 22px rgba(245, 34, 50, 0.45), 2px 3px 0 #350609",
    year: "2026",
    detail: "Coming Soon",
    languages: "Feature Film",
    description:
      "A new chapter in the Evil Dead saga unleashes supernatural horror, dark suspense, and a fight to survive the night.",
    genres: ["Horror", "Supernatural", "Thriller"],
    action: "Coming Soon",
  },
];

const topTenMovies = [
  newReleases[3],
  newReleases[4],
  newReleases[0],
  newReleases[2],
  newReleases[5],
  newReleases[1],
  newReleases[6],
  newReleases[7],
  movies[0],
  movies[1],
];

const Home = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollReleasesLeft, setCanScrollReleasesLeft] = useState(false);
  const [canScrollReleases, setCanScrollReleases] = useState(true);
  const [canScrollTopTenLeft, setCanScrollTopTenLeft] = useState(false);
  const [canScrollTopTen, setCanScrollTopTen] = useState(true);
  const releasesCarouselRef = useRef(null);
  const topTenCarouselRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % movies.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = releasesCarouselRef.current;
    if (!carousel) return;

    const updateScrollControl = () => {
      setCanScrollReleasesLeft(carousel.scrollLeft > 1);
      setCanScrollReleases(
        carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
      );
    };

    updateScrollControl();
    carousel.addEventListener("scroll", updateScrollControl, { passive: true });
    window.addEventListener("resize", updateScrollControl);

    return () => {
      carousel.removeEventListener("scroll", updateScrollControl);
      window.removeEventListener("resize", updateScrollControl);
    };
  }, []);

  useEffect(() => {
    const carousel = topTenCarouselRef.current;
    if (!carousel) return;

    const updateScrollControl = () => {
      setCanScrollTopTenLeft(carousel.scrollLeft > 1);
      setCanScrollTopTen(
        carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
      );
    };

    updateScrollControl();
    carousel.addEventListener("scroll", updateScrollControl, { passive: true });
    window.addEventListener("resize", updateScrollControl);

    return () => {
      carousel.removeEventListener("scroll", updateScrollControl);
      window.removeEventListener("resize", updateScrollControl);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent pl-0 text-white text-2xl md:pl-20">
      <Navbar />

      <main className="relative min-w-0 flex-1 overflow-x-hidden bg-transparent">
        <section
          aria-label="Featured movies"
          className="relative h-screen min-h-140"
        >
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${movies.length * 100}%`,
              transform: `translateX(-${(activeSlide * 100) / movies.length}%)`,
            }}
          >
            {movies.map((movie, index) => (
              <article
                key={movie.imageAlt}
                className="relative h-full shrink-0"
                style={{ width: `${100 / movies.length}%` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={movie.image}
                    alt={movie.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-950/65 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-gray-950/15" />
                </div>

                <section
                  aria-hidden={activeSlide !== index}
                  className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-6 pb-24 pt-20 sm:px-10 lg:px-14"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-red-400 sm:text-sm">
                    {movie.studio}
                  </p>
                  <h1
                    onClick={() =>
                      navigate("/watch", {
                        state: { movie: movies[activeSlide] },
                      })
                    }
                    className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-[0.04em] sm:text-6xl lg:text-7xl cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      color: movie.titleColor,
                      textShadow: movie.titleShadow,
                      fontFamily: 'Impact, "Arial Narrow", sans-serif',
                    }}
                  >
                    {movie.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-gray-200 sm:text-base">
                    <span>{movie.year}</span>
                    <span aria-hidden="true" className="text-red-400">
                      •
                    </span>
                    <span>{movie.detail}</span>
                    <span aria-hidden="true" className="text-red-400">
                      •
                    </span>
                    <span>{movie.languages}</span>
                  </div>

                  <p className="mt-5 max-w-lg text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
                    {movie.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold leading-6 text-white sm:text-base">
                    {movie.genres.map((genre, genreIndex) => (
                      <span key={genre}>
                        {genreIndex > 0 && (
                          <span className="mx-2 text-gray-400">|</span>
                        )}
                        {genre}
                      </span>
                    ))}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/watch", {
                          state: { movie: movies[activeSlide] },
                        })
                      }
                      className="glass-button-primary inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl px-8 py-3.5 text-base font-bold text-white shadow-xl cursor-pointer sm:min-w-72 sm:text-lg"
                    >
                      <FaPlay aria-hidden="true" className="text-sm" />
                      {movie.action}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/watch", {
                          state: { movie: movies[activeSlide] },
                        })
                      }
                      aria-label={`Add ${movie.name} to your watchlist`}
                      className="glass-button inline-flex h-14 w-14 items-center justify-center rounded-2xl text-xl text-white cursor-pointer"
                    >
                      <FaPlus aria-hidden="true" />
                    </button>
                  </div>
                </section>
              </article>
            ))}
          </div>

          <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:bottom-9 sm:right-10">
            <button
              type="button"
              aria-label="Previous movie"
              onClick={() =>
                setActiveSlide(
                  (activeSlide + movies.length - 1) % movies.length,
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-gray-950/50 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <div
              className="flex items-center gap-2"
              aria-label={`Slide ${activeSlide + 1} of ${movies.length}`}
            >
              {movies.map((movie, index) => (
                <button
                  key={movie.imageAlt}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ${activeSlide === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next movie"
              onClick={() => setActiveSlide((activeSlide + 1) % movies.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-gray-950/50 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section
          className="px-5 pb-5 pt-7 sm:px-8 lg:px-12"
          aria-labelledby="top-ten-heading"
        >
          <h2
            id="top-ten-heading"
            className="mb-5 text-xl font-bold text-white sm:text-2xl"
          >
            Top 10 on JioHotstar
          </h2>
          <div className="relative">
            <div
              ref={topTenCarouselRef}
              className="hide-scrollbar grid grid-flow-col auto-cols-[68%] items-start gap-3 overflow-x-auto overflow-y-hidden pb-4 sm:auto-cols-[34%] sm:gap-4 lg:auto-cols-[19%]"
            >
              {topTenMovies.map((movie, index) => (
                <article
                  key={movie.title}
                  onClick={() => navigate("/watch", { state: { movie } })}
                  className="group relative min-w-0 pl-7 cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="absolute bottom-10 left-0 z-10 select-none text-[8rem] font-black leading-[0.78] text-gray-950 [-webkit-text-stroke:2px_rgba(255,255,255,0.85)] [text-shadow:2px_3px_12px_rgba(0,0,0,0.9)] sm:text-[9rem] transition-transform duration-300 group-hover:scale-105"
                  >
                    {index + 1}
                  </span>
                  <div className="relative aspect-3/4 overflow-hidden rounded-md bg-gray-800">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-pink-500 text-white shadow-xl shadow-sky-500/30">
                        <FaPlay className="ml-0.5 text-sm" />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-2 truncate text-sm font-semibold text-gray-200 transition-colors group-hover:text-sky-400 sm:text-base">
                    {movie.title}
                  </h3>
                </article>
              ))}
            </div>
            {canScrollTopTenLeft && (
              <button
                type="button"
                aria-label="Scroll Top 10 left"
                onClick={() =>
                  topTenCarouselRef.current?.scrollBy({
                    left: -topTenCarouselRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
            )}
            {canScrollTopTen && (
              <button
                type="button"
                aria-label="Scroll Top 10 right"
                onClick={() =>
                  topTenCarouselRef.current?.scrollBy({
                    left: topTenCarouselRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        <section
          className="px-5 pb-12 pt-7 sm:px-8 lg:px-12"
          aria-labelledby="new-releases-heading"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2
              id="new-releases-heading"
              className="text-xl font-bold text-white sm:text-2xl"
            >
              New on JioHotstar
            </h2>
            <Link
              to="/newjio"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              View all <FaChevronRight aria-hidden="true" />
            </Link>
          </div>
          <div className="relative">
            <div
              ref={releasesCarouselRef}
              className="hide-scrollbar grid grid-flow-col auto-cols-[70%] items-start gap-3 overflow-x-auto overflow-y-hidden pb-4 sm:auto-cols-[35%] sm:gap-4 lg:auto-cols-[20%]"
            >
              {newReleases.map((release) => (
                <article
                  key={release.title}
                  tabIndex={0}
                  onClick={() =>
                    navigate("/watch", { state: { movie: release } })
                  }
                  className="group min-w-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
                >
                  <div className="relative aspect-3/4 overflow-hidden rounded-md bg-gray-800">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08] group-focus-within:scale-[1.08]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-gray-950 via-gray-950/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:p-4">
                      <h3 className="text-base font-bold leading-tight text-white sm:text-lg">
                        {release.title}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
                        {release.detail}
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-300 sm:text-sm">
                        {release.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/watch", { state: { movie: release } });
                          }}
                          className="glass-button-primary inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-xs sm:text-sm font-bold text-white cursor-pointer"
                        >
                          <FaPlay aria-hidden="true" className="text-[10px]" />
                          Watch Now
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/watch", { state: { movie: release } });
                          }}
                          aria-label={`Add ${release.title} to your watchlist`}
                          className="glass-button flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white cursor-pointer"
                        >
                          <FaPlus aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {canScrollReleasesLeft && (
              <button
                type="button"
                aria-label="Scroll new releases left"
                onClick={() =>
                  releasesCarouselRef.current?.scrollBy({
                    left: -releasesCarouselRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
            )}
            {canScrollReleases && (
              <button
                type="button"
                aria-label="Scroll new releases right"
                onClick={() =>
                  releasesCarouselRef.current?.scrollBy({
                    left: releasesCarouselRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
