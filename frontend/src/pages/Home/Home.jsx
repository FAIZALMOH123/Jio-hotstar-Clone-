import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { FaPlay, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroImage = "/images/deadpool-wolverine-3840x2160-17300.jpg";
const spiderManImage = "/images/spider-man-brand-3840x2160-26612.jpg";
const godzillaImage = "/images/godzilla-minus-zero-3840x2160-27257.jpg";
const evilDeadImage = "/images/evil-dead-burn-2026-3840x2160-27067.jpg";

const heroMovies = [
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

const MovieCategoryRow = ({ title, movies = [], categoryParam }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const targetCategory = categoryParam || title;

  return (
    <section className="px-4 pb-8 pt-4 sm:px-8 sm:pb-10 sm:pt-5 lg:px-12 category-row-contain" aria-label={title}>
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white sm:text-2xl drop-shadow">
          {title}
        </h2>
        <Link
          to={`/newjio?category=${encodeURIComponent(targetCategory)}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition-colors hover:text-white cursor-pointer"
        >
          View all <FaChevronRight aria-hidden="true" />
        </Link>
      </div>
      <div className="relative group/row">
        <div
          ref={scrollRef}
          className="hide-scrollbar grid grid-flow-col auto-cols-[45%] sm:auto-cols-[30%] md:auto-cols-[23%] lg:auto-cols-[18%] xl:auto-cols-[15.5%] items-start gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-4 smooth-scroll-x"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.slug || movie.title || movie.name}
              movie={movie}
            />
          ))}
        </div>

        {canScrollLeft && (
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: -scrollRef.current.clientWidth * 0.75,
                behavior: "smooth",
              })
            }
            className="absolute left-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/80 text-white shadow-xl backdrop-blur-md transition-all hover:bg-gray-800 hover:scale-110 cursor-pointer"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: scrollRef.current.clientWidth * 0.75,
                behavior: "smooth",
              })
            }
            className="absolute right-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/80 text-white shadow-xl backdrop-blur-md transition-all hover:bg-gray-800 hover:scale-110 cursor-pointer"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { movies: newReleases } = useMovies();

  const topTenMovies = useMemo(() => {
    return newReleases.slice(0, 10);
  }, [newReleases]);

  const actionMovies = useMemo(() => {
    return newReleases.filter((m) =>
      m.genres?.some((g) =>
        ["Action", "Sci-Fi", "Science Fiction", "Super Heroes", "Kaiju", "Martial Arts"].includes(g)
      )
    );
  }, [newReleases]);

  const thrillerMovies = useMemo(() => {
    return newReleases.filter((m) =>
      m.genres?.some((g) =>
        ["Thriller", "Horror", "Mystery", "Crime", "Supernatural"].includes(g)
      )
    );
  }, [newReleases]);

  const feelGoodMovies = useMemo(() => {
    return newReleases.filter((m) =>
      m.genres?.some((g) =>
        ["Comedy", "Family", "Kids", "Animation", "Children", "Dramedy"].includes(g)
      )
    );
  }, [newReleases]);

  const romanticMovies = useMemo(() => {
    return newReleases.filter((m) =>
      m.genres?.some((g) => ["Romance", "Drama"].includes(g))
    );
  }, [newReleases]);

  const adventureMovies = useMemo(() => {
    return newReleases.filter((m) =>
      m.genres?.some((g) =>
        ["Adventure", "Fantasy", "Epic", "Super Heroes"].includes(g)
      )
    );
  }, [newReleases]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollReleasesLeft, setCanScrollReleasesLeft] = useState(false);
  const [canScrollReleases, setCanScrollReleases] = useState(true);
  const [canScrollTopTenLeft, setCanScrollTopTenLeft] = useState(false);
  const [canScrollTopTen, setCanScrollTopTen] = useState(true);
  const releasesCarouselRef = useRef(null);
  const topTenCarouselRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroMovies.length);
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
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent pl-0 text-white md:pl-20 home-page-enter">
      <Navbar />

      <main className="relative min-w-0 flex-1 overflow-x-hidden bg-transparent pb-16 md:pb-8">
        {/* Hero Slideshow Banner - Fully responsive across mobile, tab, and laptop */}
        <section
          aria-label="Featured movies"
          className="relative min-h-[72vh] sm:min-h-[80vh] lg:h-screen lg:min-h-140 overflow-hidden"
        >
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${heroMovies.length * 100}%`,
              transform: `translateX(-${(activeSlide * 100) / heroMovies.length}%)`,
            }}
          >
            {heroMovies.map((movie, index) => (
              <article
                key={movie.imageAlt}
                className="relative h-full shrink-0"
                style={{ width: `${100 / heroMovies.length}%` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={movie.image}
                    alt={movie.imageAlt}
                    className="h-full w-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-950/70 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-gray-950/20" />
                </div>

                <section
                  aria-hidden={activeSlide !== index}
                  className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-5 pb-24 pt-16 sm:px-10 sm:pb-28 lg:px-14 lg:pt-20"
                >
                  <p className="mb-2 sm:mb-3 text-xs font-bold uppercase tracking-[0.22em] text-red-400 sm:text-sm">
                    {movie.studio}
                  </p>
                  <h1
                    onClick={() =>
                      navigate("/watch", {
                        state: { movie: heroMovies[activeSlide], autoPlay: true },
                      })
                    }
                    className="max-w-xl text-3xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.96] tracking-[0.03em] cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      color: movie.titleColor,
                      textShadow: movie.titleShadow,
                      fontFamily: 'Impact, "Arial Narrow", sans-serif',
                    }}
                  >
                    {movie.title}
                  </h1>

                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-base font-semibold text-gray-200">
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

                  <p className="mt-3 sm:mt-5 max-w-lg text-xs leading-5 sm:text-base sm:leading-7 text-gray-200 line-clamp-3 sm:line-clamp-none">
                    {movie.description}
                  </p>

                  <p className="mt-3 sm:mt-5 text-xs sm:text-base font-semibold text-white">
                    {movie.genres.map((genre, genreIndex) => (
                      <span key={genre}>
                        {genreIndex > 0 && (
                          <span className="mx-1.5 sm:mx-2 text-gray-400">|</span>
                        )}
                        {genre}
                      </span>
                    ))}
                  </p>

                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/watch", {
                          state: { movie: heroMovies[activeSlide], autoPlay: true },
                        })
                      }
                      className="glass-button-primary inline-flex min-h-11 sm:min-h-14 items-center justify-center gap-2.5 sm:gap-3 rounded-2xl px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-lg font-bold text-white shadow-xl cursor-pointer"
                    >
                      <FaPlay aria-hidden="true" className="text-xs sm:text-sm" />
                      {movie.action}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/watch", {
                          state: { movie: heroMovies[activeSlide], autoPlay: true },
                        })
                      }
                      title="Watch Official Trailer"
                      className="glass-button inline-flex min-h-11 sm:min-h-14 items-center justify-center gap-2 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-white cursor-pointer hover:border-red-500/50 hover:bg-red-600/20 shadow-lg"
                    >
                      <FaPlay className="text-xs sm:text-sm text-red-500" />
                      Watch Trailer
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/watch", {
                          state: { movie: heroMovies[activeSlide] },
                        })
                      }
                      aria-label={`Add ${movie.name} to your watchlist`}
                      className="glass-button inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl text-base sm:text-xl text-white cursor-pointer"
                    >
                      <FaPlus aria-hidden="true" />
                    </button>
                  </div>
                </section>
              </article>
            ))}
          </div>

          <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:bottom-9 sm:right-10 sm:gap-3">
            <button
              type="button"
              aria-label="Previous movie"
              onClick={() =>
                setActiveSlide(
                  (activeSlide + heroMovies.length - 1) % heroMovies.length,
                )
              }
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/25 bg-gray-950/50 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer"
            >
              <FaChevronLeft className="text-xs sm:text-base" aria-hidden="true" />
            </button>
            <div
              className="flex items-center gap-1.5 sm:gap-2"
              aria-label={`Slide ${activeSlide + 1} of ${heroMovies.length}`}
            >
              {heroMovies.map((movie, index) => (
                <button
                  key={movie.imageAlt}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-[width,background-color] duration-300 cursor-pointer ${
                    activeSlide === index ? "w-5 sm:w-7 bg-white" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next movie"
              onClick={() => setActiveSlide((activeSlide + 1) % heroMovies.length)}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/25 bg-gray-950/50 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer"
            >
              <FaChevronRight className="text-xs sm:text-base" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Top 10 on JioHotstar Row */}
        <section
          className="px-4 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7 lg:px-12 category-row-contain"
          aria-labelledby="top-ten-heading"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <h2
              id="top-ten-heading"
              className="text-lg font-bold text-white sm:text-2xl drop-shadow"
            >
              Top 10 on JioHotstar
            </h2>
            <Link
              to="/newjio?category=Top%2010"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition-colors hover:text-white cursor-pointer"
            >
              View all <FaChevronRight aria-hidden="true" />
            </Link>
          </div>
          <div className="relative group/row">
            <div
              ref={topTenCarouselRef}
              className="hide-scrollbar grid grid-flow-col auto-cols-[45%] sm:auto-cols-[30%] md:auto-cols-[23%] lg:auto-cols-[18%] xl:auto-cols-[15.5%] items-start gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-4 smooth-scroll-x"
            >
              {topTenMovies.map((movie, index) => (
                <MovieCard
                  key={movie.slug || movie.title || movie.name}
                  movie={movie}
                  rank={index + 1}
                />
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
                className="absolute left-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800 cursor-pointer"
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
                className="absolute right-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800 cursor-pointer"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        {/* New on JioHotstar Row */}
        <section
          className="px-4 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-7 lg:px-12 category-row-contain"
          aria-labelledby="new-releases-heading"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-between gap-4">
            <h2
              id="new-releases-heading"
              className="text-lg font-bold text-white sm:text-2xl drop-shadow"
            >
              New on JioHotstar
            </h2>
            <Link
              to="/newjio?category=All%20Movies"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition-colors hover:text-white cursor-pointer"
            >
              View all <FaChevronRight aria-hidden="true" />
            </Link>
          </div>
          <div className="relative group/row">
            <div
              ref={releasesCarouselRef}
              className="hide-scrollbar grid grid-flow-col auto-cols-[45%] sm:auto-cols-[30%] md:auto-cols-[23%] lg:auto-cols-[18%] xl:auto-cols-[15.5%] items-start gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-4 smooth-scroll-x"
            >
              {newReleases.map((release) => (
                <MovieCard
                  key={release.slug || release.title || release.name}
                  movie={release}
                />
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
                className="absolute left-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800 cursor-pointer"
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
                className="absolute right-2 top-1/2 z-20 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-gray-950/75 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-800 cursor-pointer"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        {/* 5 Distinct Category Rows */}
        <MovieCategoryRow
          title="Action & Sci-Fi Blockbusters"
          categoryParam="Action & Sci-Fi"
          movies={actionMovies}
        />

        <MovieCategoryRow
          title="Crime & Psychological Thrillers"
          categoryParam="Crime & Thriller"
          movies={thrillerMovies}
        />

        <MovieCategoryRow
          title="Feel-Good & Family Comedy"
          categoryParam="Feel-Good Comedy"
          movies={feelGoodMovies}
        />

        <MovieCategoryRow
          title="Romantic & Emotional Dramas"
          categoryParam="Romance & Drama"
          movies={romanticMovies}
        />

        <MovieCategoryRow
          title="Adventure & Fantasy Hits"
          categoryParam="Adventure & Fantasy"
          movies={adventureMovies}
        />
      </main>
    </div>
  );
};

export default Home;
