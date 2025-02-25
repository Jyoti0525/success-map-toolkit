// src/components/dashboard/ReadinessScore.tsx
import React, { useEffect, useRef } from 'react';

export const ReadinessScore = () => {
  const circleRef = useRef(null);
  const score = 78;
  
  useEffect(() => {
    // Animate the score on load
    if (circleRef.current) {
      const circle = circleRef.current;
      const circumference = 2 * Math.PI * 45; // radius is 45
      
      // Set initial state (empty circle)
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;
      
      // Trigger animation
      setTimeout(() => {
        const offset = circumference - (score / 100) * circumference;
        circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
        circle.style.strokeDashoffset = offset;
      }, 300);
    }
    
    // Animate the number counting up
    const scoreElement = document.getElementById('readiness-score-value');
    if (scoreElement) {
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += 1;
        scoreElement.textContent = currentScore.toString();
        if (currentScore >= score) clearInterval(interval);
      }, 25);
    }
  }, [score]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Placement Readiness</h2>
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1A365D"
              strokeWidth="8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span id="readiness-score-value" className="text-4xl font-bold text-slate-800">0</span>
            <span className="text-slate-500">out of 100</span>
          </div>
        </div>
        <div className="text-center space-y-3 w-full">
          <p className="text-sm text-slate-600">
            Your profile is on track. Improve your resume and technical skills to increase your score.
          </p>
          <button className="w-full py-2 px-4 bg-navy hover:bg-navy-dark text-white rounded transition-colors">
            Improve Score
          </button>
        </div>
      </div>
    </div>
  );
};