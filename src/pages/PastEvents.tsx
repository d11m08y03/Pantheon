import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ActivityCard from '@/components/PastActivityCard';
import Nav from '@/components/Nav';
import { PastActivities } from '@/components/PastEventsData';

const PastEvents = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']); 

  const groupedActivities = PastActivities.reduce((acc, activity) => {
    const year = activity.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(activity);
    return acc;
  }, {} as Record<number, typeof PastActivities>);

  const years = Object.keys(groupedActivities).map(Number).sort((a, b) => b - a);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container relative">
            <div className="mb-12 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl mt-5"
              >
                Discover Our Past Events & Activities
              </motion.h1>
              <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="text-xl text-white/90 w-3/4 text-center mx-auto"
>
  Take a look at some of our most impactful and engaging events from the past years. Scroll through our journey and discover the events that have made us who we are today.
</motion.p>

            </div>
          </div>
        </section>

        {/* Activities Timeline Section */}
        <section className="py-20">
          <div className="container relative">
           

            {/* Timeline and Cards Layout */}
            <div className="flex justify-between">
              {/* Timeline Section - Only the vertical line */}
              <div className="relative w-1/4">
                {/* Animated Timeline Line */}
                <motion.div
                  style={{ height: lineHeight }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-neutral-200"
                ></motion.div>
              </div>

              {/* Activity Cards Section - No Year Labels */}
              <div className="w-3/4 space-y-16">
                {years.map((year) => (
                  <div key={year}>
                    {/* Activity Cards */}
                    <div className="space-y-12">
                      {groupedActivities[year].map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-6 justify-start"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1 * index,
                            ease: 'easeInOut'
                          }}
                        >
                          <div className="max-w-4xl w-full">
                            <ActivityCard {...activity} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PastEvents;
