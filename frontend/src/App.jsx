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
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/newjio" element={<NewonJioHotstar />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sparks" element={<Sparks />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
