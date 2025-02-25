import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ActivityCard from '@/components/ActivityCard';
import Nav from '@/components/Nav';

const activities = [
  {
    title: "Annual Tech Conference 2023",
    date: "December 15, 2023",
    description: "A gathering of industry experts and enthusiasts discussing the latest trends in technology.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80",
    category: "Conference",
    year: 2023
  },
  {
    title: "Coding Workshop Series",
    date: "November 5, 2023",
    description: "Hands-on workshop teaching modern web development practices and techniques.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
    category: "Workshop",
    year: 2023
  },
  {
    title: "Design Thinking Masterclass",
    date: "October 20, 2023",
    description: "An intensive session on applying design thinking principles to solve real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=2000&q=80",
    category: "Masterclass",
    year: 2023
  },
  {
    title: "Tech Innovation Summit",
    date: "December 10, 2022",
    description: "A showcase of groundbreaking technologies and innovative solutions from industry leaders.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80",
    category: "Summit",
    year: 2022
  },
  {
    title: "Web Development Bootcamp",
    date: "September 15, 2022",
    description: "Intensive training program covering full-stack web development fundamentals.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80",
    category: "Bootcamp",
    year: 2022
  },
  {
    title: "AI/ML Workshop Series",
    date: "July 20, 2022",
    description: "Deep dive into artificial intelligence and machine learning concepts and applications.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2000&q=80",
    category: "Workshop",
    year: 2022
  }
];

const PastEvents = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']); 

  const groupedActivities = activities.reduce((acc, activity) => {
    const year = activity.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(activity);
    return acc;
  }, {} as Record<number, typeof activities>);

  const years = Object.keys(groupedActivities).map(Number).sort((a, b) => b - a);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-800 text-white">
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
