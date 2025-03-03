import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CalendarCheck, Home, LogIn } from "lucide-react";
import { IoAddCircleOutline } from "react-icons/io5";
import dummy from "../assets/dummy-logo.png";

const isAdmin = false;
const isLogged = true;

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      to: "/PastEvents",
      label: "Past Events",
      icon: <CalendarCheck className="w-5 h-5" />,
    },
    ...(isLogged && isAdmin
      ? [
          {
            to: "/Admin",
            label: "Add Event",
            icon: <IoAddCircleOutline className="w-5 h-5" />,
          },
        ]
      : []),
    ...(!isLogged
      ? [
          {
            to: "/Login",
            label: "Log in",
            icon: <LogIn className="w-5 h-5" />,
          },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Club Name */}
          <div className="flex items-center space-x-3">
            <NavLink to="/">
              <img className="h-8 w-8" src={dummy} alt="Logo" />
            </NavLink>
            <NavLink
              to="/"
              className="font-bold text-lg text-black hover:text-blue-600 hover:underline"
            >
              UoM Computer Club
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-black hover:text-blue-600"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black"
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
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-md w-full text-center transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 bg-gray-100 border-l-4 border-blue-600"
                      : "text-black hover:bg-gray-200"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
