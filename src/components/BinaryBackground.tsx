import React, { useEffect, useState } from "react";

interface BinaryBackgroundProps {
  className?: string;
}

interface BinaryDigit {
  id: number;
  left: string;
  digit: number;
}

export const BinaryBackground: React.FC<BinaryBackgroundProps> = ({ className }) => {
  const [binaryDigits, setBinaryDigits] = useState<BinaryDigit[]>([]);
  const numDigits = 2;
  const digitInterval = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryDigits((prev) => [
        ...prev,
        ...Array.from({ length: numDigits }, () => ({
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}vw`,
          digit: Math.round(Math.random()),
        })),
      ]);
    }, digitInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setBinaryDigits((prev) => prev.slice(-100));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div
      id="binaryWrapper"
      className={`absolute top-0 left-0 w-full h-screen z-10 pointer-events-none overflow-hidden ${className || ""}`}
    >
      {binaryDigits.map((digit) => (
        <span
          key={digit.id}
          className="binaryDigit"
          style={{
            left: digit.left,
            animation: "fall 5s linear",
          }}
        >
          {digit.digit}
        </span>
      ))}
    </div>
  );
};
