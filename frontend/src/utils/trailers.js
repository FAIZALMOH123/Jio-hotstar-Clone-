const trailerMap = {
  "home-alone": "jEDaVHmw88I",
  "deadpool-and-wolverine": "73_1biulkYk",
  "deadpool-&-wolverine": "73_1biulkYk",
  "deadpool-wolverine": "73_1biulkYk",
  "shaadi-mein-zaroor-aana": "9H6P3LwO66E",
  "chandramukhi-2": "a4rK1d_C9yM",
  "hum-do-hamare-do": "tYqjB0YqW3c",
  "godzilla-minus-zero": "VvSrHIX5a-0",
  "goat": "eP_4b7wzB1M",
  "ballerina": "0xS_Fq-s1_g",
  "avengers-endgame": "TcMBFSGVi1c",
  "mortal-kombat-ii": "cKj0F8fW83Q",
  "one-piece-season-2": "l_n3m4V_K5M",
  "toy-story-5": "E2g0iOQx-p8",
  "the-odyssey": "rCe_mtfJad8",
  "spider-man-brand-new-day": "rk-dF1lIbIg",
  "evil-dead-burn": "BqQmg7vV_g0",
  "lanterns": "76LwG_9a56Q",
};

const normalize = (str) =>
  String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getTrailerVideoId = (movie = {}) => {
  const slugKey = normalize(movie.slug);
  const titleKey = normalize(movie.title);
  const nameKey = normalize(movie.name);

  return (
    trailerMap[slugKey] ||
    trailerMap[titleKey] ||
    trailerMap[nameKey] ||
    Object.entries(trailerMap).find(([key]) =>
      slugKey.includes(key) || titleKey.includes(key) || key.includes(titleKey)
    )?.[1] ||
    null
  );
};

export const getTrailerEmbedUrl = (movie = {}) => {
  const videoId = getTrailerVideoId(movie);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&playsinline=1`;
  }
  const query = encodeURIComponent(`${movie.title || movie.name || "movie"} official trailer`);
  return `https://www.youtube-nocookie.com/embed?listType=search&list=${query}&autoplay=1&mute=0&rel=0`;
};
