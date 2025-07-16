import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addTeamRegistration, getTeamRegistrationByName } from "@/lib/TeamRegistrationStore";
import { getValidationError } from "@/lib/validation";
import TeamNameStep from "./forms/TeamNameStep";
import TeamSizeStep from "./forms/TeamSizeStep";
import MemberDetailsStep from "./forms/MemberDetailsStep";
import ProposalUploadStep from "./forms/ProposalUploadStep";
import TeamNameExistsDialog from "./dialogs/TeamNameExistsDialog";
import SuccessDialog from "./dialogs/SuccessDialog";

interface Member {
  name: string;
  umail: string;
  contact: string;
  foodPreference: string;
  allergies: string;
  shirtSize: string;
}

export default function SubmissionForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState<Member[]>([{ 
    name: "", 
    umail: "", 
    contact: "", 
    foodPreference: "", 
    allergies: "", 
    shirtSize: "" 
  }]);
  const [proposal, setProposal] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showTeamNameExistsDialog, setShowTeamNameExistsDialog] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNumMembersChange = (value: number) => {
    setNumMembers(value);
    const newMembers = Array.from({ length: value }, (_, i) => {
      return members[i] || { 
        name: "", 
        umail: "", 
        contact: "", 
        foodPreference: "", 
        allergies: "", 
        shirtSize: "" 
      };
    });
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);

    // Clear previous error for this field
    const errorKey = `member${index}_${field}`;
    setErrors(prev => ({ ...prev, [errorKey]: '' }));

    // Validate the field
    const errorMessage = getValidationError(field, value);
    if (errorMessage) {
      setErrors(prev => ({ ...prev, [errorKey]: errorMessage }));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const existingTeam = getTeamRegistrationByName(teamName.trim());
      if (existingTeam) {
        setShowTeamNameExistsDialog(true);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRegistration = addTeamRegistration({
      teamName,
      members,
      proposal,
    });
    
    console.log("Registration stored with ID:", newRegistration.id);
    setShowSuccessDialog(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TeamNameStep
            teamName={teamName}
            setTeamName={setTeamName}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <TeamSizeStep
            teamName={teamName}
            numMembers={numMembers}
            onNumMembersChange={handleNumMembersChange}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <MemberDetailsStep
            members={members}
            onMemberChange={handleMemberChange}
            errors={errors}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <ProposalUploadStep
            proposal={proposal}
            onProposalChange={setProposal}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-4 sm:p-8 rounded-2xl w-full max-w-[95vw] sm:max-w-2xl border border-gray-100 relative animate-fade-in max-h-[100dvh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <Button
            type="button"
            onClick={onClose}
            className="w-full mt-2 p-2 sm:p-3 bg-white text-red-500 border border-red-400 rounded-lg hover:bg-red-50 font-semibold transition text-base sm:text-lg"
          >
            Close Form
          </Button>
        </form>
      </div>

      <TeamNameExistsDialog
        isOpen={showTeamNameExistsDialog}
        teamName={teamName}
        onClose={() => setShowTeamNameExistsDialog(false)}
      />

      <SuccessDialog
        isOpen={showSuccessDialog}
        teamName={teamName}
        onClose={() => {
          setShowSuccessDialog(false);
          onClose();
        }}
      />
    </div>
  );
}
