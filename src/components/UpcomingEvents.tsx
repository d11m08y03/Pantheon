"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UpcomingEventsData } from "./UpcomingEventsData";
import Nav from "./Nav";

interface UpcomingEvent {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

interface UpcomingEventsProps {
  className?: string; 
}

export default function UpcomingEvents({ className }: UpcomingEventsProps) {
  return (
    <>
      <Nav />
      <div className={`flex flex-wrap justify-center gap-6 mt-12 ${className}`}>
        {UpcomingEventsData.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative border-2 hover:border-blue-300 overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl mb-10 mt-10 ml-1 mr-1 w-full sm:w-[350px] lg:w-[400px] h-[450px] sm:h-[500px] lg:h-[550px] "
          >
            <div className="aspect-[16/9] overflow-hidden w-full h-2/5 ">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-700"
              />
            </div>

            <div className="p-6 h-3/5 overflow-auto">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                  {event.category}
                </span>
                <span className="text-sm text-neutral-500">{event.date}</span>
              </div>

              <h3 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">
                {event.title}
              </h3>

              <p className="text-neutral-600">{event.description}</p>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4">
                <Button className="w-full mt-5 hover:bg-blue-500 hover:text-white" variant="outline">
                  Enroll for this event
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
