import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";

export default function SubmissionForm({ onClose }: { onClose: () => void }) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([""]);
  const [email, setEmail] = useState("");
  const [proposal, setProposal] = useState<File | null>(null);
  const [proposalText, setProposalText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      teamName,
      members,
      email,
      proposalText,
      proposal,
    };
    console.log("Submitted Data:", submissionData);
    alert("Submission Successful!");
  };

  const handleAddMember = () => {
    if (members.length < 5) {
      setMembers([...members, ""]);
    }
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[450px] md:w-[500px] lg:w-[550px]">
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-xl font-bold text-center">Hackathon Submission</h2>

          <Input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="p-2"
          />

          <div className="space-y-2">
            <p className="font-medium">Team Members (Max 5)</p>
            {members.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder={`Member ${index + 1} Name`}
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  required
                  className="p-2"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(index)}
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            {members.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddMember}
                className="w-full flex items-center justify-center text-sm p-2"
              >
                Add Member
              </Button>
            )}
          </div>

          <Input
            type="email"
            placeholder="Contact Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2"
          />

          <Textarea
            placeholder="Additional details about the project proposal"
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            required
            className="h-28 p-2"
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setProposal(e.target.files ? e.target.files[0] : null)
            }
            required
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-700 p-2"
          >
            Submit Proposal
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="w-full mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Close Form
          </Button>
        </form>
      </div>
    </div>
  );
}
