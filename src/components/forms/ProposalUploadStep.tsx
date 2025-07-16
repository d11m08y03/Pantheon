import { Button } from "@/components/ui/button";

interface ProposalUploadStepProps {
  proposal: File | null;
  onProposalChange: (file: File | null) => void;
  onBack: () => void;
}

export default function ProposalUploadStep({ 
  proposal, 
  onProposalChange, 
  onBack 
}: ProposalUploadStepProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-h-[300px] sm:min-h-[400px] justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Upload Your Proposal</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Please upload your project proposal in PDF format. This document should outline your team's vision and approach.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => onProposalChange(e.target.files ? e.target.files[0] : null)}
            required
            className="w-full p-4 border-2 border-dashed border-blue-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          {proposal && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {proposal && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-700 font-medium">File selected: {proposal.name}</span>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {proposal ? "Ready to submit!" : "Please select a PDF file"}
          </p>
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
            type="submit"
            className="flex-1 bg-red-600 text-white font-semibold hover:bg-red-800 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg"
            disabled={!proposal}
          >
            Submit Proposal
          </Button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Step 4 of 4</p>
        </div>
      </div>
    </div>
  );
} 