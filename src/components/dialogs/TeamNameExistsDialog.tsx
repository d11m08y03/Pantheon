import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface TeamNameExistsDialogProps {
  isOpen: boolean;
  teamName: string;
  onClose: () => void;
}

export default function TeamNameExistsDialog({ isOpen, teamName, onClose }: TeamNameExistsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="bg-red-600 bg-clip-text text-transparent">
                Team Name Already Exists
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Team Name Conflict</h3>
              <p className="text-gray-600">
                The team name "<span className="font-semibold text-red-600">{teamName}</span>" is already registered. Please choose a different team name.
              </p>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-red-600 text-white font-semibold hover:bg-red-800 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg border-0"
            >
              OK, I'll Change It
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
} 