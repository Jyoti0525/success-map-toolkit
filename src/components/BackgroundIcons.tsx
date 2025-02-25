
import { Briefcase, GraduationCap, LineChart, Users, Target, Star } from "lucide-react";
import { useEffect, useState } from "react";

const icons = [Briefcase, GraduationCap, LineChart, Users, Target, Star];

interface FloatingIcon {
  Icon: typeof Briefcase;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

export const BackgroundIcons = () => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const newIcons = icons.map((Icon) => ({
      Icon,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1,
      size: 16 + Math.random() * 24,
      opacity: 0.1 + Math.random() * 0.2,
    }));
    setFloatingIcons(newIcons);

    const interval = setInterval(() => {
      setFloatingIcons((prev) =>
        prev.map((icon) => ({
          ...icon,
          y: (icon.y - icon.speed) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map((icon, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <icon.Icon
            size={icon.size}
            className="text-navy"
            style={{ opacity: icon.opacity }}
          />
        </div>
      ))}
    </div>
  );
};
