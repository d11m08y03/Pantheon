import { useState } from "react";
import { motion } from "framer-motion";

interface PastActivityCardProps {
	title: string;
	date: string;
	description: string;
	imageUrl: string;
	category: string;
	year: number;
}

const PastActivityCard = ({
	title,
	date,
	description,
	imageUrl,
	category,
}: PastActivityCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true, margin: "-100px" }}
			className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-500 hover:shadow-2xl 
                 border-2 hover:border-blue-300 w-full sm:w-[320px] md:w-[360px] lg:w-[400px] 
                 h-[450px] sm:h-[500px] md:h-[520px] lg:h-[450px] mx-auto"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="aspect-[16/9] overflow-hidden">
				<img
					src={imageUrl}
					alt={title}
					className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div className="p-4 md:p-6 flex flex-col h-[60%] overflow-hidden">
				<div className="mb-3 flex items-center justify-between">
					<span className="truncate max-w-[120px] rounded-full bg-neutral-100 px-3 py-1 text-xs sm:text-sm font-medium text-neutral-600">
						{category}
					</span>
					<span className="text-xs sm:text-sm text-neutral-500">{date}</span>
				</div>

				<h3 className="mb-2 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
					{title}
				</h3>

				<p className="text-neutral-600 text-sm sm:text-base line-clamp-3">
					{description}
				</p>
			</div>
		</motion.div>
	);
};

export default PastActivityCard;
