import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LinksEnum } from "@/lib/LinksEnum";
import { UpcomingEventsData } from "./UpcomingEventsData";
import { PastActivities } from "./PastEventsData";
import HighlightCard from "./HighlightsCard";
import UpcomingEventCard from "./UpcomingEventCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TypingAnimation } from "./magicui/typing-animation";
import { BinaryBackground } from "./BinaryBackground";

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
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-cover bg-center bg-fixed">
      
      <div className="absolute inset-0 h-[90vh] lg:h-[90vh] overflow-hidden z-0">
        <BinaryBackground className="hidden lg:block w-full h-full" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 mt-28 md:mt-40 lg:mt-52 xl:mt-64 flex flex-col justify-center items-center transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
          <TypingAnimation className="text-2xl md:text-3xl lg:text-5xl xl:text-5xl">
            Welcome to the UoM Computer Club
          </TypingAnimation>
        </h1>
        <h2 className="text-lg sm:text-lg mb-6 text-center">
          Empowering students through technology, innovation, and collaboration.
        </h2>
        <button className="mt-10 px-8 py-3 rounded-lg transition-all" onClick={handleViewUpcomingEvents}>
          <InteractiveHoverButton className="text-xs lg:text-xl xl:text-xl">
            View all our upcoming events
          </InteractiveHoverButton>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center mt-32 md:mt-40 xl:mt-64">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 transition-transform duration-300 hover:scale-105 hover:opacity-80">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
            Scroll to see our newest events
          </span>
        </h2>
        <div className="mt-4 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="bg-white container mx-auto py-12">
        <div className="text-center">
          <div className="flex flex-wrap justify-between sm:px-8 transition-opacity duration-500"
            style={{ opacity: showContent ? 1 : 0, transform: showContent ? "none" : "translateY(30px)", transition: "opacity 0.7s, transform 0.7s" }}>
            {UpcomingEventsData.slice(0, 3).map((event, index) => (
              <UpcomingEventCard key={index} eventData={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white container mx-auto py-12">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
              View the Highlights of Our Club
            </span>
          </h2>
          <div
  className="flex flex-wrap justify-between sm:px-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10 transition-opacity duration-500"
  style={{
    opacity: showContent ? 1 : 0,
    transform: showContent ? "none" : "translateY(30px)",
    transition: "opacity 0.7s, transform 0.7s",
  }}
>
  {PastActivities.slice(0, 2).map((event, index) => (
    <HighlightCard key={index} eventData={event} className="w-full" />
  ))}
</div>

        </div>
      </section>
    </div>
  );
};
