import { motion } from "framer-motion";
import dummyLogo from "../assets/dummy-logo.png"; 

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-white"
    >
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <img
          src={dummyLogo}
          alt="App Logo"
          className="h-32 w-32 object-contain animate-pulse"
        />
        <h1 className="mt-4 text-xl sm:text-2xl font-semibold text-neutral-900">
          UoM Computer club
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">Loading...</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
