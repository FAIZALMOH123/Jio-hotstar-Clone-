import Navbar from "../../components/common/Navbar";
import { newReleases } from "../../data/newReleases";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaPlus } from "react-icons/fa";

const NewonJioHotstar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-row items-start bg-transparent pl-0 text-white md:pl-20">
      <Navbar />
      <main className="min-h-screen min-w-0 flex-1 px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Link
            to="/home"
            className="glass-button inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:text-white"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to Home
          </Link>

          <h1 className="mb-10 mt-8 text-center text-3xl font-extrabold text-white sm:mb-14 sm:mt-10 sm:text-4xl drop-shadow">
            New on JioHotstar
          </h1>

          <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {newReleases.map((release) => (
              <article
                key={release.title}
                tabIndex={0}
                onClick={() => navigate("/watch", { state: { movie: release } })}
                className="group relative z-0 min-w-0 rounded-2xl outline-none hover:z-30 focus-visible:ring-2 focus-visible:ring-sky-400 focus-within:z-30 cursor-pointer"
              >
                <div className="glass-card relative aspect-3/4 overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="pointer-events-none absolute left-1/2 top-0 z-20 w-[220%] max-w-[min(48rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-[opacity,transform] delay-100 duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-300 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:delay-300">
                  <div className="glass-panel overflow-hidden rounded-3xl shadow-2xl">
                    <div className="relative aspect-video bg-black/40">
                      <img
                        src={release.image}
                        alt=""
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
                        loading="lazy"
                      />
                      <img
                        src={release.image}
                        alt=""
                        className="relative z-10 h-full w-full object-contain"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-5 sm:p-6">
                      <h2 className="mb-4 text-2xl font-bold leading-tight text-white drop-shadow sm:text-3xl">
                        {release.title}
                      </h2>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/watch", { state: { movie: release } });
                          }}
                          className="glass-button-primary inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm sm:text-base font-bold text-white shadow-xl cursor-pointer"
                        >
                          <FaPlay aria-hidden="true" className="text-xs" />
                          Watch Now
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/watch", { state: { movie: release } });
                          }}
                          aria-label={`Add ${release.title} to your watchlist`}
                          className="glass-button flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg text-white cursor-pointer"
                        >
                          <FaPlus aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-gray-200">
                        {release.detail}
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-6 text-gray-300">
                        {release.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewonJioHotstar;
