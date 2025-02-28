import { useEffect } from "react";

interface BinaryBackgroundProps {
  className?: string; // Optional className prop
}

export const BinaryBackground: React.FC<BinaryBackgroundProps> = ({ className }) => {
  const numDigits = 10;  // Decreased the number of digits
  const digitInterval = 50;  // Interval between new digits falling (in milliseconds)

  // Helper function to generate a random binary digit (0 or 1)
  function generateBinaryDigit() {
    return Math.round(Math.random());
  }

  // Create binary digits and animate them
  function createBinaryDigits() {
    for (let i = 0; i < numDigits; i++) {
      const binaryDigit = document.createElement('span');
      const digit = generateBinaryDigit();
      binaryDigit.textContent = digit.toString();
      binaryDigit.classList.add('binaryDigit');
      binaryDigit.style.left = `${Math.random() * 100}vw`; // Random horizontal position

      // Random delay for when each digit falls
      binaryDigit.style.animationDelay = `${Math.random() * 5}s`;

      // Append to the wrapper
      document.getElementById('binaryWrapper')?.appendChild(binaryDigit);

      // Remove the element after animation completes (to prevent clutter)
      setTimeout(() => {
        document.getElementById('binaryWrapper')?.removeChild(binaryDigit);
      }, 5000); // Matches the fall animation duration
    }
  }

  // Create new binary digits periodically
  useEffect(() => {
    const interval = setInterval(createBinaryDigits, digitInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="binaryWrapper"
      className={`absolute top-0 left-0 w-full h-screen z-10 pointer-events-none overflow-hidden ${className || ""}`}  // Apply the className prop here
    />
  );
};
