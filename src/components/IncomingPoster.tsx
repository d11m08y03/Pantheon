import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SubmissionForm from "./SubmissionForm"; 

interface EventData {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function IncomingPoster({ eventData }: { eventData: EventData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg  shadow-lg transition-shadow duration-300 hover:shadow-xl w-full bg-white"
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 aspect-[9/8] overflow-hidden">
            <img
              src={eventData.imageUrl}
              alt={eventData.title}
              className="h-full w-full object-cover transition-transform duration-700"
            />
          </div>

        
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="rounded-full bg-neutral-100 px-4 py-2 text-lg font-medium text-neutral-600 mb-2 md:mb-0">
                  {eventData.category}
                </span>
                <span className="text-lg text-neutral-500">{eventData.date}</span>
              </div>

              <h3 className="mb-4 text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                {eventData.title}
              </h3>

              <p className="text-base md:text-lg text-neutral-600">{eventData.description}</p>
            </div>

            <div className="mt-4 md:mt-6 flex justify-center">
              <Button
                className="w-full md:w-2/3 lg:w-2/4 hover:bg-blue-500 hover:text-white"
                variant="outline"
                onClick={() => setIsOpen(true)}
              >
                Enroll for this event
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

     
      {isOpen && <SubmissionForm onClose={() => setIsOpen(false)} />}
    </>
  );
}
