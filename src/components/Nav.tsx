import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Calendar, CalendarCheck, Home } from "lucide-react";
import dummy from '../assets/dummy-logo.png';
import { IoAddCircleOutline } from "react-icons/io5";
import { LogIn } from 'lucide-react';

const isAdmin = true;
const isLogged = true;

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/PastEvents", label: "Past Events", icon: <CalendarCheck className="w-4 h-4" /> },
    ...(isLogged ? (isAdmin ? [{ to: "/Admin", label: "Add Event", icon: <IoAddCircleOutline className="w-5 h-5" /> }] : []) : []),
    ...(isLogged ? [] : [{ to: "/Login", label: "Log in", icon: <LogIn className="w-5 h-5" /> }]),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex direction-row hover:text-accent">
            <NavLink to='/'>
              <img className="h-6 w-6 mr-3" src={dummy} alt="Logo" />
            </NavLink>
            <NavLink to="/" className="font-bold text-md text-black font-playwrite hover:text-blue-600 hover:underline">
              UoM Computer Club
            </NavLink>
          </div>

  
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 text-accent border-b-1 border-blue-600"
                      : "text-black hover:text-accent hover:bg-blue-500 hover:border-b-2 hover:border-blue-600"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

    
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 text-accent border-b-1 border-blue-600"
                      : "text-black hover:text-accent hover:bg-blue-500 hover:border-b-2 hover:border-blue-600"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
