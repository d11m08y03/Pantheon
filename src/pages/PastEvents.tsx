import React from "react";
import TimelineEvent from "../components/TimelineEvent";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PastActivities } from "../components/PastEventsData";
import Nav from "@/components/Nav";
import { SparklesText } from "@/components/magicui/sparkles-text";

interface TimelineItem {
  id: number;
  year: number;
  title: string;
  description: string;
  date?: string;
  imageUrl?: string;
  category?: string;
}

const Timeline: React.FC = () => {
  let previousYear: number | null = null; 

  return (
    <>
      <Nav />
      <h1 className="text-3xl md:text-5xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6 mt-20 px-4">
      <SparklesText className="text-4xl" text="A Journey Through Time: The Story of Our Club's Achievements" />
        
      </h1>

      <div className="w-full max-w-screen-lg mx-auto px-4 md:px-6 py-12">
        <div className="relative">
          {/* Vertical line in the center - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden md:block"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          />

          <div className="relative">
            {PastActivities.map((item, index) => {
              const showYear = item.year !== previousYear;
              previousYear = item.year; 

            
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: false
              });

              return (
                <div
                  ref={ref}
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center justify-between mb-10`}
                >
                  {showYear && (
                    <div className="text-center flex-shrink-0 mb-4 md:mb-0">
                      <span className="text-3xl md:text-4xl font-semibold text-gray-700">
                        {item.year}
                      </span>
                    </div>
                  )}

                  <div className="w-full md:w-1/2">
                    <TimelineEvent
                      year={item.year}
                      title={item.title}
                      description={item.description}
                      isVisible={inView}
                      imageUrls={item.imageUrls}
                      date={item.date}
                      category={item.category}
                      index={index}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
