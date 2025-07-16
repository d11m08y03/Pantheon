import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CClogo from '../../assets/CC-logo.png';
import CCLogoWhite from '../../assets/CCLogoWhite.png';
import { useState, useEffect } from "react";

interface TeamNameStepProps {
  teamName: string;
  setTeamName: (name: string) => void;
  onNext: () => void;
}

export default function TeamNameStep({ teamName, setTeamName, onNext }: TeamNameStepProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(document.documentElement.classList.contains('dark') || match.matches);
    match.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      match.removeEventListener('change', update);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-h-[300px] sm:min-h-[400px] justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center">
          <img src={isDark ? CCLogoWhite : CClogo} alt="CC Logo" className="w-20 lg:h-24 sm:h-20" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Let's Start with Your Team</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Give your team a memorable name that represents your vision and creativity
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your team name..."
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="p-3 sm:p-4 text-base sm:text-lg border-2 border-blue-200 rounded-md focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {teamName.trim() && (
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {teamName.trim() ? `${teamName.length} characters` : "Team name will appear here"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="button"
          className="w-full bg-red-600 text-white font-semibold hover:bg-red-800 p-3 sm:p-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
          onClick={onNext}
          disabled={!teamName.trim()}
        >
          <span className="flex items-center justify-center gap-2">
            Continue to Team Members
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Step 1 of 4</p>
        </div>
      </div>
    </div>
  );
} 