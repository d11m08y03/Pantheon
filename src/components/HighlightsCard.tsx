"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface EventData {
  imageUrl: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function HighlightCard({ eventData }: { eventData: EventData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-500 hover:shadow-2xl 
                 border-2 hover:border-blue-300 w-full sm:w-[350px] lg:w-[400px] 
                 h-[450px] sm:h-[500px] lg:h-[500px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={eventData.imageUrl}
          alt={eventData.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
        />
      </div>

      
      <div className="p-4 md:p-6 flex flex-col h-[60%] overflow-hidden">
      
        <div className="mb-3 flex items-center justify-between">
          <span className="truncate max-w-[120px] rounded-full bg-neutral-100 px-3 py-1 text-xs sm:text-sm font-medium text-neutral-600">
            {eventData.category}
          </span>
          <span className="text-xs sm:text-sm text-neutral-500">{eventData.date}</span>
        </div>

  
        <h3 className="mb-2 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
          {eventData.title}
        </h3>

        
        <p className="text-neutral-600 text-sm sm:text-base line-clamp-3">{eventData.description}</p>
      </div>
    </motion.div>
  );
}
