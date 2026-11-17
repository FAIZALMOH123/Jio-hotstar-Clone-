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
    console.error("Failed to read fallback movies.json:", err);
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

export const fetchMovies = async () => {
  if (firestore) {
    try {
      const snapshot = await firestore.collection("movies").orderBy("id", "asc").get();
      if (!snapshot.empty) {
        return { success: true, data: snapshot.docs.map(toMovie) };
      }
    } catch (error) {
      console.warn("Firestore movie list query failed, using fallback:", error?.code || error?.message);
    }
  }

  const fallback = await readFallbackMovies();
  if (fallback.length > 0) {
    return { success: true, data: fallback };
  }

  return { success: false, statusCode: 503, message: "Movie catalog is unavailable" };
};
