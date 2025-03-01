import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EventData {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function IncomingPoster({ eventData }: { eventData: EventData }) {
  const [isOpen, setIsOpen] = useState(false); 
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [email, setEmail] = useState("");
  const [proposal, setProposal] = useState<File | null>(null);
  const [proposalText, setProposalText] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      teamName,
      members: members.split(","),
      email,
      proposalText,
      proposal,
    };
    console.log("Submitted Data:", submissionData);
    alert("Submission Successful!");
  };

  const handleClose = () => {
    setIsOpen(false);  
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl mb-16 mt-16 ml-4 mr-4 w-full sm:w-[800px] lg:w-[900px] h-[600px] sm:h-[700px] lg:h-[700px]"
      >
        <div className="flex w-full h-full">
          {/* Left Side: Image */}
          <div className="w-11/12 aspect-[16/9] overflow-hidden">
            <img
              src={eventData.imageUrl}
              alt={eventData.title}
              className="h-full w-full object-cover transition-transform duration-700"
            />
          </div>

          {/* Right Side: Details */}
          <div className="w-2/3 p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-neutral-100 px-4 py-2 text-lg font-medium text-neutral-600">
                  {eventData.category}
                </span>
                <span className="text-lg text-neutral-500">{eventData.date}</span>
              </div>

              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
                {eventData.title}
              </h3>

              <p className="text-lg text-neutral-600">{eventData.description}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                className="w-full mt-5 hover:bg-blue-500 hover:text-white"
                variant="outline"
                onClick={handleButtonClick} 
              >
                Enroll for this event
              </Button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[400px]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Hackathon Submission</h2>
                <Input
                  type="text"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Team Members (comma-separated)"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Contact Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Additional details about the project proposal"
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  required
                  className="h-32"
                />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setProposal(e.target.files ? e.target.files[0] : null)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700">
                  Submit Proposal
                </Button>
                <Button
                  type="button"
                  onClick={handleClose}
                  className="w-full mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Close Form
                </Button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
