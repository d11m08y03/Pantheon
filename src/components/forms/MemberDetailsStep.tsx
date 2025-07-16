import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Member {
  name: string;
  umail: string;
  contact: string;
  foodPreference: string;
  allergies: string;
  shirtSize: string;
}

interface MemberDetailsStepProps {
  members: Member[];
  onMemberChange: (index: number, field: string, value: string) => void;
  errors: { [key: string]: string };
  onBack: () => void;
  onNext: () => void;
}

export default function MemberDetailsStep({ 
  members, 
  onMemberChange, 
  errors, 
  onBack, 
  onNext 
}: MemberDetailsStepProps) {
  const isFormValid = members.every(m => 
    m.name.trim() && 
    m.umail.trim() && 
    m.contact.trim() && 
    m.foodPreference && 
    m.shirtSize
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-6 min-h-[200px] sm:min-h-[300px]">
      <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 text-center mb-2">
        Team Members Details
      </label>
      
      <div className="flex flex-col gap-3 sm:gap-4 max-h-[40vh] sm:max-h-[400px] overflow-y-auto">
        {members.map((member, idx) => (
          <div key={idx} className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <span className="font-medium text-gray-800 text-base sm:text-lg">Member {idx + 1}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <div className="space-y-1">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={member.name}
                  onChange={(e) => onMemberChange(idx, "name", e.target.value)}
                  required
                  className={`p-2 border-2 rounded-lg focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                    errors[`member${idx}_name`] 
                      ? 'border-red-300 focus:border-red-400 dark:border-red-700 dark:focus:border-red-500' 
                      : 'border-red-200 focus:border-red-400 dark:border-red-700 dark:focus:border-red-400'
                  }`}
                />
                {errors[`member${idx}_name`] && (
                  <p className="text-xs text-red-500 dark:text-red-400">{errors[`member${idx}_name`]}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="Umail Address"
                  value={member.umail}
                  onChange={(e) => onMemberChange(idx, "umail", e.target.value)}
                  required
                  className={`p-2 border-2 rounded-lg focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                    errors[`member${idx}_umail`] 
                      ? 'border-red-300 focus:border-red-400 dark:border-red-700 dark:focus:border-red-500' 
                      : 'border-red-200 focus:border-red-400 dark:border-red-700 dark:focus:border-red-400'
                  }`}
                />
                {errors[`member${idx}_umail`] && (
                  <p className="text-xs text-red-500 dark:text-red-400">{errors[`member${idx}_umail`]}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Input
                  type="tel"
                  placeholder="Contact Number"
                  value={member.contact}
                  onChange={(e) => onMemberChange(idx, "contact", e.target.value)}
                  required
                  className={`p-2 border-2 rounded-lg focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                    errors[`member${idx}_contact`] 
                      ? 'border-red-300 focus:border-red-400 dark:border-red-700 dark:focus:border-red-500' 
                      : 'border-red-200 focus:border-red-400 dark:border-red-700 dark:focus:border-red-400'
                  }`}
                />
                {errors[`member${idx}_contact`] && (
                  <p className="text-xs text-red-500 dark:text-red-400">{errors[`member${idx}_contact`]}</p>
                )}
              </div>
              
              <select
                value={member.foodPreference}
                onChange={(e) => onMemberChange(idx, "foodPreference", e.target.value)}
                required
                className="p-2 border-2 border-red-200 dark:border-red-700 rounded-lg focus:border-red-400 dark:focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition bg-white dark:bg-gray-800 text-sm sm:text-base text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Food Preference</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
              
              <Input
                type="text"
                placeholder="Allergies (if any)"
                value={member.allergies}
                onChange={(e) => onMemberChange(idx, "allergies", e.target.value)}
                className="p-2 border-2 border-red-200 dark:border-red-700 rounded-lg focus:border-red-400 dark:focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              
              <select
                value={member.shirtSize}
                onChange={(e) => onMemberChange(idx, "shirtSize", e.target.value)}
                required
                className="p-2 border-2 border-red-200 dark:border-red-700 rounded-lg focus:border-red-400 dark:focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition bg-white dark:bg-gray-800 text-sm sm:text-base text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Shirt Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
          <Button
            type="button"
            className="flex-1 bg-gray-500 dark:bg-gray-700 text-white font-semibold hover:bg-black dark:hover:bg-gray-900 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="button"
            className="flex-1 bg-red-600 text-white font-semibold hover:bg-red-800 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg border border-red-600"
            onClick={onNext}
            disabled={!isFormValid}
          >
            Next
          </Button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-red-200 dark:bg-red-700 rounded-full"></div>
            <div className="w-2 h-2 bg-red-200 dark:bg-red-700 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 dark:bg-red-600 rounded-full border border-red-500"></div>
            <div className="w-2 h-2 bg-red-200 dark:bg-red-700 rounded-full"></div>
          </div>
          <p className="text-xs text-red-400 dark:text-red-500 mt-1">Step 3 of 4</p>
        </div>
      </div>
    </div>
  );
} 