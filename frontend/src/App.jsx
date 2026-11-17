import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import NewonJioHotstar from "./pages/Home/NewonJioHotstar";
import Watch from "./pages/Watch/Watch";
import Search from "./pages/Search/Search";
import Shows from "./pages/Shows/Shows";
import Movies from "./pages/Movies/Movies";
import Sports from "./pages/Sports/Sports";
import Sparks from "./pages/Sparks/Sparks";
import Categories from "./pages/Categories/Categories";
import Profile from "./pages/Profile/Profile";
import EmailVerified from "./pages/Auth/EmailVerified";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useMovies } from "./hooks/useMovies";

const CatalogStatus = () => {
  const { error, reloadMovies } = useMovies();
  if (!error) return null;
  return (
    <div role="alert" className="fixed left-1/2 top-4 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-xl border border-rose-300/30 bg-gray-950/95 px-4 py-3 text-sm text-rose-100 shadow-xl">
      <span>{error}</span>
      <button type="button" onClick={reloadMovies} className="font-semibold underline">Retry</button>
    </div>
  );
};

const protectedPage = (Page) => (
  <ProtectedRoute><Page /></ProtectedRoute>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#050811] text-white selection:bg-sky-500 selection:text-white">
      {/* Universal Floating Ambient Light Orbs for Authentic Liquid Glass Refraction */}
      <div className="ambient-glow-mesh" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <ScrollToTop />
      <CatalogStatus />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={protectedPage(Home)} />
          <Route path="/home" element={protectedPage(Home)} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/newjio" element={protectedPage(NewonJioHotstar)} />
          <Route path="/watch" element={protectedPage(Watch)} />
          <Route path="/search" element={protectedPage(Search)} />
          <Route path="/shows" element={protectedPage(Shows)} />
          <Route path="/movies" element={protectedPage(Movies)} />
          <Route path="/sports" element={protectedPage(Sports)} />
          <Route path="/sparks" element={protectedPage(Sparks)} />
          <Route path="/categories" element={protectedPage(Categories)} />
          <Route path="/profile" element={protectedPage(Profile)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
