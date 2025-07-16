import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({ 
  children, 
  direction = "left", 
  speed = 20, 
  className = "" 
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, -50] : [0, 50],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <div className="flex items-center gap-8">
          {children}
        </div>
        <div className="flex items-center gap-8 ml-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 