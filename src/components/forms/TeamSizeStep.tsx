import { Button } from "@/components/ui/button";
import CClogo from '../../assets/CC-logo.png';
import CCLogoWhite from '../../assets/CCLogoWhite.png';

interface TeamSizeStepProps {
  teamName: string;
  numMembers: number;
  onNumMembersChange: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function TeamSizeStep({ 
  teamName, 
  numMembers, 
  onNumMembersChange, 
  onBack, 
  onNext 
}: TeamSizeStepProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-h-[300px] sm:min-h-[400px] justify-center">
      <div className="flex flex-col items-center space-y-2 mb-2">
        <span className="text-xs text-gray-400 tracking-wide uppercase">Team Name</span>
        <div className="flex items-center gap-2 bg-white dark:bg-white border border-blue-200 rounded-lg px-5 py-2">
          <img src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark') ? CCLogoWhite : CClogo} alt="CC Logo" className="w-7 h-7 hidden sm:block" />
          <div className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">{teamName}</div>
        </div>
      </div>
    
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Team Size Selection</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Choose how many members will be in your team. You can have between 1 to 5 members.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {[1, 2, 3, 4, 5].map((n) => (
            <Button
              key={n}
              type="button"
              className={`rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-lg sm:text-xl font-bold border-2 transition-all duration-200 transform hover:scale-105 ${
                numMembers === n 
                  ? "bg-red-600 text-white border-red-400" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300"
              }`}
              onClick={() => onNumMembersChange(n)}
            >
              {n}
            </Button>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">
              {numMembers === 1 ? "Solo participant" : `${numMembers} team members`}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
          <Button
            type="button"
            className="flex-1 bg-gray-500 text-white font-semibold hover:bg-black p-2 sm:p-3 rounded-lg transition text-base sm:text-lg"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="button"
            className="flex-1 bg-red-600 text-white font-semibold hover:bg-red-800 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Step 2 of 4</p>
        </div>
      </div>
    </div>
  );
} 