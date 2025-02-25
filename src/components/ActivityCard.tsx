import { useState } from 'react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
  year: number;
}

const ActivityCard = ({ title, date, description, imageUrl, category, year }: ActivityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">{category}</span>
          <span className="text-sm text-neutral-500">{date}</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
