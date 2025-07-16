import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface SuccessDialogProps {
  isOpen: boolean;
  teamName: string;
  onClose: () => void;
}

export default function SuccessDialog({ isOpen, teamName, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              <span>Submission Successful!</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-red-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Congratulations, {teamName}!</h3>
              <p className="text-gray-600">
                Your proposal has been successfully submitted. We'll contact you soon with further details if your team has been selected.
              </p>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-red-600 text-white font-semibold hover:bg-red-800 p-2 sm:p-3 rounded-lg transition text-base sm:text-lg"
            >
              Close
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
} 