import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubmissionForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState<{ name: string; contact: string }[]>([]);
  const [proposal, setProposal] = useState<File | null>(null);

  // For backward compatibility, initialize members array when numMembers changes
  const handleNumMembersChange = (value: number) => {
    setNumMembers(value);
    setMembers(Array.from({ length: value }, (_, i) => members[i] || { name: "", contact: "" }));
  };

  const handleMemberChange = (index: number, field: "name" | "contact", value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      teamName,
      members,
      proposal,
    };
    console.log("Submitted Data:", submissionData);
    alert("Submission Successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 relative animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-extrabold text-center text-blue-700 tracking-tight mb-2">Hackathon Submission</h2>

          {/* Step 1: Team Name */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                autoFocus
              />
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 p-3 rounded-lg shadow-md transition"
                onClick={() => teamName.trim() && setStep(2)}
                disabled={!teamName.trim()}
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Number of Members */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <label className="text-lg font-semibold text-gray-700 text-center">Number of Team Members</label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Button
                    key={n}
                    type="button"
                    className={`rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold border-2 ${numMembers === n ? "bg-blue-600 text-white border-blue-700" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"}`}
                    onClick={() => handleNumMembersChange(n)}
                  >
                    {n}
                  </Button>
                ))}
              </div>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 p-3 rounded-lg shadow-md transition"
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 3: Member Details */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <label className="text-lg font-semibold text-gray-700 text-center mb-2">Team Members Details</label>
              <div className="flex flex-col gap-4">
                {members.map((member, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <span className="font-medium text-blue-700">Member {idx + 1}</span>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                      required
                      className="p-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                    <Input
                      type="text"
                      placeholder="Contact (Email or Phone)"
                      value={member.contact}
                      onChange={(e) => handleMemberChange(idx, "contact", e.target.value)}
                      required
                      className="p-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                ))}
              </div>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 p-3 rounded-lg shadow-md transition"
                onClick={() => members.every(m => m.name.trim() && m.contact.trim()) && setStep(4)}
                disabled={!members.every(m => m.name.trim() && m.contact.trim())}
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 4: Proposal Upload */}
          {step === 4 && (
            <div className="flex flex-col gap-6">
              <label className="text-lg font-semibold text-gray-700 text-center mb-2">Upload Proposal (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setProposal(e.target.files ? e.target.files[0] : null)}
                required
                className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:from-blue-600 hover:to-blue-800 p-3 rounded-lg shadow-md transition"
                disabled={!proposal}
              >
                Submit Proposal
              </Button>
            </div>
          )}

          <Button
            type="button"
            onClick={onClose}
            className="w-full mt-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold shadow-sm transition"
          >
            Close Form
          </Button>
        </form>
      </div>
    </div>
  );
}
