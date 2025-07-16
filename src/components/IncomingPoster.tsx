import { useState, useEffect } from "react";
import {
  Calendar,
  Tag,
  ArrowRight,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Marquee } from "./magicui/marquee";
import SubmissionForm from "./SubmissionForm";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardContent } from "@/components/ui/card";


interface EventData {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
  sponsors?: string[];
}

export default function IncomingPoster({ eventData }: { eventData: EventData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const updateCountdown = () => {
      console.log("eventData.date:", eventData.date, "Parsed Date:", new Date(eventData.date));
      let dateString = eventData.date;
      // If the date string does not contain a timezone, append '+04:00' (with colon)
      if (!/([zZ]|[+-]\d{2}:?\d{2})$/.test(dateString)) {
        // If it ends with HH:mm:ss, append +04:00
        if (/\d{2}:\d{2}:\d{2}$/.test(dateString)) {
          dateString += "+04:00";
        } else if (/\d{2}:\d{2}$/.test(dateString)) {
          // If it ends with HH:mm, append :00+04:00
          dateString += ":00+04:00";
        }
      }
      const eventTime = new Date(dateString).getTime();
      const now = Date.now();
      const diff = eventTime - now;
      console.log("dateString:", dateString, "eventTime:", eventTime, "now:", now, "diff:", diff);

      if (isNaN(eventTime) || diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      let remaining = diff;
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      remaining -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      remaining -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(remaining / (1000 * 60));
      remaining -= minutes * (1000 * 60);
      const seconds = Math.floor(remaining / 1000);

      // Fallback: if diff > 0 but all values are zero, set seconds to 1 for debugging
      const display = {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
      if (diff > 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        display.seconds = "01";
      }
      console.log("Setting countdown:", display);
      setCountdown(display);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(interval);
  }, [eventData.date]);

  useEffect(() => {
    console.log("Countdown:", countdown);
  }, [countdown]);

  const displayDate = new Date(eventData.date).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      <Card className="relative overflow-hidden w-full max-w-4xl mt-8 bg-white/95 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-all flex flex-col items-center text-center shadow-lg">
        <ShineBorder shineColor="#b91c1c" borderWidth={1} duration={8} />
        <CardContent className="flex flex-col lg:flex-row w-full h-full gap-8 p-0">
          {/* Left side */}
          <div className="w-full lg:w-2/3 flex flex-col h-full">
            <div className="relative flex-grow rounded-xl overflow-hidden">
              <img
                src={eventData.imageUrl}
                alt={eventData.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1.5 shadow-sm">
                  <Tag size={14} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{eventData.category}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {/* Registration Open badge removed */}
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-4 h-[70px] sm:h-[90px] flex flex-wrap justify-center gap-3 sm:gap-6 text-gray-700 dark:text-gray-200 font-semibold text-center text-base sm:text-lg select-none">
              {[
                "Days",
                "Hours",
                "Minutes",
                "Seconds",
              ].map((label, i) => {
                const value = Object.values(countdown)[i];
                return (
                  <div key={label} className="flex-1 min-w-[60px] sm:min-w-[80px]">
                    <div className="text-2xl sm:text-3xl font-mono">{value}</div>
                    <div className="uppercase tracking-widest text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="w-full lg:w-1/3 flex flex-col h-full">
            <div className="flex flex-col flex-grow gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Calendar size={16} className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block">{displayDate}</span>
                    
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                  {eventData.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                  {eventData.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>Duration: 2–3 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>UoM Campus</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 group/btn transform hover:scale-[1.02]"
                onClick={() => setIsOpen(true)}
              >
                <span className="flex items-center gap-3">
                  Register Now - It's Free!
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </Button>
            </div>

            {Array.isArray(eventData.sponsors) && eventData.sponsors.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                  <Users size={14} className="text-gray-400 dark:text-gray-500" />
                  <span className="text-xs font-medium">Event Sponsors</span>
                </div>
                <Marquee speed={20} className="flex-grow h-14">
                  {eventData.sponsors?.map((sponsor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center w-20 h-14 bg-gray-50 dark:bg-white border border-gray-200 dark:border-gray-800 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
                    >
                      <img
                        src={sponsor}
                        alt={`Sponsor ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class='text-xs font-medium text-gray-500 dark:text-gray-400'>Sponsor</span>`;
                          }
                        }}
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isOpen && <SubmissionForm onClose={() => setIsOpen(false)} />}
    </>
  );
}
