import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { firestore } from "../../db/firebase.js";

const catalogPath = new URL("../../data/movies.json", import.meta.url);

const readFallbackMovies = async () => {
  try {
    const raw = await readFile(fileURLToPath(catalogPath), "utf8");
    const movies = JSON.parse(raw);
    return movies.map((m) => ({
      ...m,
      image: m.posterPath || m.poster_path || m.image || "",
    }));
  } catch (err) {
    return [];
  }
};

const toMovie = (doc) => {
  const data = doc.data();
  const { posterPath, poster_path, createdAt, ...movie } = data;
  return {
    ...movie,
    id: movie.id ?? doc.id,
    image: posterPath || poster_path || movie.image || "",
    createdAt: createdAt?.toDate ? createdAt.toDate().toISOString() : createdAt,
  };
};

export const fetchMovieBySlug = async (slug) => {
  if (firestore) {
    try {
      const movie = await firestore.collection("movies").doc(slug).get();
      if (movie.exists) return { success: true, data: toMovie(movie) };
    } catch (error) {
      console.warn("Firestore movie detail query failed, checking fallback:", error?.code || error?.message);
    }
  }

  const fallback = await readFallbackMovies();
  const found = fallback.find((m) => m.slug === slug);
  if (found) {
    return { success: true, data: found };
  }

  return { success: false, statusCode: 404, message: "Movie not found" };
};
