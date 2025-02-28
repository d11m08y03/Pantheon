import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EventData {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function Events({ eventData }: { eventData: EventData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl mb-10 mt-10 ml-1 mr-1 w-full sm:w-[350px] lg:w-[400px] h-[450px] sm:h-[500px] lg:h-[500px]"
    >
      <div className="aspect-[16/9] overflow-hidden w-full h-2/5">
        <img
          src={eventData.imageUrl}
          alt={eventData.title}
          className="h-full w-full object-cover transition-transform duration-700"
        />
      </div>
      <div className="p-6 h-3/5 overflow-auto">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
            {eventData.category}
          </span>
          <span className="text-sm text-neutral-500">{eventData.date}</span>
        </div>

        <h3 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">
          {eventData.title}
        </h3>

        <p className="text-neutral-600">{eventData.description}</p>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4">
          <Button
            className="w-full mt-5 hover:bg-blue-500 hover:text-white"
            variant="outline"
          >
            Enroll for this event
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
