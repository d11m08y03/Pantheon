import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

interface EventData {
  imageUrls: string[];
  title: string;
  category: string;
  date: string;
  description: string;
}

interface HighlightCardProps {
  eventData: EventData;
  className?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ eventData, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % eventData.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? eventData.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-500 hover:shadow-2xl border-2 hover:border-blue-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[16/9] overflow-hidden w-full h-2/5">
        <motion.img
          key={eventData.imageUrls[currentIndex]}
          src={eventData.imageUrls[currentIndex]}
          alt={eventData.title}
          className="h-full w-full object-cover transition-transform duration-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Navigation Arrows */}
        {eventData.imageUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between h-[60%] overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="truncate max-w-[120px] rounded-full bg-neutral-100 px-3 py-1 text-xs sm:text-sm font-medium text-neutral-600">
            {eventData.category}
          </span>
          <span className="text-xs sm:text-sm text-neutral-500">{eventData.date}</span>
        </div>

        <h3 className="mb-3 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
          {eventData.title}
        </h3>

        <p className="text-neutral-600 text-sm sm:text-base line-clamp-3">{eventData.description}</p>
      </div>
    </motion.div>
  );
};

export default HighlightCard;
