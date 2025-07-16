import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CalendarCheck, Home, LogIn, FileText } from "lucide-react";
import CClogo from "../assets/CC-logo.png";
import CCLogoWhite from "../assets/CCLogoWhite.png";
import { IoBuild } from "react-icons/io5";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const isAdmin = false;
const isLecturer = true;
const isLogged = true;

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      // fallback to system
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navItems = [
    { to: "/", label: "HOME", icon: <Home className="w-5 h-5" />, description: "Main page" },
    {
      to: "/PastEvents",
      label: "PAST EVENTS",
      icon: <CalendarCheck className="w-5 h-5" />,
      description: "View our previous events"
    },
    // Submissions: only if logged in and (admin or lecturer)
    ...((isLogged && (isAdmin || isLecturer))
      ? [
          {
            to: "/lecturer",
            label: "SUBMISSIONS",
            icon: <FileText className="w-5 h-5" />,
            description: "Review event submissions"
          },
        ]
      : []),
    // Log in: only if not logged in
    ...(!isLogged
      ? [
          {
            to: "/Login",
            label: "LOG IN",
            icon: <LogIn className="w-5 h-5" />,
            description: "Access your account"
          },
        ]
      : []),
    // Admin Panel: only if logged in and admin
    ...((isLogged && isAdmin)
      ? [
          {
            to: "/AdminPanel",
            label: "ADMIN PANEL",
            icon: <IoBuild className="w-5 h-5" />,
            description: "Manage the website"
          },
        ]
      : []),
    // Sign Out: only if logged in
    ...(isLogged ? [{
      to: "#signout",
      label: "SIGN OUT",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>,
      description: "Sign out of your account",
      signOut: true
    }] : [])
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Club Name */}
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img className="h-8 w-8" src={isDark ? CCLogoWhite : CClogo} alt="UoM Computer Club Logo" />
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white font-questrial">
              UOM COMPUTER CLUB
                </div>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.signOut ? (
                <button
                  key="signout"
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 relative group text-gray-700 dark:text-gray-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-semibold"
                  title={item.description}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 relative group ${
                      isActive
                        ? "text-black dark:text-white active nav-active"
                        : "text-gray-700 dark:text-gray-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                    }`
                  }
                  title={item.description}
                >
                  {({ isActive }) => (
                    <>
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-black dark:bg-white rounded-full"></div>
                      )}
                    </>
                  )}
                </NavLink>
              )
            ))}
            {/* Dark mode toggle button */}
            <button
              onClick={() => setIsDark((d) => !d)}
              className="ml-4 p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-6 py-4 transition-all duration-200 relative ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-900 border-r-4 border-blue-600 dark:border-blue-400"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
                title={item.description}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`}>
                    {item.icon}
                    </div>
                    <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.description}</span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {/* Custom style to force active nav text to stay white in dark mode on hover */}
      <style>{`
        .dark .nav-active:hover, .dark .nav-active:focus {
          color: #fff !important;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
