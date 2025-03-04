import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LinksEnum } from "@/lib/LinksEnum";
import { UpcomingEventsData } from "./UpcomingEventsData";
import { PastActivities } from "./PastEventsData";
import HighlightCard from "./HighlightsCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TypingAnimation } from "./magicui/typing-animation";
import { BinaryBackground } from "./BinaryBackground";
import IncomingPoster from "../components/IncomingPoster";
import CClogo from '../assets/CC-logo.png'
export const Main: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewUpcomingEvents = () => {
    navigate(LinksEnum.UPCOMING_EVENTS);
    const highlightsSection = document.getElementById("highlights");
    if (highlightsSection) {
      highlightsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex flex-col bg-cover bg-center bg-fixed">
      <div id="Hero" className="bg-slate-50 w-full">
        {/* Background Animation */}
        <div className="absolute inset-0 h-[90vh] overflow-hidden z-0">
          <BinaryBackground className="hidden lg:block w-full h-full" />
        </div>

        {/* Main Content */}
        <div
          className={`relative z-10 mt-20 sm:mt-28 flex flex-col justify-center items-center px-4 transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <img className="h-28 sm:h-36 w-auto" src={CClogo} alt="Logo" />

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mt-8">
            <TypingAnimation className="text-xl md:text-3xl lg:text-5xl">
              Welcome to the UoM Computer Club
            </TypingAnimation>
          </h1>

          <h2 className="text-md sm:text-lg mb-6 text-center">
            Empowering students through technology, innovation, and collaboration.
          </h2>

          <button
            className="mt-8 px-6 py-3 rounded-lg transition-all"
            onClick={handleViewUpcomingEvents}
          >
            <InteractiveHoverButton className="text-xs lg:text-lg">
              View the highlights of our club
            </InteractiveHoverButton>
          </button>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 transition-transform duration-300 hover:scale-105 hover:opacity-80 mt-32 sm:mt-44">
            <span className="block font-bold bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent">
              Scroll to see our newest events
            </span>
          </h2>

          {/* Scroll Indicator */}
          <div className="mt-4 animate-bounce mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="container mx-auto mt-10 max-w-screen-xl px-4 mb-10">
        <div className="text-center">
          <div
            className="flex flex-wrap justify-center sm:px-8 transition-opacity duration-500 mx-1"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "none" : "translateY(30px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}
          >
            {UpcomingEventsData.slice(0, 1).map((event, index) => (
              <IncomingPoster key={index} eventData={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500 mb-8">
              View the Highlights of Our Club
            </span>
          </h2>

          <div
            className="flex flex-col lg:flex-row justify-between gap-6 transition-opacity duration-500"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "none" : "translateY(30px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}
          >
            {PastActivities.slice(0, 2).map((event, index) => (
              <HighlightCard key={index} eventData={event} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
