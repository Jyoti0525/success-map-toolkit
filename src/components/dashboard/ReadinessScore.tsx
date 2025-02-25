
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const ReadinessScore = () => {
  const [score, setScore] = useState(0);
  const maxScore = 85; // This would come from your backend

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(maxScore);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="col-span-1 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Placement Readiness</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#1A365D"
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              className="transition-all duration-1000 ease-out"
            />
            <text x="18" y="20.35" className="text-3xl font-bold" textAnchor="middle" fill="#1A365D">
              {score}%
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};
