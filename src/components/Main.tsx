// src/pages/Main.tsx
import { useEffect, useState } from "react";
import { Lightbulb, Calendar, Users } from "lucide-react";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";

import { OffersCard } from "./Offers";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { UpcomingEventsData } from "@/components/UpcomingEventsData";
import { PastActivities } from "@/components/PastEventsData";
import HighlightCard from "@/components/HighlightsCard";
import IncomingPoster from "@/components/IncomingPoster";
import { BinaryBackground } from "@/components/BinaryBackground";
import { ShineBorder } from "@/components/magicui/shine-border";

// Partner Logos
import FinamLogo from "@/assets/Partners/Finam.png";
import UILOLogo from "@/assets/Partners/UILO.png";
import FOICDTLogo from "@/assets/Partners/foicdt.png";
import FOICDTLogoWhite from "@/assets/foicdtWhite.png";
import CClogo from "@/assets/CC-logo.png";
import CCLogoWhite from "@/assets/CCLogoWhite.png";

export const Main = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(document.documentElement.classList.contains('dark') || match.matches);
    update();
    match.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      match.removeEventListener('change', update);
      observer.disconnect();
    };
  }, []);

  const redirectToWhatsapp = () => {
    window.open("https://chat.whatsapp.com/Fq0ijZJpBP1K8Mxp4U5A4Q", "_blank");
  };

  return (
    <div className="relative w-full flex flex-col bg-cover bg-center bg-fixed">
      {/* Binary Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BinaryBackground />
      </div>
      {/* Hero Background Overlay */}
      <div className="absolute inset-0 h-[90vh] overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:hidden" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col justify-center items-center px-4 mt-16 sm:mt-20 mb-6 overflow-hidden">
        <RetroGrid className="absolute inset-0 opacity-10 -z-20" />
        <img src={isDark ? CCLogoWhite : CClogo} alt="UoM Computer Club Logo" className="mt-12 h-32 sm:h-36 w-auto" />
        <h1 className="text-3xl sm:text-5xl font-bold text-center mt-12 text-gray-900">
          Welcome to the UoM Computer Club
        </h1>
        <p className="text-lg text-gray-700 text-center mt-4 max-w-2xl">
          Empowering students through technology, creativity, and community.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6 mb-2">
          <a href="https://www.instagram.com/uom.computerclub/" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-pink-500 text-2xl p-2 rounded-xl hover:bg-gray-100"><IoLogoInstagram /></a>
          <a href="https://www.facebook.com/ComputerClubMU" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-600 text-2xl p-2 rounded-xl hover:bg-gray-100"><IoLogoFacebook /></a>
          <a href="https://www.linkedin.com/company/uom-computer-club/posts/?feedView=all" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-700 text-2xl p-2 rounded-xl hover:bg-gray-100"><IoLogoLinkedin /></a>
          <a href="mailto:official@uomcomputerclub.tech" className="text-gray-600 hover:text-red-500 text-2xl p-2 rounded-xl hover:bg-gray-100"><IoMailOutline /></a>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          <button className="px-6 py-3 rounded-xl magicui-interactive-hover" onClick={redirectToWhatsapp}>
            <InteractiveHoverButton className="text-sm md:text-lg">
              Join our WhatsApp Group
            </InteractiveHoverButton>
          </button>
          <p className="text-sm text-gray-600 text-center">
            Connect with 500+ members instantly
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="mt-16 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-4">
            Find more about our club below
          </h2>
          <div className="flex flex-col items-center space-y-2">
         
            <div className="animate-bounce">
              <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto px-4 py-10 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl my-6 relative z-10">
        <ShineBorder borderWidth={2} duration={10} shineColor={["#f87171","#b91c1c"]} className="z-0" />
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore the opportunities and experiences we provide for our members.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          <OffersCard icon={Lightbulb} title="Workshops" description="Hands-on sessions to learn new tech skills and tools." iconColor="text-blue-500" />
          <OffersCard icon={Calendar} title="Hackathons" description="Collaborative coding events to solve real-world problems." iconColor="text-green-500" />
          <OffersCard icon={Users} title="Networking" description="Meet peers, mentors, and industry professionals." iconColor="text-purple-500" />
        </div>
      </section>

      {/* Upcoming Event */}
      <section className="container mx-auto px-4 py-10 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl my-6 relative z-10">
        <ShineBorder borderWidth={2} duration={10} shineColor={["#f87171","#b91c1c"]} className="z-0" />
        <div className="text-center mb-8">
          <span className="inline-block bg-red-800 text-white text-xs font-semibold rounded-full px-4 py-1 mb-4 animate-fade-in">Featured</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Upcoming Event</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't miss out on our next exciting event! Register now to secure your spot.</p>
        </div>
        <div className="flex justify-center">
          {UpcomingEventsData.slice(0, 1).map((event, index) => (
            <IncomingPoster key={index} eventData={event} />
          ))}
        </div>
      </section>

      {/* Recent Activities */}
      <section className="container mx-auto px-4 py-12 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl my-6 relative z-10">
        <ShineBorder borderWidth={2} duration={10} shineColor={["#f87171","#b91c1c"]} className="z-0" />
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Recent Club Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Take a look at some of our recent events and see what we've been up to!</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {PastActivities.slice(0, 2).map((event, index) => (
            <HighlightCard key={index} eventData={event} className="w-full lg:w-[48%]" />
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="container mx-auto px-4 py-10 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl my-6 relative z-10">
        <ShineBorder borderWidth={2} duration={10} shineColor={["#f87171","#b91c1c"]} className="z-0" />
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We are proud to partner with these organizations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {[FinamLogo, UILOLogo, isDark ? FOICDTLogoWhite : FOICDTLogo].map((logo, i) => (
            <div key={i} className="relative rounded-2xl bg-white/95 border border-gray-200 p-8 flex items-center justify-center">
              <img src={logo} alt="Partner Logo" className="h-20 w-auto object-contain transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
