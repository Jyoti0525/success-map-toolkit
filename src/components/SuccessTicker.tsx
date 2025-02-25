
import { useEffect, useState } from "react";

const successStats = [
  "93% placement rate in top tech companies",
  "Average salary increase of 45%",
  "2000+ successful placements",
  "Partnership with 500+ companies",
  "100+ mock interviews conducted daily",
];

export const SuccessTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy/5 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {successStats.map((stat, index) => (
            <div
              key={index}
              className="absolute w-full text-center transition-all duration-500"
              style={{
                transform: `translateY(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0,
              }}
            >
              <span className="text-navy font-medium">{stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
