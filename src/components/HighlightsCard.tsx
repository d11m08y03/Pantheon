import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";

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

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % eventData.imageUrls.length);
	};

	const prevImage = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? eventData.imageUrls.length - 1 : prev - 1,
		);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 w-full h-full hover:shadow-md transition-shadow duration-300 mt-8 magicui-interactive-hover ${className}`}
			>

				
				{/* Image Carousel */}
				<div className="relative aspect-[16/9] overflow-hidden w-full h-2/5">
					<img
						src={eventData.imageUrls[currentIndex]}
						alt={`${eventData.title} - Image ${currentIndex + 1}`}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>

					{/* Removed full image view button */}

					{/* Navigation Arrows */}
					{eventData.imageUrls.length > 1 && (
						<>
							<button
								onClick={prevImage}
								className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 opacity-0 group-hover:opacity-100"
								aria-label="Previous image"
							>
								<ChevronLeft size={18} />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 opacity-0 group-hover:opacity-100"
								aria-label="Next image"
							>
								<ChevronRight size={18} />
							</button>
						</>
					)}

					{/* Image Counter */}
					{eventData.imageUrls.length > 1 && (
						<div className="absolute bottom-2 right-2 bg-black/60 dark:bg-white/60 text-white dark:text-black px-2 py-1 rounded-full text-xs font-medium">
							{currentIndex + 1} / {eventData.imageUrls.length}
						</div>
					)}
				</div>

				{/* Content Section */}
				<div className="p-8 flex flex-col justify-between h-[60%] gap-8">
					<div className="mb-3 flex items-center justify-between">
						<div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
							<Tag size={14} className="text-gray-600 dark:text-gray-300" />
							<span className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
								{eventData.category}
							</span>
						</div>
						<div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
							<Calendar size={14} />
							<span className="text-xs font-medium">
								{eventData.date}
							</span>
						</div>
					</div>

					<h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
						{eventData.title}
					</h3>

					<p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
						{eventData.description}
					</p>

					{/* Removed click to view hint */}
				</div>
			</motion.div>

			{/* Removed modal for full image view */}
		</>
	);
};

export default HighlightCard;
