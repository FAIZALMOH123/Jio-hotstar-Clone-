import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaSearch,
  FaShapes,
  FaRunning,
  FaVideo,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
const logo = "/images/logo.png";

const navItems = [
  { href: "/home", label: "Home", icon: FaHome },
  { href: "/search", label: "Search", icon: FaSearch },
  { href: "/shows", label: "TV", icon: FiMonitor },
  { href: "/movies", label: "Movies", icon: FaFilm },
  { href: "/sports", label: "Sports", icon: FaRunning },
  { href: "/sparks", label: "Sparks", icon: FaVideo },
  { href: "/categories", label: "Categories", icon: FaShapes },
  { href: "/profile", label: "My Space", icon: FaUserCircle },
];

const mobileBottomNavItems = [
  { href: "/home", label: "Home", icon: FaHome },
  { href: "/search", label: "Search", icon: FaSearch },
  { href: "/movies", label: "Movies", icon: FaFilm },
  { href: "/sports", label: "Sports", icon: FaRunning },
  { href: "/profile", label: "My Space", icon: FaUserCircle },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
        />
      )}

      {/* Mobile Drawer Toggle Button with Glass Style */}
      <button
        type="button"
        aria-label={
          isMobileOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMobileOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMobileOpen((open) => !open)}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl glass-button text-white shadow-xl md:hidden cursor-pointer"
      >
        {isMobileOpen ? (
          <FaTimes aria-hidden="true" />
        ) : (
          <FaBars aria-hidden="true" />
        )}
      </button>

      {/* Desktop Liquid Glass Sidebar / Mobile Slide-out Drawer */}
      <nav
        id="primary-navigation"
        className={`liquid-glass-nav group/nav fixed inset-y-0 left-0 z-50 flex flex-col overflow-visible rounded-r-3xl px-3 py-6 text-gray-300 transition-[width,transform] duration-300 ease-out md:w-20 md:translate-x-0 md:hover:w-56 md:focus-within:w-56 ${
          isMobileOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full"
        }`}
      >
        <Link
          to="/home"
          aria-label="Home"
          onClick={() => setIsMobileOpen(false)}
          className="mb-8 ml-1 mt-10 flex h-12 w-12 items-start justify-center transition-transform hover:scale-110 md:mt-0"
        >
          <img
            src={logo}
            alt="JioHotstar"
            className="h-11 w-11 max-w-none object-contain drop-shadow-[0_2px_12px_rgba(14,165,233,0.5)]"
          />
        </Link>

        <div className="flex w-full flex-col items-start gap-2.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              location.pathname === href ||
              (href === "/home" && location.pathname === "/");

            return (
              <Link
                key={label}
                to={href}
                aria-label={label}
                onClick={() => setIsMobileOpen(false)}
                className={`group/item relative flex h-11 w-full items-center justify-start rounded-xl text-base transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "glass-pill-active font-bold shadow-lg shadow-sky-500/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-sky-400 rounded-r-full shadow-[0_0_8px_#38bdf8]" />
                )}

                <span className="flex h-11 w-11 shrink-0 items-center justify-center text-lg">
                  <Icon
                    aria-hidden="true"
                    className={isActive ? "text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]" : ""}
                  />
                </span>
                <span
                  className={`pointer-events-none ml-0 -translate-x-3 whitespace-nowrap px-3 py-1 text-sm font-semibold text-white opacity-0 transition-all duration-300 ease-out md:group-hover/nav:ml-3 md:group-hover/nav:translate-x-0 md:group-hover/nav:opacity-100 ${
                    isMobileOpen
                      ? "max-md:ml-3 max-md:translate-x-0 max-md:opacity-100"
                      : ""
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Glass Bottom Navigation Bar */}
      <div className="glass-bottom-bar fixed bottom-0 inset-x-0 z-40 flex h-16 items-center justify-around px-2 py-1 md:hidden">
        {mobileBottomNavItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            location.pathname === href ||
            (href === "/home" && location.pathname === "/");

          return (
            <Link
              key={label}
              to={href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "text-sky-400 font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="text-lg" />
              <span className="text-[10px] tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
