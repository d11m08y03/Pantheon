"use client";
import d from '../assets/d.jpeg'
import { useTheme } from "next-themes";
import { motion } from "framer-motion";


export function Events() {
  const { theme } = useTheme();

  // Dummy data for the event
  const eventData = {
    title: "Magical Journey",
    date: "March 15, 2025",
    description: "A breathtaking adventure through the world of magic and wonders.",
    category: "Adventure",
    imageUrl: {d}, 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md mb-10 mt-10 ml-1 mr-1"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={d} 
          alt={eventData.title}
          className="h-full w-full object-cover transition-transform duration-700"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
            {eventData.category}
          </span>
          <span className="text-sm text-neutral-500">{eventData.date}</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">{eventData.title}</h3>
        <p className="text-neutral-600">{eventData.description}</p>
      </div>
    </motion.div>
  );
}
