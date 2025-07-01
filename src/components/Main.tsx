// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { LinksEnum } from "@/lib/LinksEnum";
import { UpcomingEventsData } from "./UpcomingEventsData";
import { PastActivities } from "./PastEventsData";
import HighlightCard from "./HighlightsCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TypingAnimation } from "./magicui/typing-animation";
import { BinaryBackground } from "./BinaryBackground";
import IncomingPoster from "../components/IncomingPoster";
import CClogo from '../assets/CC-logo.png'

export const Main: React.FC = () => {
  // const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const redirectToWhatsapp = () => {
    window.open("https://chat.whatsapp.com/KG2gT6op1qWIanpOZrltZV", "_blank");
  };

  return (
    <div className="relative w-full flex flex-col bg-cover bg-center bg-fixed">
     
      <div className="absolute inset-0 h-[90vh] overflow-hidden z-0">
        <BinaryBackground className="hidden lg:block w-full h-full" />
      </div>

     
      <div id="Hero" className="relative z-10 flex flex-col justify-center items-center px-4 mt-24 sm:mt-32 transition-opacity duration-700"
        style={{ opacity: showContent ? 1 : 0 }}>
        <img className="h-32 sm:h-36 w-auto" src={CClogo} alt="Logo" />

        <h1 className="text-3xl sm:text-5xl font-bold text-center mt-12">
          <TypingAnimation className="text-2xl md:text-4xl lg:text-5xl">
            Welcome to the UoM Computer Club
          </TypingAnimation>
        </h1>

        <p className="text-base sm:text-lg mt-4 text-center max-w-2xl text-gray-700">
          Empowering students through technology, innovation, and collaboration.
        </p>

        <button
          className="mt-8 px-6 py-3 rounded-lg"
          onClick={redirectToWhatsapp}
        >
          <InteractiveHoverButton className="text-sm md:text-lg">
            Join our WhatsApp Group
          </InteractiveHoverButton>
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-24 sm:mt-32 hover:opacity-80 transition-transform duration-300 hover:scale-105">
          <span className="block font-bold bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent">
            Scroll to see our newest event
          </span>
        </h2>

    
        <div className="mt-4 animate-bounce mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>


      <section className="container mx-auto max-w-screen-xl px-4 mt-16 mb-10">
        <div className="text-center">
          <div
            className="flex flex-wrap justify-center gap-6 transition-all duration-700"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "none" : "translateY(30px)"
            }}
          >
            {UpcomingEventsData.slice(0, 1).map((event, index) => (
              <IncomingPoster key={index} eventData={event} />
            ))}
          </div>
        </div>
      </section>


      <section id="highlights" className="container mx-auto max-w-screen-xl px-4 mb-16">
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500">
              View the Highlights of Our Club
            </span>
          </h2>

          <div
            className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 transition-all duration-700"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "none" : "translateY(30px)"
            }}
          >
            {PastActivities.slice(0, 2).map((event, index) => (
              <HighlightCard key={index} eventData={event} className="w-full lg:w-[48%] h-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
