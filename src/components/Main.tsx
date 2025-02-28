import Events from "./UpcomingEventCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TypingAnimation } from "./magicui/typing-animation";
import { BinaryBackground } from "./BinaryBackground";
import { useNavigate } from "react-router-dom";
import { LinksEnum } from "@/lib/LinksEnum";
import { useEffect, useState } from "react";
import { UpcomingEventsData } from "./UpcomingEventsData";
import { PastActivities } from "./PastEventsData";
import HighlightCard from "./HighlightsCard";

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleViewUpcomingEvents = () => {
    navigate(LinksEnum.UPCOMING_EVENTS);
  };

  const selectedEvents = UpcomingEventsData.slice(0, 3);
  const pastSelectedEvents = PastActivities.slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center bg-fixed flex flex-col">
      
      <BinaryBackground className="hidden lg:block" />

  
      <div
        className={`mt-52 flex flex-col justify-center items-center transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center">
          <TypingAnimation className="text-2xl md:text-3xl lg:text-5xl xl:text-5xl">
            Welcome to the UoM Computer Club
          </TypingAnimation>
        </h1>
        <h2 className="text-lg sm:text-lg mb-4 text-center">
          Empowering students through technology, innovation, and collaboration.
        </h2>

      
        <button
          className="mt-10 px-6 py-2 rounded-lg transition-all"
          onClick={handleViewUpcomingEvents}
        >
          <InteractiveHoverButton>
            View all our upcoming events
          </InteractiveHoverButton>
        </button>

    
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 transition-transform duration-300 hover:scale-105 hover:opacity-80">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
              Scroll to see our newest events
            </span>
          </h2>
          <div className="mt-4 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

  
      <section className="py-10 bg-white">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
              Upcoming Events
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {selectedEvents.map((event, index) => (
              <Events key={index} eventData={event} />
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-10 bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
              View the Highlights of Our Club
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {pastSelectedEvents.map((event, index) => (
              <HighlightCard key={index} eventData={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
